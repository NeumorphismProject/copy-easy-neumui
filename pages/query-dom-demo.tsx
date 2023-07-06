import QueryDomDemo from '@/components/QueryDomDemo'
import { getEmptyLayout } from '@/components/layouts'
import { useEffect, useState } from 'react'
import type { NextPageWithLayout } from './_app'

const QueryDomDemoPage: NextPageWithLayout = () => {
  const [demoName, setDemoName] = useState<string>('')

  useEffect(()=>{
    setDemoName('Query Dom Demo')
  },[])

  return (<QueryDomDemo demoName={demoName}></QueryDomDemo>)
}

QueryDomDemoPage.getLayout = getEmptyLayout

export default QueryDomDemoPage
