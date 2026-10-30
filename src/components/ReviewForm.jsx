import { useState } from 'react'
import { overallScore } from '../utils'
import Modal from './Modal'
import ScoreBadge from './ScoreBadge'
import ScoreInput from './ScoreInput'

export default function ReviewForm({ review, onSubmit, onClose }) {
  const editing = Boolean(review)
  const [form, setForm] = useState({
    name: review?.name ?? '',
    location: review?.location ?? '',
    summary: review?.summary ?? '',
    taste: review?.taste ?? 5,
    price: review?.price ?? 5,
    vibe: review?.vibe ?? 5,
  })
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(review?.image ?? '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }))

  function onImage(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return setError('Restaurant name is required.')
    setSaving(true)
    setError('')
    try {
      await onSubmit({ ...form, name: form.name.trim(), location: form.location.trim() }, imageFile)
    } catch (err) {
      setError(err.message || 'Could not save the review.')
      setSaving(false)
    }
  }

  return (
    <Modal onClose={onClose}>
      <form className="form-body" onSubmit={handleSubmit}>
        <h2>{editing ? 'Edit review' : 'Add a review'}</h2>

        <label className="field">
          Restaurant name
          <input type="text" value={form.name} onChange={(e) => set('name')(e.target.value)} />
        </label>

        <label className="field">
          Location
          <input type="text" value={form.location} onChange={(e) => set('location')(e.target.value)} />
        </label>

        <label className="field">
          Photo {editing && <span className="hint">(leave empty to keep the current photo)</span>}
          <input type="file" accept="image/*" onChange={onImage} />
          {preview && <img className="preview" src={preview} alt="Preview" />}
        </label>

        <label className="field">
          Review
          <textarea value={form.summary} onChange={(e) => set('summary')(e.target.value)} />
        </label>

        <ScoreInput label="Taste" hint="(the pizza itself)" value={form.taste} onChange={set('taste')} />
        <ScoreInput label="Price" hint="(all items; 10 = great deal)" value={form.price} onChange={set('price')} />
        <ScoreInput label="Vibe" hint="(would we eat in?)" value={form.vibe} onChange={set('vibe')} />

        <div className="overall-preview">
          Slice Score (average) <ScoreBadge score={overallScore(form)} />
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form-actions">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save review'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
