import wedding1 from '../app/images/Weeding1.jpeg'
import wedding2 from '../app/images/weeding2.jpeg'
import wedding3 from '../app/images/weeding3.jpeg'
import wedding4 from '../app/images/weeding4.jpeg'
import car1 from '../app/images/car1.jpeg'
import car2 from '../app/images/car2.jpeg'
import car3 from '../app/images/car3.jpeg'
import car5 from '../app/images/car5.jpeg'
import haldi1 from '../app/images/haldi1.jpg'
import haldi2 from '../app/images/haldi2.jpg'
import haldi3 from '../app/images/haldi3.jpg'
import haldi4 from '../app/images/haldi4.jpg'
import haldi5 from '../app/images/haldi5.jpg'
import barta1 from '../app/images/barta1.jpg'
import barta2 from '../app/images/barta2.jpg'
import barta3 from '../app/images/barta3.jpg'
import wr1 from '../app/images/wr1.jpeg'
import wr2 from '../app/images/wr2.jpeg'
import wr3 from '../app/images/wr3.jpeg'
import wr4 from '../app/images/wr4.jpeg'
import wr5 from '../app/images/wr5.jpeg'
import bd1 from '../app/images/bd1.jpeg'
import bd2 from '../app/images/bd2.jpeg'
import bd3 from '../app/images/bd3.jpeg'
import bd4 from '../app/images/bd4.jpeg'
import bd5 from '../app/images/bd5.jpeg'
import bd6 from '../app/images/bd6.jpeg'
import pasni1 from '../app/images/pasni1.jpeg'
import pasni2 from '../app/images/pasni2.jpeg'
import pasni3 from '../app/images/pasni3.jpeg'
import pasni4 from '../app/images/pasni4.jpeg'
import pasni5 from '../app/images/pasni5.jpeg'
import ae1 from '../app/images/ae1.jpeg'
import ae2 from '../app/images/ae2.jpeg'
import ae3 from '../app/images/ae3.jpeg'
import ae4 from '../app/images/ae4.jpeg'
import ae5 from '../app/images/ae5.jpeg'
import bs1 from '../app/images/bs1.jpeg'
import bs2 from '../app/images/bs2.jpeg'
import bs3 from '../app/images/bs3.jpeg'

export type ServiceCategory =
  'Weddings' | 'Family Rituals' | 'Celebrations' | 'Vehicles'

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

const weddingGallery = [wedding1.src, wedding2.src, wedding3.src, wedding4.src]
const carGallery = [car1.src, car2.src, car3.src, car5.src]
const haldiGallery = [haldi1.src, haldi2.src, haldi3.src, haldi4.src, haldi5.src]
const bartaGallery = [barta1.src, barta2.src, barta3.src]
const receptionGallery = [wr1.src, wr2.src, wr3.src, wr4.src, wr5.src]
const birthdayGallery = [bd1.src, bd2.src, bd3.src, bd4.src, bd5.src, bd6.src]
const pasniGallery = [pasni1.src, pasni2.src, pasni3.src, pasni4.src, pasni5.src]
const anniversaryGallery = [ae1.src, ae2.src, ae3.src, ae4.src, ae5.src]
const babyShowerGallery = [bs1.src, bs2.src, bs3.src]

const make = (service: Omit<Service, 'gallery'>): Service => ({
  ...service,
  gallery: weddingGallery,
})

const makeCar = (service: Omit<Service, 'gallery'>): Service => ({
  ...service,
  gallery: carGallery,
})

const makeHaldi = (service: Omit<Service, 'gallery'>): Service => ({
  ...service,
  gallery: haldiGallery,
})

const makeBarta = (service: Omit<Service, 'gallery'>): Service => ({
  ...service,
  gallery: bartaGallery,
})

const makeReception = (service: Omit<Service, 'gallery'>): Service => ({
  ...service,
  gallery: receptionGallery,
})

const makeBirthday = (service: Omit<Service, 'gallery'>): Service => ({
  ...service,
  gallery: birthdayGallery,
})

const makePasni = (service: Omit<Service, 'gallery'>): Service => ({
  ...service,
  gallery: pasniGallery,
})

const makeAnniversary = (service: Omit<Service, 'gallery'>): Service => ({
  ...service,
  gallery: anniversaryGallery,
})

const makeBabyShower = (service: Omit<Service, 'gallery'>): Service => ({
  ...service,
  gallery: babyShowerGallery,
})

