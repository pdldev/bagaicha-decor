const stripTrailingSlash = (value: string) => value.replace(/\/+$/, '')

export const site = {
  legalName: 'Bagaicha Flower Decor and Events',
  shortName: 'Bagaicha',
  alternateNames: [
    'Bagaicha Flower Decor',
    'Bagaicha Flower Decor & Events',
    'Bagaicha Decor',
  ],
  name: 'Bagaicha Flower Decor and Events',
  tagline: 'Flowers, florals and festive decor in Pokhara',
  url: stripTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://bagaichaevents.com',
  ),
  phones: process.env.NEXT_PUBLIC_PHONE_NUMBER
    ? [process.env.NEXT_PUBLIC_PHONE_NUMBER]
    : [],
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  email: 'hello@bagaichaevents.com',
  address: {
    streetAddress: 'Newroad-8',
    addressLocality: 'Pokhara',
    addressRegion: 'Gandaki Pradesh',
    addressCountry: 'NP',
  },
  addressText: 'Newroad-8, Pokhara, Gandaki Pradesh, Nepal',
  openingHours: 'Sunday–Saturday · 7:00 AM–7:00 PM',
  openingHoursSpecification: 'Su-Sa 07:00-19:00',
  sameAs: [
    'https://www.instagram.com/bagaicha_events/',
    'https://www.facebook.com/p/Bagaicha-Flower-Decor-and-Events-61574610042300/',
    'https://www.tiktok.com/@bagaicha.decor.an/video/7669820661170294036',
    ...(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL
      ? [process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL]
      : []),
  ],
  geo: {
    latitude: process.env.NEXT_PUBLIC_GEO_LATITUDE || '',
    longitude: process.env.NEXT_PUBLIC_GEO_LONGITUDE || '',
  },
  googleMapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || '',
  googleMapsEmbed:
    'https://www.google.com/maps?q=Bagaicha%20Flower%20Decor%20and%20Events%20Pokhara%20Nepal&output=embed',
  googleMapsDirections:
    'https://www.google.com/maps/place/Bagaicha+Flower+Decor+and+Events/@28.2137034,83.9853956,21z/data=!4m6!3m5!1s0x399595004494c103:0x3ee580a9bf868db!8m2!3d28.2136786!4d83.9853726!16s%2Fg%2F11xnw2k0yq?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D',
  socialLinks: {
    instagram: 'https://www.instagram.com/bagaicha_events/',
    facebook:
      'https://www.facebook.com/p/Bagaicha-Flower-Decor-and-Events-61574610042300/',
    tiktok:
      'https://www.tiktok.com/@bagaicha.decor.an/video/7669820661170294036',
  },
  announcement: {
    enabled: false,
    text: 'Bookings for the festive season are open.',
  },
} as const
