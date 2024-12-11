'use client'

import { Container } from '@/components/ui/container'
import { useCart } from '@/hooks/use-cart'
import { useEffect, useState } from 'react'
import { CartItems } from './components/cart-items'
import { Summary } from './components/summary'
import { useTranslations } from 'next-intl'

const CartPageClient = () => {
  const cart = useCart()
  const t = useTranslations('cart')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      cart.removeItem(itemId) // Remove item if quantity is 0
    } else {
      cart.updateItemQuantity(itemId, quantity) // Update the quantity of the item
    }
  }

  if (!isMounted) return null

  return (
    <div className="bg-transparent px-12">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">{t('title')}</h1>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <p className="text-white">{t('emptyMessage')}</p>
              )}

              <ul>
                {cart.items.map((item) => (
                  <CartItems
                    key={item.id}
                    data={item}
                    onQuantityChange={updateQuantity} // Pass the updateQuantity function
                  />
                ))}
              </ul>
            </div>

            <Summary />
          </div>

          {/* Optional: Add a Continue Shopping Button */}
          {cart.items.length === 0 && (
            <div className="mt-8">
              <button
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-bold"
                onClick={() => window.location.href = '/shop'} // Redirect to shop page
              >
                {t('continueShopping')}
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default CartPageClient
