import { OPENFS, SAVEFS, sendData, SETFILE } from "../app.js";
import { writeFile } from "./File_System/writeFile.js";
import { readFile } from "./File_System/readFile.js";
import { editor } from "../index.js";
import { modeChoice } from "../app.js"


export function onDeviceReady() {

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