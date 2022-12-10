import { EDITOR_CONFIG } from "./components/configs.js";
import { modeChoice } from "./app.js"

ace.require("ace/ext/language_tools");
const editor = ace.edit('editor');
editor.setOptions(EDITOR_CONFIG);
editor.commands.addCommand({
  name: 'myCommand',
  bindKey: { win: 'Ctrl-N', mac: 'Command-N' },
  exec: function(editor) {

    editor.sessions.setMode(`ace/mode/${modeChoice}`)
  }
});

export function sendData() {
  return editor.getValue()
}
