export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/flowers-gifts', label: 'Flowers & Gifts' },
  { href: '/work', label: 'Recent work' },
  { href: '/plan', label: 'Plan your event' },
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
    instagram: '#',
    facebook: '#',
    tiktok: '#',
  },
  googleMapsEmbed: '',
} as const
