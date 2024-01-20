import { EDITOR_CONFIG } from "./components/configs.js";
import sett from "./components/tabs/settingsTab.js";
import pasteTab from "./components/tabs/pasteBinTab.js";
import changeLogTab from "./components/tabs/changeLog.js";
import aboutMe from "./components/tabs/aboutMe.js";
import { startApp } from "./components/main_FileEntry.js"

$(document).ready(function() {
  $('[title]').tooltip();
  $('#settingstab-tb').click();
  startApp()
})

ace.require("ace/ext/language_tools");
window.aceEditor = ace.edit('editor');

aceEditor.setOptions(EDITOR_CONFIG);
aceEditor.commands.removeCommand('showSettingsMenu')

const MENU_TAB = document.querySelector("#menuTab");
let tabContent = document.querySelector(".tab-content")

class CreateTabs {
  constructor(id, icon, name) {
    this.icon = icon
    this.id = id
    this.name = name
    this.elmNode = document.createElement('li')
    insertAttr(['class:nav-item', "data-bs-toggle=tooltip", "data-bs-placement=bottom", "title=" + this.name], this.elmNode)

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
        <button class="w-100 btn btn-dark nav-link border-bottom border-end border-top-0 border-start-0 rounded-0" id="${this.id}-tb" data-bs-toggle="tab" data-bs-target="#${this.id}" type="button" role="tab" aria-controls="${this.id}" aria-selected="false"><i class="${this.icon}"></i>
        </button>`
  }
}
let tabIcons = ['fa fa-cog text-info', 'fa fa-paste text-info', 'fa fa-clipboard-list text-info', 'fab fa-github text-info', 'fa fa-laptop-code text-info']
let tabs = ["settingstab", "pasteBin", 'changeLog', 'github', "aboutme"]
let tabNames = ["settings", "Paste Bin", "change Log", "git", "about"]
for (let i = 0; i < tabs.length; i++) {
  let tab = new CreateTabs(`${tabs[i]}`, tabIcons[i], tabNames[i]);
}

let fb = tabContent.querySelector('div:first-child')
fb.setAttribute('class', fb.getAttribute('class') + ' active')
let ftb = MENU_TAB.querySelector('li button');
ftb.setAttribute('aria-selected', 'true')

sett('#settingstaby')
pasteTab("#pasteBin")
changeLogTab('#changeLog')
aboutMe('#aboutme')

// toggle  file offcanvas shortcut
const myFilesOffCanvas = new bootstrap.Offcanvas(document.getElementById('fileSystemCanvas'));
aceEditor.commands.addCommand({
  name: 'toggle_side_offCanvas',
  bindKey: {
    win: 'Ctrl-O',
    mac: 'Command-O'
  },

  exec: function(editor) {
    myFilesOffCanvas.toggle()
  },
  readOnly: true // false if this command should not apply in readOnly mode
});
function insertAttr(attrs, elm) {
  for (var i = 0; i < attrs.length; i++) {
    let nam,val = attrs[i].split('=')
    elm.setAttribute(nam, val)
  }
}