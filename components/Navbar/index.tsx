import styled from 'styled-components'
import EyeKakashi from "./Eyes/EyeKakashi"
import EyeTriple from "./Eyes/EyeTriple"
import Search from './Search'

const Wrapper = styled.div({
  backgroundColor: 'rgba(155,100,80,0.5)',
  display: "flex",
  justifyContent: 'space-between'
})

const SearchWrapper = styled.div({
})

export default function Navbar() {
  return <Wrapper>
      <EyeTriple />
      <SearchWrapper><Search /></SearchWrapper>
      <EyeKakashi />
  </Wrapper>
}