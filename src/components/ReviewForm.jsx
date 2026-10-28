import { useState } from 'react'
import { overallScore } from '../utils'
import Modal from './Modal'
import ScoreBadge from './ScoreBadge'
import ScoreInput from './ScoreInput'

export default function ReviewForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    summary: '',
    taste: 5,
    price: 5,
    vibe: 5,
  })
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState('')
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
        <h2>Add a review</h2>

        <label className="field">
          Restaurant name
          <input type="text" value={form.name} onChange={(e) => set('name')(e.target.value)} />
        </label>

        <label className="field">
          Location
          <input type="text" value={form.location} onChange={(e) => set('location')(e.target.value)} />
        </label>

        <label className="field">
          Photo
          <input type="file" accept="image/*" onChange={onImage} />
          {preview && <img className="preview" src={preview} alt="Preview" />}
        </label>

        <label className="field">
          Review
          <textarea value={form.summary} onChange={(e) => set('summary')(e.target.value)} />
        </label>

        <ScoreInput label="Taste" value={form.taste} onChange={set('taste')} />
        <ScoreInput label="Price" hint="(10 = great value)" value={form.price} onChange={set('price')} />
        <ScoreInput label="Vibe" value={form.vibe} onChange={set('vibe')} />

        <div className="overall-preview">
          Overall (average) <ScoreBadge score={overallScore(form)} />
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
