import { useState } from 'react'
import styled from 'styled-components'
import MoveArea from './MoveArea'
import useMove from './MoveArea/useMove'

const Wrapper = styled.div({
  backgroundColor: 'gray',
  width: '100%',
  position: 'fixed',
  top: 0,
  bottom: 0
})

const TopWrapper = styled.div({
  padding: '2px 0',
  textAlign: 'center',
  width: '100%'
})


const HeaderWrapper = styled.div({
  display: 'flex',
  borderTop: '1px solid black'
})

const MoveAreaWrapper = styled.div({
  width: '100%',
  backgroundColor: 'blue'
})

const HeaderCell = styled.div({
  padding: '8px',
  flex: 1,
  textAlign: 'center',
  borderBottom: '1px solid black'
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

const BodyWrapper = styled.div({

})

export default function DiffTableDemo () {
  const [dataList] = useState<Array<any>>((new Array(5)).fill('').map((a,i)=>({...a,unikey:i+1})))
  const {
    moveEffectiveWrapperRef,
    moveAreaRef,
    magicList,
    moveAreaStyle,
    itemSpacing
  } = useMove({list:dataList})
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
      <MoveAreaWrapper ref={moveEffectiveWrapperRef} >
        <MoveArea ref={moveAreaRef} list={magicList} rootStyle={moveAreaStyle} itemSpacing={itemSpacing}>
            <HeaderCellTitle>牛牛笔记本</HeaderCellTitle>
            <HeaderCellImg alt="laptop" src={imgUrl} ></HeaderCellImg>
            <HeaderCellSubTitle>牛牛爱用的笔记本</HeaderCellSubTitle>
        </MoveArea>
      </MoveAreaWrapper>
    </HeaderWrapper>

  </Wrapper>)
}
