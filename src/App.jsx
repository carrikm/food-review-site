import { useEffect, useState } from 'react'
import { createReview, deleteReview, fetchReviews, signOut, updateReview } from './api'
import Intro from './components/Intro'
import LoginForm from './components/LoginForm'
import ReviewCard from './components/ReviewCard'
import ReviewDetail from './components/ReviewDetail'
import ReviewForm from './components/ReviewForm'
import { supabase } from './supabase'
import { sortByOverall } from './utils'

export default function App() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [session, setSession] = useState(null)
  const [selected, setSelected] = useState(null)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const [loggingIn, setLoggingIn] = useState(false)

  useEffect(() => {
    fetchReviews()
      .then(setReviews)
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false))

    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  // The database enforces who may write; this only controls what the UI shows.
  const isAdmin = Boolean(session)
  const sorted = sortByOverall(reviews)

  async function addReview(fields, imageFile) {
    const review = await createReview(fields, imageFile)
    setReviews((r) => [...r, review])
    setAdding(false)
  }

  async function saveEdit(fields, imageFile) {
    const updated = await updateReview(editing, fields, imageFile)
    setReviews((r) => r.map((x) => (x.id === updated.id ? updated : x)))
    setSelected(updated)
    setEditing(null)
  }

  async function removeReview(review) {
    if (!window.confirm(`Delete your review of ${review.name}? This can't be undone.`)) return
    try {
      await deleteReview(review)
      setReviews((r) => r.filter((x) => x.id !== review.id))
      setSelected(null)
    } catch (err) {
      window.alert(err.message || 'Could not delete the review.')
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="brand">
          <h1>🍕 West Shore Slices</h1>
          <p className="tagline">Every independent pizzeria near Messiah, ranked</p>
        </div>
        <div className="header-actions">
          {isAdmin ? (
            <>
              <button className="btn primary" onClick={() => setAdding(true)}>
                + Add review
              </button>
              <button className="btn" onClick={signOut}>
                Sign out
              </button>
            </>
          ) : (
            <button className="btn" onClick={() => setLoggingIn(true)}>
              Admin login
            </button>
          )}
        </div>
      </header>

      <main>
        <Intro />
        {loading ? (
          <p className="empty">Loading…</p>
        ) : loadError ? (
          <p className="empty">Could not load reviews: {loadError}</p>
        ) : sorted.length === 0 ? (
          <p className="empty">No reviews yet.</p>
        ) : (
          <div className="grid">
            {sorted.map((review, i) => (
              <ReviewCard key={review.id} review={review} rank={i + 1} onOpen={setSelected} />
            ))}
          </div>
        )}
      </main>

      {selected && !editing && (
        <ReviewDetail
          review={selected}
          onClose={() => setSelected(null)}
          onEdit={isAdmin ? setEditing : undefined}
          onDelete={isAdmin ? removeReview : undefined}
        />
      )}
      {adding && isAdmin && <ReviewForm onSubmit={addReview} onClose={() => setAdding(false)} />}
      {editing && isAdmin && <ReviewForm review={editing} onSubmit={saveEdit} onClose={() => setEditing(null)} />}
      {loggingIn && !isAdmin && <LoginForm onClose={() => setLoggingIn(false)} />}
    </>
  )
}
