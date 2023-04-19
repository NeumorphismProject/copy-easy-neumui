import DefaultLayout from '@/components/layouts/default'
import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (<p>Home page</p>)
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default Home
