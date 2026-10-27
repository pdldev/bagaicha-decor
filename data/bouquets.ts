export type ProductSize = { label: 'Small' | 'Medium' | 'Large'; price: number }

export type Bouquet = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category:
    | 'Rose'
    | 'Mixed'
    | 'Marigold'
    | 'Orchid'
    | 'Wedding'
    | 'Bridal'
    | 'Funeral/Condolence'
    | 'Custom'
  occasions: string[]
  sizes?: ProductSize[]
  inStock: boolean
}

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`

export const bouquets: Bouquet[] = [
  {
    id: 'laligurans-love',
    name: 'Laligurans Love',
    description:
      'A joyful hand-tied mix of roses and seasonal blooms, wrapped with care.',
    price: 1800,
    image: image('photo-1548094990-c6fa90b7de1d'),
    category: 'Rose',
    occasions: ['Birthday', 'Anniversary', 'Just because'],
    sizes: [
      { label: 'Small', price: 1800 },
      { label: 'Medium', price: 2600 },
      { label: 'Large', price: 3800 },
    ],
    inStock: true,
  },
  {
    id: 'pokhara-sunrise',
    name: 'Pokhara Sunrise',
    description:
      'Warm peach roses, lilies and tiny blooms inspired by a lake sunrise.',
    price: 2400,
    image: image('photo-1487070183336-b863922373d4'),
    category: 'Mixed',
    occasions: ['Birthday', 'Congratulations'],
    sizes: [
      { label: 'Small', price: 2400 },
      { label: 'Medium', price: 3400 },
      { label: 'Large', price: 4800 },
    ],
    inStock: true,
  },
  {
    id: 'marigold-mala',
    name: 'Marigold Mala',
    description:
      'Golden marigolds arranged for puja, welcome rituals and festive gifting.',
    price: 1200,
    image: image('photo-1606800052052-a08af7148866'),
    category: 'Marigold',
    occasions: ['Puja', 'Festival', 'Welcome'],
    inStock: true,
  },
  {
    id: 'orchid-mist',
    name: 'Orchid Mist',
    description:
      'A refined arrangement of white orchids and foliage for a quiet gesture.',
    price: 3200,
    image: image('photo-1563241527-3004b7be0ffd'),
    category: 'Orchid',
    occasions: ['Thank you', 'Birthday', 'Corporate'],
    sizes: [
      { label: 'Small', price: 3200 },
      { label: 'Medium', price: 4500 },
      { label: 'Large', price: 6200 },
    ],
    inStock: true,
  },
  {
    id: 'bridal-whisper',
    name: 'Bridal Whisper',
    description:
      'A soft, romantic bridal posy with roses, lisianthus and delicate greens.',
    price: 4500,
    image: image('photo-1519225421980-715cb0215aed'),
    category: 'Bridal',
    occasions: ['Wedding', 'Engagement'],
    inStock: true,
  },
  {
    id: 'sajha-phool',
    name: 'Sajha Phool',
    description:
      'A generous evening-toned bouquet for milestones big and small.',
    price: 2800,
    image: image('photo-1523438885200-e635ba2c371e'),
    category: 'Mixed',
    occasions: ['Anniversary', 'Congratulations'],
    inStock: true,
  },
  {
    id: 'wedding-white',
    name: 'Wedding White',
    description:
      'Classic white blooms for ceremonies, blessings and new beginnings.',
    price: 3800,
    image: image('photo-1520763185298-1b434c919102'),
    category: 'Wedding',
    occasions: ['Wedding', 'Engagement'],
    inStock: true,
  },
  {
    id: 'aashirwad',
    name: 'Aashirwad',
    description:
      'A gentle, graceful arrangement made for condolences and remembrance.',
    price: 2200,
    image: image('photo-1490750967868-88aa4486c946'),
    category: 'Funeral/Condolence',
    occasions: ['Condolence', 'In memory'],
    inStock: false,
  },
  {
    id: 'rose-petal-note',
    name: 'Rose Petal Note',
    description:
      'A petite bunch of fresh roses with room for a handwritten message.',
    price: 1500,
    image: image('photo-1518709268805-4e9042af9f23'),
    category: 'Rose',
    occasions: ['Birthday', 'Just because'],
    inStock: true,
  },
  {
    id: 'custom-bloom',
    name: 'Your Custom Bloom',
    description:
      'Tell us your colours, budget and occasion; we will make the rest beautiful.',
    price: 2000,
    image: image('photo-1455582916367-25f75bfc6710'),
    category: 'Custom',
    occasions: ['Any occasion'],
    inStock: true,
  },
  {
    id: 'sunset-gerbera',
    name: 'Sunset Gerbera',
    description:
      'Bright gerberas and seasonal greens for a cheerful, modern gift.',
    price: 1900,
    image: image('photo-1526047932273-341f2a7631f9'),
    category: 'Mixed',
    occasions: ['Birthday', 'Congratulations'],
    inStock: true,
  },
  {
    id: 'puja-thali-bloom',
    name: 'Puja Thali Bloom',
    description:
      'A fragrant marigold and rose arrangement to accompany meaningful rituals.',
    price: 1600,
    image: image('photo-1471879832106-c7ab9e0cee23'),
    category: 'Marigold',
    occasions: ['Puja', 'Festival'],
    inStock: true,
  },
]
