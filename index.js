console.log('here1');
ace.require("ace/ext/language_tools");
class Pyd {
  constructor() {
    this.pyodide;
  }

  main() {
    this.pyodide = loadPyodide();
    console.log("loaded");
  }
  runCode(cd) {
    return this.pyodide.runPython(cd);
  }

}

var pyodide = new Pyd()
let pd = pyodide.main();

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

function passCode() {
  let code = editor.getValue()
  return code;
}
