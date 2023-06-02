import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0
  },
  'html': {
    fontSize: '16px'
  },
  'html,body': {
    maxWidth: '100vw',
    overflow: 'hidden'
  }
})
