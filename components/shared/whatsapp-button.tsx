'use client'

import type { ReactNode } from 'react'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'

type WhatsAppButtonProps = {
  message: string
  variant?: 'primary' | 'outline'
  children: ReactNode
  className?: string
  source?: 'header' | 'hero' | 'product' | 'service' | 'basket' | 'contact'
}

export function WhatsAppButton({
  message,
  variant = 'primary',
  children,
  className,
  source = 'header',
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      onClick={() => trackEvent('whatsapp_click', { source })}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'brand-button-primary inline-flex min-h-11 items-center justify-center rounded-[2px] border px-5 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4',
        variant === 'primary'
          ? 'border-brand-green bg-brand-green text-brand-white hover:bg-brand-green-deep hover:border-brand-green-deep'
          : 'border-ink text-ink hover:bg-ink hover:text-brand-white bg-transparent',
        className,
      )}
    >
      {children}
    </a>
  )
}
