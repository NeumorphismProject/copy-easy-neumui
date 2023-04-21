import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0
  },
  'html,body': {
    maxWidth: '100vw',
    overflowX: 'hidden'
  }
})