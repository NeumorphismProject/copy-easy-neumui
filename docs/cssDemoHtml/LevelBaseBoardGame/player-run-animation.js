// 玩家雪碧图跑步运动动画控制器
function PlayerRunAnimationController() {
  // 禁止直接调用该构造函数
  if(!new.target) throw Error('can not invoke without new')

  // 玩家跑步运动控制（通过background-position控制雪碧图裁剪区域实现）
  let playerRunActionInterval = null
  let playerRunActionImgClipPosition = null // [x,y] 每次动画帧移动都会改变这个坐标

  /**
   * 设置图片对应的dom元素
   * @param {Node} imgBox 玩家背景图存放的 div box
   */
  this.setPlayerImgBoxDom = (imgBox) => {
    this.imgBoxDom = imgBox
  }

  /**
   * 判断玩家动画是否在跑步运动中（通过background-position控制雪碧图裁剪区域实现）
   * @returns {Boolean}
   */
  this.checkRunning = () => !!playerRunActionInterval

  /**
   * 启动跑步动画
   * @param {{ start:Array<number>, end:Array<number>, rowEndX:number, frameLen:Array<number>, playMs:number }} animationOptions
   */
  this.startRun = (animationOptions) => {
    const { start, end, rowEndX, frameLen, playMs } = animationOptions
    if (playerRunActionInterval) return
    playerRunActionInterval = setInterval(() => {
      // 雪碧图切换
      if (!playerRunActionImgClipPosition || (playerRunActionImgClipPosition[0] >= end[0] && playerRunActionImgClipPosition[1] >= end[1])) {
        playerRunActionImgClipPosition = [...start]
      } else {
        const [x, y] = playerRunActionImgClipPosition
        let nextX = 0
        let nextY = 0
        if (x >= rowEndX) {
          nextX = start[0]
          nextY = y + frameLen[1]
        } else {
          nextX = x + frameLen[0]
          nextY = y
        }
        playerRunActionImgClipPosition = [nextX, nextY]
      }
      // 更新动画预览图片
      const [bpx, bpy] = playerRunActionImgClipPosition
      this.imgBoxDom.style.backgroundPosition = `${bpx}% ${bpy}%`
    }, playMs)
  }

  /**
   * 停止跑步动画
   * @param {Array<number>} start [0,0] 第一帧图片的坐标
   */
  this.stopRun = (start) => {
    playerRunActionInterval && clearInterval(playerRunActionInterval)
    playerRunActionInterval = null
    playerRunActionImgClipPosition = null
    this.imgBoxDom.style.backgroundPosition = `${start[0]}% ${start[1]}%`
  }
}
