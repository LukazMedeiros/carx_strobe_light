const { app, BrowserWindow, ipcMain } = require("electron");
const { keyTap } = require("@jitsi/robotjs");
const { resolve } = require("path");

const view = resolve(__dirname, "views", "index.html");

let mainwindow;

app.on("ready", () => {
  mainwindow = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      devTools: true,
    },
  });
  mainwindow.loadFile(view);
});

ipcMain.on("start", (event, time) => {
  event.preventDefault();
  const interval = setInterval(() => {
    keyTap("pagedown");
    console.log("rodando", time);
  }, time);

  ipcMain.on("stop", (event) => {
    clearInterval(interval);
    console.log("parou");
  });
});
