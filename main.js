const electron = require('electron')
const client = require('electron-connect').client;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

app.on('ready', () => {
    unfamiliarBookFun()
    familiarBookFun()
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
var debug = false,
    devToolsWidth = 0;
function mainWindowFun() {
    debug && (devToolsWidth = 1000)

    mainWindow = new BrowserWindow({
        frame: false,
        height: 500,
        width: 370 + devToolsWidth,
        resizable: false
    })

    // Open the DevTools.
    debug && (mainWindow.webContents.openDevTools())

    //加载index.html
    mainWindow.loadURL('file://' + __dirname + '/app/html/index.html');


    debug && client.create(mainWindow)
}

/*----------------------------------------------------------------------------*/
/*切换窗口*/
ipcMain.on('change-index-window', () => {
    if (!mainWindow) {
        return;
    }
    mainWindow.loadURL('file://' + __dirname + '/app/html/index.html');
})
ipcMain.on('change-learning-window', () => {
    if (!mainWindow) {
        return;
    }
    mainWindow.loadURL('file://' + __dirname + '/app/html/learning.html');
});

/*----------------------------------------------------------------------------*/
/*设置窗口*/
var settingsWindow = null

ipcMain.on('open-settings-window', () => {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 200,
        resizable: false,
        width: 200
    })

    settingsWindow.loadURL('file://' + __dirname + '/app/settings.html')

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    })
})
ipcMain.on('close-settings-window', () => {
    if (settingsWindow) {
        settingsWindow.close();
    }
})

/*----------------------------------------------------------------------------*/
/*配置文件*/
var wordBook = require('./main/fileController')
function unfamiliarBookFun() {
    bookFun('unfamiliarBook.json')
}
function familiarBookFun() {
    bookFun('familiarBook.json')
}
function bookFun(fileName) {
    wordBook.openFile(fileName)
    if (!wordBook.readSettings('words')) {
        wordBook.saveSettings('words', {
            allCount: 0,
            learningWordCount: 40,
            hasLearningWordCount: 0,
            learningNewWordCount: 40,
            objSet: {},
            arrSet: []
        })
    }
    if (!wordBook.readSettings('learningMission')) {
        wordBook.saveSettings('learningMission', {
            arrSet: [],
            arrSetScore: [],
            learningWordCount: 0,
            learningNewWordCount: 0,
            hasLearningWordCount: 0,
            time: {}
        })
    }
}
