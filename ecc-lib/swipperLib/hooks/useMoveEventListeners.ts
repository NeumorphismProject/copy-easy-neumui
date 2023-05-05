import { useCallback, useEffect, useRef } from "react"

export interface MoveEventListenersOptions {
  /**
   * move start
   * @param clientPosition the position whitch is current mouse or touch poition. As [clientX, clientY]. Example: [0,0]
   */
  onMoveStart: (clientPosition: Array<number>, targetDom: EventTarget | null) => void
  /**
   * moving
   * @param clientPosition the position whitch is current mouse or touch poition. As [clientX, clientY]. Example: [0,0]
   */
  onMoving: (clientPosition: Array<number>, targetDom: EventTarget | null) => void
  /**
   * move end
   * @param clientPosition the position whitch is current mouse or touch poition. As [clientX, clientY]. Example: [0,0]
   */
  onMoveEnd: (targetDom: EventTarget | null) => void
}

export default function useMoveEventListeners({
  onMoveStart,
  onMoving,
  onMoveEnd
}: MoveEventListenersOptions) {
  const mouseMoveListenerEnabled = useRef(false)

  // #region ----- mouse listener handle ----

  const handleMouseDown = useCallback((ev: MouseEvent) => {
    mouseMoveListenerEnabled.current = true
    const clientPosition = [ev.clientX, ev.clientY]
    onMoveStart(clientPosition, ev.target)
  }, [onMoveStart])

  const handleMouseMove = useCallback((ev: MouseEvent) => {
    const clientPosition = [ev.clientX, ev.clientY]
    mouseMoveListenerEnabled.current && onMoving(clientPosition, ev.target)
  }, [mouseMoveListenerEnabled, onMoving])

  const handleMouseUp = useCallback((ev: MouseEvent) => {
    mouseMoveListenerEnabled.current = false
    onMoveEnd(ev.target)
  }, [onMoveEnd])

  // #endregion

  // #region ----- touch listener handle ----

  const handleTouchStart = useCallback((ev: TouchEvent) => {
    const clientPosition = [ev.touches[0].clientX, ev.touches[0].clientY]
    onMoveStart(clientPosition, ev.target)
  }, [onMoveStart])

  const handleTouchMove = useCallback((ev: TouchEvent) => {
    const clientPosition = [ev.touches[0].clientX, ev.touches[0].clientY]
    onMoving(clientPosition, ev.target)
  }, [onMoving])

  const handleTouchEnd = useCallback((ev: TouchEvent) => {
    onMoveEnd(ev.target)
  }, [onMoveEnd])

  // #endregion

  function addEventListeners() {
    // mouse listener
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    // touch listener
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
  }

  function removeEventListeners() {
    // mouse listener
    window.removeEventListener('mousedown', handleMouseDown)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)

    // touch listener
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('touchend', handleTouchEnd)
  }

  const handleAddEventListeners = useCallback(addEventListeners, [handleMouseDown, handleMouseMove, handleMouseUp, handleTouchEnd, handleTouchMove, handleTouchStart])

  const handlerRemoveEventListeners = useCallback(removeEventListeners, [handleMouseDown, handleMouseMove, handleMouseUp, handleTouchEnd, handleTouchMove, handleTouchStart])

  useEffect(() => {
    // mounted
    handleAddEventListeners()

    return () => {
      // destroyed
      handlerRemoveEventListeners()
    }
  }, [handleAddEventListeners, handlerRemoveEventListeners])
}
