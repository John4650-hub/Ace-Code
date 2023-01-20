let log = [
  "Added new feature",
  "Added change log",
  "added new color",
  "support for new language"
  ]

export default function changeLogTab(_par) {
  let parentElm = document.querySelector(_par);
  let listGroup = makeElm('div')
  insertAttr(['class=container'], listGroup)
  let listElm = makeElm('ul')
  insertAttr(['class=list-group'], listElm)

  let versionName = makeElm('h2');
  versionName.innerText = 'v 4.0.3'
  listElm.appendChild(versionName)
  listGroup.appendChild(listElm)
  addLogTxt()
  parentElm.appendChild(listGroup);

  function addLogTxt() {
    let listItem;
    log.forEach((lg) => {
      listItem = makeElm('li');
      listItem.innerText = lg
      listElm.appendChild(listItem)
    })
  }
}