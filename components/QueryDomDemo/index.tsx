import { useEffect } from 'react'

export interface QueryDomDemoProps {
  demoName: string
}

export default function QueryDomDemo ({demoName}:QueryDomDemoProps) {

  // 这种方式是获取不到 document.querySelector('.qd-wrapper') 这个dom的，因为这个dom是根据 demoName 动态渲染的
  // 首次渲染的时候，demoName 这个变量是空字符串，所以这个dom还没被渲染出来
  useEffect(()=>{
    const queryDom = document.querySelector('.qd-wrapper')
      console.log(queryDom)
      if(queryDom){
        queryDom.innerHTML = '战斗力：' + (Math.random() * 100).toFixed(2)
      }
      return () => {
        if(queryDom){
          queryDom.innerHTML = ''
        }
      }
  }, [])

  /* -- 通过 requestAnimationFrame 等到下一帧 UI 绘制后去查找元素也是可以的，但是这种方式不精确，万一你的 UI 再在后续的渲染帧后执行，那第一次等待还是不一定能获取到dom的 -- */
  // useEffect(()=>{
  //   requestAnimationFrame(()=>{
  //     const queryDom = document.querySelector('.qd-wrapper')
  //     console.log(queryDom)
  //     if(queryDom){
  //       queryDom.innerHTML = '战斗力：' + (Math.random() * 100).toFixed(2)
  //     }
  //     return () => {
  //       if(queryDom){
  //         queryDom.innerHTML = ''
  //       }
  //     }
  //   })
  // },[])

  useEffect(()=>{
    const queryDom = document.querySelector('.qd-wrapper')
      console.log(queryDom)
      if(queryDom){
        queryDom.innerHTML = '战斗力：' + (Math.random() * 100).toFixed(2)
      }
      return () => {
        if(queryDom){
          queryDom.innerHTML = ''
        }
      }
  }, [demoName])

  return (<div>
    {demoName && <div className='qd-wrapper'>{demoName}</div>}
  </div>)
}
