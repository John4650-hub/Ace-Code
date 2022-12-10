import { EDITOR_CONFIG } from "./components/configs.js";

ace.require("ace/ext/language_tools");
const editor = ace.edit('editor');
editor.setOptions(EDITOR_CONFIG);

editor.commands.addCommand({
  name: 'myCommand',
  bindKey: { win: 'Ctrl-M', mac: 'Command-M' },
  exec: function(editor) {

  }
});

export function sendData() {
  return editor.getValue()
}
