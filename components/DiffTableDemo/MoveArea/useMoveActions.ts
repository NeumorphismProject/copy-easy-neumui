import { useCallback, useRef } from 'react'
import useMoveEventListeners from './useMoveEventListeners'

export interface MoveActionsOptions {
  type?: 'horizontal' | 'vertical'
  moveEffectiveMinDistance?: number
  onMoveStart?: (position:Array<number>) => void
  onMoving?: (vector:number) => void
  onMoveInvalidEnd?: () => void
  onMoveLeftEnd?: (distance:number, vector:number) => void
  onMoveRightEnd?: (distance:number, vector:number) => void
  onMoveUpEnd?: (distance:number, vector:number) => void
  onMoveDownEnd?: (distance:number, vector:number) => void
  customInsideEffectiveWrapper?: (targetDom: EventTarget | null) => boolean
}

export default function useMoveActions({ type='horizontal', moveEffectiveMinDistance=80,
  onMoveStart, onMoving,
  onMoveInvalidEnd,
  onMoveLeftEnd, onMoveRightEnd,
  onMoveUpEnd, onMoveDownEnd,
  customInsideEffectiveWrapper }: MoveActionsOptions) {

  const moveEffectiveWrapperRef = useRef<HTMLDivElement | null>(null)
  const moveStartPosition = useRef([0, 0])
  const moveVector = useRef(0)

  const reset = () => {
    moveStartPosition.current = [0, 0]
    moveVector.current = 0
  }

  const handleMoveStart = useCallback((clientPosition: Array<number>, targetDom: EventTarget | null) => {
    moveStartPosition.current = clientPosition
    onMoveStart && onMoveStart(clientPosition)
  }, [onMoveStart])

  const handleMoving = useCallback((clientPosition: Array<number>, targetDom: EventTarget | null) => {
    const vector = type === 'horizontal' ? (clientPosition[0] - moveStartPosition.current[0]) : (clientPosition[1] - moveStartPosition.current[1])
    moveVector.current = vector
    onMoving && onMoving(vector)
  }, [onMoving, type])

  const handleMoveEnd = useCallback(() => {
    const moveDistance = Math.abs(moveVector.current)
    if(moveDistance >= moveEffectiveMinDistance) {
      if(type === 'horizontal' && moveVector.current < 0) {
        onMoveLeftEnd && onMoveLeftEnd(moveDistance, moveVector.current)
      } else if(type === 'horizontal' && moveVector.current >= 0) {
        onMoveRightEnd && onMoveRightEnd(moveDistance, moveVector.current)
      } else if(type === 'vertical' && moveVector.current < 0) {
        onMoveUpEnd && onMoveUpEnd(moveDistance, moveVector.current)
      } else if(type === 'vertical' && moveVector.current >= 0) {
        onMoveDownEnd && onMoveDownEnd(moveDistance, moveVector.current)
      }
    } else {
      onMoveInvalidEnd && onMoveInvalidEnd()
    }

    reset()
  }, [moveEffectiveMinDistance, onMoveDownEnd, onMoveInvalidEnd, onMoveLeftEnd, onMoveRightEnd, onMoveUpEnd, type])

  const insideEffectiveWrapper = customInsideEffectiveWrapper ?? ((targetDom: EventTarget | null) => moveEffectiveWrapperRef && targetDom && moveEffectiveWrapperRef.current?.contains(targetDom as Node))

  useMoveEventListeners({
    onMoveStart: (clientPosition: number[], targetDom: EventTarget | null) => {
      if(insideEffectiveWrapper(targetDom)) {
        handleMoveStart(clientPosition, targetDom)
      }
    },
    onMoving: (clientPosition: number[], targetDom: EventTarget | null) => {
      if(insideEffectiveWrapper(targetDom)) {
        handleMoving(clientPosition, targetDom)
      } else {
        handleMoveEnd()
      }
    },
    onMoveEnd: (targetDom: EventTarget | null) => {
      if(insideEffectiveWrapper(targetDom)) {
        handleMoveEnd()
      }
    }
  })

  return {
    moveEffectiveWrapperRef
  }
}
