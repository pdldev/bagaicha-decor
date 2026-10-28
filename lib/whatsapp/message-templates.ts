import type { Bouquet, EnquiryItem, Gift, Service } from '@/types/content'

export function greetingMessage() {
  return "Namaste! I'd like to know more about Bagaicha Flower Decor and Events."
}

export function serviceBookingMessage(service: Pick<Service, 'name'>) {
  return `Namaste! I'd like to enquire about ${service.name}.`
}

export function productOrderMessage(product: Pick<Bouquet | Gift, 'name'>) {
  return `Namaste! I'd like to order ${product.name}.`
}

export function basketMessage(items: EnquiryItem[]) {
  return `Namaste! I'd like to enquire about:\n${items
    .map(
      (item) =>
        `- ${item.name} x${item.qty}${item.price ? ` (Rs. ${item.price})` : ''}`,
    )
    .join('\n')}`
}

export function catalogueRequestMessage(serviceName: string) {
  return `Namaste Bagaicha! I've downloaded the ${serviceName} catalogue. Could you share current prices and availability for my date?`
}

export function contactFormMessage(input: {
  name: string
  phone: string
  eventType: string
  message: string
}) {
  return `Namaste! I'm ${input.name}. I'd like to enquire about ${input.eventType}.\nPhone: ${input.phone}\n${input.message}`
}

export const whatsappMessages = {
  greeting: greetingMessage,
  serviceBooking: serviceBookingMessage,
  productOrder: productOrderMessage,
  basket: basketMessage,
  catalogueRequest: catalogueRequestMessage,
  contactForm: contactFormMessage,
}
