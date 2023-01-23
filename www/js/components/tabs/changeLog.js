let log = [
  "Added new paste in textarea ",
  "support for new language",
  "Added about section"
  ]

export default function changeLogTab(_par) {
  let parentElm = document.querySelector(_par);
  let listGroup = makeElm('div')
  insertAttr(['class=container'], listGroup)
  let listElm = makeElm('ul')
  insertAttr(['class=list-group'], listElm)

  let versionName = makeElm('h2');
  versionName.innerText = 'v 4.0.7 (latest)'
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