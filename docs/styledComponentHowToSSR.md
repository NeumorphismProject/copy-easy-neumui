# styled-component how to do SSR in Nexjs13
* doc link: https://reacthustle.com/blog/nextjs-styled-components-ssr-typescript

* It can resolve this question:
* * When browser doing first render page, the css style was later than html. So we always see html no any style first.

* 这可以解决以下问题
* * SSR首次渲染页面时css样式总是滞后于html,这就导致我们每次都会先看到一个没有任何样式的页面(这视觉效果就不太理想了).

## next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};
module.exports = nextConfig;
```

## add pages/_document.tsx

* what is _document.tsx?
* * https://ithelp.ithome.com.tw/articles/10278216

```tsx
// pages/_document.tsx file
import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />), //gets the styles from all the components inside <App>
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {/*👇 insert the collected styles to the html document*/}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}

```