# How to solve waring about 'passive' in Nextjs

in browser
```js
[Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
initPopup @ userscript.html?name=Immersive%2520Translate.user.js&id=d9a02e96-0913-4d5d-89ee-9eea4ee1eb25:20235
```

## Solve:
* doc link: https://blog.csdn.net/yjl13598765406/article/details/125496865

* [1] - pnpm i default-passive-events
* [2] - add 'import 'default-passive-events' in pages/_app.tsx
