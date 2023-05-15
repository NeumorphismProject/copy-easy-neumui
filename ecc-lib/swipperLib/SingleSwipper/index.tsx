import type { CSSProperties } from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'
import useMoveActions from '../hooks/useMoveActions'
import {
  Indicator,
  IndicatorWrapper,
  MoveAreaWrapper,
  MoveItem,
  MoveItemImg,
  Wrapper
} from './style'

let currentMoveAreaPositionX = 0

export interface SingleSwipperProps {
  list: Array<any>
  containerHeight?:number
  defaultMoveDurationMs?: number
  itemSpacing?: number
}

export default function SingleSwipper({ list, containerHeight = 300, defaultMoveDurationMs=300, itemSpacing = 0 }: SingleSwipperProps) {
  const moveAreaRef = useRef<HTMLDivElement | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [moveAreaTransDurationMs, setMoveAreaTransDurationMs] = useState(0)
  const [moveAreaPostionX, setMoveAreaPostionX] = useState(0)

  const moveAreaStyle = useMemo<CSSProperties>(() => ({
    transitionDuration: `${moveAreaTransDurationMs}ms`,
    left: `${moveAreaPostionX}px`
  }), [moveAreaPostionX, moveAreaTransDurationMs])

  const getMoveAreaPositionX = useCallback((index: number) => {
    const moveAreaWidth = moveAreaRef.current?.clientWidth ?? 0
    return -(moveAreaWidth + itemSpacing) * index
  }, [itemSpacing])

  const setMoveArea = useCallback((index: number) => {
    setMoveAreaPostionX(getMoveAreaPositionX(index))
    setSelectedIndex(index)
  }, [getMoveAreaPositionX])

  const refreshMoveArea = useCallback(() => {
    setMoveArea(selectedIndex)
  }, [selectedIndex, setMoveArea])

  const nextMoveArea = useCallback(() => {
    const endIndex = list.length - 1
    let nextIndex = selectedIndex < endIndex ? (selectedIndex + 1) : endIndex
    setMoveArea(nextIndex)
  }, [list.length, selectedIndex, setMoveArea])

  const lastMoveArea = useCallback(() => {
    let lastIndex = selectedIndex > 0 ? (selectedIndex - 1) : 0
    setMoveArea(lastIndex)
  }, [selectedIndex, setMoveArea])

  const handleIndicatorClick = useCallback((item: any, index: number) => {
    setMoveArea(index)
  }, [setMoveArea])

  // #region ------ move handle -----

  const handleMoveStart = useCallback(() => {
    currentMoveAreaPositionX = moveAreaPostionX
    setMoveAreaTransDurationMs(0)
  }, [moveAreaPostionX])

  const handleMoving = useCallback((vector: number) => {
    setMoveAreaPostionX(currentMoveAreaPositionX + vector)
  }, [])

  const endReset = useCallback(() => {
    currentMoveAreaPositionX = 0
    setMoveAreaTransDurationMs(defaultMoveDurationMs)
  }, [defaultMoveDurationMs])

  const handleMoveInvalidEnd = useCallback(() => {
    endReset()
    refreshMoveArea()
  }, [endReset, refreshMoveArea])

  const handleMoveLeftEnd = useCallback((distance: number, vector: number) => {
    endReset()
    nextMoveArea()
  }, [endReset, nextMoveArea])

  const handleMoveRightEnd = useCallback((distance: number, vector: number) => {
    endReset()
    lastMoveArea()
  }, [endReset, lastMoveArea])

  const { moveEffectiveWrapperRef } = useMoveActions({
    onMoving: handleMoving,
    onMoveStart: handleMoveStart,
    onMoveInvalidEnd: handleMoveInvalidEnd,
    onMoveLeftEnd: handleMoveLeftEnd,
    onMoveRightEnd: handleMoveRightEnd
  })

  // #endregion

  return (<Wrapper ref={moveEffectiveWrapperRef} areaHeight={containerHeight}>
    <MoveAreaWrapper ref={moveAreaRef}
      style={moveAreaStyle} >
      {list.map((item, index) => (<MoveItem key={`swpitem_${item.unikey}`} areaHeight={containerHeight}>
        <MoveItemImg src={item.imgUrl} alt="img" draggable={false}
          first={index === 0} spacing={itemSpacing} />
      </MoveItem>))}
    </MoveAreaWrapper>
    <IndicatorWrapper draggable={false} >
      {list.map((item, index) => (<Indicator key={`swpindicator_${item.unikey}`} first={index === 0} selected={index === selectedIndex}
        onClick={handleIndicatorClick.bind(null, item, index)} />))}
    </IndicatorWrapper>
  </Wrapper>)
}
