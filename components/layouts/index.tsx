import type { ReactElement } from 'react'
import DefaultLayout from './DefaultLayout'

function getDefaultLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export {
  DefaultLayout,
  getDefaultLayout
}

