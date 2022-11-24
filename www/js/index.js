console.log('here1');
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

const aline = document.getElementById("air-line");
aline.innerHTML = `<b>${editor.getSession().getMode().$id}</b>`;
// App request permissiom for storage
window.requestFielSystem(LocalFileSystem.PERSISTENT,0,function (fs){
  console.log("file system open: "+fs.name);
  fs.root.getFile("newPersistentFile.txt",{create:true,exclusive:false}, function (fileEntry){
  console.log("File Entry is "+ fileEntry.isFile.toString());
  fileEntry.name = "Sample.py";
  writeFile(fileEntry,null);
  },
onErrorCreateFile);
},onErrorLoadFs);
