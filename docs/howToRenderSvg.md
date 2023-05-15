# How to render svg in NextJs 13
* source link: https://bestony.medium.com/%E5%9C%A8-next-js-%E4%B8%AD%E7%9B%B4%E6%8E%A5%E5%BC%95%E5%85%A5-svg-b2d4176f43d7

## @svgr/webpack
```shell
pnpm install --save @svgr/webpack
```

## next.config.js
```js
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};
```

## Example
```tsx
import ItachiSvg from '@/assets/svgs/itachi.svg'

export default function Itachi() {
  return <ItachiSvg />
}
```
