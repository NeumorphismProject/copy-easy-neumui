import { getEmptyLayout } from '@/components/layouts'
import { useRouter } from 'next/router'
import type { NextPageWithLayout } from './_app'

const NextToQueryDomDemoPage: NextPageWithLayout = () => {
  const route = useRouter()
  const handleClick = () => {
    // nextjs 跳转到 query-dom-demo 路由
    route.push('/query-dom-demo')
  }

  return (<div>
    <button onClick={handleClick}>NextToQueryDomDemoPage</button>
  </div>)
}

NextToQueryDomDemoPage.getLayout = getEmptyLayout

export default NextToQueryDomDemoPage
