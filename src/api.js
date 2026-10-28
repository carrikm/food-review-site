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

export const signIn = (email, password) => supabase.auth.signInWithPassword({ email, password })
export const signOut = () => supabase.auth.signOut()
