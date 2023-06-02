* download from: https://www.100font.com/forum-1-1.htm?tagids=3_0_0_0

* How to use by html css: https://www.tddx.net/post-528.html
* * my favorite url: https://cubox.pro/my/card?id=ff8080818808f3ae01887ae5d3561cb4

### 兼容性写法
```css
@font-face {
	font-family: 'myFirstFont';
	src: url('YourWebFontName.eot'); /* IE9 Compat Modes */
	src: url('YourWebFontName.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('YourWebFontName.woff') format('woff'), /* Modern Browsers */
         url('YourWebFontName.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('YourWebFontName.svg#YourWebFontName') format('svg'); /* Legacy iOS */
}
```
##### 不同的浏览器支持的字体格式不同，以目前主流浏览器为参考，使用@font-face至少需要.woff、.eot、.SVG三种格式字体，甚至还需要.svg等字体达到更多种浏览版本的支持。
* .TTF、.OTF - 适用于Firefox 3.5、Safari、Opera；
* .EOT - 适用于Internet Explorer 4.0+；
* .SVG - 适用于Chrome、IPhone

### 如何得到所需的各种类型的字体文件
* 从这里（https://www.100font.com/forum-1-1.htm?tagids=3_0_0_0）选择下载自己想要的字体文件后，会得到一种字体文件
*
