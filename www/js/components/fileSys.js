import { OPENFS, SAVEFS, sendData } from "../app.js";
// import cordova from "../cordova.js";
import { editor } from "../index.js";
export function onDeviceReady() {
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {

  console.log('file system open: ' + fs.name);
  console.log(fs.root);
  fs.root.getFile("sample.py", { create: true, exclusive: false }, function(fileEntry) {
    console.log(` fileEntrt = ${fileEntry}`);
    console.log("fileEntry is file?" + fileEntry.isFile.toString());
    console.log(fileEntry.name);
    console.log(fileEntry.fullPath);
    SAVEFS.addEventListener('click',saveFile);
    function saveFile(){writeFile(fileEntry, null);}

  }, ()=>{console.log('failed to save file');});

}, ()=>{console.log('failed to load file system');});
  
  
}

function writeFile(fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function(fileWriter) {

    fileWriter.onwriteend = function() {
      console.log("Successful file write...");
      // readFile(fileEntry);
    };

    fileWriter.onerror = function(e) {
      console.log("Failed file write: " + e.toString());
    };

    // If data object is not passed in,
    // create a new Blob instead.
    if (!dataObj) {
      dataObj = new Blob([editor.getValue()], { type: 'text/plain' });
    }

    fileWriter.write(dataObj);
  });
}