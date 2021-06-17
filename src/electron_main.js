const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const url = require('url');

// 追加モジュール
const Store = require('electron-store');
const store = new Store();

// 定数
const DEFAULT_POS = {
    x: 256,
    y: 128
}

const DEFAULT_SIZE = {
    width: 380,
    height: 720
}

// 実行環境がmacOSならtrue
const isMac = (process.platform === 'darwin'); // 'darwin' === macOS

// aboutパネル
const aboutPanel = function () {
    dialog.showMessageBox({
        title: `${app.name}について`,
        message: `${app.name} ${app.getVersion()}`,
        detail: `Copyright (C) 2021 Tsuyoshi.A`,
        buttons: [],
        icon: path.join(__dirname, '/../build/logo192.png')
    });
}


// メニューを準備する
const tempMenu = Menu.buildFromTemplate([
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { label: `${app.name}について`, click: aboutPanel },
            { type: 'separator' },
            { role: 'services', label: 'サービス' },
            { type: 'separator' },
            { role: 'hide', label: `${app.name}を隠す` },
            { role: 'hideothers', label: 'ほかを隠す' },
            { role: 'unhide', label: 'すべて表示' },
            { type: 'separator' },
            { role: 'quit', label: `${app.name}を終了` }
        ]
    }] : []),
    {
        label: 'ファイル',
        submenu: [
            isMac ? { role: 'close', label: 'ウィンドウを閉じる' } : { role: 'quit', label: '終了' }
        ]
    },
    {
        label: '表示',
        submenu: [
            { role: 'comment', label: 'コメント表示' },
            { role: 'ampm', label: '24時間表示' }
        ]
    },
    {
        label: 'ヘルプ',
        submenu: [
            ...(isMac ? [] : [
                { type: 'separator' },
                { label: `${app.name}について`, click: aboutPanel }
            ])
        ]
    }
]);

// メニューを適用
Menu.setApplicationMenu(tempMenu);


// Main Window
function createWindow() {
    const pos  = store.get('window.pos') || [DEFAULT_POS.x, DEFAULT_POS.y];
    const size = store.get('window.size') || [DEFAULT_SIZE.width, DEFAULT_SIZE.height];

    const mainWindow = new BrowserWindow({
        width: size[0],
        height: size[1],
        x: pos[0],
        y: pos[1],
        // resizable: false,   // Windowサイズ固定
        useContentSize: true,
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

    // ウィンドウが閉じられる直前
    mainWindow.on('close', () => {
        // "AppData\Roaming(アプリ名)\config.json" に保存される
        store.set('window.pos', mainWindow.getPosition())
        store.set('window.size', mainWindow.getSize())
    });
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
