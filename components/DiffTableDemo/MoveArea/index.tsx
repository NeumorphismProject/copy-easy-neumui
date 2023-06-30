import type { CSSProperties, PropsWithChildren, RefObject } from 'react'
import { forwardRef } from 'react'
import {
  MoveAreaWrapper,
  MoveItem
} from './style'

export interface ContentProps extends PropsWithChildren {
  list: Array<any>
  rootStyle: CSSProperties
  itemSpacing: number
}

function MoveArea({ list, rootStyle, itemSpacing, children }: ContentProps,
  ref: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined) {

  return (<MoveAreaWrapper
    ref={ref}
    style={rootStyle} >
    {(list.length > 0) && list.map((item, index) => (<MoveItem key={`swpitem_${item.unikey}`}>
      {children}
    </MoveItem>))}
  </MoveAreaWrapper>)
}

export default forwardRef(MoveArea)
