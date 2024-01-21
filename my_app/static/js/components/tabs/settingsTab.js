let EDITOR_CONFIG = {}


var themeData = [
    ["Chrome"],
    ["Clouds"],
    ["Crimson_editor"],
    ["Dawn"],
    ["Dreamweaver"],
    ["Eclipse"],
    ["GitHub"],
    ["IPlastic"],
    ["Solarized_light"],
    ["TextMate"],
    ["Tomorrow"],
    ["Xcode"],
    ["Kuroir"],
    ["KatzenMilch"],
    ["SQL Server", "sqlserver", "light"],
    ["Ambiance", "ambiance", "dark"],
    ["Chaos", "chaos", "dark"],
    ["Clouds Midnight", "clouds_midnight", "dark"],
    ["Dracula", "dracula", "dark"],
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

/**
 * @param {String} makeElm creates elements
 **/
let row_;
let col1_;
let col2_;
let label_;
let labelItem_;
let optn;
let themeChoice;

export default function sett(_Par) {
  let parentElm = document.querySelector(_Par);

  // [row_, col1_, label_, col2_, labelItem_]
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
    return [a, b, c, d, e];
  }


  //themes Rows
[row_, col1_, label_, col2_, labelItem_] = AddElm();
  label_.innerText = 'Themes'
  insertAttr(['class=form-select', 'id=Themes'], labelItem_)
  for (let i = 0; i < themeData.length; i++) {
    themeChoice = themeData[i][0]
    if (themeData[i].length == 3) {
      themeChoice = themeData[i][1]
    }

    optn = makeElm('option');
    optn.innerText = themeData[i][0]
    optn.setAttribute('value', `ace/theme/${themeChoice.toLowerCase()}`);

    labelItem_.appendChild(optn)
  }

  //fontsize row
[row_, col1_, label_, col2_, labelItem_] = AddElm()
  label_.innerText = 'font size'
  insertAttr(['class=form-select', 'id=font-size'], labelItem_);

  for (let i = 8; i < 33; i++) {
    optn = makeElm('option');
    optn.innerText = i + 'px'
    optn.setAttribute('value', i + 'px');
    labelItem_.appendChild(optn)
  }

  //tabs size row
[row_, col1_, label_, col2_, labelItem_] = AddElm();

  label_.innerText = 'Tab Size';
  insertAttr(['class=form-select', 'id=Tab-Size'], labelItem_);
  labelItem_.setAttribute('class', 'form-select');
  for (let i = 1; i < 10; i++) {
    optn = makeElm('option');
    optn.innerText = i;
    optn.setAttribute('value', i);
    labelItem_.appendChild(optn);
  }

  //relative number row
[row_, col1_, label_, col2_, labelItem_] = AddElm('input')
  label_.innerText = 'Relative Number';

  col2_.setAttribute('class', 'col form-check');
  col2_.style.marginLeft = "60px"
  insertAttr(['class=form-check-input', 'type=checkbox', 'value= ', 'id=Relative-Number'], labelItem_);

  //show invisible
  [row_, col1_, label_, col2_, labelItem_] = AddElm('input')
  label_.innerText = 'Show invisible';
  col2_.setAttribute('class', 'col form-check');
  col2_.style.marginLeft = "60px"
  insertAttr(['class=form-check-input', 'type=checkbox', 'value= ', 'id=Show-invisible'], labelItem_);

  //Live autocompletion row
[row_, col1_, label_, col2_, labelItem_] = AddElm('input')
  label_.innerText = 'Auto Complete';
  col2_.setAttribute('class', 'col form-check');
  col2_.style.marginLeft = "60px"
  insertAttr(['class=form-check-input', 'type=checkbox', 'value= ', 'id=Enable-autoComplete'], labelItem_);

  // enable behaiours
[row_, col1_, label_, col2_, labelItem_] = AddElm('input')
  label_.innerText = 'Behaviour';
  col2_.setAttribute('class', 'col form-check');
  col2_.style.marginLeft = "60px"
  insertAttr(['class=form-check-input', 'type=checkbox', 'value= ', 'id=Enable-behaviours'], labelItem_);

  //Line Numbers
[row_, col1_, label_, col2_, labelItem_] = AddElm('input')
  label_.innerText = 'Line Numbers';
  col2_.setAttribute('class', 'col form-check');
  col2_.style.marginLeft = "60px"
  insertAttr(['class=form-check-input', 'type=checkbox', 'value= ', 'id=show-line-numbers'], labelItem_);

  //

  //save btn row
[row_, col1_, label_, col2_, labelItem_] = AddElm('button')
  col2_.setAttribute('class', 'col pt-3 pb-1');
  labelItem_.innerText = 'save'
  insertAttr(["class=btn btn-primary", 'id=saveBnt'], labelItem_)
  labelItem_.addEventListener('click', getValues)

  //setValue
  let elmIds = ['Themes', 'font-size', 'Tab-Size', 'Relative-Number', 'Show-invisible', 'Enable-autoComplete', 'Enable-behaviours', 'show-line-numbers']
  let options = ['theme', 'fontSize', 'tabSize', 'relativeLineNumbers', 'showInvisibles', 'enableLiveAutocompletion', 'behavioursEnabled', 'showLineNumbers']

  fetch('/settings', { method: 'GET' }).then(res => res.json()).then((config) => {
    window.aceEditor.setOptions(config);
    EDITOR_CONFIG = config
    setValues()
  })

  function setValues() {
    for (let i = 0; i < elmIds.length; i++) {
      let elmVal = document.getElementById(elmIds[i])
      if (elmVal.getAttribute('type') == 'checkbox') {
        elmVal.checked = EDITOR_CONFIG[options[i]];
      }
      else {
        elmVal.value = EDITOR_CONFIG[options[i]];
      }
    }
  }

  function getValues() {
    for (let i = 0; i < elmIds.length; i++) {
      let elmVal = document.getElementById(elmIds[i])
      if (elmVal.getAttribute('type') == 'checkbox') {
        EDITOR_CONFIG[options[i]] = elmVal.checked;
      }
      else {
        EDITOR_CONFIG[options[i]] = elmVal.value;
      }
    }
    fetch('/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(EDITOR_CONFIG) }).then(res => res.text()).then(function(msg) {
      console.log(msg);
      window.aceEditor.setOptions(EDITOR_CONFIG);

    })


  }
}