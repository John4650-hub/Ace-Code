import { onDeviceReady } from "./components/main_FileEntry.js";
import { EDITOR_CONFIG } from "./components/configs.js";
import { sett } from "./components/tabs/settingsTab.js";

document.addEventListener('deviceready', onDeviceReady, false);


window.onload = function() {
  ace.require("ace/ext/language_tools");
  window.aceEditor = ace.edit('editor');
  aceEditor.setOptions(EDITOR_CONFIG);
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


const MENU_TAB = document.querySelector("#menuTab");
let tabContent = document.querySelector(".tab-content")
let attrB = ['class:nav-item']
class CreateTabs {
  constructor(id, icon) {
    this.icon = icon
    this.id = id
    this.elmNode = document.createElement('li')
    this.insertAttr(attrB, this.elmNode)
    MENU_TAB.appendChild(this.elmNode)
    this.addTabContent()
    this.addInnerKid()
  }
  addTabContent() {
    tabContent.innerHTML += `
        <div class="tab-pane p-0 m-0" id="${this.id}" role="tabpanel" aria-labelledby="${this.id}-tb">
        <div class="container-fluid p-0 m-0" id ="${this.id}y"></div>
        </div>
        `
  }
  addInnerKid() {
    this.elmNode.innerHTML = `
        <button class="w-100 bg-dark nav-link border-bottom border-end border-top-0 border-start-0 rounded-0" id="${this.id}-tb" data-bs-toggle="tab" data-bs-target="#${this.id}" type="button" role="tab" aria-controls="${this.id}" aria-selected="false"><i class="${this.icon} w-100"></i></button>
        `
  }
  insertAttr(attrBts, elm) {
    for (let i of attrBts) {
      let attrbt = i.split(':')
      elm.setAttribute(attrbt[0], attrbt[1])
    }
  }
}
let tabIcons = ['fa fa-cog text-info', 'fa fa-paste text-info', 'fa fa-clipboard-list text-info', 'fab fa-github text-info']
let tabs = ["settingstab", "pasteBin", 'changeLog', 'github']
for (let i = 0; i < tabs.length; i++) {
  let tab = new CreateTabs(`${tabs[i]}`, tabIcons[i]);
}

let fb = tabContent.querySelector('div:first-child')
fb.setAttribute('class', fb.getAttribute('class') + ' active')
let ftb = MENU_TAB.querySelector('li button');
ftb.setAttribute('aria-selected', 'true')

sett('#settingstaby')