import { describe, expect, it } from 'vitest'
import { overallScore, scoreClass, sortByOverall } from './utils'

describe('overallScore', () => {
  it('averages taste, price, and vibe', () => {
    expect(overallScore({ taste: 9, price: 6, vibe: 6 })).toBe(7)
  })

  it('rounds to one decimal place', () => {
    expect(overallScore({ taste: 8, price: 7, vibe: 7 })).toBe(7.3)
  })
})

describe('scoreClass', () => {
  it('is good at 7.5 and above', () => {
    expect(scoreClass(7.5)).toBe('good')
    expect(scoreClass(10)).toBe('good')
  })

  it('is ok from 5 up to 7.5', () => {
    expect(scoreClass(5)).toBe('ok')
    expect(scoreClass(7.4)).toBe('ok')
  })

  it('is bad below 5', () => {
    expect(scoreClass(4.9)).toBe('bad')
    expect(scoreClass(0)).toBe('bad')
  })
})

describe('sortByOverall', () => {
  it('puts the highest overall score first', () => {
    const low = { id: 1, taste: 4, price: 4, vibe: 4 }
    const high = { id: 2, taste: 9, price: 9, vibe: 9 }
    expect(sortByOverall([low, high])).toEqual([high, low])
  })

  it('breaks ties by taste, then by lowest id', () => {
    const a = { id: 3, taste: 6, price: 6, vibe: 6 }
    const b = { id: 1, taste: 6, price: 6, vibe: 6 }
    const c = { id: 2, taste: 8, price: 5, vibe: 5 }
    expect(sortByOverall([a, b, c]).map((r) => r.id)).toEqual([2, 1, 3])
  })

  it('does not change the original array', () => {
    const reviews = [
      { id: 1, taste: 2, price: 2, vibe: 2 },
      { id: 2, taste: 9, price: 9, vibe: 9 },
    ]
    sortByOverall(reviews)
    expect(reviews.map((r) => r.id)).toEqual([1, 2])
  })
})
