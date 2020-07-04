/**
 * Entry point of the Election app.
 */
import { app, BrowserWindow, ipcMain, dialog, Menu, shell, ipcRenderer } from 'electron';
import * as path from 'path';
import * as url from 'url';
//main Window
let mainWindow: Electron.BrowserWindow | null;
const isMac = process.platform === 'darwin'
//global database db
const Datastore = require('../../node_modules/nedb')
const globalAny: any = global;
let db: any;
//dummy data
import { dummyButtons, dummyFiles } from '../Common/dummydata';
const use_dummy_data = false;


function createWindow(): void {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            webSecurity: false,
            devTools: process.env.NODE_ENV === 'production' ? false : true,
        },
    });
    //open console
    // mainWindow.webContents.openDevTools({ mode: "detach" });
    // load the index.html of the app.

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true
        })
    );
    //init database in main.ts
    let MyDatabase = new Datastore({ filename: path.join(__dirname, "db.db"), autoload: true });
    globalAny.MyDatabase = MyDatabase;
    //load dummy data
    if (use_dummy_data) {
        MyDatabase.remove({}, { multi: true }, (err: any, docs: any) => { });
        let rep0 = {
            "data-type": "repository",
            "repository-type": 'main',
            "repository-index": 0,
            "repository-date": new Date(),
            "repository-name": "rep No.0",
            "repository-path": "/"
        };
        MyDatabase.insert(rep0, (err: any, newDoc: any) => { });
        let rep1 = {
            "data-type": "repository",
            "repository-type": 'normal',
            "repository-index": 1,
            "repository-date": new Date(),
            "repository-name": "rep No.1",
            "repository-path": "/"
        };
        MyDatabase.insert(rep1, (err: any, newDoc: any) => { });
        for (let i = 0; i < 30; i++) {
            let file: any = {

                "file-name": dummyFiles[i]['file-name'],
                "file-path": dummyFiles[i]["file-path"],
                "file-description": dummyFiles[i]['file-description'],
                "file-tags": dummyFiles[i]['file-tags'],
            };
            if (i < 7) {
                file["owner-name"] = "rep No.0";
            }
            else {
                file["owner-name"] = "rep No.1";
            }
            MyDatabase.insert(file);
        }
    }

    ipcMain.on('ondragstart', (event: any, filePath: any) => {
        console.log(event);
        console.log(filePath);
        console.log(filePath);
        event.sender.startDrag({
            file: filePath,
            icon: '/path/to/icon.png'
        })
    })
    //open file
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
