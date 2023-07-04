import { useCallback, useRef } from 'react'
import useMoveEventListeners from './useMoveEventListeners'

export type MoveDirection = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT' | 'NONE'
export type MoveVectorOffset = { x: number, y: number }
/**
 * 获取当前鼠标或手指的移动方向
 * @param p1 鼠标或手指起始位置数组， p1[0]=x, p1[1]=y
 * @param p2 鼠标或手指当前位置数组， p2[0]=x, p2[1]=y
 * @returns 手指移动方向 => 'UP' | 'RIGHT' | 'DOWN' | 'LEFT'
 */
function getMoveDirection(p1: Array<number>, p2: Array<number>): MoveDirection {
  // 通过 p1 和 p2 两坐标点的坐标偏移量大小实现上左下右角度方向的判断：(x2 - x1) >= (y2 - y1) 表示左右移动，反之上下移动
  // 这种方式就能简洁得实现通过跟计算角度一样的效果了

  const pOffset = 0 // 控制角度偏差的偏移量，(x2 - x1) >= (y2 - y1) 表示以 45度角为界，那 (x2 - x1) + pOffset >= (y2 - y1) 就可以控制界线角度大于或小于45度
  const x1 = p1[0]
  const y1 = p1[1]
  const x2 = p2[0]
  const y2 = p2[1]
  const xV = x2 - x1 // (xV, yV) 表示将 p2点 转化为以 p1点为(0,0)原点的坐标系中的坐标点(这个坐标系，右下角为(+x,+y)区域)
  const yV = y2 - y1
  const xL = Math.abs(xV + pOffset) // xL yL 表示 p1点 和 p2 点之间的 x y 坐标距离
  const yL = Math.abs(yV)
  let direction: MoveDirection = 'NONE'
  if (xL <= yL && yV < 0) {
    direction = 'UP'
  } else if (xL <= yL && yV > 0) {
    direction = 'DOWN'
  } else if (xL > yL && xV > 0) {
    direction = 'RIGHT'
  } else if (xL > yL && xV < 0) {
    direction = 'LEFT'
  }

  return direction
}

export interface MoveActionsOptions {
  moveEffectiveMinDistance?: number
  onMoveStart?: (position: Array<number>) => void
  onMoving?: (vector: MoveVectorOffset, direction: MoveDirection) => void
  onMoveLeftEnd?: (distance: MoveVectorOffset, vector: MoveVectorOffset) => void
  onMoveRightEnd?: (distance: MoveVectorOffset, vector: MoveVectorOffset) => void
  onMoveUpEnd?: (distance: MoveVectorOffset, vector: MoveVectorOffset) => void
  onMoveDownEnd?: (distance: MoveVectorOffset, vector: MoveVectorOffset) => void
  onMoveEnd?: (distance: MoveVectorOffset, vector: MoveVectorOffset) => void
  customInsideEffectiveWrapper?: (targetDom: EventTarget | null) => boolean
}

export default function useMoveActions({ moveEffectiveMinDistance = 80,
  onMoveStart, onMoving,
  onMoveLeftEnd, onMoveRightEnd,
  onMoveUpEnd, onMoveDownEnd,
  onMoveEnd,
  customInsideEffectiveWrapper }: MoveActionsOptions) {

  const moveEffectiveWrapperRef = useRef<HTMLDivElement | null>(null)
  const moveStartPosition = useRef([0, 0])
  const moveVector = useRef<MoveVectorOffset>({ x: 0, y: 0 })
  const moveDirection = useRef<MoveDirection | null>(null)

  const reset = () => {
    moveStartPosition.current = [0, 0]
    moveVector.current = { x: 0, y: 0 }
    moveDirection.current = null
  }

  const handleMoveStart = useCallback((clientPosition: Array<number>, _targetDom: EventTarget | null) => {
    moveStartPosition.current = clientPosition
    onMoveStart && onMoveStart(clientPosition)
  }, [onMoveStart, moveStartPosition])

  const handleMoving = useCallback((clientPosition: Array<number>, _targetDom: EventTarget | null) => {
    const direction = getMoveDirection(moveStartPosition.current, clientPosition)
    moveDirection.current = direction
    const vectorOffset: MoveVectorOffset = {
      x: clientPosition[0] - moveStartPosition.current[0],
      y: clientPosition[1] - moveStartPosition.current[1]
    }
    moveVector.current = vectorOffset
    onMoving && onMoving(vectorOffset, direction)
  }, [moveDirection, moveStartPosition, onMoving])

  const handleMoveEnd = useCallback(() => {
    const moveDistanceX = Math.abs(moveVector.current.x)
    const moveDistanceY = Math.abs(moveVector.current.y)
    const moveDistance: MoveVectorOffset = { x: moveDistanceX, y: moveDistanceY }
    if (moveVector.current.x < 0) {
      onMoveLeftEnd && onMoveLeftEnd(moveDistance, moveVector.current)
    } else if (moveVector.current.x > 0) {
      onMoveRightEnd && onMoveRightEnd(moveDistance, moveVector.current)
    }
    if (moveVector.current.y < 0) {
      onMoveUpEnd && onMoveUpEnd(moveDistance, moveVector.current)
    } else if (moveVector.current.y > 0) {
      onMoveDownEnd && onMoveDownEnd(moveDistance, moveVector.current)
    }

    reset()
    onMoveEnd && onMoveEnd(moveDistance, moveVector.current)
  }, [moveDirection, moveEffectiveMinDistance, onMoveDownEnd, onMoveLeftEnd, onMoveRightEnd, onMoveUpEnd, onMoveEnd])

  const insideEffectiveWrapper = customInsideEffectiveWrapper ?? ((targetDom: EventTarget | null) => moveEffectiveWrapperRef && targetDom && moveEffectiveWrapperRef.current?.contains(targetDom as Node))

  useMoveEventListeners({
    onMoveStart: useCallback((clientPosition: number[], targetDom: EventTarget | null) => {
      if (insideEffectiveWrapper(targetDom)) {
        handleMoveStart(clientPosition, targetDom)
      }
    }, [insideEffectiveWrapper, handleMoveStart]),
    onMoving: useCallback((clientPosition: number[], targetDom: EventTarget | null) => {
      if (insideEffectiveWrapper(targetDom)) {
        handleMoving(clientPosition, targetDom)
      } else {
        handleMoveEnd()
      }
    }, [insideEffectiveWrapper, handleMoving, handleMoveEnd]),
    onMoveEnd: useCallback((targetDom: EventTarget | null) => {
      if (insideEffectiveWrapper(targetDom)) {
        handleMoveEnd()
      }
    }, [insideEffectiveWrapper, handleMoveEnd])
  })

  return {
    moveEffectiveWrapperRef
  }
}
