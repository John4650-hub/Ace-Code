import { onDeviceReady } from "./components/main_FileEntry.js";
import { EDITOR_CONFIG } from "./components/configs.js";

document.addEventListener('deviceready', onDeviceReady, false);


window.onload = function() {
    ace.require("ace/ext/language_tools");
    window.aceEditor = ace.edit('editor');
    window.aceEditor.setOptions(EDITOR_CONFIG);
}
// editor.commands.addCommand({
//   name: 'confirm language',
//   bindKey: { win: 'Ctrl-N', mac: 'Command-N' },
//   exec: function(editor) {
//     editor.session.setMode(`ace/mode/${modeChoice}`);
//   }
// });

export const SAVEFS = document.getElementById('saveFs');

export const OPENFS = document.getElementById('openFs');
export const SETFILE = document.getElementById('setFile');