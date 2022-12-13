import { OPENFS, SAVEFS, sendData } from "../app.js";
// import cordova from "../cordova.js";
import { editor } from "../index.js";
export function onDeviceReady() {
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {

  console.log('file system open: ' + fs.name);
  console.log(fs.root);
  fs.root.getFile("sample.txt", { create: true, exclusive: false }, function(fileEntry) {
    console.log(` fileEntrt = ${fileEntry}`);
    console.log("fileEntry is file?" + fileEntry.isFile.toString());
    console.log(fileEntry.name);
    console.log(fileEntry.fullPath);
    writeFile(fileEntry, null);

  }, ()=>{"tt"});

}, ()=>{console.log('eer');});
  
  
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
      dataObj = new Blob(['some file data'], { type: 'text/plain' });
    }

    fileWriter.write(dataObj);
  });
}