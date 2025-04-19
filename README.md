# copyEasyNeumUI (woking on deving...)
This is a components repo you can copy anyone you want.

## Feat Project
* My game web named "Dream Wander" is pub in public/ directory.
* * We can vite the url to paly: "https://copy-easy-neumui.vercel.app/ckn"
* * ["梦启游梦（Dream Wander）-- 摇奖机小游戏"](https://copy-easy-neumui.vercel.app/ckn)

## Getting Started

```bash
pnpm dev
```

## Project Structure

* React 18
* Typescript 5
* CSS
* NextJs 3
* Lint: eslint
* git hooks: husky
* git commit formatter: commitlint
* Unit test: Vitest 3 + VitestUI + @vitest/coverage-c8 + @testing-library/react + @testing-library/jest-dom
* CI&CD: https://vercel.com/

## Preview
* Deploy on Vercel (CI/CD): 
* * https://copy-easy-neumui.vercel.app/


## Issues
* 1 - 在运行命令的时候，使用pnpm或者npm出现此错误
* * doc link: https://blog.csdn.net/weixin_46212682/article/details/121784020
```
pnpm : 无法加载文件 C:\Users\HP\AppData\Roaming\npm\pnpm.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
```
* * 【Solution】: Windows PowerShell => input command 'set-ExecutionPolicy RemoteSigned' => input selection [A]