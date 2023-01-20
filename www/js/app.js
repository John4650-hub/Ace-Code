import { onDeviceReady } from "./components/main_FileEntry.js";
import { EDITOR_CONFIG } from "./components/configs.js";
import sett from "./components/tabs/settingsTab.js";
import pasteTab from "./components/tabs/pasteBinTab.js";
import changeLogTab from "./components/tabs/changeLog.js";
$(document).ready(function() {
  $('[title]').tooltip();
})
document.addEventListener('deviceready', onDeviceReady, false);

ace.require("ace/ext/language_tools");
window.aceEditor = ace.edit('editor');
aceEditor.setOptions(EDITOR_CONFIG);
aceEditor.commands.removeCommand('showSettingsMenu')

export const SAVEFS = document.getElementById('saveFs');

export const OPENFS = document.getElementById('openFs');
export const SETFILE = document.getElementById('setFile');


const MENU_TAB = document.querySelector("#menuTab");
let tabContent = document.querySelector(".tab-content")

class CreateTabs {
  constructor(id, icon, name) {
    this.icon = icon
    this.id = id
    this.name = name
    this.elmNode = document.createElement('li')
    insertAttr(['class:nav-item',"data-bs-toggle=tooltip","data-bs-placement=bottom","title="+this.name], this.elmNode)
    
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
    
        <button class="w-100 bg-dark nav-link border-bottom border-end border-top-0 border-start-0 rounded-0" id="${this.id}-tb" data-bs-toggle="tab" data-bs-target="#${this.id}" type="button" role="tab" aria-controls="${this.id}" aria-selected="false"><i class="${this.icon}"></i>
        </button>
        `
  }
}
let tabIcons = ['fa fa-cog text-info', 'fa fa-paste text-info', 'fa fa-clipboard-list text-info', 'fab fa-github text-info']
let tabs = ["settingstab", "pasteBin", 'changeLog', 'github']
let tabNames = ["settings","Paste Bin","change Log","git"]
for (let i = 0; i < tabs.length; i++) {
  let tab = new CreateTabs(`${tabs[i]}`, tabIcons[i],tabNames[i]);
}

let fb = tabContent.querySelector('div:first-child')
fb.setAttribute('class', fb.getAttribute('class') + ' active')
let ftb = MENU_TAB.querySelector('li button');
ftb.setAttribute('aria-selected', 'true')

sett('#settingstaby')
pasteTab("#pasteBin")
changeLogTab('#changeLog')