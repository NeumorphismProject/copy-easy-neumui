import SearchIconSvg from '@/assets/svgs/search.svg'
import styled from 'styled-components'

const Wrapper = styled.div({
  backgroundColor: '#FFFFFF',
  marginTop: '8px',
  padding: '4px 8px',
  boxShadow: '1px 1px 1px 1px rgba(145, 145, 145, 0.5)',
  borderRadius: '8px',
  display: 'flex'
})

const InputWrapper = styled.div({
  padding: '4px 8px 2px 8px',
  borderBottom: '1px solid rgba(145,145,145,0.5)',
  transition: '.5s border-color',
  ':hover': {
    borderColor: '#600'
  }
})

const InputEx = styled.input({
  fontSize: '26px',
  border: 'none',
  outline: 'none',
  color: 'rgba(145,65,165,0.6)',
  transition: '.5s color',
  ':focus': {
    color: 'rgba(0,0,0,1)'
  },
}) as any

const SearchIconWrapper = styled.div({
  cursor: 'pointer',
  marginLeft: '8px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: '.5s background-color',
  ':hover': {
    backgroundColor: 'rgba(145, 145, 145, 0.2)',
    'svg': {
      fill: '#600'
    }
  }
})

export default function Search() {
  return <Wrapper>
    <InputWrapper>
      <InputEx type='input' />
    </InputWrapper>
    <SearchIconWrapper>
      <SearchIconSvg />
    </SearchIconWrapper>
  </Wrapper>
}