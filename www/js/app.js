import { editor } from "./index.js";
import { onDeviceReady } from "./components/fileSys.js";

alert(cordova);
export function modeChoice() {
  var selectElm = document.getElementById('modes');
  return selectElm.value;
}



function save() {
  console.log(editor.getValue());
}

const AIRLINE = document.getElementById("air-line");
export const SAVEFS = document.getElementById('saveFs');
export const OPENFS = document.getElementById('openFs');

SAVEFS.addEventListener('click', () => {
  console.log(editor.getValue());
});
// OPENFS.addEventListener('click', function() {
// alert('opened')
// });

document.addEventListener('deviceready', onDeviceReady, false);
