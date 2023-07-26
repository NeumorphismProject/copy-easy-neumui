/** 游戏关键数据的全局变量脚本：该文件会被作为游戏数据模板处理，sence-creator.html 中会读取这些模板数据，然后进行打包生成一份新的配置数据 */

const GAME_SENCE_BACKGROUND_IMAGE = '' // 整个游戏场景的背景图（为了游戏效果，背景图不会自适应，游戏场景中的每个物体目前均以px为单位进行布局，位置需要与背景图相对应）
const PLAYER_X_START_SPEED = 4 // 玩家移动初速度
const PLAYER_Y_FREE_FALL_STEP_SPEED = 8 // 控制玩家下落速度的单位值
const PLAYER_Y_JUMP_START_SPEED = 20 // 玩家跳跃的初速度值
const PLAYER_BORTH_POSITION = [250, 0] // 玩家出生位置
const COIN_COLLISION_OFFSET = 10 // 玩家与金币碰撞的边缘计算偏移量（为了体验更好，玩家需要进入金币div一定的范围内部才会让金币被碰撞而消失）
const PLAYER_SPRITES_BACKGROUND_POSITION_DEFALUT = [5.5, 7] // 玩家雪碧图背景的 background-position 的初始值（实际在css中的单位时百分比%）

// 玩家得分
let playerScore = {
  value: 0, // 当前得分
  append: 0 // 追加得分属性
}

// 玩家运动初速度 [x,y]
let playerSpeed = [0, 0]
// 玩家尺寸
let playerSize = [54, 32]
// 玩家角色图片
let playerSpritesBackgrundImageUrl = 'url("./cat-sprites.jpg")'
// 用于播放玩家跑步运动时，雪碧图不断切换的一些参数（目前仅支持 x 轴，即仅支持行上的动作切换）(这里的属性都是百分比值，即使用在 background-position:0% 0% 中)
let playerSpritesRunActionAnimationOptions = {
  startX: PLAYER_SPRITES_BACKGROUND_POSITION_DEFALUT[0], // 第一个动作图片的 x 坐标
  endX: 95.5, // 最后一张动作图片的 x 坐标（若达到最后一张，会自动切换回第一张动作图片的 x 坐标）
  stepLen: 30, // 每次切换下一张动作图片的 x 坐标步长
}

// 游戏画面中的砖块集合
let blocksData = []
// 金币集合
let coinsData = {
  value: [],
  removeCoinId: null // 通过对 coinsDataProxy.removeDomId = 1; 这种方式传值可以实现删除 value 中指定的数组元素，且会自动移除对应的dom元素
}

