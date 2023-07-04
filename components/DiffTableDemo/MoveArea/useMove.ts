import type { CSSProperties, MutableRefObject } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useMoveActions, { MoveActionsOptions, MoveDirection, MoveVectorOffset } from './useMoveActions'

let currentMoveAreaPositionX = 0
const moveEffectiveMinDistance = 80

function getDefaultMoveTransition(durationMs: number) {
  return `left ${durationMs}ms linear`
}

export interface SingleLoopSwipperOptions extends Pick<MoveActionsOptions, 'onMoveStart'> {
  list: Array<any>
  defaultMoveDurationMs?: number
  itemSpacing?: number
  customInsideEffectiveWrapper?: (targetDom: EventTarget | null) => boolean
  onMoveInvalidEnd?: (distance: MoveVectorOffset, vector: MoveVectorOffset, direction: MoveDirection, firstMoveDirection: MoveDirection) => void
  onBeforeMovingValication?: () => boolean
  onMoving?: (vector: MoveVectorOffset, direction: MoveDirection, firstMoveDirection: MoveDirection) => void
  onMoveLeftEnd?: (distance: MoveVectorOffset, vector: MoveVectorOffset, firstMoveDirection: MoveDirection) => void
  onMoveRightEnd?: (distance: MoveVectorOffset, vector: MoveVectorOffset, firstMoveDirection: MoveDirection) => void
  onMoveUpEnd?: (distance: MoveVectorOffset, vector: MoveVectorOffset, firstMoveDirection: MoveDirection) => void
  onMoveDownEnd?: (distance: MoveVectorOffset, vector: MoveVectorOffset, firstMoveDirection: MoveDirection) => void
  onMoveEnd?: (distance: MoveVectorOffset, vector: MoveVectorOffset, firstMoveDirection: MoveDirection) => void
}

