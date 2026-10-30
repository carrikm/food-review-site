import { supabase } from './supabase'

const BUCKET = 'review-images'

// Shrink photos before upload so storage and page loads stay light.
function resizeImage(file, maxSize = 1600) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not process image.'))), 'image/jpeg', 0.85)
      URL.revokeObjectURL(img.src)
    }
    img.onerror = () => reject(new Error('Could not read that image.'))
    img.src = URL.createObjectURL(file)
  })
}

async function uploadImage(file) {
  const blob = await resizeImage(file)
  const path = `${crypto.randomUUID()}.jpg`
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: 'image/jpeg' })
  if (error) throw error
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

// Storage object path from a public URL; null for anything not in our bucket.
function storagePath(url) {
  const marker = `/${BUCKET}/`
  const i = url ? url.indexOf(marker) : -1
  return i === -1 ? null : decodeURIComponent(url.slice(i + marker.length))
}

async function removeImage(url) {
  const path = storagePath(url)
  if (path) await supabase.storage.from(BUCKET).remove([path])
}

const toReview = (row) => ({ ...row, image: row.image_url })

export async function fetchReviews() {
  const { data, error } = await supabase.from('reviews').select('*')
  if (error) throw error
  return data.map(toReview)
}

export async function createReview(fields, imageFile) {
  const image_url = imageFile ? await uploadImage(imageFile) : null
  const { data, error } = await supabase
    .from('reviews')
    .insert({ ...fields, image_url })
    .select()
    .single()
  if (error) throw error
  return toReview(data)
}

export async function updateReview(review, fields, imageFile) {
  const image_url = imageFile ? await uploadImage(imageFile) : review.image_url
  const { data, error } = await supabase
    .from('reviews')
    .update({ ...fields, image_url })
    .eq('id', review.id)
    .select()
  if (error || data.length === 0) {
    if (imageFile) await removeImage(image_url) // don't leave the new upload orphaned
    throw error || new Error('Update was not allowed. Are you signed in?')
  }
  if (imageFile) await removeImage(review.image_url)
  return toReview(data[0])
}

export async function deleteReview(review) {
  const { data, error } = await supabase.from('reviews').delete().eq('id', review.id).select()
  if (error) throw error
  if (data.length === 0) throw new Error('Delete was not allowed. Are you signed in?')
  await removeImage(review.image_url)
}

export const signIn =(email, password) => supabase.auth.signInWithPassword({ email, password })
export const signOut = () => supabase.auth.signOut()
