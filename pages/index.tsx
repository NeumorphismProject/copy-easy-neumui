import { getDefaultLayout } from '@/components/layouts'
import type { NextPageWithLayout } from './_app'

const HomePage: NextPageWithLayout = () => {
  return (<p>Home page</p>)
}

HomePage.getLayout = getDefaultLayout

export default HomePage
