import styled from 'styled-components'
import EyeKakashi from "./Eyes/EyeKakashi"
import EyeTriple from "./Eyes/EyeTriple"

const Wrapper = styled.div({
  display: "flex",
  justifyContent: 'space-between'
})

const EyeWrapper = styled.div({
})

export default function Navbar(){
  return <Wrapper>
    <EyeWrapper><EyeTriple /></EyeWrapper>
    <EyeWrapper><EyeKakashi /></EyeWrapper>
  </Wrapper>
}