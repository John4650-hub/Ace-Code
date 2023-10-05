let log = [{
    version: 'v 4.0.7',
    info: `✅Added new paste in textarea,
  ✅support for new language,
  ✅Added about section`
}, {
    version: 'v5.0.0',
    info: `✅Added tab for recently edited files
  ✅implemented saving of setting 
  `
},{version:'v5.0.1',info: `✅UI cleanUp
✅Added Comments
`},{version:'v5.0.2',info: `✅Just fixed recent files
`},{version:'v5.0.3',info: `✅Bug fix
`},{version:'v5.0.4',info: `✅Now able to close recently opened files
✅fixed error of files not being read
`},{version:'v5.0.5',info: `✅ctrl+S to save changes
✅Now app can run in background
✅Prevent abrupt closure of app when using other apps
`},{version:'v5.0.6',info: `✅Now ctrl + S 5o save changes to a file you are currently editing
`}
]

export default function changeLogTab(_par) {
  let parentElm = document.querySelector(_par);
  let listGroup = makeElm('div')
  insertAttr(['class=container'], listGroup)
  let listElm = makeElm('ul')
  insertAttr(['class=list-group'], listElm)
  parentElm.appendChild(listElm)
  let version, listItem, title, inform;
  for (let i = log.length - 1; i >= 0; i--)
  {
    version = makeElm('li');
    title = makeElm('h2')
    version.appendChild(title)
    title.innerText = log[i].version
    inform = makeElm('p')
    inform.innerText = log[i].info
    insertAttr(['class=list-group-item'], version)
    version.appendChild(inform)
    listElm.appendChild(version)
    parentElm.appendChild(version);
  }

}