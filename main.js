const electron = require('electron')
// const client = require('electron-connect').client;
// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname, {
    // 强制重启，相当于开辟一个新的eletron进程
    electron: require('electron-prebuilt')
})
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

app.on('ready', () => {
    // unfamiliarBookFun()
    // familiarBookFun()
    mainWindowFun()
});
/*----------------------------------------------------------------------------*/
/*事件通知接受模块*/
ipcMain.on('close-main-window', () => {
    app.quit()
});

/*----------------------------------------------------------------------------*/
/*主窗口*/
var mainWindow = null;
var debug = true,
    devToolsWidth = 0;
function mainWindowFun() {
    debug && (devToolsWidth = 1000)

    mainWindow = new BrowserWindow({
        frame: false,
        height: 580,
        width: 674 + devToolsWidth,
        resizable: false,
        // transparent: false
    })

    // Open the DevTools.
    debug && (mainWindow.webContents.openDevTools())

    //加载index.html
    mainWindow.loadURL('file://' + __dirname + '/app/build/index.html');

    // debug && client.create(mainWindow)
}

/*----------------------------------------------------------------------------*/
/*切换窗口*/
// ipcMain.on('change-index-window', () => {
//     if (!mainWindow) {
//         return;
//     }
//     mainWindow.loadURL('file://' + __dirname + '/app/html/index.html');
// })
// ipcMain.on('change-learning-window', () => {
//     if (!mainWindow) {
//         return;
//     }
//     mainWindow.loadURL('file://' + __dirname + '/app/html/learning.html');
// });

/*----------------------------------------------------------------------------*/
/*设置窗口*/
// var settingsWindow = null

// ipcMain.on('open-settings-window', () => {
//     if (settingsWindow) {
//         return;
//     }

//     settingsWindow = new BrowserWindow({
//         frame: false,
//         height: 200,
//         resizable: false,
//         width: 200
//     })

//     settingsWindow.loadURL('file://' + __dirname + '/app/settings.html')

//     // settingsWindow.on('closed', function () {
//     //     settingsWindow = null;
//     // })
// })
/*
 窗口事件控制
 全屏/还原/缩小/关闭
 */
ipcMain.on('window-event', (event, way) => {
    if (mainWindow && mainWindow[way]) {
        mainWindow[way]()
    }
})
/*----------------------------------------------------------------------------*/
/*配置文件*/
// var wordBook = require('./main/fileController')
// function unfamiliarBookFun() {
//     bookFun('unfamiliarBook.json')
// }
// function familiarBookFun() {
//     bookFun('familiarBook.json')
// }
// function bookFun(fileName) {
//     wordBook.openFile(fileName)
//     if (!wordBook.readSettings('words')) {
//         wordBook.saveSettings('words', {
//             allCount: 0,
//             learningWordCount: 40,
//             hasLearningWordCount: 0,
//             learningNewWordCount: 40,
//             objSet: {},
//             arrSet: []
//         })
//     }
//     if (!wordBook.readSettings('learningMission')) {
//         wordBook.saveSettings('learningMission', {
//             arrSet: [],
//             arrSetScore: [],
//             learningWordCount: 0,
//             learningNewWordCount: 0,
//             hasLearningWordCount: 0,
//             time: {}
//         })
//     }
// }
