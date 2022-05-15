const { ipcMain } = require("electron");
const { keyTap } = require("@jitsi/robotjs");

const event = ipcMain;

event.on("start", (event, running, time) => {
  const interval = setInterval(() => {
    keyTap("pagedown");
  }, time);

  if (!running) {
    clearInterval(interval);
  }
});

module.exports = {
  event,
};
