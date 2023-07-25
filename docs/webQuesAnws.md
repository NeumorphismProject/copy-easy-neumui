* 关联文章：[>>>前端刷题方向推荐<<<](https://juejin.cn/post/7248967382961471549)
* 关联文章：[>>>高级前端--Web方向面试题（只有问题）<<<](https://juejin.cn/post/7255595259014201404)


## 算法相关

### 前端面试中的算法题目如何准备?

建议在LeetCode等在线刷题平台上通过题目分类来进行刷题,比如数组、字符串、动态规划等类型的算法题。重点是理解刷题思路,不要死记硬背题目。面试中可能需要写出解题代码,所以要提前练习编码能力。

## Html相关

### meta标签的作用是什么?都可以用来做什么?

meta标签可以用来定义页面的元信息,用于描述页面的内容、关键词、编码格式、刷新等。常见的meta标签有定义关键词的keywords,定义页面描述的description,定义页面编码的charset,定义页面自动刷新间隔的refresh等。

### script标签应该放在html的哪个位置?为什么?

script标签引入的JavaScript脚本应该放在页面的</body>闭合标签之前。因为浏览器解析HTML是从上到下顺序解析的,如果把script标签放在头部,JavaScript脚本将在页面DOM渲染之前执行,此时可能会访问到未准备好的DOM,导致出错。而将script标签放在</body>之前,可以确保先解析页面的DOM元素,再执行脚本,访问到的DOM内容是准备好的。

### 什么是盒模型?

盒模型(Box Model)用来设定一个元素在网页布局中如何显示,盒模型组成包含内容(content)、内边距(padding)、边框(border)和外边距(margin)。通过盒模型可以精确控制一个元素占用的空间和位置。

### 什么是BFC?BFC有什么特点?

BFC指块格式化上下文(Block Formatting Context),它具有如下特点:

- BFC在页面中是一个隔离的布局环境,内外元素互不影响
- BFC垂直方向的距离由margin决定,属于同一个BFC的相邻Box垂直外边距会发生重叠
- BFC区域不会与浮动元素区域重叠
- BFC是一个包含块,可以包含浮动元素
- 计算BFC高度时,浮动元素也会参与计算

利用BFC可以解决浮动元素带来的问题,也可以避免margin重叠等布局问题。

### html中事件的冒泡和捕获过程是什么?如何只执行其中一种?

冒泡和捕获描述了事件传播的两个阶段:

- 冒泡:事件从触发元素向上传播到DOM树的最上级节点。
- 捕获:事件从最上级节点往下传播到实际触发事件的节点。

可以通过addEventListener的第三个参数配置true或者false,来指定只使用事件捕获或事件冒泡阶段:

```js
// 只使用捕获阶段
ele.addEventListener(eventName, fn, true)

// 只使用冒泡阶段
ele.addEventListener(eventName, fn, false)
```

### 你了解shadow dom吗?它在什么场景下会使用?

Shadow DOM可以将一个DOMsubtree封装到一个组件内部,实现组件的封装与隔离。组件内部的DOM改变只会影响组件内部,不会影响页面其他部分,有利于实现组件的封装。

常见的使用场景:

- 组件封装:组件内部的模板、样式实现跟外部页面的隔离
- Encapsulate styles: 使样式只应用在shadow DOM内而不外泄
- Simpler scoping: shadow DOM形成了一个代码封装和作用域隔离的容器

利用Web Components可以封装独立的组件逻辑,实现可复用、可组合的组件系统,对组件化开发很有意义。

### HTML5新增了哪些功能?

HTML5进行了大规模升级,新增的功能很多,主要包括:

- 新的语义化标签,如header、nav、footer、section等
- Canvas 2D绘图
- 对音频和视频的支持
- 对本地存储的支持,包括sessionStorage和localStorage
- 对语义Web的支持,如article、footer、header等标签
- 新的表单控件,如calendar、date、time、email、url、search等
- 新的API,如地理位置、拖放API、WebSocket等
- 网页多媒体变得更容易,如使用video、audio标签播放多媒体

### 什么是MutationObserver,它有什么作用?

MutationObserver是一个Web API,可以监听DOM变动事件。当DOM对象树发生任何变动时,MutationObserver会得到通知。这种机制取代了以前的Mutation Events功能。

使用MutationObserver主要有以下优势:

- 能观察整个DOM树的变动
- 可以设置观察什么类型的变动,如子节点、属性等
- 变动记录会存入队列,可以对多次变动进行合并处理
- 通过回调函数异步处理观察结果,不会影响页面性能

所以MutationObserver常用于需要对DOM变动作出响应的场景,如动画效果等。

### 如何实现资源的预加载?

实现资源预加载常用的技术主要有两种:

- 使用<link>标签,设置rel="preload"可以让浏览器提前加载该资源,语法如:

  ```html
  <link rel="preload" href="image.png" as="image">
  ```

- 使用HTTP头部的Link字段实现预加载,格式如:

  ```
  Link: </assets/script.js>; rel=preload; as=script
  ```

预加载让浏览器提前请求资源文件,对于需要快速使用的资源可以缩短加载时间,改善用户体验。需要注意,过度预加载会消耗带宽和设备能力。

### 如何为一个网页添加水印?

实现网页水印的方式有服务端生成和前端生成两种,对于前端生成水印主要技术步骤是:

1. 创建一个canvas元素,并使用canvas API生成带水印的图像
2. 将canvas转为Img,并作为背景图来显示水印
3. 将该水印元素通过CSS定为绝对定位,并设置为网页底层
4. 对水印元素增加POINTER-EVENTS属性,使其不遮挡交互事件

这样可以实现一个页面可见但不影响交互的水印效果。

### 如何实现网页或区域截图?

实现页面截图主要通过HTMl5 canvas元素来完成,常用的方式是:

1. 使用html2canvas库解析页面DOM生成canvas
2. 通过toDataURL或canvas.toBlob获得图像数据
3. 生成一个a元素用于下载图片或上传服务器
4. 可以通过cropper.js等库实现局部区域截图

如果要完美兼容各种浏览器(如老版本IOS不支持toBlob),也可以发送DOM给后端服务生成图片再返回前端。

## Css相关

### 说明移动端的适配方案。

常用的移动端适配方案包括:

1. 使用CSS的@media query针对不同宽度的屏幕设置根字号或样式
2. 使用REM,通过调整html的font-size来进行适配
3. 使用百分比布局、不定宽高元素自适应
4. 使用flex弹性布局
5. 使用图片等比缩放
6. 使用一些UI框架也可以简化适配工作

综合使用这些方式可以使页面在不同尺寸屏幕上效果良好。

### CSS3新增了哪些功能?

CSS3对CSS进行了大规模升级,主要新增的功能包括:

- 圆角:border-radius属性
- 阴影:box-shadow属性
- 渐变:gradient相关属性
- 转换:transform属性实现元素变形
- 动画:keyframes、animation属性实现CSS动画
- Flexible box(弹性盒布局):flex相关属性
- 媒体查询:@media规则适配不同设备
- 新增选择器:结构性伪类选择器等
- 多背景图像

以及其他各种视觉、动画等方面的增强。使CSS具有了更强的呈现能力。

### CSS的几种引入方式及其权重?为什么避免过多使用style?

CSS的引入方式主要有:

- 行内样式:在标签style属性中定义
- 内嵌样式:在HTML文档头部使用style定义
- 外链样式:通过link标签引入外部CSS文件

优先级从高到低依次是:行内样式 > 内嵌样式 > 外链样式。

避免过多使用style的原因:

- style标签在渲染时会阻塞页面加载
- 过多样式混杂在HTML中,导致内容不够语义化
- 内联样式优先级高可能会导致样式冲突问题
- 编写CSS较多时维护困难

所以推荐使用外链的独立CSS文件进行样式管理。

## Javascript基础相关

### 什么是作用域?变量提升是什么?

作用域指的是一个变量存在的范围。在JS中主要有全局作用域和函数作用域。

变量提升是JS特有的一种机制,在代码执行前,会将函数和变量声明提升到函数作用域的顶部。

这个特点可以让我们在函数内部任何地方使用函数内部声明的变量和函数。但也可能由于提升导致一些逻辑错误或难以理解,需要注意。

### 什么是闭包?

闭包(Closure)是可以访问另一个函数内部变量的函数。闭包可以让一个函数保持对原始定义作用域的引用,所以使得这个函数可以继续访问定义函数的变量。

产生闭包的条件是:

- 必须有一个内嵌函数
- 内嵌函数必须引用上外层函数的变量
- 外层函数返回内嵌函数

然后内嵌函数就拥有了外层函数作用域的访问权,形成了闭包。

### 什么是副作用?什么是纯函数?

副作用指函数执行过程对函数外部可观察的状态产生的影响,如修改全局变量、修改参数、打印日志等都是副作用。

纯函数是无副作用的函数,它具有以下特点:

- 不修改函数外部状态
- 相同的输入总是得到相同的输出
- 不依赖外部状态、只依赖输入参数
- 没有可观察的副作用

纯函数可以避免外部状态被修改,更易于测试和理解。

### EventLoop的理解是什么?

JavaScript采用事件循环模型执行代码。Event Loop负责监听调用栈和任务队列,按照规则判断是否将任务队列的任务添加到调用栈中执行。

每个事件循环都有一个任务队列,可以分为宏任务和微任务。常见的宏任务包括setTimeout等,微任务包括Promise回调等。调用栈执行完毕后会先执行当前微任务队列的所有任务,然后按规则读取宏任务并执行。

这种机制决定了JavaScript代码的执行顺序,需要理解Event Loop的运作,才能更好地编写JavaScript程序。

### 如何判断一个对象是否为数组?

常用的判断一个对象是否为数组的方法有:

1. 使用Array.isArray(obj)判断

2. 使用Object.prototype.toString.call(obj)获取对象类型判断:

```js
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}
```

3. 检测是否存在数组的length属性和可迭代性:

```js
function isArray(obj) {
  return obj && typeof obj === 'object' && Number.isInteger(obj.length) && !obj.nodeType
}
```

这些方式覆盖了不同的数组类型,可以准确判断数组类型。

### ES6及之后新增了哪些特性?

ES6及之后JavaScript版本新增的主要特性包括:

- 新增关键字let、const、class
- 模板字符串
- 箭头函数
- 函数默认参数、剩余参数
- 解构赋值
- 模块和导入/导出模块
- 生成器函数
- Promise异步编程
- Async/await异步方法
- 数组新方法,如find、includes等
- 对象方法扩展,如Object.assign等
- Set、Map数据结构
- 类和继承extends
- ...等等

### set、map、weakSet、weakMap的区别是什么?

- Set是普通集合,只能包含值。
- WeakSet集合只能包含对象,里面的对象是一个个弱引用。
- Map是键值对集合,可以包含任何类型的键和值。
- WeakMap的键名只能是对象,值可以是任意类型,键名指向键值也是弱引用。

区别主要在于WeakSet和WeakMap的引用为弱引用,如果没有其他引用链会释放对象,可以用来防止内存泄漏。后两者只能使用对象作为键名也是为了利用这个特点。

### void 0的作用是什么?

void 0主要的作用是获取undefined的值。在全局作用域中undefined是可以被重写的,为了获取确定为undefined的值,使用void 0是一个好习惯。

例如,下面的赋值可以改变undefined的值:

```js
var undefined = 'xxx'
```

使用void 0可以避免被覆盖,从而安全地得到undefined。

### 什么是函数的二义性?如何避免?

函数二义性指一个函数既可以被当作普通函数直接调用,也可以当作构造函数通过new关键字执行。这会引起一些语义上的困扰。

可以通过下面两种方式避免函数二义性:

1. ES6新增class只能作为构造函数,不能直接调用

2. 在函数内部判断执行方式,阻止对函数的误用

```js
function fn() {
  if (new.target) {
    // 当前被 new 调用
  } else {
    // 被直接调用,报错
    throw new Error('必须使用 new 调用')
  }
}
```

### 如何同时发起多个异步任务?Promise有哪些并发方式?

发起多个异步任务的常用Promise方法主要有:

- Promise.all:将多个Promise包装,全部resolve才成功,有一个reject则直接reject
- Promise.race:谁 resolve/reject 的最快,就采纳第一个
- Promise.allSettled:所有任务都执行完,按顺序给出结果
- Promise.any:只要有一个 resolve 就resolve,所有任务如果都 reject 才 reject

它们可以以并发的方式发起多个异步任务,然后统一处理结果。根据需要选择不同的并发方法。

### 你了解Symbol吗?它有哪些特点?

Symbol是ES6新增的一种基本数据类型,表示独一无二的值。Symbol的特点包括:

- Symbol值通过Symbol函数生成,每次调用都会返回一个唯一的值
- Symbol值可以作为对象属性的标识符,防止属性名冲突
- Symbol值不与其他数据进行运算,也不可与字符串拼接
- for()方法可以生成同一个Symbol值
- Symbol可以定义共享的常量,作为类或对象的私有属性标识

通过Symbol可以生成一个独一无二的标识符,常用于定义对象的私有属性等场景。

### 什么是js的可迭代协议?

可迭代协议(Iterable Protocol)是ES6规定的一种约定,使得一个对象可以定义或定制它的迭代行为,也就是可以被for-of循环遍历。

具体来说,一个可迭代对象必须实现@@iterator方法,该方法返回一个带有next()方法的迭代器对象。next()方法每次返回一个包含value和done属性的对象,这样就可以不断获取序列中的下一个值。

只要对象实现了这个协议,即可被for-of、展开语法、解构等特性调用。内置类型如Array、String都实现了可迭代协议。

### 为什么Array是可迭代的,而Object不是?如何让Object可迭代?

- Array实现了可迭代协议,有默认的@@iterator方法,所以是可迭代的。

- Object没有实现@@iterator方法,所以不是可迭代对象。

可以通过为Object定义@@iterator方法使其可迭代:

```js
Object.prototype[Symbol.iterator] = function() {
  let keys = Object.keys(this)
  let index = 0
  return {
    next: () => {
      return {
        value: this[keys[index++]],
        done: index > keys.length
      }
    }
  }
}
```

这样就可以使用for-of遍历对象了。

### 如何实现对象解构赋值const [a,b] = {a:1, b:2, c:3}?

可以通过两个方式实现对象解构赋值:

1. 给对象定义@@iterator方法,返回一个迭代器:

```js
let obj = {a:1, b:2, c:3}

obj[Symbol.iterator] = function() {
  // 返回 [a, b] 迭代器
}

const [a, b] = obj
```

2. 使用Object.entries和数组解构

```js
const {a, b} = Object.entries({a:1, b:2, c:3})[0]
```

两种方式都可以实现从对象中获取指定属性作为解构目标。

### 如何实现大文件上传?

实现大文件上传的方法:

1. 利用File对象的slice方法,分片切割文件

2. 计算切片大小,一般为几MB到几十MB

3. 在前端通过循环切片,生成多个FileBlob对象

4. 将Blob通过FormData AJAX上传

5. 后端收到切片后写入目标文件

6. 所有切片上传完成,合并切片得到完整文件

这样通过分片上传可以支持大文件上传,不会消耗用户大量带宽和内存。

### 如何统计页面停留时间?

统计页面停留时间常用的方法是:

1. 通过visibilitychange和pagehide等事件判断页面状态

2. 在页面打开时记录一个时间戳startTime

3. 在页面关闭、切换时记录时间戳endTime

4. 通过endTime-startTime计算出停留时间

也可以使用Performance API记录时间更精确。

需要处理页面切换、浏览器回退等情况。综合几种事件可以计算出准确的停留时长。

### 零宽字符有什么作用?

零宽字符是不占用可见宽度的Unicode字符,常见的包括零宽连词符、零宽ESPACE等。

零宽字符的常见用途包括:

- 用于语法分析及代码编辑
- 隐形水印,追踪内容复制来源
- 调整文本字符距离
- 作为文本的标记和分隔符
- 防止视觉混淆的字符用来欺骗过滤器

它可以在不占用显示空间的情况下在文本中插入信息,适合各种标记、打点等用途。

### 你对Web Components的理解是什么?

Web Components是一种通过原生JS实现可复用组件逻辑的技术规范,主要包含:

- Custom Elements: 定义自定义HTML标签
- Shadow DOM: 组件封装的文档片段
- HTML Templates: HTML模板代码段
- HTML Imports: 导入HTML文档作为模板

利用Web Components可以封装独立的组件逻辑,实现可复用、可组合的组件系统,对组件化开发很有意义。

### 如何实现资源的懒加载?

常见的资源懒加载实现方式:

- 图片懒加载:判断元素进入视口才加载
- 基于事件或IntersectionObserver监听
- 动态创建script、iframe等标签异步加载
- 按需加载路由组件
- 第三方框架实现列表懒加载

核心都是判断元素进入可视区域才触发加载,减少资源占用和加载时间,提高体验。

### 如何监听浏览器资源加载进度?

监听浏览器资源加载进度常用的方法:

- 通过Performance API的resourcetiming缓冲区
- 可获取各资源加载时间、从缓存获取等信息
- 计算loadTime和fetchTime得出资源加载进度
- 可通过进度事件发送网络请求
- 也可以借助第三方工具如progress-bar-4-axios实现

这样可以监听页面资源总体加载情况,以及每个资源的加载进度。

## 设计模式相关

### 设计模式的七大原则是什么?

设计模式的七大原则:

- 单一职责原则 - 一个程序只做该做的事情
- 里氏替换原则 - 子类可以扩展父类的功能,但不能破坏父类原有的功能
- 依赖倒转原则 - 面向接口编程,依赖于抽象而不依赖于具体实现
- 接口隔离原则 - 不应强迫客户依赖他们不需要的接口
- 迪米特法则 - 一个对象应对其他对象有最少的了解
- 开闭原则 - 软件实体应对扩展开放,对修改关闭
- 组合/聚合复用原则 - 优先使用合成/聚合,而不是继承

这些原则是编写优秀面向对象程序的指导思想。

### 项目中用到了哪些设计模式?

这个视项目而定,常见的设计模式包括:

- 单例模式 - 系统只存在一个实例
- 工厂模式 - 将实例化操作委托给工厂类
- 适配器模式 - 转换接口适配不同对象
- 代理模式 - 使用代理控制对对象的访问
- 观察者模式 - 对象状态变化时通知其他对象
- 策略模式 - 封装算法使其可互换
- 模板方法 - 提供算法框架,延迟到子类实现
- 外观模式 - 提供简化的接口访问子系统

要根据实际场景选择合适的设计模式。

### 什么是依赖注入?项目中用到过吗?

依赖注入(DI)是一种设计模式,其核心思想是:

- 将对象依赖的其他对象传入(注入)到该对象中
- 而不是在对象内部直接创建依赖对象

依赖注入的目的是提高模块的解耦性,通过依赖注入容器生成对象及其依赖并注入,而非对象内部直接建立依赖。

在Vue、Angular等框架中都有依赖注入的实现,用于构建服务等。

### “发布订阅模式”和“观察者模式”的区别是什么?

发布订阅模式和观察者模式的主要区别是:

- 发布订阅模式中,发布者和订阅者不直接通信,通过消息代理进行解耦
- 观察者模式中,观察者可以直接调用主题(被观察者)的方法

发布订阅模式通过事件机制解耦,而观察者模式通常是同步的直接调用。

此外,观察者模式通常一对多订阅,而发布订阅模式可以一对多也可以一对一。

## webpack相关

### loader和plugin的区别是什么?

在webpack中,loader和plugin的区别在于:

- loader主要用于转换源文件,它接收源文件并将其转换为新文件
- plugin扩展了webpack的功能,在webpack运行的生命周期中注入钩子,实现比loader更广的任务

例如,loader可以转换JSX,TS,而plugin可以打包优化、资源管理、环境变量注入等。

loader转换单个文件,而plugin更强大。

### 模块化发展历程是什么?

JavaScript模块化发展历程经历了以下阶段:

- 全局函数:直接定义在全局作用域,污染命名空间
- IIFE模块:使用立即执行函数构建隔离作用域
- CommonJS: 在服务器端实现同步加载模块
- AMD: 浏览器端实现异步加载模块
- CMD: CommonJS在浏览器端的实现
- ES Module: 原生实现静态导入导出语法

发展目标是实现可重用、松耦合的模块化开发与复用。

### webpack的import原理?

webpack处理import的关键步骤:

1. 解析源码,提取import依赖声明
2. 根据依赖建立模块图谱,包含依赖关系
3. 将所有模块放入一个code-splitting的chunks中
4. 通过__webpack_modules__实现模块引入,__webpack_require加载模块
5. 运行时通过jsonpInject异步注入模块代码

这样webpack实现了CommonJS到浏览器端的功能映射,通过import加载模块资源。

### webpack如何实现动态导入?

webpack实现动态导入的方法主要有两种:

1. 使用魔法注释语法,以注释方式声明chunkName

```js
import(/* webpackChunkName: "chunk-name" */ './module')
```

2. 在optimization选项中配置splitChunks,实现代码分割:

```js
splitChunks: {
  chunks: 'async'
}
```

webpack会将动态导入的模块单独打包为一个chunk。

### require和import的区别?

require和import的主要区别有:

- require是CommonJS规范,动态加载,同步执行
- import是ES Module规范,编译时加载,异步执行
- require是值拷贝,import模块绑定引用
- require可以动态加载,import必须静态声明
- 两者模块缓存略有差异

因此import适合在浏览器环境下使用,可以进行Tree Shaking等优化。

### webpack如何动态加载js模块?

webpack动态加载js模块的方式:

1. 使用魔法注释方法

```js
import(/* webpackChunkName: "module" */ './module')
```

2. 借助第三方库如 loadable-components

```js
import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('./OtherComponent'))
```

3. 利用ES6的动态import特性

```js
const importComponent = async () => {
  const { default: comp } = await import('./OtherComponent');
  // Use comp
};
```

它可以实现按需异步加载js代码,避免初始化加载全部模块代码。

### webpack动态引入的适用场景?

webpack动态导入的常见使用场景:

- 按需加载:只有用户访问时才加载某些非首屏组件
- 代码分割:提取公共代码、拆分bundle,按路由拆分代码
- 懒加载组件:比如下拉加载更多
- 缓存组件:保留组件状态避免重复渲染

动态导入可以按需加载代码、优化性能,主要用于对性能和包体积优化。

## React相关

### React的面试题有哪些?

React常见的面试题包括:

- 虚拟DOM和Diff算法
- setState的工作原理
- 函数组件vs类组件
- 组件间通信方式
- 组件性能优化
- React高阶组件
- React Hooks的应用
- 组件生命周期
- React路由实现
- Redux状态管理
- React组件测试

需要重点掌握虚拟DOM、组件化、性能优化等方面。

### 什么是React的HOC?

HOC(Higher-Order Component)是React的高阶组件,参数为组件,返回值为新组件的函数。

它可以像容器一样包裹组件,用于抽象和重用组件逻辑。

常用场景:

- 权限控制
- 获取数据封装并传入props
- 修改传入的props

HOC是一个reuse组件逻辑的方式,相当于组件的容器。

### class组件与函数组件的区别?

React中class组件和函数组件不同之处主要有:

- class组件有this和生命周期,函数组件通过hooks实现生命周期
- class组件继承React.Component,函数组件仅为普通函数
- class组件中通过state定义和管理状态,函数组件通过useState
- 函数组件性能更高,建议尽量使用函数组件

React推荐使用函数组件代替class组件。

### React hooks的优势?

React Hooks的优势主要有:

- 使函数组件可以使用state等特性
- 复用状态逻辑更方便,不用HOC或render props
- 分离关注点,按照语义化分离代码
- 更简洁易懂的代码,良好的逻辑复用
- 更容易编写测试用例
- 减少嵌套,优化组件性能

Hooks解决了类组件的痛点,是函数式编程思想在React的实现。

### key的作用?

在React中,key的主要作用有:

- 标识元素,用于比对新老节点
- 减少渲染次数,提高diff速度
- 触发组件实例化和销毁生命周期
- 维持状态不变

key要有稳定、唯一、预测性强,从而提升渲染性能。

### class组件与函数组件的生命周期?

class组件的生命周期包含挂载卸载等多个阶段,主要有:

- 初始化阶段:constructor > getDerivedStateFromProps > render > componentDidMount

- 更新阶段:getDerivedStateFromProps > shouldComponentUpdate > render > getSnapshotBeforeUpdate > componentDidUpdate

- 卸载阶段:componentWillUnmount

- 错误处理:getDerivedStateFromError > componentDidCatch

函数组件通过Hooks可以模拟生命周期,常见的有:

- 挂载:useEffect(fn, []) 等同于 componentDidMount

- 更新:useEffect(fn) 等同于 componentDidUpdate

- 卸载:useEffect(fn, () => fn)

- 错误处理:useErrorHandler

### React的状态管理?

React的数据流动默认是单向的,常用的状态管理方式有:

- Context:适用于简单的状态共享

- Redux:集中存储共享状态,配合react-redux

- MobX:利用观察者模式实现响应式状态

- Recoil:Facebook推出的状态管理工具

- Jotai:轻量的原子化状态管理

- XState:基于状态机的库

根据具体需求选择合适的状态管理方案。

### Redux的工作原理?

Redux的工作流程主要包含:

1. Store 用来存储状态数据

2. Action 用于描述事件

3. Reducer 根据Action更新State

4. dispatch(action) 触发 Reducer 并更新 State

5. Subscription 由 Store.subscribe 实现订阅

6. View 通过订阅获取 State 并显示

Redux通过单一数据流形式构建可预测的状态管理。

## Vue相关

### Vue2/3的区别?

Vue2与Vue3的主要区别包括:

- 采用Proxy代替defineProperty实现响应式

- 重写虚拟DOM,提升性能

- Composition API代替Options API

- 支持Fragment、Teleport、Suspense

- 源码采用TypeScript重构

- 移除keyCode作为v-on的修饰符

- ...

Vue3对框架进行了全面升级,性能和功能更优。

### Vue的computed原理?

Vue中的computed实现了懒执行的缓存机制:

- 第一次访问时会计算值并缓存

- 如果依赖未改变,多次访问直接返回缓存值

- 依赖改变时才会重新计算

这样可以避免每次获取都进行高开销的计算,优化性能。

### 为什么Vue的data需要函数返回?

Vue中的data是一个对象,定义为函数返回的原因有几点:

1. 组件可能被复用,每个实例需要各自的数据副本,避免共享造成冲突

2. data如果以对象形式定义,那么会在多个组件实例间共享这个对象

3. 使用函数可以使每个组件实例获得data独立的数据副本

4. 实现了数据的私有化,每个实例可以维护一份被返回对象的独立拷贝

这对实现组件数据的私有化非常重要。

### Vue的组件通信方式?

Vue组件间常用的通信方式有:

- props和自定义事件:父子组件通信

- provide/inject:父组件向后代注入数据

- Event Bus:非父子组件间通过事件总线通信

- Vuex:通过vuex module共享状态

- mitt/rxjs:通过第三方pubsub库信号通信

- $parent/$children:通过组件引用直接访问实例

根据场景选择合适的通信方式。

### Vue2/3的响应式原理?

Vue2通过Object.defineProperty()实现响应式,不能检测到数组变化和新添加的属性。

Vue3使用Proxy代替,直接代理对象实现响应式。原理有:

- 收集依赖(track)
- 触发更新(trigger)
- 缓存(cache)

Proxy可以检测数组变化和新增属性,但需要有原生支持。

### Vue的diff算法?

Vue的diff主要分为三步:

1. patch:对比新旧VNode

2. patchVnode:处理VNode数据变化

3. updateChildren:比对子节点,使用key进行高效比较

优化方案:

- Tag不相同则直接替换
- 使用key唯一标识,使得复用率更高
- 可复用则只更新内容,不可复用则新创建

这样可显著提高比较性能。

### 哪些CSS属性触发重绘重排?

常见触发回流的CSS属性:

- width / height
- padding / margin
- display: none;
- font-size
- overflow
- position等影响布局的属性

触发重绘的属性:

- color
- background-color
- visibility等只影响外观的属性

了解区分可以避免不必要的回流影响性能。

### document的哪些操作触发重绘重排?

document中的常见触发回流的操作:

- 修改dom结构:添加/删除节点
- 获取计算样式:offsetTop、滚动高度
- 读取页面几何信息:getComputedStyle()
- 设置style属性值
- 操作class属性
- 读取location或offset相关数据
- 设置文本内容
- 移动/滚动元素

需要注意避免频繁读取引起不必要的重排。

### v-if/v-show的区别?

v-if和v-show的区别在于:

- v-if是条件渲染,切换时销毁重建节点
- v-show是css display切换,只切换显示隐藏

- v-if有更高的切换消耗,v-show有初始渲染消耗
- v-if适合运营条件不大可能改变的场景
- v-show适合频繁切换的场景

### Vue生命周期的应用场景?

Vue生命周期函数的常见应用场景包括:

- beforeCreate:定义数据观察者或初始化非响应式变量

- created:异步请求数据,依赖DOM的操作

- mounted:访问DOM元素,绑定事件

- beforeUpdate:更新之前访问现有的DOM

- updated:DOM更新后执行依赖DOM的操作

- beforeUnmount:解绑事件等清理任务

- errorCaptured: 出错时的事件捕获处理

根据需要在不同生命周期执行所需逻辑。

### Vue组件的常用选项?

Vue组件中常用的选项包括:

- data: 定义组件状态

- methods:存放方法的哈希表

- computed:计算属性

- watch:监听数据变化

- props:定义组件数据接口

- components:局部注册的子组件

- mixins: 混入代码复用

- directives:自定义指令

等等。这些选项定义了组件的各种逻辑。

### Vue的name属性在哪些场景下必写?

Vue组件name属性的必写场景主要有:

1. 在使用keep-alive缓存组件时,需要name区分缓存key

2. 在DevTools调试时标识组件名称

3. 在递归组件中, name可标识组件位置

4. 和<transition name='xxx'>配合使用

5. vue-router的路由异步组件也需要name

主要是需要区分同类型组件,或与其他特性配合的时候需要使用name。

### Vue的v-model实现原理?

v-model的实现原理:

- 默认绑定input事件监听输入值

- 根据value更新data中的属性值

- 对应prop进行数据初始化和回显

- 一般配合value属性与输入值双向绑定

实现了数据和视图的双向绑定同步。

### Vue2的.sync修饰符的实现?

Vue 2中的.sync修饰符的工作方式:

1. 绑定一个更新父组件值的自定义事件

2. 事件处理函数中调用组件用来更新绑定值的方法

3. 监听自定义事件以更新父组件对应的绑定

这样实现了子向父的双向绑定,但是只适用于组件的prop。

### Vue3的v-model实现?

Vue3的v-model变化:

- 通过modelValue Prop和update:modelValue 事件实现
- 直接在子组件emit事件并抛出新值即可更新
- 父组件监听update:modelValue事件并存入变量
- 简化了.sync修饰符的实现方式

### nextTick的实现原理?

nextTick的实现原理主要是:

- 将回调函数加入微任务队列
- 等待当前任务执行完毕
- 清空微任务队列,执行nextTick队列

这样可以批量更新DOM,优化重排重绘。

### 如何实现一个简易的nextTick?

一个简单的nextTick实现:

```js
function nextTick(callback) {
  // 将回调推迟到下一个事件循环
  setTimeout(callback, 0);
}
```

利用setTimeout将回调推迟到下一个事件循环,实现和nextTick类似的效果。

### Vue3的Composable?

Vue3中的Composable是组合式API,意思是:

- 将逻辑组合成可重用的函数
- 减少样板代码,提高可维护性
- 更好地分离和重用逻辑关注点

常用的Composable包括:

- useState
- useFetch
- useRouter

开发者也可以自定义Composable。它提升了代码的可重用性。

### 列表渲染key的作用?

在Vue的v-for列表渲染中,key的作用主要有:

- key作为唯一标识,用于判断元素是否改变
- 更准确地判断元素是否可复用
- 提高diff的效率,优化渲染性能
- 触发过渡动画执行

所以key要保证稳定、可预测、唯一,这对优化渲染性能很重要。

### Vue的函数组件?

Vue中的函数组件指没有管理任何状态,仅负责接收 prop 并返回输出的组件。

与普通组件相比,函数组件:

- 没有响应式数据
- 没有实例,渲染开销小很多
- 不能访问this,没有生命周期
- 只接收 props ,没有状态

应优先使用,可提高渲染性能。

### jsx的使用场景?

JSX常用于React和Vue中作为语法糖,主要使用场景:

- 声明式创建虚拟DOM,提高可读性
- 与状态管理库如Vuex或Redux集成
- 编写组件库,提高编码体验
- 配合TypeScript强类型检测
- 支持语法高亮和IDE提示
- 生成模板代码的可维护性更好

jsx为声明式的UI渲染提供了便利。

### Vue的jsx实现原理?

Vue中的jsx实现原理:

- 使用babel插件@vue/babel-plugin-jsx进行解析
- 转译JSX为createElement函数调用
- 设置编译时选项@vue/babel-preset-app
- 浏览器运行时编译jsx为vetur虚拟DOM

Vue选项API或组合API都可以配合JSX使用。

### createElement的参数?

createElement主要参数包括:

- {String | Object | Function} 节点标签、组件选项或解析函数
- {Object} 与模板中属性对应的数据对象
- {String | Array} 子级虚拟节点,可以是字符串也可以是数组
- {Object} 组件的子组件,Slots信息会编译为children

返回创建的虚拟节点VNode,用于描述真实DOM。

### 封装组件时如何透传属性和方法?

Vue组件封装时,透传未声明的属性和方法常用的方式:

- 属性使用$attrs传递未声明过的属性
- 方法使用$listeners传递未声明的事件方法

```js
export default {
  inheritAttrs: false,

  props: [],

  emits: [],

  created() {
    console.log(this.$attrs); // 获得透传属性
    console.log(this.$listeners); // 获得透传方法
  }
}
```

这样可以方便地进行透传,实现组件的封装和复用。

### setup的实现原理?

Vue3中的setup实现原理:

1. 创建一个新的 Proxy 代理对象作为响应式上下文

2. 将props解构传入上下文,统计依赖

3. 执行setup函数,返回函数或对象

4. 将setup返回值挂载到render上下文

5. effect自动收集依赖,trigger触发响应

setup为组件提供了统一的响应式编程模型。

## 浏览器相关

### Chrome的samesite属性了解吗?

SameSite是一个Cookie的属性,用来提供第三方Cookie的跨站限制,主要作用是防止CSRF攻击。

它有两种模式:

- None:默认,跨站设置Cookie
- Lax:大多数请求允许跨站Cookie
- Strict:禁止第三方Cookie,只在同站设置和发送

Chrome最近在SameSite上有更新,开发者需要注意跨域请求所依赖的Cookie设置。

### 限制请求资源个数的原因?

使用 HTTP/1.x 协议,浏览器同一时间对于同一域名的资源请求数量是有限制的,最大允许6个。

限制请求资源个数主要出于以下考虑:

- 浏览器处理请求和响应的线程数有限
- 预防DDOS攻击
- 防止某一个域名独占所有的tcp连接数

所以对资源请求数量进行了限制。

### http2如何解决请求资源限制?

HTTP/2协议使用了多路复用机制,在一个TCP连接上可以并行交错的传输多份请求和响应数据。

- 一条连接上的多数据流可以互不干扰
- 二进制分帧减少协议开销
- 服务端推送机制
- 头部压缩节省带宽

这样就不存在明显的请求数限制,并发请求和资源下载更加高效。

### 浏览器存储方式有哪些?

常见的浏览器存储方式包括:

- Cookie:存储少量数据,每次请求都会发送到服务器

- LocalStorage:键值对存储,存储在客户端,容量较大,不会自动发送到服务器

- SessionStorage:与LocalStorage类似,但数据只存在于当前会话,窗口或标签关闭则清空

- IndexedDB:键值对存储,可以存储结构化克隆对象,大容量存储

- Cache API:缓存请求或其他数据,作用域为窗口或者服务工作器

- WebSQL:基于SQL的关系型数据库,已不推荐使用

根据需要选择合适的浏览器存储方式。

### session、cookie、sessionStorage的区别?

session、cookie和sessionStorage的区别主要在:

- 作用域:cookie可跨域名,其他两者当前源限制

- 生命周期:cookie可设置过期时间,sessionStorage对应session,关闭则清空

- 存储大小:cookie 4kb左右,sessionStorage约5MB,localStorage更大

- 请求发送:cookie会自动发送,后两者仅在客户端

- 用途:cookie常用于存储用户信息,localStorage用于持久保存数据

- API访问:cookie直接document.cookie,后两者直接localStorage对象

根据实际需要选择合适的浏览器存储方式。

### 如何监听页面关闭事件?

常用的页面关闭事件监听方式:

- window.onbeforeunload,页面关闭前执行

- window.onunload,页面完全卸载时

- document.addEventListener('visibilitychange', fn) 监听visibilityState

或者结合pagehide等事件判断页面状态。

需要注意浏览器兼容性问题,跨浏览器支持比较复杂。

### 浏览器的跨页签数据共享方案?

浏览器跨页面签数据共享的实现方式:

1. localStorage 或 IndexedDB存储数据,不同页签可共享

2. Broadcast Channel API,用于页面间通信

3. Service Worker 也可以用于数据共享

4. 父级域名设置cookie,页面可共享读取

5. Location Hash 也可进行有限数据共享

可以根据需要选择合适的跨页签数据共享方案。

您提醒得非常到位,我漏掉了几个分类标题,深感抱歉。已经把漏掉的分类补充上,并把相关问题一起重新输出如下:

## 浏览器性能优化相关

### chrome性能测试里的关键参数有哪些?

Chrome性能面板常看的关键指标:

- FPS: 动画或滚动时每个帧的耗时,越高越好

- CPU:各个事件所占用的CPU时间

- NETWORK:页面资源加载时间等网络指标

- HEAP:内存占用及泄漏相关

- JS PROFILE: hot path 等 JS执行分析

这些指标可以分析页面的渲染、加载、资源、内存等性能。

### 一个网站打开页面卡顿的常见问题有哪些?举例说明几个,并说明下常用的解决方案

页面卡顿的常见原因:

- 图片未压缩,资源体积太大

- CSS/JS文件体积过大

- 重复DOM操作引起频繁重排重绘

- 内存泄漏导致频繁GC

- 频繁网络请求阻塞页面

解决方案:

- 代码优化,减少DOM操作

- 图片懒加载

- 避免大体积资源导致主线程阻塞

- 合理使用web worker分离线程

- 预编译、缓存等手段

需要定位具体原因进行有针对性优化。

### 类似一个官网页面向下滚动时画面卡顿的情况遇到过吗?这种卡顿情况一般可能是什么问题导致的?又该怎么优化呢?

页面滚动卡顿的原因:

- 重绘重排频繁导致计算过慢

- 渲染区域过多节点,需要大量计算样式

- 触发频繁的GPU合成

解决方式:

- optimize-css-assets-webpack-plugin压缩css

- shouldComponentUpdate优化渲染

- 减少不必要的重排重绘

- 避免过深DOM树

- 使用will-change提示浏览器提前合成层

主要还是需要定位优化重绘重排和页面合成。

## 前端架构相关

### 前端的单元测试有写过吗?有哪些单元测试框架(vue2/3、react的相关单测框架)

常用的前端单元测试框架包括:

- Jest: Facebook出品,适合React应用

- Mocha: 简单灵活,搭配Chai使用

- Jasmine: 语法简单清晰的BDD框架

- Karma: 运行测试用例的Test Runner

- Cypress: 端到端测试框架

- puppeteer: Headless Chrome测试

可以根据具体项目需求选择合适的框架。

### 前端安全问题有哪些?

前端常见的安全问题包括:

- XSS攻击:注入恶意脚本,盗取信息

- CSRF攻击:跨站请求伪造攻击

- 点击劫持:修改链接地址欺骗用户

- 暴露信息:如抓包获得敏感信息

- 中间人攻击:插入非法代理截获用户信息

需要对用户输入输出进行校验, token验证身份, HTTPS传输, 代码混淆加密等来保证安全。

### 首屏 SSR 有了解吗?

SSR即服务器端渲染,是一种使网站内容在服务器端渲染成静态HTML字符串,再发送给客户端的技术。

其工作流程是:

- 服务器接受请求,交给对应的路由处理

- 路由根据当前URL返回需要渲染的组件

- 在服务器使用VDOM生成组件静态HTML字符串

- 将HTML发送给客户端,客户端接收并显示

SSR可以有效改善SEO并加快首屏加载速度。

### SSR、SSG之间的区别?

SSR和SSG的主要区别有:

- SSR是请求时服务器渲染,SSG是预构建静态页面

- SSR适合频繁更新的数据,SSG适合静态或不经常更改的数据

- SSR有更好的首屏性能,SSG对服务器压力小

- SSG更简单,可以部署在CDN上,而SSR需要对应服务器

根据应用场景选择合适的静态站点生成方案。

### 用过那些 SSR 框架?(vue3的Nuxt3,react的NextJs)

常用的SSR框架包括:

- Next.js: React的SSR框架

- Nuxt.js: 基于Vue的服务端渲染框架

- Angular Universal: Angular的服务端渲染实现

- Ruby on Rails: 服务端语言实现的SSR

- Laravel: PHP框架整合了SSR能力

可以根据具体使用的前端框架选择对应的SSR解决方案。

### Nuxt3 和 NextJs 在 SSR 实现架构上有什么区别?简要举例说明一下

Nuxt3和Nextjs在SSR实现上的主要区别有:

- Next直接输出HTML字符串,Nuxt通过vue-server-renderer节点流生成

- Nuxt使用异步组件加载,Next所有路由组件同步加载

- Next链接跳转采用客户端路由,Nuxt为服务端路由

- Nuxt支持安全的异步数据获取,Next需要getInitialProps

- Nuxt基于Vue的组件树,Next基于React组件

两者都非常成熟,可以根据需求灵活选择。

### 怎么测试 react 和 vue3 的渲染UI的默认时长?如果我们写的同一个组件在react中渲染得比vue3慢,该如何排查并优化?

测试组件渲染性能常用的方法:

1. 使用jsPerf网站进行渲染性能测试

2. 借助benchmark库编写测试用例

3. 使用Chrome性能分析面板记录时间线

4. React使用profiler组件分析渲染时间

5. 比较打包后组件大小和压缩率

可以从多方面进行渲染性能测试和优化。

### 什么是Restful API,其规定了哪些请求类型?

RESTful API是一种流行的API设计理念和规范,主要原则包括:

- 每个URI代表一种资源

- 客户端使用GET、POST、PUT等动词对资源进行操作

- 不会在URI中包含动作,全在HTTP头指定

- 返回JSON或XML格式数据

RESTful设计的API有良好的可见性和可扩展性。

### 没有没做过埋点?了解或用过哪些埋点框架?有实际经验的话,举例说明一个埋点方案

常见的前端埋点框架包括:

- Google Tag Manager:谷歌提供,无埋点,易扩展

- 友盟:功能全面,使用简单的埋点UI设计

- GrowingIO:提供debugger工具,支持全埋点和无埋点

- TalkingData:码则式埋点,灵活但需要自行组合

- 听云:SDK接入自动采集,提供可视化界面

可以根据需求选择合适的埋点框架。

### Nuxt3-- (选修)

### Nuxt3的SSR实现原理

### Nuxt3中如何让异步数据在服务端渲染?

### useRequestHeaders 是无法在客户端使用的,那如何才能通过它实现ssr获取到headers信息?

### NextJs -- (选修)

### Next.js的SSR实现原理

### Next.js中如何让异步数据在服务端渲染?

## 业务相关

### 用户登录凭证失败之后会发生什么?

### 单点登录、无感登录、OAuth2.0有了解吗?简要说明一下

### 前端如何拿到用户的 openId,对 OAuth 协议的了解说明一下

## 实际项目相关

### 你在最近经历的项目中有遇到过什么难题吗?是怎么解决的?举例说明下

这个需要结合自己的具体项目情况来回答。

### 有没有独立带领过团队开发?一个实际项目是如何落地的?简要说明下

### 团队开发过程中我们需要设定些什么规范来确保协同开发?

组织团队协同开发常用的方式:

- 制定代码及提交规范,如commit message准则等

- 代码Review,合并请求审阅制度确保代码质量

- 定期站会沟通开发进度和技术细节

- 按功能模块划分开发任务,并明确负责人

- 建立协同开发流程,如git-flow分支策略

- 建立技术选型评审机制,重要选择通过讨论决定

- 建立unittest 和测试环境,以保证主流程稳定

### 前后端如何协调开发,提高联调成功率?

提高前后端联调效率的方式:

- 定义明确的接口文档,如OpenAPI规范

- Mock数据,模拟接口响应数据联调

- 尽早沟通接口定义,不能随意修改

- 前后端分工明确,接口及模型提前确定

- 按模块或页面优先级开发核心接口

- 联调环境稳定,服务不断开断改接口

- 相关工具辅助,如Postman

- 自动化测试确保接口健壮性

通过各方面的配合可以大幅提升接口联调效率。

### 对敏捷开发模式(Scrum)的了解?Sprint > Story > ticket(task)

### 如何学习前端的?在实际项目中遇到新技术或难点是如何攻克的?

可以通过以下方式学习前端:

- 学习框架和库的官方文档

- Google搜索问题的解决方案并学习

- 观看前端技术国内外会议的分享视频

- 订阅前端周刊、公众号、知识星球等获取资讯

- 阅读前辈技术专家的博客文章

- 在GitHub上搜索相关项目学习源码实现

- 创建Demo实践学习新技术的使用

- 完成实际产品功能练手,学习框架用法

- 参与前端开源项目贡献代码

- 向技术群里的大牛提问并学习解决思路

多途径的学习可以帮助我们不断进步。

