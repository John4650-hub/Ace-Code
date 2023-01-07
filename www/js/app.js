import { editor } from "./index.js";
import { onDeviceReady } from "./components/main_FileEntry.js";


document.addEventListener('deviceready', onDeviceReady, false);

export let modeChoice = '';

const selectElm = document.getElementById('modes');
const dropdownElms = selectElm.children
/*
added event listener to call when dropdown item is clicked
*/
for (let i = 0; i < dropdownElms.length; i++) {
  dropdownElms[i].addEventListener('click', () => { modeChoice = dropdownElms[i].getAttribute('value') });
}


export function sendData() {
  return editor.getValue()
}

export const SAVEFS = document.getElementById('saveFs');
export const OPENFS = document.getElementById('openFs');
export const SETFILE = document.getElementById('setFile');