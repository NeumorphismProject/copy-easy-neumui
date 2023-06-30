import { useState } from 'react'
import styled from 'styled-components'
import MoveArea from './MoveArea'
import useMove from './MoveArea/useMove'

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
  borderTop: '1px solid black'
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

const HeaderCellImg = styled.img({
  margin: '8px',
  height: '60px'
})

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
  overflowY: 'auto'
})

export default function DiffTableDemo() {
  const [dataList] = useState<Array<any>>((new Array(5)).fill('').map((a, i) => ({ ...a, unikey: i + 1 })))
  const [rowList] = useState<Array<any>>((new Array(15)).fill('').map((a, i) => ({ ...a, unikey: `row_${i + 1}` })))

  const insideEffectiveWrapper = (targetDom: EventTarget | null) => {
    return true
  }

  const {
    moveEffectiveWrapperRef,
    moveAreaRef,
    magicList,
    moveAreaStyle,
    itemSpacing
  } = useMove({
    list: dataList,
    customInsideEffectiveWrapper: insideEffectiveWrapper
  })
  const imgUrl = (new URL('@/assets/imgs/laptop.png', import.meta.url)).toString()
  return (<Wrapper>
    <TopWrapper>左右滑动切换对照卡片</TopWrapper>
    <HeaderWrapper>
      <HeaderCell>
        <HeaderCellTitle>超超笔记本</HeaderCellTitle>
        <HeaderCellImg alt="laptop" src={imgUrl} ></HeaderCellImg>
        <HeaderCellSubTitle>一个你想象不到的笔记本</HeaderCellSubTitle>
      </HeaderCell>
      <HeaderDividingLine />
      <HeaderBaseCell>
        <MoveAreaWrapper ref={moveEffectiveWrapperRef} >
          <MoveArea ref={moveAreaRef} list={magicList} rootStyle={moveAreaStyle} itemSpacing={itemSpacing}>
            <HeaderCellTitle>牛牛笔记本</HeaderCellTitle>
            <HeaderCellImg alt="laptop" src={imgUrl} ></HeaderCellImg>
            <HeaderCellSubTitle>牛牛爱用的笔记本</HeaderCellSubTitle>
          </MoveArea>
        </MoveAreaWrapper>
      </HeaderBaseCell>
    </HeaderWrapper>

    <BodyWrapper>
      {rowList.map(r=>(<HeaderBaseWrapper key={r.unikey}>
        <HeaderCell>
          <HeaderCellTitle>超超笔记本</HeaderCellTitle>
          <HeaderCellImg alt="laptop" src={imgUrl} ></HeaderCellImg>
          <HeaderCellSubTitle>一个你想象不到的笔记本</HeaderCellSubTitle>
        </HeaderCell>
        <HeaderDividingLine />
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
