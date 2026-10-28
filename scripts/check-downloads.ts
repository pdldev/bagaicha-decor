import fs from 'node:fs'
import path from 'node:path'

const projectRoot = path.resolve(process.cwd())
const servicesModulePath = path.join(projectRoot, 'data', 'services.ts')

const servicesSource = fs.readFileSync(servicesModulePath, 'utf8')
const serviceEntries = [...servicesSource.matchAll(/slug:\s*'([^']+)'[\s\S]*?catalogue:\s*\{([\s\S]*?)\n\s*\}/g)]
const allowedCatalogueRoot = '/downloads/catalogue/'

const missing: string[] = []

for (const match of serviceEntries) {
  const [, slug, catalogueBlock] = match
  const fileMatch = catalogueBlock.match(/file:\s*'([^']+)'/)
  const previewMatch = catalogueBlock.match(/preview:\s*'([^']+)'/)

  if (!fileMatch || !previewMatch) {
    continue
  }

  if (!fileMatch[1].startsWith(allowedCatalogueRoot)) {
    missing.push(`${slug} catalogue file must start with ${allowedCatalogueRoot}: ${fileMatch[1]}`)
    continue
  }

  const filePath = path.join(projectRoot, 'public', fileMatch[1].replace(/^\//, ''))
  const previewPath = path.join(projectRoot, 'public', previewMatch[1].replace(/^\//, ''))

  for (const [label, fullPath] of [
    [`${slug} catalogue file`, filePath],
    [`${slug} catalogue preview`, previewPath],
  ] as const) {
    if (!fs.existsSync(fullPath)) {
      missing.push(`${label}: ${fullPath.replace(projectRoot + path.sep, '')}`)
    }
  }
}

if (missing.length > 0) {
  console.error('Missing catalogue assets:')
  for (const item of missing) {
    console.error(`- ${item}`)
  }
  process.exit(1)
}

console.log('All catalogue assets exist.')
