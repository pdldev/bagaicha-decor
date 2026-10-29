import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plan your event',
  description:
    'Share your event details and start planning flowers and decor with Bagaicha in Pokhara.',
  alternates: { canonical: '/plan' },
  openGraph: {
    title: 'Plan your event',
    description:
      'Share your event details and start planning flowers and decor with Bagaicha in Pokhara.',
    url: '/plan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plan your event',
    description:
      'Share your event details and start planning flowers and decor with Bagaicha in Pokhara.',
  },
}

export default function PlanLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