export default function useMove({ list, defaultMoveDurationMs = 300, itemSpacing = 0, customInsideEffectiveWrapper,
  onMoveStart,
  onBeforeMovingValication,
  onMoving,
  onMoveLeftEnd, onMoveRightEnd,
  onMoveUpEnd, onMoveDownEnd,
  onMoveEnd,
  onMoveInvalidEnd }: SingleLoopSwipperOptions) {
  const timerRec = useRef<any>(null)
  const moveAreaRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [moveAreaTransition, setMoveAreaTransition] = useState<string>('none')
  const [moveAreaPostionX, setMoveAreaPostionX] = useState<number>(0)
  const [magicList, setMagicList] = useState<Array<any>>([])
  const movingEnabled = useRef<boolean | null>(null)
  const moveDirection = useRef<MoveDirection | null>(null)

  const moveAreaStyle = useMemo<CSSProperties>(() => ({
    transition: moveAreaTransition,
    left: `${moveAreaPostionX}px`
  }), [moveAreaPostionX, moveAreaTransition])

  const getMoveAreaPositionX = useCallback((index: number) => {
    const moveAreaWidth = moveAreaRef.current?.clientWidth ?? 0
    return -(moveAreaWidth + itemSpacing) * index
  }, [itemSpacing])

  const setMoveArea = useCallback((index: number) => {
    setMoveAreaPostionX(getMoveAreaPositionX(index + 1))
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
      timerRec.current = setTimeout(() => {
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
      timerRec.current = setTimeout(() => {
        setMoveAreaTransition('none')
        setMoveArea(endIndex)
        clearTimeout(timerRec.current)
        timerRec.current = null
      }, defaultMoveDurationMs)
    } else {
      setMoveArea(lastIndex)
    }
  }, [defaultMoveDurationMs, getMoveAreaPositionX, list.length, selectedIndex, setMoveArea])

  // #region ------ move handle -----

  const handleMoveStart = useCallback((position: number[]) => {
    // 若滑动到了虚假头或者虚假尾，且移动的transition动画还没播放完的情况下，又去滑动了，那么为了不穿帮，此时需要把当前项设置到实际需要到头或这尾上，这样就能让用户感受到头尾无缝循环到假象
    if (timerRec.current) {
      clearTimeout(timerRec.current)
      timerRec.current = null
      if (selectedIndex <= 0) {
        const endIndex = list.length - 1
        setMoveAreaTransition('none')
        setMoveArea(endIndex)
        currentMoveAreaPositionX = getMoveAreaPositionX(endIndex + 1)
      } else {
        setMoveAreaTransition('none')
        setMoveArea(0)
        currentMoveAreaPositionX = getMoveAreaPositionX(1)
      }
    } else {
      currentMoveAreaPositionX = moveAreaPostionX
      setMoveAreaTransition('none')
    }
    onMoveStart && onMoveStart(position)
  }, [getMoveAreaPositionX, list.length, moveAreaPostionX, selectedIndex, setMoveArea])

  const handleMoving = useCallback((vector: MoveVectorOffset, direction: MoveDirection) => {
    const moveEnabled = !onBeforeMovingValication ? false : onBeforeMovingValication()
    let firstMoveDirection = moveDirection.current
    if (firstMoveDirection === null) {
      firstMoveDirection = direction
      moveDirection.current = direction
    } else {
      movingEnabled.current = moveEnabled
      if (['LEFT', 'RIGHT'].includes(firstMoveDirection) && moveEnabled && vector.x !== 0) {
        setMoveAreaPostionX(currentMoveAreaPositionX + vector.x)
      }
      onMoving && onMoving(vector, direction, firstMoveDirection)
    }
    // const moveEnabledDirections = ['LEFT','RIGHT'].includes(firstMoveDirection) ? ['LEFT','RIGHT'] : ['UP','DOWN']


  }, [setMoveAreaPostionX, onMoving, onBeforeMovingValication, movingEnabled, moveDirection])

  const endReset = useCallback(() => {
    currentMoveAreaPositionX = 0
    setMoveAreaTransition(getDefaultMoveTransition(defaultMoveDurationMs))
    movingEnabled.current = null
    moveDirection.current = null
  }, [defaultMoveDurationMs, setMoveAreaTransition, getDefaultMoveTransition, movingEnabled, moveDirection])

  const handleMoveInvalidEnd = useCallback((distance: MoveVectorOffset, vector: MoveVectorOffset, direction: MoveDirection, firstMoveDirection: MoveDirection) => {
    refreshMoveArea()
    onMoveInvalidEnd && onMoveInvalidEnd(distance, vector, direction, firstMoveDirection)
  }, [endReset, refreshMoveArea, onMoveInvalidEnd])

  const handleMoveLeftEnd = useCallback((distance: MoveVectorOffset, vector: MoveVectorOffset) => {
    if (['LEFT', 'RIGHT'].includes(moveDirection.current!) && movingEnabled.current) {
      if (distance.x >= moveEffectiveMinDistance) {
        nextMoveArea()
        onMoveLeftEnd && onMoveLeftEnd(distance, vector, moveDirection.current!)
      } else {
        handleMoveInvalidEnd(distance, vector, 'LEFT', moveDirection.current!)
      }
    }
  }, [endReset, nextMoveArea, onMoveLeftEnd, movingEnabled, moveDirection])

  const handleMoveRightEnd = useCallback((distance: MoveVectorOffset, vector: MoveVectorOffset) => {
    if (['LEFT', 'RIGHT'].includes(moveDirection.current!) && movingEnabled.current) {
      if (distance.x >= moveEffectiveMinDistance) {
        lastMoveArea()
        onMoveRightEnd && onMoveRightEnd(distance, vector, moveDirection.current!)
      } else {
        handleMoveInvalidEnd(distance, vector, 'RIGHT', moveDirection.current!)
      }
    }
  }, [endReset, lastMoveArea, onMoveRightEnd, movingEnabled])

  const { moveEffectiveWrapperRef } = useMoveActions({
    moveEffectiveMinDistance,
    onMoveStart: handleMoveStart,
    onMoving: handleMoving,
    onMoveLeftEnd: handleMoveLeftEnd,
    onMoveRightEnd: handleMoveRightEnd,
    onMoveUpEnd:(distance: MoveVectorOffset, vector: MoveVectorOffset)=>{
      onMoveUpEnd && onMoveUpEnd(distance, vector, moveDirection.current!)
    },
    onMoveDownEnd:(distance: MoveVectorOffset, vector: MoveVectorOffset)=>{
      onMoveDownEnd && onMoveDownEnd(distance, vector, moveDirection.current!)
    },
    onMoveEnd: (distance: MoveVectorOffset, vector: MoveVectorOffset) => {
      endReset()
      onMoveEnd && onMoveEnd(distance, vector, moveDirection.current!)
    },
    customInsideEffectiveWrapper
  })

  // #endregion

  const getMagicList = useCallback(() => {
    return [
      { ...list[list.length - 1], unikey: 'singleloopswipperitem_magicfirst' },
      ...list,
      { ...list[0], unikey: 'singleloopswipperitem_magicend' }]
  }, [list])

  useEffect(() => {
    refreshMoveArea()
    setMagicList(getMagicList())
  }, [])

  return {
    moveEffectiveWrapperRef,
    moveAreaRef,
    magicList,
    moveAreaStyle,
    itemSpacing
  }
}
