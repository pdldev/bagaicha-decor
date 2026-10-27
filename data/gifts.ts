export type Gift = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category:
    | 'Chocolates'
    | 'Soft toys'
    | 'Gift hampers'
    | 'Cakes'
    | 'Personalised'
    | 'Combo with flowers'
  tags: string[]
}

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`

export const gifts: Gift[] = [
  {
    id: 'chiya-chocolate-box',
    name: 'Chiya & Chocolate Box',
    description:
      'A cosy pairing of Nepali tea, artisan chocolate and a little sweetness.',
    price: 1800,
    image: image('photo-1548907040-4baa42d10919'),
    category: 'Chocolates',
    tags: ['Thank you', 'Birthday'],
  },
  {
    id: 'maya-teddy',
    name: 'Maya Teddy',
    description:
      'A soft, huggable companion paired with a small seasonal flower bunch.',
    price: 2200,
    image: image('photo-1559454403-b8fb88521f11'),
    category: 'Soft toys',
    tags: ['Birthday', 'New baby'],
  },
  {
    id: 'pokhara-picnic',
    name: 'Pokhara Picnic Hamper',
    description:
      'A thoughtful hamper of local treats for slow afternoons by the lake.',
    price: 3400,
    image: image('photo-1601598851547-4302969d4d82'),
    category: 'Gift hampers',
    tags: ['Housewarming', 'Thank you'],
  },
  {
    id: 'vanilla-cloud-cake',
    name: 'Vanilla Cloud Cake',
    description:
      'A light celebration cake, finished simply and ready for a personal note.',
    price: 1800,
    image: image('photo-1578985545062-69928b1d9587'),
    category: 'Cakes',
    tags: ['Birthday', 'Anniversary'],
  },
  {
    id: 'naam-ko-frame',
    name: 'Naam Ko Frame',
    description:
      'A personalised keepsake with a name, date or small message of your choice.',
    price: 1600,
    image: image('photo-1513519245088-0e12902e5a38'),
    category: 'Personalised',
    tags: ['Wedding', 'Anniversary'],
  },
  {
    id: 'phool-mithai-combo',
    name: 'Phool & Mithai Combo',
    description:
      'Fresh flowers and a box of mithai for every auspicious hello.',
    price: 3000,
    image: image('photo-1549007994-cb92caebd54b'),
    category: 'Combo with flowers',
    tags: ['Puja', 'Congratulations'],
  },
  {
    id: 'dark-chocolate-truffles',
    name: 'Dark Chocolate Truffles',
    description:
      'A neat box of rich chocolate truffles for a quietly elegant gesture.',
    price: 1400,
    image: image('photo-1575377427642-087cf684f04d'),
    category: 'Chocolates',
    tags: ['Thank you', 'Just because'],
  },
  {
    id: 'little-bunny',
    name: 'Little Bunny',
    description:
      'A soft pastel bunny for new arrivals, birthdays and gentle surprises.',
    price: 1500,
    image: image('photo-1559454403-b8fb88521f11'),
    category: 'Soft toys',
    tags: ['Birthday', 'New baby'],
  },
  {
    id: 'celebrate-box',
    name: 'Celebrate Box',
    description:
      'Cake, flowers and a handwritten card brought together in one lovely box.',
    price: 4200,
    image: image('photo-1551024506-0bccd828d307'),
    category: 'Combo with flowers',
    tags: ['Birthday', 'Anniversary'],
  },
  {
    id: 'momo-day-hamper',
    name: 'Momo Day Hamper',
    description:
      'A playful local-food hamper to send a taste of home across Pokhara.',
    price: 2800,
    image: image('photo-1547592180-85f173990554'),
    category: 'Gift hampers',
    tags: ['Housewarming', 'Thank you'],
  },
]
