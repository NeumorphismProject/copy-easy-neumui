import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import MoveArea from './MoveArea'
import useMove from './MoveArea/useMove'
import { MoveDirection, MoveVectorOffset } from './MoveArea/useMoveActions'

const Wrapper = styled.div({
  backgroundColor: 'gray',
  width: '100%',
  position: 'fixed',
  top: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column'
})

const TopWrapper = styled.div({
  padding: '2px 0',
  textAlign: 'center',
  width: '100%'
})

const HeaderBaseWrapper = styled.div({
  display: 'flex',
})

const HeaderWrapper = styled(HeaderBaseWrapper)({
  transition: 'all 0.5s ease-out',
  borderTop: '1px solid black',
  height: 'auto'
})

const HeaderBaseCell = styled.div({
  width: '50%',
  textAlign: 'center',
  borderBottom: '1px solid black'
})

const HeaderCell = styled(HeaderBaseCell)({
  padding: '8px'
})

const HeaderDividingLine = styled.div({
  width: '1px',
  backgroundColor: 'black'
})

const HeaderCellTitle = styled.h2({
  fontSize: '16px'
})

type HeaderCellImgWrapperProps = {
  wrapperDefaultHeight?: number,
  wrapperHeight?: number,
}
const HeaderCellImgWrapper = styled('div')<HeaderCellImgWrapperProps>(({ wrapperDefaultHeight, wrapperHeight }) => ({
  transition: 'all 0.5s ease-out',
  overflow: 'hidden',
  height: !wrapperHeight ? (!wrapperDefaultHeight ? 'auto' : `${wrapperDefaultHeight}px`) : `${wrapperHeight}px`,
}))

type HeaderCellImgProps = {
  imgHeight?: number,
  relativeTop?: number
}
const HeaderCellImg = styled('img')<HeaderCellImgProps>(({ imgHeight, relativeTop }) => ({
  transition: 'all 0.5s ease-out',
  margin: '8px',
  height: `${imgHeight ?? 30}px`,
  position: 'relative',
  top: relativeTop ?? 0
}))

const HeaderCellSubTitle = styled.h3({
  fontSize: '14px'
})

//---------

const MoveAreaWrapper = styled.div({
  width: '100%',
  height: '100%',
  // backgroundColor: 'blue',
  overflow: 'hidden'
})

// --------

const BodyWrapper = styled.div({
  flex: 1,
  overflowY: 'auto',
  '::-webkit-scrollbar': { width: '0 !important' }
})

const IMG_HEIGHT = 60
const HEADER_IMG_SHRINK_RELATIVE_TOP = -80

