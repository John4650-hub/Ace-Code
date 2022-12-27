import { OPENFS, SAVEFS, sendData, SETFILE, FILE_PANEL } from "../app.js";
import { writeFile } from "./File_System/writeFile.js";
import { readFile } from "./File_System/readFile.js";
import { editor } from "../index.js";
import { modeChoice } from "../app.js"


export function onDeviceReady() {
  /**
   * Read the local storage and fill the sidebar with files in it
   **/
  function listDir(url) {
    let List = []
    let promise = new Promise(function(res, reject) {
      window.resolveLocalFileSystemURL(url,
        function(fs) {
          const reader = fs.createReader();
          reader.readEntries(function(entries) {
            res(entries)
          }, (rej) => { return rej });
        }, (rej) => { return rej });
    });
    promise.then((val) => { val.forEach((v) => { List.push(v) }) })
    return List
  }

  const FILES = "";

  let filesList = listDir(cordova.file.externalRootDirectory);
console.log(filesList);
console.log(filesList);
console.log(filesList);
console.log(filesList);
console.log(filesList);
  function fillFilePanel() {
    for (let i = 0; i < filesList.length; i++) {
      let entries = filesList[i]
      if (entries.isDirectory == true) {
        FILE_PANEL.append(`<button type="button" class="list-group-item list-group-item-action" data-toggle="#${entries.name}Group">${entries.name}</button>`)

      }
      else {
        FILE_PANEL.append(`<button type="button" class="list-group-item list-group-item-action">${entries.name}</button>`);
      }
    }
  }
  setTimeout(fillFilePanel, 1000);

  function showSubFolder(parentDir) {
    for (let x = 0; x < listDir(`${FILES}/${parentDir}`).length; x++) {
      let subFiles = listDir(`${FILES}/${parentDir}`)[x]
      FILE_PANEL.append(`<button type="button" class="list-group-item list-group-item-action">${subFiles.name}</button>`)
    }
  }



  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
    function(fs) {
      SETFILE.addEventListener('click', doThis)

      function doThis() {
        if (modeChoice == 'python') {
          console.log('editing python file');
          workWithFile("PYTHON/main.py");
        }

        if (modeChoice == 'c_cpp') {
          console.log('editing C file');
          workWithFile("C/main.c");
        }
      }

      function workWithFile(fileName) {
        fs.root.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {
          OPENFS.addEventListener('click', readF)

          function readF() {
            readFile(fileEntry);
          }
          //SAVE FILE when saveFs btn is clicked
          SAVEFS.addEventListener('click', saveFileC);

          function saveFileC() { writeFile(fileEntry, null); }

        }, () => { console.log('failed to save file'); });
      }
    }, () => { console.log('failed to load file system'); });

}