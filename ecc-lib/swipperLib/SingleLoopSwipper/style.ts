import styled from 'styled-components'

interface WrapperProps {
  areaHeight:number
}
export const Wrapper = styled('div')<WrapperProps>(({areaHeight})=>({
  width: '100%',
  height: `${areaHeight}px`,
  backgroundColor: 'blue'
}))

export const MoveAreaWrapper = styled.div({
  width: '100%',
  display: 'flex',
  position: 'relative',
})

type MoveItemProps = WrapperProps
export const MoveItem = styled('div')<MoveItemProps>(({areaHeight})=>({
  width: '100%',
  height: `${areaHeight}px`,
  flexShrink: 0
}))

interface MoveItemImgProps {
  first: boolean
  spacing: number
}
export const MoveItemImg = styled('img')<MoveItemImgProps>(({first,spacing})=>({
  width: '100%',
  height: '100%',
  marginLeft: first ? 0 : `${spacing}px`
}))

export const IndicatorWrapper = styled.div({
  position: 'relative',
  top: '-16px',
  display: 'flex',
  justifyContent: 'center'
})

interface StyledIndicatorProps {
  first: boolean
  selected: boolean
}
export const Indicator = styled('div')<StyledIndicatorProps>(({ first,selected }) => ({
  cursor: 'pointer',
  width: '16px',
  height: '6px',
  marginLeft: first ? '0' : '6px',
  backgroundColor: selected ? 'red' : 'gray'
}))
