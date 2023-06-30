import DiffTableDemo from '@/components/DiffTableDemo'
import { getEmptyLayout } from '@/components/layouts'
import type { NextPageWithLayout } from './_app'

const DiffTableDemoPage: NextPageWithLayout = () => {
  return (<DiffTableDemo />)
}

DiffTableDemoPage.getLayout = getEmptyLayout

export default DiffTableDemoPage
