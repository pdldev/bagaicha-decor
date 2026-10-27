import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { z } from 'zod'

export type EnquiryItem = {
  id: string
  name: string
  type: string
  price?: number
  qty: number
}
const itemSchema = z.object({
  id: z.string().max(120),
  name: z.string().max(160),
  type: z.string().max(80),
  price: z.number().nonnegative().optional(),
  qty: z.number().int().min(1).max(20),
})
const persistedSchema = z
  .object({
    state: z.object({ items: z.array(itemSchema).max(30) }).passthrough(),
  })
  .passthrough()
const safeStorage = createJSONStorage(() => {
  try {
    return window.localStorage
  } catch {
    return {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
    }
  }
})
const migrate = (persisted: unknown) => {
  const parsed = persistedSchema.safeParse(persisted)
  if (!parsed.success) return { items: [] }
  return {
    items: parsed.data.state.items
      .slice(0, 30)
      .map((item) => ({ ...item, qty: Math.min(20, Math.max(1, item.qty)) })),
  }
}

type EnquiryState = {
  items: EnquiryItem[]
  addItem: (item: Omit<EnquiryItem, 'qty'> & { qty?: number }) => void
  updateQty: (id: string, qty: number) => void
  removeItem: (id: string) => void
  clear: () => void
}

export const useEnquiryStore = create<EnquiryState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.id === item.id)
          if (existing)
            return {
              items: state.items.map((entry) =>
                entry.id === item.id
                  ? { ...entry, qty: Math.min(20, entry.qty + (item.qty ?? 1)) }
                  : entry,
              ),
            }
          return {
            items: [
              ...state.items,
              { ...item, qty: Math.min(20, Math.max(1, item.qty ?? 1)) },
            ],
          }
        }),
      updateQty: (id, qty) =>
        set((state) => ({
          items:
            qty > 0
              ? state.items.map((item) =>
                  item.id === id
                    ? { ...item, qty: Math.min(20, Math.max(1, qty)) }
                    : item,
                )
              : state.items.filter((item) => item.id !== id),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'bagaicha-enquiry',
      storage: safeStorage,
      version: 1,
      migrate,
      partialize: (state) => ({ items: state.items.slice(0, 30) }),
    },
  ),
)
