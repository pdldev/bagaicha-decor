import type { StaticImageData } from 'next/image'
import b1Image from '@/app/bouquet/b1.png'
import b2Image from '@/app/bouquet/b2.png'
import b4Image from '@/app/bouquet/b4.png'
import b6Image from '@/app/bouquet/b6.png'
import b7Image from '@/app/bouquet/b7.png'
import b8Image from '@/app/bouquet/b8.png'
import b9Image from '@/app/bouquet/b9.png'
import b11Image from '@/app/bouquet/b11.png'
import b15Image from '@/app/bouquet/b15.png'
import b16Image from '@/app/bouquet/b16.png'
import b18Image from '@/app/bouquet/b18.png'
import b20Image from '@/app/bouquet/b20.png'
import b21Image from '@/app/bouquet/b21.png'
import b24Image from '@/app/bouquet/b24.png'
import b25Image from '@/app/bouquet/b25.png'
import b26Image from '@/app/bouquet/b26.png'
import b27Image from '@/app/bouquet/b27.png'
import b28Image from '@/app/bouquet/b28.png'
import b29Image from '@/app/bouquet/b29.png'
import b31Image from '@/app/bouquet/b31.png'
import b32Image from '@/app/bouquet/b32.png'
import b33Image from '@/app/bouquet/b33.png'

export type ProductSize = { label: 'Small' | 'Medium' | 'Large'; price: number }

export type Bouquet = {
  id: string
  name: string
  description: string
  price: number
  image: string | StaticImageData
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

export const bouquets: Bouquet[] = [
  {
    id: 'b1',
    name: 'Kitty Bouquet',
    description: 'A Kitty Bouquet arranged for a cheerful gift.',
    price: 3100,
    image: b1Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b2',
    name: 'Sunflower',
    description: 'A bright sunflower bouquet.',
    price: 750,
    image: b2Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b4',
    name: 'Mixed Chocolate',
    description: 'A mixed chocolate bouquet.',
    price: 2100,
    image: b4Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b6',
    name: 'Lily Bouquet',
    description: 'A bouquet of lilies.',
    price: 3000,
    image: b6Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b7',
    name: 'Crochet Flower Bouquet',
    description: 'A handmade crochet flower bouquet.',
    price: 3500,
    image: b7Image,
    category: 'Custom',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b8',
    name: 'Artificial Customized Bouquet',
    description: 'A customized artificial flower bouquet.',
    price: 2500,
    image: b8Image,
    category: 'Custom',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b9',
    name: 'Candle + Rose + Cake Bouquet',
    description: 'A gift bouquet with a candle, rose and cake.',
    price: 2250,
    image: b9Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b11',
    name: 'Sunflower',
    description: 'A sunflower bouquet arranged for a bright gift.',
    price: 3200,
    image: b11Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b15',
    name: 'Doll + Rose + Cake Bouquet',
    description: 'A gift bouquet with a doll, rose and cake.',
    price: 5500,
    image: b15Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b16',
    name: 'Rose + Chocolate Combo',
    description: 'A rose and chocolate gift combination.',
    price: 3500,
    image: b16Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b18',
    name: 'Pink and White Rose',
    description: 'A bouquet of pink and white roses.',
    price: 2450,
    image: b18Image,
    category: 'Rose',
    occasions: ['Birthday', 'Anniversary'],
    inStock: true,
  },
  {
    id: 'b20',
    name: 'Cocktail',
    description: 'A cocktail-style flower bouquet.',
    price: 2100,
    image: b20Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b21',
    name: 'Fruit Bouquet',
    description: 'A fruit bouquet arranged for gifting.',
    price: 2500,
    image: b21Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b24',
    name: 'Pink Lily with Mixed Flower',
    description: 'Pink lilies arranged with mixed flowers.',
    price: 2000,
    image: b24Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b25',
    name: 'Rose Jarbera Lily',
    description: 'A mixed bouquet of roses, gerberas and lilies.',
    price: 1200,
    image: b25Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b26',
    name: 'Pink Lily Bouquet + Rose',
    description: 'A pink lily bouquet paired with a rose.',
    price: 2500,
    image: b26Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b27',
    name: 'Mixed Sun Rose',
    description: 'A mixed bouquet of sunflowers and roses.',
    price: 1800,
    image: b27Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b28',
    name: 'Sunflower + Rose',
    description: 'A sunflower and rose bouquet.',
    price: 1200,
    image: b28Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b29',
    name: 'Mixed Jarbera with Godawari',
    description: 'A mixed gerbera and godawari bouquet.',
    price: 800,
    image: b29Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
  {
    id: 'b31',
    name: 'A. Rose',
    description: 'A rose bouquet arranged for gifting.',
    price: 2500,
    image: b31Image,
    category: 'Rose',
    occasions: ['Birthday', 'Anniversary'],
    inStock: true,
  },
  {
    id: 'b32',
    name: 'Rose Bouquet',
    description: 'A classic rose bouquet.',
    price: 1200,
    image: b32Image,
    category: 'Rose',
    occasions: ['Birthday', 'Anniversary'],
    inStock: true,
  },
  {
    id: 'b33',
    name: 'Jarbera + White Forest',
    description: 'A gerbera and white forest cake bouquet.',
    price: 2000,
    image: b33Image,
    category: 'Mixed',
    occasions: ['Birthday', 'Any occasion'],
    inStock: true,
  },
]
