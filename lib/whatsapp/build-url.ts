import { env } from '@/config/env'
import { site } from '@/config/site'

const MAX_MESSAGE_LENGTH = 1500
export const whatsappNumber = env.NEXT_PUBLIC_WHATSAPP_NUMBER || site.whatsapp

const normalizedNumber = whatsappNumber.replace(/\D/g, '')

export const buildWhatsAppUrl = (message: string) => {
  const cleanMessage = message
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F\u200B-\u200D\uFEFF]/g, '')
    .trim()
  const clipped =
    cleanMessage.length > MAX_MESSAGE_LENGTH
      ? `${cleanMessage.slice(0, MAX_MESSAGE_LENGTH - 30)}… (message shortened)`
      : cleanMessage
  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(clipped)}`
}
