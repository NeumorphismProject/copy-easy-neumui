import { PropsWithChildren } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div({
  transform: 'scale(0.15) translate(-210%, -210%)',
  width: '60px',
  height: '60px'
})

export default function EyeWrapper({children}:PropsWithChildren){
  return <Wrapper>{children}</Wrapper>
}