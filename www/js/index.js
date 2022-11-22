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

