import { overallScore } from '../utils'
import Modal from './Modal'
import ScoreBadge from './ScoreBadge'

const CATEGORIES = [
  ['taste', 'Taste'],
  ['price', 'Value / Price'],
  ['vibe', 'Vibe'],
]

export default function ReviewDetail({ review, onClose }) {
  return (
    <Modal onClose={onClose}>
      <img className="detail-img" src={review.image} alt={review.name} />
      <div className="detail-body">
        <div className="detail-head">
          <div>
            <h2>{review.name}</h2>
            <p>{review.location}</p>
          </div>
          <ScoreBadge score={overallScore(review)} />
        </div>
        {review.summary && <p className="summary">{review.summary}</p>}
        <div className="breakdown">
          {CATEGORIES.map(([key, label]) => (
            <div className="bar-row" key={key}>
              <span>{label}</span>
              <div className="bar">
                <span style={{ width: `${review[key] * 10}%` }} />
              </div>
              <b>{review[key]}/10</b>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
