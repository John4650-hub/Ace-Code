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
console.log("hello");
const MENU_TAB = document.getElementById("menuTab");

class CreateTabs {
  constructor(id, icon) {
    this.icon = icon
    this.id = id
    this.elmNode = document.createElement('li')
    //this.insertAttr(attrB, this.elmNode)
    MENU_TAB.appendChild(this.elmNode)
    this.addTabContent()
    this.addInnerKid()
    let firstTb = document.querySelector('#menuTab li:last-child div')
    let tab = new bootstrap.Tab(firstTb)
    tab.show()
  }
  addTabContent() {
    tabContent.innerHTML += `
        <div class="tab-pane position-fixed bottom-0 start-0 ms-0 mt-1" style=" top:80px;right: 0px;" id="you${this.id}" role="tabpanel" aria-labelledby="${this.id}-tab"></div>
        `
  }
  addInnerKid() {
    this.addTabContent()
    this.elmNode.innerHTML = `
        <div class="w-100 bg-dark nav-link border-bottom border-end border-top-0 border-start-0 rounded-0" data-bs-toggle="tooltip" data-bs-placement="top" title="exit"  num="${this.id}" onclick="checkBack(this)" id="${this.id}-tab" data-bs-toggle="tab" data-bs-target="#you${this.id}" type="button" role="tab" aria-controls="you${this.id}" aria-selected="false"><i class="${this.icon}"></i></div>
        `
  }
  insertAttr(attrBts, elm) {
    for (let i of attrBts) {
      let attrbt = i.split(':')
      elm.setAttribute(attrbt[0], attrbt[1])
    }
  }
}
let tabIcons = ['fa fa-cog text-info','fa fa-paste text-info','fa fa-clipboard-list text-info','fab fa-github text-info']
let tabs = ["fj", "yor", 'jff', 'udj']
setTimeout(function() {
  for (let i = 0; i < tabs.length; i++) {
    let Tab = new CreateTabs(`${tabs[i]}-tab`, tabIcons[i]);
  }
}, 1000)