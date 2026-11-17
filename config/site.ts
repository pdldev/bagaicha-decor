export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallary', label: 'Gallery' },
  { href: '/flowers-gifts', label: 'Flowers & Gifts' },
  { href: '/work', label: 'Recent work' },
  { href: '/contact', label: 'Contact' },
] as const

export const site = {
  name: 'Bagaicha Flower Decor and Events',
  tagline: 'Flowers, florals and festive decor in Pokhara',
  phone: '+977 9869552940',
  whatsapp: '9779869552940',
  email: 'hello@bagaichaevents.com',
  address: 'Pokhara, Gandaki Pradesh, Nepal',
  openingHours: 'Sunday–Saturday · 7:00 AM–7:00 PM',
  announcement: {
    enabled: false,
    text: 'Bookings for the festive season are open.',
  },
  socialLinks: {
    instagram: 'https://www.instagram.com/bagaicha_events/',
    facebook:
      'https://www.facebook.com/p/Bagaicha-Flower-Decor-and-Events-61574610042300/',
    tiktok:
      'https://www.tiktok.com/@bagaicha.decor.an/video/7669820661170294036',
  },
  googleMapsEmbed:
    'https://www.google.com/maps?q=Bagaicha%20Flower%20Decor%20and%20Events%20Pokhara%20Nepal&output=embed',
  googleMapsDirections:
    'https://www.google.com/maps/place/Bagaicha+Flower+Decor+and+Events/@28.2137034,83.9853956,21z/data=!4m6!3m5!1s0x399595004494c103:0x3ee580a9bf868db!8m2!3d28.2136786!4d83.9853726!16s%2Fg%2F11xnw2k0yq?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D',
} as const
