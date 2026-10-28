import { scoreClass } from '../utils'

export default function ScoreBadge({ score }) {
  return (
    <span className={`score ${scoreClass(score)}`}>
      {score.toFixed(1)}
      <small>/10</small>
    </span>
  )
}
