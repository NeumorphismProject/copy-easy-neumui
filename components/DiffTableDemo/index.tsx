import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import MoveArea from './MoveArea'
import useMove from './MoveArea/useMove'
import { MoveDirection } from './MoveArea/useMoveActions'

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

type HeaderWrapperProps = {
  wrapperHeight?: number
}
const HeaderWrapper = styled(HeaderBaseWrapper)<HeaderWrapperProps>(({ wrapperHeight }) => ({
  transition: 'all 0.5s ease-out',
  borderTop: '1px solid black',
  height: !wrapperHeight ? 'auto' : `${wrapperHeight}px`
}))

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
  // height: !wrapperHeight ? 'auto' : `${wrapperHeight}px`,
  height: !wrapperHeight ? (!wrapperDefaultHeight ? 'auto' :`${wrapperDefaultHeight}px`) : `${wrapperHeight}px`,
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

export default function DiffTableDemo() {
  const [dataList] = useState<Array<any>>((new Array(5)).fill('').map((a, i) => ({ ...a, unikey: i + 1 })))
  const [rowList] = useState<Array<any>>((new Array(15)).fill('').map((a, i) => ({ ...a, unikey: `row_${i + 1}` })))
  const scrollRec = useRef(0)
  const scrollOffset = useRef(0)
  const timerRec = useRef<any>(null)
  const [imgHeight, setImgHeight] = useState(IMG_HEIGHT)
  // --
  const headerWrapperRef = useRef<HTMLDivElement | null>(null)
  const headerCellImgWrapperRef = useRef<HTMLDivElement | null>(null)
  const headerCellImgWrappeRec = useRef(0)
  const headerImgRef = useRef<HTMLImageElement | null>(null)
  const [headerWrapperHeight, setHeaderWrapperHeight] = useState(0)
  const [imgWrapperHeight, setImgWrapperHeight] = useState(0)
  const [imgRelativeTop, setImgRelativeTop] = useState(0)
  // --
  const bodyWrapperRef = useRef<HTMLDivElement | null>(null)

  const insideEffectiveWrapper = (targetDom: EventTarget | null) => {
    return true
  }

  const handleMoveStart = (position: Array<number>) => {

  }
  const handleMoving = useCallback((vector: number, direction: MoveDirection) => {
    // const bodyWrapperScrolltop = bodyWrapperRef.current?.scrollTop
    // console.log('bodyWrapperScrolltop = ', bodyWrapperScrolltop)
    // console.log('imgRelativeTop = ', imgRelativeTop)
    // if(direction === 'DOWN' && bodyWrapperScrolltop === 0 && imgRelativeTop < 0 && imgRelativeTop >= -80){
    //   let h = (headerCellImgWrapperRef.current?.clientHeight ?? 0) + 18
    //   // h = h > headerCellImgWrappeRec.current ? headerCellImgWrappeRec.current : h
    //   setImgWrapperHeight(h)
    //   let t = imgRelativeTop + 2
    //   t = t > 0 ? 0 : t
    //   setImgRelativeTop(t)
    // }
  }, [bodyWrapperRef, headerCellImgWrapperRef, headerImgRef, imgRelativeTop, headerCellImgWrappeRec])
  const handleMoveUpEnd = (distance: number, vector: number) => {
    setImgWrapperHeight(1)
    setImgRelativeTop(-80)
  }
  const handleMoveDownEnd = (distance: number, vector: number) => {
    const bodyWrapperScrolltop = bodyWrapperRef.current?.scrollTop
    if(bodyWrapperScrolltop === 0){
      setImgWrapperHeight(0)
      setImgRelativeTop(0)
    }
  }

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
    onMoveInvalidEnd: (distance: number, vector: number, direction: MoveDirection) => {
      if(direction === 'UP') {
        handleMoveUpEnd(distance,vector)
      } else if (direction === 'DOWN') {
        handleMoveDownEnd(distance,vector)
      }
    }
  })

  useEffect(() => {
    // headerWrapperHeightRec.current = headerWrapperRef.current?.clientHeight ?? 0
    headerCellImgWrappeRec.current = headerCellImgWrapperRef.current?.clientHeight ?? 0
  }, [])

  const headerShrink = useCallback((scrollTop: number, scrollOffsetVal: number) => {
    if (scrollTop > 80 && scrollOffsetVal > 0) {
      if ((headerCellImgWrapperRef.current?.clientHeight ?? 0) > 10) {
        // setHeaderWrapperHeight((headerWrapperRef.current?.clientHeight ?? 0) - 1)
        setImgWrapperHeight((headerCellImgWrapperRef.current?.clientHeight ?? 0) - 2)
        setImgRelativeTop(imgRelativeTop - 2)
      }
    } else if ((headerCellImgWrapperRef.current?.clientHeight ?? 0) >= headerCellImgWrappeRec.current) {
      setImgWrapperHeight(0)
    } else if (scrollOffsetVal < 1) {
      setImgWrapperHeight((headerCellImgWrapperRef.current?.clientHeight ?? 0) + 2)
      setImgRelativeTop(imgRelativeTop + 2)
    }
  }, [headerWrapperRef, headerCellImgWrapperRef, headerCellImgWrapperRef, imgRelativeTop, scrollOffset])

  const headerShrinkForScrollEnd = useCallback(() => {
    const halfHeight = headerCellImgWrappeRec.current / 2
    if ((headerCellImgWrapperRef.current?.clientHeight ?? 0) <= halfHeight) {
      setImgWrapperHeight(1)
      setImgRelativeTop(50)
    } else {
      setImgWrapperHeight(0)
      setImgRelativeTop(0)
    }


  }, [headerCellImgWrappeRec, headerCellImgWrapperRef])

  // const handleBodyScroll = useCallback((ev:any)=>{
  //   // const scrollTop = ev.target.scrollTop

  //   // const scrollOffsetVal = scrollTop - scrollRec.current
  //   // scrollOffset.current = scrollOffsetVal
  //   // headerShrink(scrollTop, scrollOffsetVal)

  //   // console.log(ev.target.scrollTop)
  //   // console.log('-------------------')

  //   // if(timerRec.current){
  //   //   clearTimeout(timerRec.current)
  //   //   timerRec.current = null
  //   // }
  //   // timerRec.current = setTimeout(()=>{
  //   //   scrollRec.current = scrollTop
  //   //   headerShrinkForScrollEnd()
  //   // }, 500)
  // }, [scrollOffset, timerRec, scrollRec, headerShrink, headerShrinkForScrollEnd])

  const imgUrl = (new URL('@/assets/imgs/laptop.png', import.meta.url)).toString()
  return (<Wrapper>
    <TopWrapper>左右滑动切换对照卡片</TopWrapper>
    <HeaderWrapper ref={headerWrapperRef} wrapperHeight={headerWrapperHeight}>
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
