/**
 * Entry point of the Election app.
 */
import { app, BrowserWindow, ipcMain, dialog, Menu, shell, ipcRenderer } from 'electron';
import * as path from 'path';
import * as url from 'url';
const Datastore = require('../../node_modules/nedb')
const globalAny: any = global;
let db: any;

let mainWindow: Electron.BrowserWindow | null;

const isMac = process.platform === 'darwin'




function createWindow(): void {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            webSecurity: false,
            devTools: process.env.NODE_ENV === 'production' ? false : true,

        }
    });

    mainWindow.webContents.openDevTools({ mode: "detach" });
    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true
        })
    );
    let MyDatabase = new Datastore({ filename: path.join(__dirname, "db.db"), autoload: true });
    globalAny.MyDatabase = MyDatabase;

    ipcMain.on('ondragstart', (event: any, filePath: any) => {
        console.log(event);
        console.log(filePath);
        console.log(filePath);

        event.sender.startDrag({
            file: filePath,
            icon: '/path/to/icon.png'
        })
    })

    ipcMain.on('open-file-dialog', (event: any) => {
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory']
        }, (files) => {
            if (files) {
                event.sender.send('selected-directory', files)
            }
        })
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
