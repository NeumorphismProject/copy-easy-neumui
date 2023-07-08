
/**
 * 同步查找 dom 元素
 * @param {string} selectors 同 document.querySelector
 * @returns {Promise<Element | null>} 查找到的 dom 节点
 */
export async function querySelectorSync (selectors:string) {
  // 若一直找不到满足条件的元素，则会最多尝试 20 次，间隔200ms，即 20*200ms = 4s，因为我们认为一个页面如果4秒还没获取到我们需要的元素，那这个页面一定是加载太慢了，重点是要优化页面性能了
  const count = 20 // 最多尝试查找的次数
  const timeMs = 200 // 若没找到满足条件的元素集合，则间隔该时间后，再次尝试查找
  let timeIndex = 0
  let timeEnd = false

  let domNode = document.querySelector(selectors)
  if (domNode) {
    return domNode
  } else {
    timeEnd = !!domNode
    while (!domNode && timeIndex < count && !timeEnd) {
      timeIndex += 1
      domNode = await new Promise((resolve:(value:Element | null)=>void) => {
        setTimeout(() => {
          const domNodeInner = document.querySelector(selectors)
          timeEnd = !!domNodeInner
          resolve(domNodeInner)
        }, timeMs)
      })
    }
    return domNode
  }
}

/**
 * 同步查找满足条件的所有 dom 元素集合
 * @param {string} selectors 同 document.querySelectorAll
 * @param {number} nodeCount 要求数量，默认为0；若设置了数量，则只有查找到的 dom 数量大于或等于这个数，才会返回，否则会继续查找
 * @returns {Promise<NodeListOf<Element>>} 查找到的 dom 节点
 */
export async function querySelectorAllSync (selectors: string, nodeCount:number=0) {
  const needNodeCount = nodeCount < 1 ? 0 : nodeCount
  // 若一直找不到满足条件的元素集合，则会最多尝试 20 次，间隔200ms，即 20*200ms = 4s，因为我们认为一个页面如果4秒还没获取到我们需要的元素，那这个页面一定是加载太慢了，重点是要优化页面性能了
  const count = 20 // 最多尝试查找的次数
  const timeMs = 200 // 若没找到满足条件的元素集合，则间隔该时间后，再次尝试查找
  let timeIndex = 0
  let timeEnd = false

  let domNodeList = document.querySelectorAll(selectors)
  if (domNodeList.length >= needNodeCount) {
    return domNodeList
  } else {
    timeEnd = domNodeList.length >= needNodeCount
    while (domNodeList.length < needNodeCount && timeIndex < count && !timeEnd) {
      timeIndex += 1
      domNodeList = await new Promise((resolve:(value:NodeListOf<Element>)=>void) => {
        setTimeout(() => {
          const domNodeListInner = document.querySelectorAll(selectors)
          timeEnd = domNodeListInner.length >= needNodeCount
          resolve(domNodeListInner)
        }, timeMs)
      })
    }
    return domNodeList
  }
}
