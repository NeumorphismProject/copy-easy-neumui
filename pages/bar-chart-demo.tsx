import BarChartDemo from "@/components/chartsDemo/BarChartDemo"
import { getDefaultLayout } from '@/components/layouts'
import type { NextPageWithLayout } from './_app'

const BarChartDemooPage: NextPageWithLayout = () => {
  return (<BarChartDemo />)
}

BarChartDemooPage.getLayout = getDefaultLayout

export default BarChartDemooPage
