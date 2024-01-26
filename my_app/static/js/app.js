import sett from "./components/tabs/settingsTab.js";
import pasteTab from "./components/tabs/pasteBinTab.js";
import compilerTab from "./components/tabs/compiler.js";
import changeLogTab from "./components/tabs/changeLog.js";
import aboutMe from "./components/tabs/aboutMe.js";
import { startApp } from "./components/main_FileEntry.js"
import * as prettier from '../libs/standalone.mjs'
import prettierPluginhtml from '../libs/parser-html.mjs'
import prettierPluginyaml from '../libs/parser-yaml.mjs'
import prettierPluginesEstree from '../libs/parser-espree.mjs';
import prettierPluginesBabel from '../libs/parser-babel.mjs';


$(document).ready(function() {
  $('[title]').tooltip();
  $('#settingstab-tb').click();
  startApp()
  sett('#settingstaby')
})

ace.require("ace/ext/language_tools");
ace.require('ace/ext/code_lens');
window.aceEditor = ace.edit('editor');

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
let tabIcons = ['fa fa-cog text-info','fa fa-terminal text-info','fa fa-paste text-info', 'fa fa-clipboard-list text-info', 'fab fa-github text-info', 'fa fa-laptop-code text-info']
let tabs = ["settingstab","compiler", "pasteBin", 'changeLog', 'github', "aboutme"]
let tabNames = ["settings","Compiler", "Paste Bin", "change Log", "git", "about"]
for (let i = 0; i < tabs.length; i++) {
  let tab = new CreateTabs(`${tabs[i]}`, tabIcons[i], tabNames[i]);
}

let fb = tabContent.querySelector('div:first-child')
fb.setAttribute('class', fb.getAttribute('class') + ' active')
let ftb = MENU_TAB.querySelector('li button');
ftb.setAttribute('aria-selected', 'true')

compilerTab("#compiler")
pasteTab("#pasteBin")
changeLogTab('#changeLog')
aboutMe('#aboutme')

// toggle  file offcanvas shortcut
window.myFilesOffCanvas = new bootstrap.Offcanvas(document.getElementById('fileSystemCanvas'));
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
aceEditor.commands.addCommand({
  name: 'Format code',
  bindKey: {
    win: 'Alt-f',
    mac: 'Command-f'
  },

  exec: function(editor) {
    Codeformat()
  },
  readOnly: true // false if this command should not apply in readOnly mode
});


function insertAttr(attrs, elm) {
  for (var i = 0; i < attrs.length; i++) {
    let nam, val = attrs[i].split('=')
    elm.setAttribute(nam, val)
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
document.addEventListener(
  "keydown",
  (e) => {
    if (e.key === "F11") {
      toggleFullScreen();
    }
  },
  false,
);

// ALERTS
window.alert_ = function(message, type,timeDelay=2000) {
  let wrapper = document.createElement('div')
  wrapper.innerHTML = '<div id="save_alert" class="alert alert-' + type + ' alert-dismissible start-50 p-0 text-center fw-bolder top-0 m-0" role="alert">' + message + '</div>'
  $('#on_save_alert').append(wrapper)
  setTimeout(function() {
    bootstrap.Alert.getOrCreateInstance($('#save_alert')).close()
  }, timeDelay)
}
window.Codeformat = function() {
  let _code = window.aceEditor.getValue()
  switch (sessionStorage.getItem('extension')) {
    case 'py':
      fetch('/format_python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'code': _code })
      }).then(res => res.text()).then(function(data) {
        window.aceEditor.setValue(data);
      })
      break;
    case 'js':
      window.aceEditor.setValue(
        prettier.default.format(_code, {
          parser: "babel",
          plugins: [prettierPluginesEstree,prettierPluginesBabel]
        }));
      break;
    case 'yaml':
      window.aceEditor.setValue(
        prettier.default.format(_code, {
          parser: "yaml",
          plugins: [prettierPluginyaml]
        }));
      break;
    case 'html':
      window.aceEditor.setValue(
        prettier.default.format(_code, {
          parser: "html",
          plugins: [prettierPluginhtml]
        }));
      break;
    default:
      alert_('Not supported yet!!!', 'danger')
  }

}