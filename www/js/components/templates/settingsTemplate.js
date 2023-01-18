var themeData = [
    ["Chrome"],
    ["Clouds"],
    ["Crimson Editor"],
    ["Dawn"],
    ["Dreamweaver"],
    ["Eclipse"],
    ["GitHub"],
    ["IPlastic"],
    ["Solarized Light"],
    ["TextMate"],
    ["Tomorrow"],
    ["Xcode"],
    ["Kuroir"],
    ["KatzenMilch"],
    ["SQL Server", "sqlserver", "light"],
    ["Ambiance", "ambiance", "dark"],
    ["Chaos", "chaos", "dark"],
    ["Clouds Midnight", "clouds_midnight", "dark"],
    ["Dracula", "", "dark"],
    ["Cobalt", "cobalt", "dark"],
    ["Gruvbox", "gruvbox", "dark"],
    ["Green on Black", "gob", "dark"],
    ["idle Fingers", "idle_fingers", "dark"],
    ["krTheme", "kr_theme", "dark"],
    ["Merbivore", "merbivore", "dark"],
    ["Merbivore Soft", "merbivore_soft", "dark"],
    ["Mono Industrial", "mono_industrial", "dark"],
    ["Monokai", "monokai", "dark"],
    ["Nord Dark", "nord_dark", "dark"],
    ["One Dark", "one_dark", "dark"],
    ["Pastel on dark", "pastel_on_dark", "dark"],
    ["Solarized Dark", "solarized_dark", "dark"],
    ["Terminal", "terminal", "dark"],
    ["Tomorrow Night", "tomorrow_night", "dark"],
    ["Tomorrow Night Blue", "tomorrow_night_blue", "dark"],
    ["Tomorrow Night Bright", "tomorrow_night_bright", "dark"],
    ["Tomorrow Night 80s", "tomorrow_night_eighties", "dark"],
    ["Twilight", "twilight", "dark"],
    ["Vibrant Ink", "vibrant_ink", "dark"]
];

function insertAttr(attrBts, elm) {
  for (let i of attrBts) {
    let attrbt = i.split('=')
    elm.setAttribute(attrbt[0], attrbt[1])
  }
}
/**
 * @param {String} makeElm creates elements
 **/
function makeElm(elm) {
  return document.createElement(elm)
}
let row_;
let col1_;
let col2_;
let label_;
let labelItem_;
let optn;

export function sett(_Par) {
  let parentElm = document.querySelector(_Par);
  function AddElm(elm = 'select') {
    let a = makeElm('div')
    let b = makeElm('div')
    let c = makeElm('label')
    let d = makeElm('div')
    let e = makeElm(elm)
    parentElm.appendChild(a)
    a.appendChild(b)
    a.appendChild(d)
    b.appendChild(c)
    d.appendChild(e)
    a.setAttribute('class', 'row pb-2')
    b.setAttribute('class', 'col')
    d.setAttribute('class', 'col')
    c.setAttribute('class', 'text-info')
    return [a, b, c, d, e]
  }
  //themes Rows
[row_, col1_, label_, col2_, labelItem_] = AddElm()

  label_.innerText = 'Themes'

  labelItem_.setAttribute('class', 'form-select')

  for (let i = 0; i < themeData.length; i++) {
    optn = makeElm('option');
    optn.innerText = themeData[i][0]
    optn.setAttribute('value', `ace/theme/${themeData[i][0]}`);
    labelItem_.appendChild(optn)
  }

  //keybinding row
  let keybindings = ['Ace', 'Emacs', 'sublime', 'VSCode']
  let row2_
  [row2_, col1_, label_, col2_, labelItem_] = AddElm()
  label_.innerText = 'Keybindings'
  labelItem_.setAttribute('class', 'form-select');

  for (let i = 0; i < keybindings.length; i++) {
    optn = makeElm('option');
    optn.innerText = keybindings[i]
    optn.setAttribute('value', keybindings[i]);
    labelItem_.appendChild(optn)
  }

  //fontsize row
[row_, col1_, label_, col2_, labelItem_] = AddElm()

  label_.innerText = 'font size'
  labelItem_.setAttribute('class', 'form-select')

  for (let i = 8; i < 33; i++) {
    optn = makeElm('option');
    optn.innerText = i + 'px'
    optn.setAttribute('value', i);
    labelItem_.appendChild(optn)
  }

  //tabs
[row_, col1_, label_, col2_, labelItem_] = AddElm();

  label_.innerText = 'Tabs Size';
  labelItem_.setAttribute('class', 'form-select');

  for (let i = 1; i < 10; i++) {
    optn = makeElm('option');
    optn.innerText = i;
    optn.setAttribute('value', i);
    labelItem_.appendChild(optn);
  }
  //relative number
[row_, col1_, label_, col2_, labelItem_] = AddElm('input')
  label_.innerText = 'Relative Number';
  col2_.setAttribute('class', 'col form-check');
  col2_.style.marginLeft = "6em"
  insertAttr(['class=form-check-input', 'type=checkbox', 'value= '], labelItem_);

  //show invisible
  [row_, col1_, label_, col2_, labelItem_] = AddElm('input')
  label_.innerText = 'Show invisible';
  col2_.setAttribute('class', 'col form-check');
  col2_.style.marginLeft = "6em"
  insertAttr(['class=form-check-input', 'type=checkbox', 'value= '], labelItem_);

//Live autocompletion
[row_, col1_, label_, col2_, labelItem_] = AddElm('input')
  label_.innerText = 'Enable autoComplete';
  col2_.setAttribute('class', 'col form-check');
  col2_.style.marginLeft = "6em"
  insertAttr(['class=form-check-input', 'type=checkbox', 'value= '], labelItem_);






}