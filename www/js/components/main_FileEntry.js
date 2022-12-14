import { OPENFS, SAVEFS, sendData, SETFILE } from "../app.js";
// import cordova from "../cordova.js";
import { writeFile } from "./File_System/writeFile.js";
import { readFile } from "./File_System/readFile.js";
import { editor } from "../index.js";
import { modeChoice } from "../app.js"


export function onDeviceReady() {

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
    function(fs) {
      SETFILE.addEventListener('click', doThis)

      function doThis() {

        if (modeChoice() == 'python') {
          fs.root.getFile("PYTHON/main.py", { create: true, exclusive: false }, function(fileEntry) {
            OPENFS.addEventListener('click', readF)

            function readF() {
              readFile(fileEntry);
            }
            //SAVE FILE
            SAVEFS.addEventListener('click', saveFile);

            function saveFile() { writeFile(fileEntry, null); }

          }, () => { console.log('failed to save file'); });

        }


        if (modeChoice() == 'c_cpp') {
          fs.root.getFile("C/main.c", { create: true, exclusive: false }, function(fileEntry) {
            OPENFS.addEventListener('click', readF)

            function readF() {
              readFile(fileEntry);
            }
            //SAVE FILE
            SAVEFS.addEventListener('click', saveFile);

            function saveFile() { writeFile(fileEntry, null); }

          }, () => { console.log('failed to save file'); });

        }
      }


    }, () => { console.log('failed to load file system'); });


}