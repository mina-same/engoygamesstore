import { getProduct } from '@/actions/get-product'
import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'
import { Product } from '@/types'
import { ProductList } from '@/components/product-list'

// Dynamically import the CartPageClient to ensure it's client-side rendered
const CartPageClient = dynamic(() => import('./CartPageClient'), {
  ssr: false, // Disable SSR (server-side rendering)
})

const productsIds: string[] = [
  '6713a2ad5deece042c46c43b',
  '6712b865ef2bd5e550f49c89',
  '6712b44def2bd5e550f49c64',
  '671279eeef2bd5e550f49c39',
  '6712755fef2bd5e550f49c1d',
  '6712774bef2bd5e550f49c26',
]

const CartPage = async () => {
  // Fetch products one by one
  const products = await Promise.all(productsIds.map(id => getProduct(id)))

  // Fetch translations for the cart page
  const t = await getTranslations('cart')

  return (
    <div className='py-[100px] bg-gradient-to-bl from-[#7f36b9] via-[#6a3fbf] to-[#625bff]'>
      {/* Call the CartPageClient for client-side rendering */}
      <CartPageClient />

      {/* Render the product carousel with the fetched products */}
      <ProductList items={products} title={t('relatedProducts')} />
    </div>
  )
}

export default CartPage
