const kathmanduFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kathmandu',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export function getContactOpeningStatus(now = new Date()) {
  const parts = kathmanduFormatter.formatToParts(now)
  const hour = Number(parts.find((part) => part.type === 'hour')?.value)
  const isOpen = hour >= 7 && hour < 19

  return {
    isOpen,
    label: isOpen ? 'Open now' : 'Closed now',
  }
}

export function getKathmanduDate(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kathmandu',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

export function isPastEventDate(date: string, now = new Date()) {
  return date < getKathmanduDate(now)
}
