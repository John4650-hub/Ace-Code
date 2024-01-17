function makeElm(elm) {
  return document.createElement(elm)
}

/**
*@param {object[]} Attributes-array|style
* -attributes inserts attributes or styling to an 
* element.
**/
function insertAttr(attrBts, elm, styling = false) {
  if (styling) {
    for (let i of attrBts) {
      let [sty, val] = i.split(':');
      elm.style[sty] = val;
    }
  }
  else {
    for (let i of attrBts) {
      let [attrb, val] = i.split('=')
      elm.setAttribute(attrb, val)
    }
  }
}
