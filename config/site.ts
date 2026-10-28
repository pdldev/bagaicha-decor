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
  phone: '+977 98XXXXXXXX',
  whatsapp: '97798XXXXXXXX',
  email: 'hello@bagaichaevents.com',
  address: 'Pokhara, Gandaki Pradesh, Nepal',
  openingHours: 'Sunday–Saturday · 9:00 AM–7:00 PM',
  announcement: {
    enabled: false,
    text: 'Bookings for the festive season are open.',
  },
  socialLinks: {
    instagram: 'https://www.instagram.com/bagaicha_events/',
    facebook:
      'https://www.facebook.com/p/Bagaicha-Flower-Decor-and-Events-61574610042300/',
    tiktok: 'https://www.tiktok.com/@bagaicha.decor.an/video/7669820661170294036',
  },
  googleMapsEmbed:
    'https://www.google.com/maps?q=Bagaicha%20Flower%20Decor%20and%20Events%20Pokhara%20Nepal&output=embed',
} as const
