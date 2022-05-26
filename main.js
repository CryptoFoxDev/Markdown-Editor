const { app, BrowserWindow, ipcMain, Notification, Menu } = require("electron");
const path = require("path");

let editorData;
module.exports.getEditorData = () => editorData;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'build/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("welcome.html");
  //mainWindow.webContents.openDevTools()
}

//Custom Menu
const isMac = process.platform === "darwin";
const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [{ role: "about" }, { role: "quit" }],
        },
      ]
    : []),
  {
    label: "File",
    submenu: [
      {
        label: "Open",
        accelerator: "Cmd+O",
        click: () => {
          openFile();
        },
      },
      {
        label: "Save as...",
        accelerator: "Cmd+S",
        click: () => {
          saveFile();
        },
      },
    ],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [{ role: "delete" }, { role: "selectAll" }, { type: "separator" }]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

ipcMain.on("save", (event, arg) => {
  saveFile(arg);
});

ipcMain.on("openEditor", (event, arg) => {
  editorData = arg
  openEditor()
});

ipcMain.on("openFile", (event, arg) => {
  console.log("Will be implemented soon");
});

ipcMain.on("home", (event, arg) => {
  BrowserWindow.getAllWindows()[0].loadFile("welcome.html");
});

function openEditor() {
  BrowserWindow.getAllWindows()[0].loadFile("editor.html");
}

function saveFile(content) {
  const credits = '\n\n---\nCreated with [Markdown Editor](https://github.com/CryptoFoxDev/MarkdownEditor)';
  const { dialog } = require("electron");
  var fs = require("fs");
  var options = {
    message: "Select where you want to save your file",
    buttonLabel: "Save",
    filters: [
      {
        name: "Markdown",
        extensions: ["md"],
      },
    ],
  };

  dialog.showSaveDialog(null, options).then(({ filePath }) => {
    try {
      fs.writeFileSync(filePath, content+credits, "utf-8");
      new Notification({
        title: "File saved successfully",
        body: filePath,
      }).show();
    } catch (e) {
      console.log(e);
    }
  });
}

function openFile() {}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
