import React from 'react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import OfferPopup from '@/components/shared/offer-popup'

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement('img', props),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

vi.mock('@/data/services', () => ({ services: [] }))

function advancePopupDelay() {
  act(() => {
    vi.advanceTimersByTime(3000)
  })
}

describe('festival offer popup', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-11-02T12:00:00.000Z'))
    sessionStorage.clear()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('does not render when there is no active offer', () => {
    vi.setSystemTime(new Date('2027-01-01T00:00:00.000Z'))
    render(<OfferPopup />)
    advancePopupDelay()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows once per session and links to the validated offer', () => {
    const firstRender = render(<OfferPopup />)
    advancePopupDelay()

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(sessionStorage.getItem('bagaicha-offer-seen-tihar-2083')).toBe('1')
    expect(screen.getByRole('link', { name: 'Shop now' })).toHaveAttribute(
      'href',
      '/flowers-gifts?offer=tihar-2083',
    )

    firstRender.unmount()
    render(<OfferPopup />)
    advancePopupDelay()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes with Maybe later', () => {
    render(<OfferPopup />)
    advancePopupDelay()
    fireEvent.click(screen.getByRole('button', { name: 'Maybe later' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
