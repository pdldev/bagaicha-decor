import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Plan your event',
  description:
    'Share your event details and start planning flowers and decor with Bagaicha in Pokhara.',
  path: '/plan',
})

export default function PlanLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
