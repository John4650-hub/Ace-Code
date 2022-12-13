import { editor } from "./index.js";
import { onDeviceReady } from "./components/fileSys.js";

document.addEventListener('deviceready', onDeviceReady, false);

export function modeChoice() {
  var selectElm = document.getElementById('modes');
  return selectElm.value;
}

export function sendData() {
  return editor.getValue()
}

export const SAVEFS = document.getElementById('saveFs');
export const OPENFS = document.getElementById('openFs');
// OPENFS.addEventListener('click', function() {
// alert('opened')
// });


