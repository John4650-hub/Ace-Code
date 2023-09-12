export function writeFile(fileEntry, dataObj) {
  // Create a FileWriter object for our FileEntry
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
      dataObj = new Blob([window.aceEditor.getValue()], { type: 'text/plain' });
    }

    fileWriter.write(dataObj);
  });
}