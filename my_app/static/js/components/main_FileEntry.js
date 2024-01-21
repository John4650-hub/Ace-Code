import { FILES_NOT_ALLOWED, FILE_EXTENSIONS } from './configs.js';

//LOADS DATA FROM THE FOLE SYSTEM
export function startApp() {
  function loadFs() {
    fetch('/load_fs', { method: 'GET' }).
    then(fs => fs.json()).then(function(dt) {
      $('#fileList').treeview({ data: dt, showBorder: true })
    })
  }

  window.readFs = function(fileEntryPath) {
    sessionStorage.setItem('current_file_path', fileEntryPath)
    fetch('/read_fs', { method: 'POST', body: fileEntryPath }).then(file_data => file_data.json()).then(function(data) {
      window.aceEditor.setValue(data.text);
    })
  }
  let file_path_to_save
  let codeObj
  window.writeToFs = function() {
    file_path_to_save = sessionStorage.getItem('current_file_path')
    if (file_path_to_save == null) {
      console.log('No open file to save, please open a file in the editor to save ')
    }
    else if (file_path_to_save != null) {
      codeObj = {}
      codeObj['code'] = window.aceEditor.getValue()
      codeObj['path'] = file_path_to_save
      fetch('/write_to_fs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(codeObj)
      }).then(response => response.text()).then(function(msg) {
        console.log(msg)
      })

    }
  }
  let extension
  window.getUrls = function(filElm) {
    let fileUrl = filElm.getAttribute('nativeURL')
    let fileUrlSplit = fileUrl.split("/")
    let filename = fileUrlSplit[fileUrlSplit.length - 1]
    if (filename.includes('.')){
    let pattern = /\.[a-z|A-Z|0-9]{1,4}/
    extension = filename.match(pattern).toString().slice(1);
    }else{extension='txt'}
    let checkValidity = FILES_NOT_ALLOWED.find(function(v) {
      
      return extension==v
    })
    if (checkValidity == undefined) {
      workWithFile(fileUrl);
      addRecentlyOpenedFile(filename, fileUrl, FILE_EXTENSIONS[extension])
      window.aceEditor.session.setMode(`ace/mode/${FILE_EXTENSIONS[extension]}`)
    } else {
      alert(`file ${filename} is not valid`)
    }}
  
  
  let recents = []
  function addRecentlyOpenedFile(name, url, ext) {
    let openedFile = makeElm('li')
    let fPath = makeElm('p')
    insertAttr(['class=fs-6 fw-light fst-italic mb-0'], fPath)
    fPath.innerText = url
    let row = makeElm('div')
    insertAttr(['class=row border-bottom border-white', `id=${url}`], row)
    insertAttr(['class=col-10 list-group-item bg-transparent border-0 h-25'], openedFile)
    let closeBtn = makeElm('button')
    closeBtn.innerHTML = '<i class="fa fa-minus-circle text-danger"></i>'

    insertAttr(['class=btn btn-dark col-2 fs-2 h-25 align-middle', 'type=button', `id=${url}row`], closeBtn)
    closeBtn.addEventListener('click', function() {
      let rid = this.getAttribute('id')
      let ridlen = rid.length
      let i_d = rid.slice(0, ridlen - 3)
      let recentElmId = recents.indexOf(i_d)
      let myRow = document.getElementById(i_d)
      myRow.remove()
      this.remove()
      recents.splice(recentElmId, 1)
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
      $('#recent_file').append(row)

      row.appendChild(openedFile)
      row.appendChild(closeBtn)
      openedFile.appendChild(fPath)
      recents.push(url)
    }
  }
  loadFs()

  window.workWithFile = function(filePath) {
    readFs(filePath);
  }
  aceEditor.commands.addCommand({
    name: 'save_file',
    bindKey: {
      win: 'Ctrl-S',
    },
    exec: function(editor) {
      writeToFs();
    },
    readOnly: true // false if this command should not apply in readOnly mode
  });
  $('#saveFs').click(writeToFs)
  sessionStorage.clear()
}