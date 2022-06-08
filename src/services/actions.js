const { ipcRenderer } = require("electron");

const strobeHeadlightsSwitch = document.querySelector(
  "#strobe_headlights_switch"
);

const randomHeadlightsSwitch = document.querySelector(
  "#random_headlights_switch"
);

const strobeUnderglowSwitch = document.querySelector(
  "#strobe_underglow_switch"
);

const closeButton = document.querySelector("#close");

const strobeHeadlights = document.querySelector("#strobe_headlights");
const randomHeadlights = document.querySelector("#random_headlights");
const strobeUnderglow = document.querySelector("#strobe_underglow");

strobeHeadlightsSwitch.addEventListener("click", () => {
  const time = Number(strobeHeadlights.value);
  if (strobeHeadlightsSwitch.checked) {
    console.log("Strobe Headlights activated", time);
    ipcRenderer.send("strobe_headlights_activated", time);
  } else {
    console.log("Strobe Headlights disabled");
    ipcRenderer.send("strobe_headlights_disabled");
  }
});

randomHeadlightsSwitch.addEventListener("click", () => {
  const time = Number(randomHeadlights.value);
  if (randomHeadlightsSwitch.checked) {
    console.log("Random Headlights activated", time);
    ipcRenderer.send("random_headlights_activated", time);
  } else {
    console.log("Random Headlights disabled");
    ipcRenderer.send("random_headlights_disabled");
  }
});

strobeUnderglowSwitch.addEventListener("click", () => {
  const time = Number(strobeUnderglow.value);
  if (strobeUnderglowSwitch.checked) {
    console.log("Strobe Underglow activated", time);
    ipcRenderer.send("strobe_underglow_activated", time);
  } else {
    console.log("Strobe Underglow disabled");
    ipcRenderer.send("strobe_underglow_disabled");
  }
});

closeButton.addEventListener("click", () => {
  ipcRenderer.send("close");
});
