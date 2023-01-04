import { EDITOR_CONFIG } from "./components/configs.js";
import { modeChoice} from "./app.js";


ace.require("ace/ext/language_tools");
export const editor = ace.edit('editor');
editor.setOptions(EDITOR_CONFIG);

editor.commands.addCommand({
  name: 'confirm language',
  bindKey: { win: 'Ctrl-N', mac: 'Command-N' },
  exec: function(editor) {
    editor.session.setMode(`ace/mode/${modeChoice}`);
  }
});
//
