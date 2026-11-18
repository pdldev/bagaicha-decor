import { site as siteData } from '@/data/site'
export const site = {
  ...siteData,
  name: siteData.name,
  tagline: siteData.tagline,
  phone: siteData.phone,
  whatsapp: siteData.whatsapp,
  email: siteData.email,
  address: siteData.addressText,
  openingHours: siteData.openingHours,
  announcement: siteData.announcement,
  socialLinks: siteData.socialLinks,
  googleMapsEmbed: siteData.googleMapsEmbed,
  googleMapsDirections: siteData.googleMapsDirections,
} as const

export default site

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallary', label: 'Gallery' },
  { href: '/flowers-gifts', label: 'Flowers & Gifts' },
  { href: '/work', label: 'Recent work' },
  { href: '/contact', label: 'Contact' },
] as const
