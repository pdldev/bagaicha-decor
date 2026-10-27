export type ServiceCategory =
  'Weddings' | 'Family Rituals' | 'Celebrations' | 'Vehicles'

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
}

const images = [
  '/placeholder.jpg',
  '/placeholder.jpg',
  '/placeholder.jpg',
  '/placeholder.jpg',
  '/placeholder.jpg',
  '/placeholder.jpg',
]

const make = (service: Omit<Service, 'gallery'>): Service => ({
  ...service,
  gallery: images,
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
    heroImage: '/placeholder.jpg',
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
  }),
  make({
    slug: 'wedding-reception',
    name: 'Wedding Reception',
    category: 'Weddings',
    shortDescription: 'A reception that carries your story into the evening.',
    longDescription:
      'We turn reception halls, gardens and lakeside spaces into a considered setting for dinner, dancing and all the toasts in between. Expect layered flowers, light and small details that make the room feel special.',
    heroImage: '/placeholder.jpg',
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
  }),
  make({
    slug: 'pasni-annaprashan',
    name: 'Pasni (Annaprashan)',
    category: 'Family Rituals',
    shortDescription:
      'A gentle, joyful setting for baby’s first rice-feeding ceremony.',
    longDescription:
      'Pasni is a beautiful family milestone. We bring a soft, celebratory touch to the traditional Annaprashan with fresh flowers, a welcoming backdrop and room for every blessing and photograph.',
    heroImage: '/placeholder.jpg',
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
  }),
  make({
    slug: 'bratabandha',
    name: 'Bratabandha',
    category: 'Family Rituals',
    shortDescription:
      'Honouring the sacred thread ceremony with grace and colour.',
    longDescription:
      'For Bratabandha, we create a respectful setting that holds the ceremony at its centre. Warm florals, traditional colour and thoughtful guest details make the day feel both rooted and welcoming.',
    heroImage: '/placeholder.jpg',
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
  make({
    slug: 'haldi-mehendi',
    name: 'Haldi & Mehendi',
    category: 'Weddings',
    shortDescription: 'Sunshine, marigolds and a little more joy in the room.',
    longDescription:
      'Haldi and Mehendi should feel relaxed, colourful and full of movement. We build playful floral corners and practical guest spaces that look lovely in the photos and let the rituals unfold naturally.',
    heroImage: '/placeholder.jpg',
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
  make({
    slug: 'birthday-decoration',
    name: 'Birthday Decoration',
    category: 'Celebrations',
    shortDescription: 'A party backdrop made for your favourite person.',
    longDescription:
      'Whether it is a first birthday or a milestone year, we make the celebration feel personal. Tell us the mood, colours and little things they love; we will make the room sing.',
    heroImage: '/placeholder.jpg',
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
  }),
  make({
    slug: 'car-decoration',
    name: 'Car Decoration',
    category: 'Vehicles',
    shortDescription: 'A beautiful send-off for the road ahead.',
    longDescription:
      'From the wedding car to the family vehicle carrying a new couple home, we use fresh flowers and a light hand to make the journey feel ceremonial without compromising the car.',
    heroImage: '/placeholder.jpg',
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
  make({
    slug: 'anniversary-engagement',
    name: 'Anniversary & Engagement',
    category: 'Celebrations',
    shortDescription: 'Mark the years, the yes, and everything still to come.',
    longDescription:
      'For engagements and anniversaries, we create intimate floral moments with a little romance and a lot of personality. A dinner table, proposal corner or room can be transformed with the right blooms.',
    heroImage: '/placeholder.jpg',
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
  make({
    slug: 'baby-shower-welcome',
    name: 'Baby Shower & Welcome',
    category: 'Family Rituals',
    shortDescription: 'A tender welcome for the newest little love.',
    longDescription:
      'We make baby showers and welcome ceremonies feel soft, bright and full of anticipation. From a small home gathering to a larger family lunch, every detail can be made photo-ready and meaningful.',
    heroImage: '/placeholder.jpg',
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
