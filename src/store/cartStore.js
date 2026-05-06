import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add a single product item with size customization
      addItem: (item) => set((state) => {
        const cartId = item.cartId || `${item.id}-${item.size || 'default'}-${Date.now()}`
        const existing = state.items.find(i => i.cartId === cartId)
        if (existing) {
          return {
            items: state.items.map(i =>
              i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i
            )
          }
        }
        return {
          items: [...state.items, {
            ...item,
            cartId,
            quantity: item.quantity || 1,
            customizations: item.customizations || {},
          }]
        }
      }),

      // Add a full room package (multiple items at once)
      addRoomPackage: (roomId, roomName, items) => set((state) => {
        const packageId = `room-${roomId}-${Date.now()}`
        const newItems = items.map(item => ({
          ...item,
          cartId: `${packageId}-${item.id}`,
          roomPackageId: packageId,
          roomName,
          quantity: item.quantity || 1,
          customizations: item.customizations || {},
        }))
        return { items: [...state.items, ...newItems] }
      }),

      removeItem: (cartId) => set((state) => ({
        items: state.items.filter(i => i.cartId !== cartId)
      })),

      updateQuantity: (cartId, quantity) => set((state) => ({
        items: state.items
          .map(i => i.cartId === cartId ? { ...i, quantity } : i)
          .filter(i => i.quantity > 0)
      })),

      // Update size/customization of an item
      updateItemCustomization: (cartId, customizations, newPrice) => set((state) => ({
        items: state.items.map(i =>
          i.cartId === cartId
            ? { ...i, customizations, price: newPrice !== undefined ? newPrice : i.price }
            : i
        )
      })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      },

      getTotalItems: () => {
        const { items } = get()
        return items.reduce((sum, i) => sum + i.quantity, 0)
      },

      getDeliveryFee: () => {
        const total = get().getTotalPrice()
        return total > 20000 ? 0 : 500
      },
    }),
    { name: 'cart-store-v2' }
  )
)
