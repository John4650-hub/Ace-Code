document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  //DOM
  const AIRLINE = document.getElementById("air-line");
  const SAVE = document.getElementById('saveFs');
  const OPEN = document.getElementById('openFs');


  function createFile(dirEntry, fileName, isAppend) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {

      writeFile(fileEntry, null, isAppend);

    }, function() { console.log('unable to create file') });

  }

  function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    let code = sendData();

    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function() {
        console.log("Successful file write...");
        readFile(fileEntry)
      };

      fileWriter.onerror = function(e) {
        console.log("Failed file write: " + e.toString());
      };

      // If data object is not passed in,
      // create a new Blob instead.
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

      reader.onloadend = function() {
        editor.setValue(this.result);
      };

      reader.readAsText(file);

    }, () => { console.log('Could not read file') });
  }

  function displayFileData(fileName) {
    console.log(fileName);
  }

  /**
  App logic part
  .*/
  ace.require("ace/ext/language_tools");
  const editor = ace.edit('editor');
  editor.setTheme("ace/theme/dracula")


  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
  });
  editor.setHighlightGutterLine(true)
  editor.setHighlightGutterLine(true)
  editor.setHighlightActiveLine(true)
  editor.setShowPrintMargin(true)
  editor.setShowInvisibles(true);
  editor.session.setMode("ace/mode/python");


  // app functions
  function sendData() {
    return editor.getValue(); //get the current text in the editor window
  }

  //Filesave
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
    console.log('file system open: ' + fs.name);
    AIRLINE.innerHTML = `<b>${fs.root.fullPath}</b>`;
    SAVE.addEventListener('click', passArgs);

    function passArgs() {
      return createFile(fs.root, "main.py", false)
    }
    // OPEN.addEventListener('click', openFile)

    function openFile() {
      readFile(fs.root)
    }

  }, function() { console.log('Unable to open file') });
  // DOM

}
