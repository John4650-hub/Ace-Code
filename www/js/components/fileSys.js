import { OPENFS, SAVEFS, sendData } from "../app.js";
// import cordova from "../cordova.js";
import { editor } from "../index.js";
export function onDeviceReady() {

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {

    console.log('file system open: ' + fs.name);
    fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function(fileEntry) {

      console.log("fileEntry is file?" + fileEntry.isFile.toString());
      // fileEntry.name == 'someFile.txt'
      // fileEntry.fullPath == '/someFile.txt'
      writeFile(fileEntry, null);

    }, () => { console.log("failed to create file");});

  }, () => { console.log("failed to access file system"); });
  
}

function writeFile(fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function(fileWriter) {

    fileWriter.onwriteend = function() {
      console.log("Successful file write...");
      readFile(fileEntry);
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