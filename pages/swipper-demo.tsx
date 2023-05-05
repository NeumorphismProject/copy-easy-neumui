import SwipperDemo from '@/components/SwipperDemo'
import { getDefaultLayout } from '@/components/layouts'
import type { NextPageWithLayout } from './_app'

const SwipperDemoPage: NextPageWithLayout = () => {
  return (<SwipperDemo />)
}

SwipperDemoPage.getLayout = getDefaultLayout

export default SwipperDemoPage
