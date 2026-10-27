export type WorkEntry = {
  slug: string
  title: string
  eventType: string
  venue: string
  date: string
  theme: string
  flowers: string[]
  photos: string[]
  story: string
}

const photo = '/placeholder.jpg'

export const work: WorkEntry[] = [
  { slug: 'lakeview-wedding', title: 'A lakeview wedding in soft marigold', eventType: 'Wedding', venue: 'Lakeside, Pokhara', date: '[MONTH YEAR]', theme: 'Warm marigold, cream and green', flowers: ['Marigold', 'Roses', 'Eucalyptus'], photos: Array.from({ length: 8 }, () => photo), story: 'The couple wanted the lake to feel close during their ceremony. We kept the flowers low, warm and easy to see around, then carried the same marigold thread through the welcome table and dining space.' },
  { slug: 'pasni-at-home', title: 'A gentle pasni at home', eventType: 'Pasni', venue: 'Lakeside, Pokhara', date: '[MONTH YEAR]', theme: 'Peach, pink and fresh green', flowers: ['Roses', 'Carnations', 'Seasonal foliage'], photos: Array.from({ length: 8 }, () => photo), story: 'For this family pasni, the decoration had to leave room for grandparents, cousins and plenty of photographs. A small floral arch, hand-tied table flowers and a few thoughtful details made the home feel festive without crowding it.' },
]

export const getWork = (slug: string) => work.find((entry) => entry.slug === slug)
