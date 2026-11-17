'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ShoppingBasket,
  Minus,
  Menu,
  MessageCircle,
  Plus,
  Trash2,
  X,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useEnquiryStore } from '@/store/enquiry'
import { basketMessage, buildWhatsAppUrl } from '@/lib/whatsapp'
import { site } from '@/config/site'
import { bouquets, getActiveOffer, gifts } from '@/lib/content'
import { formatOfferPrice, getOfferPrice } from '@/lib/pricing'
import logo from '@/app/logo/images.jpg'

const greeting =
  "Namaste Bagaicha Flower Decor! I'd like to enquire about your decoration services."
const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallary', label: 'Gallery' },
  { href: '/flowers-gifts', label: 'Flowers & Gifts' },
  { href: '/work', label: 'Recent work' },
  { href: '/contact', label: 'Contact' },
]

const whatsappUrl = buildWhatsAppUrl

function Brand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="Bagaicha home"
    >
      <Image
        src={logo}
        alt=""
        aria-hidden="true"
        priority
        className="size-11 rounded-full object-cover"
      />
      <span>
        <span className="font-display block text-[26px] leading-none tracking-tight">
          Bagaicha
        </span>
        <span className="text-ink/55 mt-1 block text-[8px] tracking-[.16em] uppercase">
          Flower Decor &amp; Events
        </span>
      </span>
    </Link>
  )
}

