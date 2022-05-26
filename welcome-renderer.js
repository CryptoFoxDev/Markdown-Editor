  
  const { ipcRenderer } = require("electron");
  document.querySelector("#newFile").addEventListener("click", function () {
    ipcRenderer.send("openEditor", "none");
  });

  document.querySelector("#openFile").addEventListener("click", function () {
    ipcRenderer.send("openFile");
  });