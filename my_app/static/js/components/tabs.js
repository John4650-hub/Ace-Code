export default class FileTab {
  constructor(parElm, fileName, filePath, fileType,editorId)
  {
    this.parElm = parElm
    this.fileName = fileName
    this.filePath = filePath
    this.fileType = fileType
    this.editorId = editorId
  }
  create()
  {
    let tab = makeElm(div)
    tab.innerText = this.fileName
    this.parElm.appendChild(tab)
  }
}
