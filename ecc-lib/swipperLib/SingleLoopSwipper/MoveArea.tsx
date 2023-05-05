import type { CSSProperties, RefObject } from 'react'
import { forwardRef } from 'react'
import {
  MoveAreaWrapper,
  MoveItem,
  MoveItemImg
} from './style'

export interface ContentProps {
  list: Array<any>
  rootStyle: CSSProperties
  height: number
  itemSpacing: number
}

function MoveArea({ list, rootStyle, height, itemSpacing }: ContentProps,
  ref: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined) {

  return (<MoveAreaWrapper
    ref={ref}
    style={rootStyle} >
    {(list.length > 0) && list.map((item, index) => (<MoveItem key={`swpitem_${item.unikey}`} areaHeight={height}>
      <MoveItemImg src={item.imgUrl} alt="img" draggable={false}
        first={index === 0} spacing={itemSpacing} />
    </MoveItem>))}
  </MoveAreaWrapper>)
}

export default forwardRef(MoveArea)
