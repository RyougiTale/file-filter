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
