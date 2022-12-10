import { OPENFS, SAVEFS } from "../app.js";
import cordova from '..'

export function onDeviceReady() {

  /*********************************************
   *Creates a new file or returns the file if it already exists.
   ******************************************/
  function createFile(dirEntry, fileName, isAppend) {
    dirEntry.getFile(fileName, { create: true, exclusive: false }, (fileEntry) => {
      writeFile(fileEntry, null, isAppend);
    }, () => { console.log('unable to create file') });
  }
  /*********************************************
   * Create a FileWriter object for our FileEntry (log.txt)
   *******************************************/
  function writeFile(fileEntry, dataObj) {
    let code = sendData();

    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function() {
        console.log("Successful file write...");
        readFile(fileEntry)
      };

      fileWriter.onerror = (e) => {
        console.log("Failed file write: " + e.toString());
      };
      /**********************************
       * If data object is not passed in,
         create a new Blob instead.
       ****************/
      if (!dataObj) {
        dataObj = new Blob([code], { type: 'text/plain' });
      }

      fileWriter.write(code);
    });
  }
  

  function readFile(fileEntry) {
    console.log(fileEntry)
    let path = "/storage/emulated/0/main.py"
    fileEntry.file(function(file) {
      var reader = new FileReader();

      reader.onloadend = () => {
        editor.setValue(this.result);
      };

      reader.readAsText(file);

    }, () => { console.log('Could not read file') });
  }

  function displayFileData(fileName) {
    console.log(fileName);
  }

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
    console.log('file system open: ' + fs.name);
    AIRLINE.innerHTML = `<b>${fs.root.fullPath}</b>`;
    SAVE.addEventListener('click', passArgs);

    function passArgs() {
      return createFile(fs.root, "main.py", false)
    }
    OPENFS.addEventListener('click', openFile)

    function openFile() {
      readFile(fs.root)
    }

  }, function() { console.log('Unable to open file') });

}
