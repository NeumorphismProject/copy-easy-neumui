# styled-component -- Performance Optimization
* (styled-component 性能优化方案)

*  Doc link: https://www.jianshu.com/p/f20f4c892168

## [1] -- 

```js
 // Radio.style.js
export default createGlobalStyle`
  // 样式实现在这里
`;

// index.js
const cssList = [
  { name: "input", css: inputStyle },
  { name: "alert", css: alertStyle },
  { name: "anchor", css: AnchorStyle },
  { name: "radio", css: radioStyle },
  { name: "list", css: listStyle },
 // ...
];
// 遍历数据，生成一个组件列表
function getThemedComponents(list) {
  return list.map(({ name, css: C }) => ({ theme }) => {
    const [data, setData] = useState(theme);
    useEffect(() => {
      setData(prev => prev[n] !== theme[n] ? theme : prev); // 利用了stateHook 引用不变时跳过更新的特性
    }, [theme]);
    return (
        <C theme={data} />
    );
  });
}
// 根据cssList得到的组件列表
const components = getThemedComponents(cssList);

const RootThemeStyle = ({ theme }) => {
  return (
    <>
      {components.map((Comp, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Comp key={index} theme={theme} index={index} />
      ))}
    </>
  );
};

export default RootThemeStyle;
```

## [2] -- 

```js

function getThemedComponents(list) {
  return list.map(({ name, css: C }) => ({ theme, index }) => {
    const [data, setData] = useState(theme);
    useEffect(() => {
      setData(prev => prev[n] !== theme[n]) ? theme : prev);
    }, [theme]);
    return (
      <StyleSheetManager
        target={getStyleSheetTarget(
          `hzero_style_sheet_injection_section${index}`
        )}
      >
        <C theme={data} />
      </StyleSheetManager>
    );
  });
}
```