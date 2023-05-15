import SwipperLoopDemo from '@/components/SwipperLoopDemo'
import { getDefaultLayout } from '@/components/layouts'
import type { NextPageWithLayout } from './_app'

const SwipperLoopDemoPage: NextPageWithLayout = () => {
  return (<SwipperLoopDemo />)
}

SwipperLoopDemoPage.getLayout = getDefaultLayout

export default SwipperLoopDemoPage
