import { editor } from "../../index.js";


export function readFile(fileEntry) {

  fileEntry.file(function(file) {
    var reader = new FileReader();

    reader.onloadend = function() {
      editor.setValue(this.result);
    
    };

    reader.readAsText(file);

  }, (err)=>{console.log(err);});
}
