import type { ReactElement } from 'react'
import DefaultLayout from './DefaultLayout'
import EmptyLayout from './EmptyLayout'

function getDefaultLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

function getEmptyLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>
}

export {
  getDefaultLayout,
  getEmptyLayout
}

