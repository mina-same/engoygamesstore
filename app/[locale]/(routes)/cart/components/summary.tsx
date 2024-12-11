'use client'

import { Button } from '@/components/ui/button'
import { Currency } from '@/components/ui/currency'
import { useCart } from '@/hooks/use-cart'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslations, useLocale } from 'next-intl'

export const Summary = () => {
  const searchParams = useSearchParams()
  const items = useCart((state) => state.items)
  const removeAll = useCart((state) => state.removeAll)
  const t = useTranslations()  // Use useTranslations hook
  const locale = useLocale()    // Get the current locale (language)

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success(t('orderPlaced'))
      removeAll()
    }

    if (searchParams.get('canceled')) {
      toast.error(t('orderFailed'))
    }
  }, [searchParams, removeAll, t])

  // Calculate total price including quantity
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * (item.quantity || 1) // Multiply by quantity if available
  }, 0)

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      },
    )

    window.location = response.data.url
  }

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      {/* Conditional alignment for Order Summary based on locale */}
      <h2 
        className={`text-lg font-medium text-gray-900 ${locale === 'ar' ? 'text-right' : 'text-left'}`}
      >
        {t('orderSummary')}
      </h2>

      <div className="mt-6 space-y-4">
        <div
          className={`flex items-center justify-between border-t border-gray-200 pt-4 ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <div className="text-base font-medium text-gray-900">{t('orderTotal')}</div>
          <Currency value={totalPrice} />
        </div>
      </div>

      <Button
        disabled={items.length === 0}
        onClick={onCheckout}
        className="w-full mt-6"
      >
        {t('checkout')}
      </Button>
    </div>
  )
}
