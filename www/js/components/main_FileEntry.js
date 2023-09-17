import { OPENFS, SAVEFS, recentFilesTab } from "../app.js";
import { writeFile } from "./File_System/writeFile.js";
import { readFile } from "./File_System/readFile.js";
import { entryIcon } from "./File_System/fileSysUi.js";
import { FILES_NOT_ALLOWED, FILE_EXTENSIONS } from "./configs.js";


export async function onDeviceReady() {
  /*@@param {Promise} reads-directory-recursively Read the local storage and fill the sidebar with files in it
   **/
  function listDir(url = '', result = []) {
    return new Promise(function(res, rej) {
      let path;
      if (url == '') {
        path = cordova.file.externalRootDirectory
      } else {
        path = url + '/';
      }
      window.resolveLocalFileSystemURL(path,
        function(fs) {
          const reader = fs.createReader();
          reader.readEntries(function(entries) {
            for (let i = 0; i < entries.length; i++) {
              entries[i].text = entries[i].name
              if (entries[i].isDirectory == true) {
                entries[i].state = {
                  checked: false,
                  expanded: false,
                  selected: false
                }
                entries[i].nodes = []
                result.push(entries[i])
                listDir(entries[i].nativeURL, entries[i].nodes)
              } else {
                entries[i].onclick = "getUrls(this)"
                entryIcon(entries[i])
                result.push(entries[i]);
              }
            }
          }, (rej) => { return rej });
        }, (rej) => { return rej });
      res(result)
    })
  }

  let files = await listDir();

  function getTree() {
    let data = files;
    return data;
  }
  setTimeout(() => {
    $("#fileList").treeview({ data: getTree(), showBorder: false });
  }, 2500)

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
    function(fs) {
      /**
       *@@param {HTML ELEMENT OBJECT } getUrls gets the 
       * full path of the files and checks whether files 
       * is good for working with.
       **/
      function getUrls(filElm) {

        let fileUrl = filElm.getAttribute('fullPath');
        let fileTruePath = fileUrl.slice(1)
        let fileUrlSplit = fileTruePath.split("/")
        let filename = fileUrlSplit[fileUrlSplit.length - 1]
        let pattern = /\.[a-z]{1,4}/
        let extension = filename.match(pattern).toString().slice(1);
        let checkValidity = FILES_NOT_ALLOWED.find(function(v) {
          return v === extension
        })
        if (checkValidity == undefined) {
          workWithFile(fileTruePath);
          addRecentlyOpenedFile(filename, fileTruePath, FILE_EXTENSIONS[extension])
          window.aceEditor.session.setMode(`ace/mode/${FILE_EXTENSIONS[extension]}`)

        } else {
          alert(`file ${filename} is not valid`)
        }
      }

      fs.root.getFile('Android/data/com.ace.code/files/settings.json', {
        create: true,
        exclusive: false
      }, function(fEntry) {
        fEntry.file(function(file) {
          let reader = new FileReader()
          reader.onloadend = function() {
            aceEditor.setOptions(JSON.parse(this.result))
          }
          reader.readAsText(file)
        }, (e) => console.log());
      }, (e) => console.log(e));

      window.getUrls = getUrls
      let fE; //Helps to avoid saving the same data in various entries
      function workWithFile(filePath) {
        fs.root.getFile(filePath, { create: true, exclusive: false }, function(fileEntry) {

          fE = fileEntry
          readFile(fE);
          //SAVE FILE when saveFs btn is clicked

          SAVEFS.addEventListener('click', saveFile);

          function saveFile() { writeFile(fE, null); }

        }, () => { console.log('failed to save file'); });
      }
      let recents = []

      function addRecentlyOpenedFile(name, url, ext) {
        let openedFile = makeElm('li')
        let fPath = makeElm('p')
        insertAttr(['class=fs-6 fw-light fst-italic mb-0'], fPath)
        fPath.innerText = url
        let row = makeElm('div')
        insertAttr(['class=row border-bottom border-white',`id=${url}`],row)
        insertAttr(['class=col-10 list-group-item bg-transparent border-0 h-25'], openedFile)
        let closeBtn = makeElm('button')
        closeBtn.innerHTML = '<i class="fa fa-minus-circle text-danger"></i>'
        
        insertAttr(['class=btn btn-dark col-2 fs-2 h-25 align-middle','type=button',`id=${url}row`], closeBtn)
        closeBtn.addEventListener('click', function() {
          let rid = this.getAttribute('id')
          let ridlen = rid.length
          let i_d = rid.slice(0,ridlen-3)
          let recentElmId= recents.indexOf(i_d)
          let myRow = document.getElementById(i_d)
          myRow.remove()
          this.remove()
          recents.splice(recentElmId,1)
        })
        openedFile.innerText = name
        openedFile.addEventListener('click', function() {
          workWithFile(url)
          window.aceEditor.session.setMode(`ace/mode/${ext}`)
        })
        let foundMatch = false
        for (let i = 0; i < recents.length; i++) {
          if (recents[i] == url) {
            console.log('match')
            foundMatch = true
            break
          } else {
            foundMatch = false
          }
        }
        if (foundMatch == false) {
          recentFilesTab.appendChild(row)
          
          row.appendChild(openedFile)
          row.appendChild(closeBtn)
          openedFile.appendChild(fPath)
          recents.push(url)
        }
      }
    }, () => { console.log('failed to load file system'); });
}