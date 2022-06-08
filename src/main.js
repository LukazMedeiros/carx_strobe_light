const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const { keyTap } = require("@jitsi/robotjs");
const { resolve } = require("path");

const view = resolve(__dirname, "views", "index.html");

let mainwindow;

app.on("ready", () => {
  mainwindow = new BrowserWindow({
    width: 350,
    height: 430,
    transparent: true,
    frame: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      devTools: true,
    },
  });
  mainwindow.setMenu(null);
  mainwindow.setResizable(false);
  mainwindow.loadFile(view);
  mainwindow.setIgnoreMouseEvents(false); //para conseguir arrastar a janela, é necessário adicionar um elemento com a propriedade css drag
});

ipcMain.on("strobe_headlights_activated", (event, time) => {
  event.preventDefault();
  const interval = setInterval(() => {
    keyTap("pagedown");
    console.log("strobe_headlights_activated", time);
  }, time);

  ipcMain.on("strobe_headlights_disabled", () => {
    clearInterval(interval);
    console.log("strobe_headlights_disabled");
  });
});

ipcMain.on("random_headlights_activated", (event, time) => {
  event.preventDefault();
  const interval = setInterval(() => {
    const random = Math.floor(Math.random() * 5);
    random == 0 && keyTap("pagedown");
    console.log("random_headlights_activated", time);
  }, time);

  ipcMain.on("random_headlights_disabled", () => {
    clearInterval(interval);
    console.log("random_headlights_disabled");
  });
});

ipcMain.on("strobe_underglow_activated", (event, time) => {
  event.preventDefault();
  const interval = setInterval(() => {
    keyTap("end");
    console.log("strobe_underglow_activated", time);
  }, time);

  ipcMain.on("strobe_underglow_disabled", () => {
    clearInterval(interval);
    console.log("strobe_underglow_disabled");
  });
});

ipcMain.on("close", (event) => {
  event.preventDefault();
  app.quit();
});
