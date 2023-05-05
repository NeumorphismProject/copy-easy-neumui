import { SingleLoopSwipper } from '@/ecc-lib'

const swipperData = [{
  unikey: '1',
  imgUrl: 'https://cdn.pixabay.com/photo/2023/04/05/09/44/landscape-7901065__340.jpg'
}, {
  unikey: '2',
  imgUrl: 'https://cdn.pixabay.com/photo/2023/04/17/18/46/modlin-fortress-7933060__340.jpg'
}, {
  unikey: '3',
  imgUrl: 'https://cdn.pixabay.com/photo/2023/04/18/18/38/atv-7935771__340.jpg'
}, {
  unikey: '4',
  imgUrl: 'https://n.sinaimg.cn/sinacn10106/685/w2048h1037/20190828/18ca-icuacsa3959812.jpg'
}, {
  unikey: '5',
  imgUrl: 'https://img-baofun.zhhainiao.com/fs/046dca7118b88a46a2ff486e6b12afe5.jpg'
}]

export default function SwipperDemo() {
  return (<SingleLoopSwipper list={swipperData} />)
}
