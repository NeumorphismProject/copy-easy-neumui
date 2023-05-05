# How to resolve git LF and CRLF warning

* doc link: https://segmentfault.com/q/1010000011799577

* For example:
* * when we do 'git add .', the terminal on windows will show us:
```shell
warning: in the working copy of 'components/layouts/DefaultLayout.tsx', LF will be replaced by CRLF the next time Git touches it
```

##  Resolve -- 解决方案
* * [1] -- Install a VSCODE plugin -- [EditorConfig for Visual Studio Code]
* * [2] -- create '.editorconfig' file in your root dir.

[.editorconfig] content:
```js
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

* * [3] -- Then we just create new file or 'ctrl + s' save the old file.
