const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 380,
        height: 696,
        resizable: false,   // Windowサイズ固定
        icon: __dirname + '/../build/logo192.png',
    });

    // load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    // mainWindow.loadURL("http://localhost:3000");

    // メニューバー非表示（暫定）
    // mainWindow.setMenuBarVisibility(false);

    // 開発ツールを有効
    if (process.env.NODE_ENV === "debug") {
        mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    // mainWindow.on('closed', function () {
    //     // Dereference the window object, usually you would store windows
    //     // in an array if your app supports multi windows, this is the time
    //     // when you should delete the corresponding element.
    //     mainWindow = null
    // });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