export const services: Service[] = [
  make({
    slug: 'wedding-decoration',
    name: 'Wedding Decoration',
    category: 'Weddings',
    shortDescription:
      'Floral, thoughtful details for the beginning of forever.',
    longDescription:
      'From the first marigold to the last photograph, we create wedding spaces that feel warm, intentional and entirely yours. Our team works with your rituals, palette and venue to shape a celebration guests remember.',
    heroImage: wedding1.src,
    inclusions: [
      'Concept and colour direction',
      'Entrance and stage florals',
      'Mandap or ceremony backdrop',
      'Table and aisle styling',
      'Set-up and on-day coordination',
    ],
    idealFor:
      'Couples planning a full wedding celebration in Pokhara and nearby venues.',
    startingPrice: 'From Rs. 75,000',
    whatsappTemplate: 'wedding decoration',
    catalogue: {
      file: '/downloads/catalogue/Catalog.pdf',
      preview: '/images/catalogue/wedding-decoration-preview.jpeg',
      pages: 1,
      sizeLabel: '2.4 MB',
    },
  }),
  makeReception({
    slug: 'wedding-reception',
    name: 'Wedding Reception',
    category: 'Weddings',
    shortDescription: 'A reception that carries your story into the evening.',
    longDescription:
      'We turn reception halls, gardens and lakeside spaces into a considered setting for dinner, dancing and all the toasts in between. Expect layered flowers, light and small details that make the room feel special.',
    heroImage: wr1.src,
    inclusions: [
      'Reception concept',
      'Stage or sweetheart table',
      'Guest table centrepieces',
      'Welcome signage',
      'Installation and removal',
    ],
    idealFor: 'Receptions, dinner parties and post-ceremony celebrations.',
    startingPrice: 'From Rs. 45,000',
    whatsappTemplate: 'wedding reception',
    catalogue: {
      file: '/downloads/catalogue/Catalog.pdf',
      preview: '/images/catalogue/wedding-reception-preview.jpeg',
      pages: 1,
      sizeLabel: '2.4 MB',
    },
  }),
  makePasni({
    slug: 'pasni-annaprashan',
    name: 'Pasni (Annaprashan)',
    category: 'Family Rituals',
    shortDescription:
      'A gentle, joyful setting for baby’s first rice-feeding ceremony.',
    longDescription:
      'Pasni is a beautiful family milestone. We bring a soft, celebratory touch to the traditional Annaprashan with fresh flowers, a welcoming backdrop and room for every blessing and photograph.',
    heroImage: pasni1.src,
    inclusions: [
      'Floral backdrop',
      'Baby chair or stage styling',
      'Welcome and photo details',
      'Family table florals',
      'Set-up and coordination',
    ],
    idealFor:
      'Baby’s first rice-feeding ceremony at home, a hall or a family venue.',
    startingPrice: 'From Rs. 15,000',
    whatsappTemplate: 'Pasni (Annaprashan)',
    catalogue: {
      file: '/downloads/catalogue/Catalog.pdf',
      preview: '/images/catalogue/pasni-annaprashan-preview.jpeg',
      pages: 1,
      sizeLabel: '2.4 MB',
    },
  }),
  makeBarta({
    slug: 'bratabandha',
    name: 'Bratabandha',
    category: 'Family Rituals',
    shortDescription:
      'Honouring the sacred thread ceremony with grace and colour.',
    longDescription:
      'For Bratabandha, we create a respectful setting that holds the ceremony at its centre. Warm florals, traditional colour and thoughtful guest details make the day feel both rooted and welcoming.',
    heroImage: barta1.src,
    inclusions: [
      'Ceremony backdrop',
      'Entrance and stage flowers',
      'Seating and family table styling',
      'Traditional colour direction',
      'Set-up and pack-down',
    ],
    idealFor: 'Sacred thread ceremonies held at home, temples or event venues.',
    startingPrice: 'From Rs. 25,000',
    whatsappTemplate: 'Bratabandha',
  }),
  makeHaldi({
    slug: 'haldi-mehendi',
    name: 'Haldi & Mehendi',
    category: 'Weddings',
    shortDescription: 'Sunshine, marigolds and a little more joy in the room.',
    longDescription:
      'Haldi and Mehendi should feel relaxed, colourful and full of movement. We build playful floral corners and practical guest spaces that look lovely in the photos and let the rituals unfold naturally.',
    heroImage: haldi1.src,
    inclusions: [
      'Bright floral concept',
      'Haldi or Mehendi seating',
      'Photo corner',
      'Umbrellas, cushions or props',
      'On-site set-up',
    ],
    idealFor:
      'Intimate pre-wedding gatherings at home, outdoors or in a venue.',
    startingPrice: 'From Rs. 30,000',
    whatsappTemplate: 'Haldi & Mehendi',
  }),
  makeBirthday({
    slug: 'birthday-decoration',
    name: 'Birthday Decoration',
    category: 'Celebrations',
    shortDescription: 'A party backdrop made for your favourite person.',
    longDescription:
      'Whether it is a first birthday or a milestone year, we make the celebration feel personal. Tell us the mood, colours and little things they love; we will make the room sing.',
    heroImage: bd1.src,
    inclusions: [
      'Theme and colour styling',
      'Main backdrop',
      'Cake or dessert table',
      'Balloon and floral details',
      'Set-up and removal',
    ],
    idealFor: 'Birthdays for little ones, grown-ups and everyone in between.',
    startingPrice: 'From Rs. 12,000',
    whatsappTemplate: 'birthday decoration',
    catalogue: {
      file: '/downloads/catalogue/Catalog.pdf',
      preview: '/images/catalogue/birthday-decoration-preview.jpeg',
      pages: 1,
      sizeLabel: '2.4 MB',
    },
  }),
  makeCar({
    slug: 'car-decoration',
    name: 'Car Decoration',
    category: 'Vehicles',
    shortDescription: 'A beautiful send-off for the road ahead.',
    longDescription:
      'From the wedding car to the family vehicle carrying a new couple home, we use fresh flowers and a light hand to make the journey feel ceremonial without compromising the car.',
    heroImage: car1.src,
    inclusions: [
      'Fresh floral arrangement',
      'Ribbon and detail styling',
      'Bonnet or handle flowers',
      'Careful installation',
      'Removal after the event',
    ],
    idealFor: 'Wedding departures, anniversaries and celebratory arrivals.',
    startingPrice: 'From Rs. 5,000',
    whatsappTemplate: 'car decoration',
  }),
  makeAnniversary({
    slug: 'anniversary-engagement',
    name: 'Anniversary & Engagement',
    category: 'Celebrations',
    shortDescription: 'Mark the years, the yes, and everything still to come.',
    longDescription:
      'For engagements and anniversaries, we create intimate floral moments with a little romance and a lot of personality. A dinner table, proposal corner or room can be transformed with the right blooms.',
    heroImage: ae1.src,
    inclusions: [
      'Floral moodboard',
      'Backdrop or proposal setting',
      'Table arrangement',
      'Candles and small details',
      'Set-up and styling',
    ],
    idealFor:
      'Proposals, engagement parties, anniversaries and couple celebrations.',
    startingPrice: 'From Rs. 18,000',
    whatsappTemplate: 'anniversary or engagement decoration',
  }),
  makeBabyShower({
    slug: 'baby-shower-welcome',
    name: 'Baby Shower & Welcome',
    category: 'Family Rituals',
    shortDescription: 'A tender welcome for the newest little love.',
    longDescription:
      'We make baby showers and welcome ceremonies feel soft, bright and full of anticipation. From a small home gathering to a larger family lunch, every detail can be made photo-ready and meaningful.',
    heroImage: bs1.src,
    inclusions: [
      'Soft floral concept',
      'Welcome backdrop',
      'Gift or dessert table',
      'Name and milestone details',
      'Set-up and styling',
    ],
    idealFor: 'Baby showers, naming celebrations and welcome gatherings.',
    startingPrice: 'From Rs. 18,000',
    whatsappTemplate: 'baby shower or welcome event',
  }),
  make({
    slug: 'corporate-other-events',
    name: 'Corporate & Other Events',
    category: 'Celebrations',
    shortDescription: 'Polished flowers and spaces that feel like your people.',
    longDescription:
      'We bring the same care to launches, openings, festive gatherings and brand events. Our styling stays considered and on-brief, with flowers that complement the room rather than compete with it.',
    heroImage: '/placeholder.jpg',
    inclusions: [
      'Event styling direction',
      'Stage and entrance florals',
      'Branded or seasonal details',
      'Guest area arrangements',
      'Reliable event-day installation',
    ],
    idealFor:
      'Corporate events, openings, festivals and gatherings of all kinds.',
    startingPrice: 'Price on request',
    whatsappTemplate: 'corporate or other event',
  }),
]

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug)
