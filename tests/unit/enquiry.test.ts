import { beforeEach, describe, expect, it } from 'vitest'
import { useEnquiryStore } from '@/store/enquiry'

beforeEach(() => {
  localStorage.clear()
  useEnquiryStore.setState({ items: [] })
})

describe('enquiry store', () => {
  it('adds, increments, removes, and clamps quantities', () => {
    useEnquiryStore.getState().addItem({ id: '1' })
    useEnquiryStore.getState().addItem({ id: '1', qty: 2 })
    expect(useEnquiryStore.getState().items[0].qty).toBe(3)
    expect(useEnquiryStore.getState().items[0]).toEqual({ id: '1', qty: 3 })
    useEnquiryStore.getState().updateQty('1', 99)
    expect(useEnquiryStore.getState().items[0].qty).toBe(20)
    useEnquiryStore.getState().removeItem('1')
    expect(useEnquiryStore.getState().items).toHaveLength(0)
  })
  it('clears corrupt persisted data on reload', () => {
    localStorage.setItem('bagaicha-enquiry', '{bad')
    expect(() => useEnquiryStore.persist.rehydrate()).not.toThrow()
  })
  it('persists only product IDs and quantities', () => {
    useEnquiryStore.getState().addItem({ id: 'marigold-mala', qty: 2 })
    const persisted = JSON.parse(
      localStorage.getItem('bagaicha-enquiry') ?? 'null',
    ) as { state: { items: unknown[] } }
    expect(persisted.state.items).toEqual([{ id: 'marigold-mala', qty: 2 }])
  })
})
