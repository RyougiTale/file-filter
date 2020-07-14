## ToDo
有什么好的建议可以在issue里提

if you have any idea, you can create a issue.

UI美化
- [ ] 文件展示优化
- [ ] 背景多主题选择

逻辑优化
- [x] 支持文件打开
- [x] 文件移除系统
- [ ] 仓库移除系统
- [ ] 仓库改名系统
- [ ] 文件改名系统
- [ ] 仓库间文件转移
- [x] tags编辑
- [ ] 添加一个总仓库用来管理所有文件
- [ ] description编辑
- [ ] star高亮标签
- [ ] 文件上锁功能

架构优化
- [x] 数据库全剥离并套上async

bug
- [ ] 生成仓库目录未更新

重要待办
- [ ] 选中标签后无关标签消失switch
- [ ] 大小写不敏感
- [ ] 增加检索功能

## Download Link

You can download in release as well

[Click here to download](https://pan.baidu.com/s/1evHDJCWOslPMakrkDqH0qg)

link：https://pan.baidu.com/s/1evHDJCWOslPMakrkDqH0qg 

passwd：mni0

## Usage
```
use for file sorting
```

## Develop

Execute the following command to start Webpack in development mode and 
watch the changes on source files for live rebuild on code changes.
```sh
npm run dev
```

The `npm run dev` command won't start your app and get your app shows on the 
screen. To start your app, execute the following command:
```sh
npm start
```

## Building the installer for your Electron app
for macOS & Windows using `electron-builder`. 

For macOS, execute:
```sh
npm run build:mac
```

For Windows, execute:
```sh
npm run build:win
```

### Extra options
The build scripts are pre-configured to build 64 bit installers since 64 bit 
should be the standard for a modern applications. 32 bit builds are still 
possible by changing the build scripts in `package.json` as below:
```json
// from
"scripts": {
    "build:win": "electron-builder build --win --x64",
    "build:mac": "electron-builder build --mac --x64"
},

// to
"scripts": {
    "build:win": "electron-builder build --win --ia32",
    "build:mac": "electron-builder build --mac --ia32"
},
```

## License
[licensed as MIT](LICENSE).
