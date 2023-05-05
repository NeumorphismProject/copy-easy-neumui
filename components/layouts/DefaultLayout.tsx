
import Navbar from '@/components/Navbar'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'

const LayoutWrapper = styled.div({
  width: '100vw',
  height: '100vh',
  border: '1px solid red',
  display: 'flex',
  flexDirection: 'column'
})

const HeaderWrapper = styled.div({
  border: '1px solid blue'
})

const BodyWrapper = styled.div({
  width: '100%',
  flex: '1',
  // overflow: 'auto'
})

const FooterWrapper = styled.div({
  width: '100%',
  height: '50px',
  backgroundColor: 'green'
})

export default function DefaultLayout({ children }: PropsWithChildren) {
  return <LayoutWrapper>
    <HeaderWrapper><Navbar /></HeaderWrapper>
    <BodyWrapper>{children}</BodyWrapper>
    <FooterWrapper></FooterWrapper>
  </LayoutWrapper>
}
