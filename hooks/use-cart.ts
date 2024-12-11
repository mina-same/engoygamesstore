import { toast } from 'react-hot-toast'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Product } from '@/types'

interface CartStore {
  items: Product[]
  addItem: (data: Product) => void
  removeItem: (id: string) => void
  removeAll: () => void
  updateItemQuantity: (id: string, quantity: number) => void
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === data.id)

        if (existingItem) {
          // Increase the quantity by 1 if the item already exists in the cart
          set({
            items: currentItems.map((item) =>
              item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          })
          toast.success('Item quantity increased.')
        } else {
          // Add new item with quantity 1 by default
          set({ items: [...get().items, { ...data, quantity: 1 }] })
          toast.success('Item added to cart.')
        }
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) })
        toast.success('Item removed from cart.')
      },
      removeAll: () => set({ items: [] }),
      updateItemQuantity: (id: string, quantity: number) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity: quantity } : item
          ),
        })
        toast.success('Item quantity updated.')
      },
    }),
    {
      name: 'cart-storage', // Name of the persisted store
      storage: createJSONStorage(() => localStorage), // LocalStorage to persist data
    }
  )
)
