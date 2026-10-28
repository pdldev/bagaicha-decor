export type ServiceCategory =
  'Weddings' | 'Family Rituals' | 'Celebrations' | 'Vehicles'
export type ProductSize = { label: 'Small' | 'Medium' | 'Large'; price: number }
export type ServiceCatalogue = {
  file: string
  preview: string
  pages: number
  sizeLabel: string
}

export type Service = {
  slug: string
  name: string
  category: ServiceCategory
  shortDescription: string
  longDescription: string
  heroImage: string
  gallery: string[]
  inclusions: string[]
  idealFor: string
  startingPrice: string
  whatsappTemplate: string
  catalogue?: ServiceCatalogue
}
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
export type Testimonial = { quote: string; name: string; event: string }
export type Faq = { question: string; answer: string }
export type EnquiryItem = {
  id: string
  name: string
  type: string
  price?: number
  qty: number
}
