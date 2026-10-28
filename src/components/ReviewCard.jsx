import { overallScore } from '../utils'
import ScoreBadge from './ScoreBadge'

export default function ReviewCard({ review, rank, onOpen }) {
  return (
    <button className="card" onClick={() => onOpen(review)}>
      <img src={review.image} alt={review.name} loading="lazy" />
      <span className="rank">#{rank}</span>
      <ScoreBadge score={overallScore(review)} />
      <div className="card-body">
        <h3>{review.name}</h3>
        <p>{review.location}</p>
      </div>
    </button>
  )
}
