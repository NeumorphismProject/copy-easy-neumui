
import Navbar from '@/components/Navbar'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'

const LayoutWrapper = styled.div({
  height: '100vh',
  width: '100vw',
  border: '1px solid red'
})

const HeaderWrapper = styled.div({
  border: '1px solid blue'
})

const BodyWrapper = styled.div({

})

const FooterWrapper = styled.div({

})

export default function DefaultLayout({ children }: PropsWithChildren) {
  return <LayoutWrapper>
    <HeaderWrapper><Navbar /></HeaderWrapper>
    <BodyWrapper>{children}</BodyWrapper>
    <FooterWrapper></FooterWrapper>
  </LayoutWrapper>
}