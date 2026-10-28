'use client'

import Image from 'next/image'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { catalogueRequestMessage } from '@/lib/whatsapp/message-templates'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import type { ServiceCatalogue } from '@/types/content'

type CatalogueDownloadCardProps = {
  serviceName: string
  slug: string
  catalogue: ServiceCatalogue
  className?: string
  heading?: string
  primaryLabel?: string
  secondaryLabel?: string
  downloadName?: string
}

export function CatalogueDownloadCard({
  serviceName,
  slug,
  catalogue,
  className,
  heading,
  primaryLabel = 'Download catalogue (PDF)',
  secondaryLabel = 'View in browser',
  downloadName,
}: CatalogueDownloadCardProps) {
  const safeDownloadName =
    downloadName ??
    `bagaicha-${serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-catalogue.pdf`

  return (
    <div className={cn('border-line border bg-background', className)}>
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[120px_1fr]">
        <div className="bg-surface relative aspect-[3/4] overflow-hidden">
          <Image
            src={catalogue.preview}
            alt={`First page of the ${serviceName} catalogue`}
            fill
            className="object-cover"
            sizes="120px"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-[10px] tracking-[.18em] uppercase text-ink/60">
            Catalogue
          </p>
          <h3 className="font-display mt-3 max-w-xs text-3xl leading-none font-light tracking-[-.04em]">
            {heading ?? `See the ${serviceName} designs`}
          </h3>
          <p className="mt-3 text-[10px] tracking-[.14em] uppercase text-ink/60">
            PDF, {catalogue.pages} pages, {catalogue.sizeLabel}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={catalogue.file}
              download={safeDownloadName}
              rel=""
              onClick={() => trackEvent('catalogue_download', { service: slug })}
              className="focus-visible:outline-maroon inline-flex min-h-11 items-center justify-center rounded-[2px] border border-maroon bg-maroon px-5 text-[11px] font-medium tracking-[0.16em] uppercase text-background transition-colors hover:border-ink hover:bg-ink"
            >
              {primaryLabel}
            </a>
            <a
              href={catalogue.file}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:outline-maroon inline-flex min-h-11 items-center justify-center rounded-[2px] border border-ink px-5 text-[11px] font-medium tracking-[0.16em] uppercase text-ink transition-colors hover:bg-ink hover:text-background"
            >
              {secondaryLabel}
            </a>
          </div>

          <p className="mt-4 text-ink/60 text-xs leading-5">
            Tap to download. Ask us for current prices on WhatsApp.
          </p>

          <a
            href={buildWhatsAppUrl(catalogueRequestMessage(serviceName))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-fit items-center border-b border-ink pb-1 text-[10px] tracking-[0.16em] uppercase text-ink transition-colors hover:text-maroon"
          >
            Ask for prices
          </a>
        </div>
      </div>
    </div>
  )
}
