export function overallScore({ taste, price, vibe }) {
  return Math.round(((taste + price + vibe) / 3) * 10) / 10
}

export function scoreClass(score) {
  if (score >= 7.5) return 'good'
  if (score >= 5) return 'ok'
  return 'bad'
}

export function sortByOverall(reviews) {
  return [...reviews].sort((a, b) => overallScore(b) - overallScore(a))
}
