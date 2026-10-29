'use client'

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
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { site } from '@/config/site'

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

function Mark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 24"
      className="text-marigold-contrast size-7"
    >
      <path
        d="M14 12C5 13 3 6 7 3c4 0 7 3 7 9Zm0 0c9 1 11-6 7-9-4 0-7 3-7 9Zm0 0c0 7-5 9-8 6 0-4 3-6 8-6Zm0 0c0 7 5 9 8 6 0-4-3-6-8-6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M14 12v9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function Brand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="Bagaicha home"
    >
      <Mark />
      <span>
        <span className="font-display block text-3xl leading-none tracking-tight">
          Bagaicha
        </span>
        <span className="text-ink/55 mt-1 block text-[8px] tracking-[.2em] uppercase">
          Flower Decor &amp; Events{' '}
          <span className="font-display ml-1 text-[11px] tracking-normal normal-case">
            बगैँचा
          </span>
        </span>
      </span>
    </Link>
  )
}

function EnquiryBasket() {
  const { items, updateQty, removeItem } = useEnquiryStore()
  const count = items.reduce((total, item) => total + item.qty, 0)
  const message = `Namaste Bagaicha Flower Decor! I'd like to enquire about:\n${items.map((item, index) => `${index + 1}. ${item.name} x ${item.qty}${item.price ? ` - Rs. ${item.price}` : ''}`).join('\n')}\nPlease let me know availability and delivery details. Thank you!`
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
          {items.length === 0 ? (
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
            items.map((item) => (
              <div key={item.id} className="border-line border-b pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl">{item.name}</p>
                    <p className="text-ink/50 text-xs tracking-[.16em] uppercase">
                      {item.type}
                      {item.price ? ` · Rs. ${item.price}` : ''}
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
              className="bg-maroon text-background flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm transition-transform hover:-translate-y-0.5"
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
            className="bg-maroon text-background flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm"
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
      className={`bg-background/95 fixed inset-x-0 top-0 z-40 backdrop-blur-sm transition-all duration-500 ease-out ${scrolled ? 'border-line border-b shadow-[0_10px_30px_rgba(42,33,28,0.06)]' : ''}`}
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
              className={`hover:text-maroon relative py-2 text-[11px] tracking-[.16em] uppercase transition-all duration-300 ease-out ${pathname === link.href ? 'text-maroon after:bg-marigold after:absolute after:inset-x-0 after:-bottom-1 after:h-px' : 'text-ink/70'}`}
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
            className="border-maroon text-maroon hover:bg-maroon hover:text-background hidden items-center gap-2 rounded-full border px-4 py-2 text-[10px] tracking-[.12em] uppercase transition-colors sm:flex"
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
    <footer className="bg-sage text-background">
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
            <p className="text-background/55 mb-5 text-[10px] tracking-[.2em] uppercase">
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
            <p className="text-background/55 mb-5 text-[10px] tracking-[.2em] uppercase">
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
            <p className="text-background/55 mb-5 text-[10px] tracking-[.2em] uppercase">
              Contact
            </p>
            <div className="text-background/75 flex flex-col gap-3 text-sm">
              <span>Pokhara, Nepal</span>
              <a href="tel:+9779800000000">+977 980 000 0000</a>
              <a href={whatsappUrl(greeting)}>WhatsApp us</a>
              <span>Sun–Fri · 9am–6pm</span>
            </div>
          </div>
        </div>
        <div className="border-background/20 text-background/50 mt-16 flex flex-col justify-between gap-3 border-t pt-5 text-[10px] tracking-[.15em] uppercase sm:flex-row">
          <span>
            © {new Date().getFullYear()} Bagaicha Flower Decor and Events
          </span>
          <span>Pokhara, Nepal</span>
          <div className="flex flex-wrap gap-4">
            <span>Instagram · Facebook</span>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new Event('bagaicha:open-privacy-choices'))
              }
            >
              Privacy choices
            </button>
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
      className="group bg-maroon text-background fixed right-5 bottom-5 z-30 flex size-14 items-center justify-center rounded-full shadow-[0_12px_30px_rgba(123,45,59,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(123,45,59,0.32)]"
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
        <div className="bg-marigold text-ink px-4 py-2 text-center text-xs tracking-wide">
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
