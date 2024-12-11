'use client'

import { formatter } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

interface CurrencyProps {
  value: string | number
  currencySymbol?: string // Optional prop for custom currency symbol
  fontSize?: string // Optional prop for font size
  color?: string // Optional prop for text color
  className?: string // Optional prop for additional custom classes
}

export const Currency: React.FC<CurrencyProps> = ({
  value,
  currencySymbol, // Default will be handled dynamically below
  fontSize = 'text-base', // Default font size (valid Tailwind class)
  color = 'text-black', // Default text color (valid Tailwind class)
  className = '' // Default empty class
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const locale = useLocale() // Get the current locale

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  // Determine the currency symbol dynamically if not provided
  const defaultCurrencySymbol = locale === 'ar' ? 'د.إ' : 'SAR'
  const finalCurrencySymbol = currencySymbol || defaultCurrencySymbol

  // Ensure value is a number or can be parsed as a number
  const numericValue = typeof value === 'number' ? value : parseFloat(value as string)
  if (isNaN(numericValue)) return <div className="text-red-500">Invalid Value</div>

  // Format the value using the formatter utility
  const formattedValue = formatter.format(numericValue)

  // If the formatted value already contains a symbol (like $), remove it, and add the custom symbol
  const cleanedValue = formattedValue.replace(/[^0-9.,]/g, '')

  return (
    <div className={`${fontSize} ${color} font-semibold ${className} text-2xl`}>
      <p className='inline'>{finalCurrencySymbol}</p> {cleanedValue} {/* Value appears first, followed by the symbol */}
    </div>
  )
}
