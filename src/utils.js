export function overallScore({ taste, price, vibe }) {
  return Math.round(((taste + price + vibe) / 3) * 10) / 10
}

export function scoreClass(score) {
  if (score >= 7.5) return 'good'
  if (score >= 5) return 'ok'
  return 'bad'
}

// Highest Slice Score first. Ties go to the better pizza (Taste), then to the
// review added first (lowest id), so the order never depends on fetch order.
export function sortByOverall(reviews) {
  return [...reviews].sort(
    (a, b) => overallScore(b) - overallScore(a) || b.taste - a.taste || a.id - b.id,
  )
}
