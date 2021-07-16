# @sjognad/log

[![Downloads](https://img.shields.io/npm/dm/@sjognad/log?style=flat)](https://www.npmjs.com/package/@sjognad/log)
[![npm version](https://img.shields.io/npm/v/@sjognad/log)](https://www.npmjs.com/package/@sjognad/log)

> A react component to preview log based [react-codemirror](https://github.com/uiwjs/react-codemirror)

## Install

```bash
npm install @sjognad/log --save
```

## Usage

```jsx
import { Log } from '@sjognad/log'

<Log
  polling={5000}
  request={async () => {
    const { data } = await api();
    return { data };
  }}
/>
```

## Options

- [react-codemirror](https://github.com/uiwjs/react-codemirror/blob/master/README.md)
- [CodeMirror](https://codemirror.net/doc/manual.html#config)

## License

[MIT](https://github.com/dangojs/log/blob/main/LICENSE)