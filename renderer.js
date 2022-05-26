$(document).ready(function () {
  new WMD("input", "toolbar", { preview: "preview" });
  //Load template content
  getREADME();
});

document.querySelector("#save").addEventListener("click", function () {
  let data = document.getElementById("input").value;

  const { ipcRenderer } = require("electron");

  // send editor content to main.js
  ipcRenderer.send("save", data);
});

function getREADME() {
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://raw.githubusercontent.com/CryptoFoxDev/MarkdownEditor/master/README.md",
    true
  );
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var type = request.getResponseHeader("Content-Type");
      if (type.indexOf("text") !== 1) {
        document.getElementById("input").value = request.responseText;
      }
    }
  };
}

function addToInput(data) {
  const editor = document.getElementById("input");
  editor.value = editor.value + "\n" + data + "\n";
}

document.querySelector("#bold").addEventListener("click", function () {
  addToInput("**Im bold**");
});

document.querySelector("#italic").addEventListener("click", function () {
  addToInput("*Im italic*");
});

document.querySelector("#bold-italic").addEventListener("click", function () {
  addToInput("***Im bold and italic***");
});

document.querySelector("#blockquote").addEventListener("click", function () {
  addToInput("> Im a blockquote");
});

document.querySelector("#ol").addEventListener("click", function () {
  addToInput("1. Number 1\n2. Number two\n3. Number three");
});

document.querySelector("#ul").addEventListener("click", function () {
  addToInput("- Number 1\n- Number two\n- Number three");
});

document.querySelector("#code").addEventListener("click", function () {
  addToInput("```\nIm a codeblock\n```");
});

document.querySelector("#hr").addEventListener("click", function () {
  //addToInput('***');
  //addToInput('___');
  addToInput("---");
});

//Heading
document.querySelector("#h1").addEventListener("click", function () {
  addToInput("# Heading 1");
});

document.querySelector("#h2").addEventListener("click", function () {
  addToInput("## Heading 2");
});

document.querySelector("#h3").addEventListener("click", function () {
  addToInput("### Heading 3");
});

document.querySelector("#h4").addEventListener("click", function () {
  addToInput("#### Heading 4");
});

document.querySelector("#h5").addEventListener("click", function () {
  addToInput("##### Heading 5");
});

document.querySelector("#h6").addEventListener("click", function () {
  addToInput("###### Heading 6");
});
