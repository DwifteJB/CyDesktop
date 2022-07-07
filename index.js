// Import Modules
require("esm-hook")
const { app, BrowserWindow, Notification } = require('electron');
const path = require("path")
const fetch = require("node-fetch").default;
const fs = require("fs")
// Data Path (config folder)
let dataPath;
if (process.platform === "win32") dataPath = process.env.APPDATA;
else if (process.platform === "darwin") dataPath = path.join(process.env.HOME, "Library", "Preferences");
else dataPath = process.env.XDG_CONFIG_HOME ? process.env.XDG_CONFIG_HOME : path.join(process.env.HOME, ".config");
dataPath = path.join(dataPath, "CyDesktop") + "/";
if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath);
if (!fs.existsSync(dataPath+"/version")) fs.writeFileSync(dataPath+"/version",JSON.parse(fs.readFileSync("package.json")).version);
/*
    Electron Window
*/
const createWindow = async () => {
    const win = new BrowserWindow({
      width: 1080,
      height: 720,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
      title: "CyDesktop",
    })
    const update = await (await fetch("https://raw.githubusercontent.com/DwifteJB/CyDesktop/main/update.json")).json()
    if (update.latestVersion != fs.readFileSync(dataPath+"/version")) {
        new Notification({
            title: "New update avaliable!",
            body: `The update ${update.latestVersion} is avaliable!`,
            
        }).show();
    }
    win.loadFile('./src/web/index.html');
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})