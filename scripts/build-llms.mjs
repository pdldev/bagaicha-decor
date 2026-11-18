import { readFileSync, writeFileSync } from 'node:fs'

const siteSource = readFileSync(
  new URL('../data/site.ts', import.meta.url),
  'utf8',
)
const source = readFileSync(
  new URL('../data/services.ts', import.meta.url),
  'utf8',
)
const serviceNames = [...source.matchAll(/name:\s*'([^']+)'/g)].map(
  (match) => match[1],
)
const pickString = (key) => {
  const match = siteSource.match(new RegExp(`${key}:\\s*'([^']+)'`))
  return match?.[1] || ''
}
const legalName = pickString('legalName')
const alternateNames = [
  ...(siteSource
    .match(/alternateNames:\s*\[([\s\S]*?)\]/)?.[1]
    .matchAll(/'([^']+)'/g) || []),
].map((match) => match[1])
const url = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://bagaichaevents.com'
).replace(/\/+$/, '')
const address = 'Newroad-8, Pokhara, Gandaki Pradesh, Nepal'
const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || ''
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
const hours = 'Sunday–Saturday · 7:00 AM–7:00 PM'

const mainPages = [
  ['Home', '/', 'Flowers and event decor in Pokhara'],
  ['About', '/about', 'The Bagaicha studio and service area'],
  [
    'Services',
    '/services',
    'Wedding, family ritual and celebration decoration',
  ],
  ['Gallery', '/gallary', 'Photos of decorated events'],
  [
    'Flowers & Gifts',
    '/flowers-gifts',
    'Bouquets and gifts available in Pokhara',
  ],
  [
    'Recent Work',
    '/work',
    'Selected wedding and family celebration case studies',
  ],
  ['Catalogue', '/catalogue', 'The Bagaicha design catalogue'],
  ['Contact', '/contact', 'Phone, WhatsApp, address and FAQ'],
]

const description = `${legalName} provides flower decor and event styling for celebrations in Pokhara. Services include weddings, family rituals and intimate or corporate events.`
const phoneLine = phone ? `Phone: ${phone}\n` : ''
const whatsappLine = whatsapp ? `WhatsApp: ${whatsapp}\n` : ''

const content = `# ${legalName}

## Alternate names
${alternateNames.join(', ')}

## Description
${description}

## Address
${address}

${phoneLine}${whatsappLine}## Opening hours
${hours}

## Services
${serviceNames.map((name) => `- ${name}`).join('\n')}

## Main pages
${mainPages.map(([name, path, summary]) => `- [${name}](${url}${path}): ${summary}`).join('\n')}

## Contact
Use the contact page at ${url}/contact for WhatsApp, phone and enquiry details.
`

writeFileSync(new URL('../public/llms.txt', import.meta.url), content)