export default function DiffTableDemo() {
  const [dataList] = useState<Array<any>>((new Array(5)).fill('').map((a, i) => ({ ...a, unikey: i + 1 })))
  const [rowList] = useState<Array<any>>((new Array(15)).fill('').map((a, i) => ({ ...a, unikey: `row_${i + 1}` })))
  const [imgHeight] = useState(IMG_HEIGHT)
  // --
  const headerWrapperRef = useRef<HTMLDivElement | null>(null)
  const headerCellImgWrapperRef = useRef<HTMLDivElement | null>(null)
  const headerCellImgWrappeRec = useRef(0)
  const headerImgRef = useRef<HTMLImageElement | null>(null)
  const [imgWrapperHeight, setImgWrapperHeight] = useState(0)
  const [imgRelativeTop, setImgRelativeTop] = useState(0)
  // --
  const bodyWrapperRef = useRef<HTMLDivElement | null>(null)

  const insideEffectiveWrapper = (targetDom: EventTarget | null) => {
    return true
  }

  const handleMoveStart = (position: Array<number>) => {

  }
  const handleMoving = useCallback((vector: MoveVectorOffset, direction: MoveDirection) => {
    const bodyWrapperScrolltop = bodyWrapperRef.current?.scrollTop
    console.log('bodyWrapperScrolltop = ', bodyWrapperScrolltop)
    console.log('imgRelativeTop = ', imgRelativeTop)
    if (direction === 'DOWN' && bodyWrapperScrolltop === 0 && imgRelativeTop >= HEADER_IMG_SHRINK_RELATIVE_TOP && imgRelativeTop <= 0) {
      let h = imgWrapperHeight + vector.y
      h = h > headerCellImgWrappeRec.current ? headerCellImgWrappeRec.current : h
      setImgWrapperHeight(h)
      let t = imgRelativeTop + vector.y
      t = t > 0 ? 0 : t
      setImgRelativeTop(t)
    } else if (direction === 'UP' && imgRelativeTop >= HEADER_IMG_SHRINK_RELATIVE_TOP && imgRelativeTop <= 0) {
      let h = imgWrapperHeight + vector.y
      h = h < 2 ? 1 : h
      setImgWrapperHeight(h)
      let t = imgRelativeTop + vector.y
      t = t < HEADER_IMG_SHRINK_RELATIVE_TOP ? HEADER_IMG_SHRINK_RELATIVE_TOP : t
      setImgRelativeTop(t)
    }
  }, [bodyWrapperRef, headerCellImgWrapperRef, headerImgRef, imgWrapperHeight, imgRelativeTop, headerCellImgWrappeRec])

  const handleMoveUpEnd = useCallback((distance: number, vector: MoveVectorOffset) => {
    setImgWrapperHeight(1) // 0 = height='auto', 所以这里设置为 1 确保最小高度即可
    setImgRelativeTop(HEADER_IMG_SHRINK_RELATIVE_TOP)
  }, [setImgWrapperHeight, setImgRelativeTop])

  const handleMoveDownEnd = useCallback((distance: number, vector: MoveVectorOffset) => {
    const bodyWrapperScrolltop = bodyWrapperRef.current?.scrollTop
    if (bodyWrapperScrolltop === 0) {
      setImgWrapperHeight(0) // 0 = height='auto', 这里表示让容器展开至原始高度
      setImgRelativeTop(0)
    }
  }, [setImgWrapperHeight, setImgRelativeTop])

  const handleMoveInvalidEnd = useCallback((distance: MoveVectorOffset, vector: MoveVectorOffset, direction: MoveDirection) => {
    if (direction === 'UP') {
      handleMoveUpEnd(distance.y, vector)
    } else if (direction === 'DOWN') {
      handleMoveDownEnd(distance.y, vector)
    }
  }, [handleMoveUpEnd, handleMoveDownEnd])

  const {
    moveEffectiveWrapperRef,
    moveAreaRef,
    magicList,
    moveAreaStyle,
    itemSpacing
  } = useMove({
    list: dataList,
    customInsideEffectiveWrapper: insideEffectiveWrapper,
    onMoveStart: handleMoveStart,
    onMoving: handleMoving,
    onMoveUpEnd: handleMoveUpEnd,
    onMoveDownEnd: handleMoveDownEnd,
    onMoveInvalidEnd: handleMoveInvalidEnd
  })

  useEffect(() => {
    headerCellImgWrappeRec.current = headerCellImgWrapperRef.current?.clientHeight ?? 0
  }, [])

  const imgUrl = (new URL('@/assets/imgs/laptop.png', import.meta.url)).toString()
  return (<Wrapper>
    <TopWrapper>左右滑动切换对照卡片</TopWrapper>
    <HeaderWrapper ref={headerWrapperRef}>
      <HeaderCell style={{ borderRight: '1px solid black' }}>
        <HeaderCellTitle>超超笔记本</HeaderCellTitle>
        <HeaderCellImgWrapper ref={headerCellImgWrapperRef} wrapperDefaultHeight={IMG_HEIGHT + 20} wrapperHeight={imgWrapperHeight}><HeaderCellImg ref={headerImgRef} imgHeight={imgHeight} relativeTop={imgRelativeTop} alt="laptop" src={imgUrl} ></HeaderCellImg></HeaderCellImgWrapper>
        <HeaderCellSubTitle>一个你想象不到的笔记本</HeaderCellSubTitle>
      </HeaderCell>
      {/* <HeaderDividingLine /> */}
      <HeaderBaseCell>
        <MoveAreaWrapper ref={moveEffectiveWrapperRef} >
          <MoveArea ref={moveAreaRef} list={magicList} rootStyle={moveAreaStyle} itemSpacing={itemSpacing}>
            <HeaderCellTitle>牛牛笔记本</HeaderCellTitle>
            <HeaderCellImgWrapper ref={headerCellImgWrapperRef} wrapperDefaultHeight={IMG_HEIGHT + 20} wrapperHeight={imgWrapperHeight}><HeaderCellImg ref={headerImgRef} imgHeight={imgHeight} relativeTop={imgRelativeTop} alt="laptop" src={imgUrl} ></HeaderCellImg></HeaderCellImgWrapper>
            <HeaderCellSubTitle>牛牛爱用的笔记本</HeaderCellSubTitle>
          </MoveArea>
        </MoveAreaWrapper>
      </HeaderBaseCell>
    </HeaderWrapper>

    <BodyWrapper ref={bodyWrapperRef}>
      {rowList.map(r => (<HeaderBaseWrapper key={r.unikey}>
        <HeaderCell style={{ borderRight: '1px solid black' }}>
          <HeaderCellTitle>超超笔记本</HeaderCellTitle>
          <HeaderCellImg alt="laptop" src={imgUrl} ></HeaderCellImg>
          <HeaderCellSubTitle>一个你想象不到的笔记本一个你想象不到的笔记本一个你想象不到的笔记本一个你想象不到的笔记本</HeaderCellSubTitle>
        </HeaderCell>
        {/* <HeaderDividingLine /> */}
        <HeaderBaseCell>
          <MoveAreaWrapper ref={moveEffectiveWrapperRef} >
            <MoveArea ref={moveAreaRef} list={magicList} rootStyle={moveAreaStyle} itemSpacing={itemSpacing}>
              <HeaderCellTitle>牛牛笔记本</HeaderCellTitle>
              <HeaderCellImg alt="laptop" src={imgUrl} ></HeaderCellImg>
              <HeaderCellSubTitle>牛牛爱用的笔记本</HeaderCellSubTitle>
            </MoveArea>
          </MoveAreaWrapper>
        </HeaderBaseCell>
      </HeaderBaseWrapper>))}
    </BodyWrapper>
  </Wrapper>)
}
