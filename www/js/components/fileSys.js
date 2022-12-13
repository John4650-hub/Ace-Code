import { OPENFS, SAVEFS, sendData } from "../app.js";
// import cordova from "../cordova.js";
import { editor } from "../index.js";
export function onDeviceReady() {

  window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dirEntry) {
    let isAppend = false;
    console.log(dirEntry);
    createFile(dirEntry, "fileToAppend.txt", isAppend);
  }, ()=>{console.log("failed to load file system");});
}
function createFile(dirEntry, fileName, isAppend) {
  // Creates a new file or returns the file if it already exists.
  dirEntry.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {

    writeFile(fileEntry, null, isAppend);

  }, ()=>{console.log("failed to create file");});

}
function writeFile(fileEntry, dataObj, isAppend) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function(fileWriter) {

    fileWriter.onwriteend = function() {
      console.log("Successful file read...");
      readFile(fileEntry);
    };

    fileWriter.onerror = function(e) {
      console.log("Failed file read: " + e.toString());
    };

    // If we are appending data to file, go to the end of the file.
    if (isAppend) {
      try {
        fileWriter.seek(fileWriter.length);
      }
      catch (e) {
        console.log("file doesn't exist!");
      }
    }
    fileWriter.write(dataObj);
  });
}
function readFile(fileEntry) {

  fileEntry.file(function(file) {
    var reader = new FileReader();

    reader.onloadend = function() {
      console.log("Successful file read: " + this.result);
    };

    reader.readAsText(file);

  }, ()=>{console.log("failed to read file");});
}