function EnquiryBasket() {
  const { items, updateQty, removeItem } = useEnquiryStore()
  const activeOffer = getActiveOffer(new Date())
  const products = [...bouquets, ...gifts]
  const resolvedItems = items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id)
    if (!product) return []
    return [
      {
        ...item,
        name: product.name,
        type: product.category,
        price: getOfferPrice(product, activeOffer),
      },
    ]
  })
  const count = items.reduce((total, item) => total + item.qty, 0)
  const message = basketMessage(
    resolvedItems.map((item) => ({ ...item, offer: activeOffer })),
  )
  return (
    <Sheet>
      <SheetTrigger
        render={
          <button
            aria-label={`Open enquiry basket with ${count} items`}
            className="text-ink hover:bg-surface relative rounded-full p-2 transition-colors"
          >
            <ShoppingBasket className="size-5" />
            {count > 0 && (
              <span className="bg-maroon text-background absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-[9px]">
                {count}
              </span>
            )}
          </button>
        }
      />
      <SheetContent side="right" className="border-line bg-background">
        <SheetHeader>
          <SheetTitle className="font-display text-4xl font-normal">
            Your enquiry
          </SheetTitle>
          <SheetDescription className="text-ink/60">
            A little list of things you&apos;d like to ask us about.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-6">
          {resolvedItems.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <ShoppingBasket
                className="text-marigold-contrast mb-4 size-8"
                strokeWidth={1}
              />
              <p className="font-display text-2xl">Your basket is waiting.</p>
              <p className="text-ink/60 mt-2 max-w-xs text-sm leading-6">
                Add flowers, gifts or a service to start a conversation with us.
              </p>
            </div>
          ) : (
            resolvedItems.map((item) => (
              <div key={item.id} className="border-line border-b pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl">{item.name}</p>
                    <p className="text-ink/50 text-xs tracking-[.16em] uppercase">
                      {item.type} · {formatOfferPrice(item.price, activeOffer)}
                    </p>
                  </div>
                  <button
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeItem(item.id)}
                    className="text-ink/40 hover:text-maroon"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    aria-label={`Decrease ${item.name}`}
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="border-line rounded-full border p-1"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="min-w-5 text-center text-sm">
                    {item.qty}
                  </span>
                  <button
                    aria-label={`Increase ${item.name}`}
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="border-line rounded-full border p-1"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="border-line border-t p-6">
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noreferrer"
              className="bg-maroon text-background flex w-full items-center justify-center gap-2 rounded-[2px] px-5 py-3 text-sm transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="size-4" />
              Send enquiry on WhatsApp
            </a>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <button aria-label="Open menu" className="rounded-full p-2 lg:hidden">
            <Menu className="size-6" />
          </button>
        }
      />
      <SheetContent
        side="left"
        className="border-line bg-background flex w-full flex-col"
      >
        <SheetHeader>
          <div className="flex items-center justify-between">
            <Brand />
            <SheetClose
              render={
                <button aria-label="Close menu" className="rounded-full p-2">
                  <X className="size-5" />
                </button>
              }
            />
          </div>
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Main site navigation
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-5 px-6 py-10">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-4xl"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto p-6">
          <a
            href={whatsappUrl(greeting)}
            target="_blank"
            rel="noreferrer"
            className="bg-maroon text-background flex w-full items-center justify-center gap-2 rounded-[2px] px-5 py-3 text-sm"
          >
            <MessageCircle className="size-4" />
            Book on WhatsApp
          </a>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      className={`bg-background fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-out ${scrolled ? 'border-line border-b' : ''}`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <MobileMenu />
          <Brand />
        </div>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`hover:text-brand-green relative py-2 text-[11px] tracking-[.16em] uppercase transition-colors duration-300 ease-out ${pathname === link.href ? 'text-brand-green after:bg-brand-green after:absolute after:inset-x-0 after:-bottom-1 after:h-px' : 'text-ink/70'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl(greeting)}
            target="_blank"
            rel="noreferrer"
            className="border-ink text-ink hover:bg-ink hover:text-background hidden items-center gap-2 rounded-[2px] border px-4 py-2 text-[10px] tracking-[.12em] uppercase transition-colors sm:flex"
          >
            <MessageCircle className="size-3.5" />
            Book on WhatsApp
          </a>
          <EnquiryBasket />
        </div>
      </div>
    </header>
  )
}

function PetalLine() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 40"
      className="text-background/20 h-8 w-56"
    >
      <path
        d="M3 20c38-14 55 14 92 0s54-14 91 0 54 14 111 0M52 18c-4-9 5-14 10-7 5-7 14-2 10 7-5 8-15 8-20 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer className="section-brand-deep">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-5xl leading-[.95] sm:text-6xl">
              Let&apos;s make your day bloom.
            </p>
            <p className="font-display text-background/70 mt-3 text-lg">
              बगैँचा
            </p>
            <PetalLine />
          </div>
          <div>
            <p className="text-brand-gold mb-5 text-[10px] tracking-[.2em] uppercase">
              Quick links
            </p>
            <div className="text-background/75 flex flex-col gap-3 text-sm">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-background"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-brand-gold mb-5 text-[10px] tracking-[.2em] uppercase">
              Services
            </p>
            <div className="text-background/75 flex flex-col gap-3 text-sm">
              <span>Wedding decor</span>
              <span>Event styling</span>
              <span>Floral bouquets</span>
              <span>Gift hampers</span>
            </div>
          </div>
          <div>
            <p className="text-brand-gold mb-5 text-[10px] tracking-[.2em] uppercase">
              Contact
            </p>
            <div className="text-background/75 flex flex-col gap-3 text-sm">
              <span>Pokhara, Nepal</span>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              <a href={whatsappUrl(greeting)}>WhatsApp us</a>
              <span>{site.openingHours}</span>
            </div>
          </div>
        </div>
        <div className="rule-gold mt-16" />
        <div className="text-background/70 mt-5 flex flex-col justify-between gap-3 pt-5 text-[10px] tracking-[.15em] uppercase sm:flex-row">
          <span>
            © {new Date().getFullYear()} Bagaicha Flower Decor and Events
          </span>
          <span>Pokhara, Nepal</span>
          <div className="flex flex-wrap gap-4">
            {Object.entries(site.socialLinks).map(([name, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-background"
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </a>
            ))}
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(greeting)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group bg-brand-green text-brand-white hover:bg-brand-green-deep fixed right-5 bottom-[calc(1.25rem_+_env(safe-area-inset-bottom))] z-30 flex size-14 items-center justify-center rounded-full transition-all duration-300 ease-out hover:-translate-y-1"
    >
      <MessageCircle className="size-6" />
      <span className="bg-ink text-background pointer-events-none absolute right-full mr-3 hidden rounded-full px-3 py-1.5 text-xs whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100 sm:block">
        Chat with us
      </span>
    </a>
  )
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {site.announcement.enabled && (
        <div className="border-line bg-background text-brand-green border-b px-4 py-2 text-center text-xs tracking-wide">
          {site.announcement.text}
        </div>
      )}
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  )
}
