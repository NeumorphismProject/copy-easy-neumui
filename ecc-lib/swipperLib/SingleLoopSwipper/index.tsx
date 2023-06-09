import type { CSSProperties, MutableRefObject } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useMoveActions from '../hooks/useMoveActions'
import MoveArea from './MoveArea'
import {
  Indicator,
  IndicatorWrapper,
  Wrapper
} from './style'

let currentMoveAreaPositionX = 0

function getDefaultMoveTransition (durationMs:number) {
  return `left ${durationMs}ms linear`
}

export interface SingleLoopSwipperProps {
  list: Array<any>
  containerHeight?: number
  defaultMoveDurationMs?: number
  itemSpacing?: number
}

export default function SingleLoopSwipper({ list, containerHeight = 300, defaultMoveDurationMs=300, itemSpacing = 0 }: SingleLoopSwipperProps) {
  const timerRec = useRef<any>(null)
  const moveAreaRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [moveAreaTransition, setMoveAreaTransition] = useState<string>('none')
  const [moveAreaPostionX, setMoveAreaPostionX] = useState<number>(0)
  const [magicList, setMagicList] = useState<Array<any>>([])

  const moveAreaStyle = useMemo<CSSProperties>(() => ({
    transition: moveAreaTransition,
    left: `${moveAreaPostionX}px`
  }), [moveAreaPostionX, moveAreaTransition])

  const getMoveAreaPositionX = useCallback((index: number) => {
    const moveAreaWidth = moveAreaRef.current?.clientWidth ?? 0
    return -(moveAreaWidth + itemSpacing) * index
  }, [itemSpacing])

  const setMoveArea = useCallback((index: number) => {
    setMoveAreaPostionX(getMoveAreaPositionX(index+1))
    setSelectedIndex(index)
  }, [getMoveAreaPositionX])

  const refreshMoveArea = useCallback(() => {
    setMoveArea(selectedIndex)
  }, [selectedIndex, setMoveArea])

  const nextMoveArea = useCallback(() => {
    const endIndex = list.length - 1
    let nextIndex = selectedIndex + 1
    if (nextIndex > endIndex) {
      setMoveAreaPostionX(getMoveAreaPositionX(endIndex + 2))
      // 在transition动画播放完成后，此时把transition设置为0或none，然后把图片瞬间移动到第1张，这样用户眼睛不会发现变化，就有了循环回第1张图片的假象了
      timerRec.current = setTimeout(()=>{
        setMoveAreaTransition('none')
        setMoveArea(0)
        clearTimeout(timerRec.current)
        timerRec.current = null
      }, defaultMoveDurationMs)
    } else {
      setMoveArea(nextIndex)
    }

  }, [defaultMoveDurationMs, getMoveAreaPositionX, list.length, selectedIndex, setMoveArea])

  const lastMoveArea = useCallback(() => {
    let lastIndex = selectedIndex - 1
    if (lastIndex < 0) {
      const endIndex = list.length - 1
      setMoveAreaPostionX(getMoveAreaPositionX(0))
      // 在transition动画播放完成后，此时把transition设置为0或none，然后把图片瞬间移动到最后1张，这样用户眼睛不会发现变化，就有了循环回最后1张图片的假象了
      timerRec.current = setTimeout(()=>{
        setMoveAreaTransition('none')
        setMoveArea(endIndex)
        clearTimeout(timerRec.current)
        timerRec.current = null
      }, defaultMoveDurationMs)
    } else {
      setMoveArea(lastIndex)
    }
  }, [defaultMoveDurationMs, getMoveAreaPositionX, list.length, selectedIndex, setMoveArea])

  const handleIndicatorClick = useCallback((item: any, index: number) => {
    setMoveArea(index)
  }, [setMoveArea])

  // #region ------ move handle -----

  const handleMoveStart = useCallback(() => {
    // 若滑动到了虚假头或者虚假尾，且移动的transition动画还没播放完的情况下，又去滑动了，那么为了不穿帮，此时需要把当前项设置到实际需要到头或这尾上，这样就能让用户感受到头尾无缝循环到假象
    if(timerRec.current) {
      clearTimeout(timerRec.current)
      timerRec.current = null
      if(selectedIndex <= 0) {
        const endIndex = list.length - 1
        setMoveAreaTransition('none')
        setMoveArea(endIndex)
        currentMoveAreaPositionX = getMoveAreaPositionX(endIndex+1)
      } else {
        setMoveAreaTransition('none')
        setMoveArea(0)
        currentMoveAreaPositionX = getMoveAreaPositionX(1)
      }
    } else {
      currentMoveAreaPositionX = moveAreaPostionX
      setMoveAreaTransition('none')
    }
  }, [getMoveAreaPositionX, list.length, moveAreaPostionX, selectedIndex, setMoveArea])

  const handleMoving = useCallback((vector: number) => {
    setMoveAreaPostionX(currentMoveAreaPositionX + vector)
  }, [])

  const endReset = useCallback(() => {
    currentMoveAreaPositionX = 0
    setMoveAreaTransition(getDefaultMoveTransition(defaultMoveDurationMs))
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

  const getMagicList = useCallback(() => {
    return [
      { ...list[list.length - 1], unikey: 'singleloopswipperitem_magicfirst' },
      ...list,
      { ...list[0], unikey: 'singleloopswipperitem_magicend' }]
  },[list])

  useEffect(() => {
    refreshMoveArea()
    setMagicList(getMagicList())
  }, [])

  return (<Wrapper ref={moveEffectiveWrapperRef} areaHeight={containerHeight}>
    <MoveArea ref={moveAreaRef} list={magicList} rootStyle={moveAreaStyle} height={containerHeight} itemSpacing={itemSpacing} />
    <IndicatorWrapper draggable={false} >
      {(magicList.length > 0) && list.map((item, index) => (<Indicator key={`swpindicator_${item.unikey}`} first={index === 0} selected={index === selectedIndex}
        onClick={handleIndicatorClick.bind(null, item, index)} />))}
    </IndicatorWrapper>
  </Wrapper>)
}
