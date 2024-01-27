//compiler
let row_, btn_row;
let col1_, btn_col1;
let col2_, btn_col2;
let label_, btn_label;
let labelItem_, btn_labelItem;
let optn;
let _Choice;
let out_, err_, c_out;

function AddElm(par_, elm = 'select') {
  let a = makeElm('div')
  let b = makeElm('div')
  let c = makeElm('label')
  let d = makeElm('div')
  let e = makeElm(elm)
  par_.appendChild(a)
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
export default function compilerTab(_par) {
  let parentElm = document.querySelector(_par);
  [row_, col1_, label_, col2_, labelItem_] = AddElm(parentElm);
  labelItem_.setAttribute('class', 'form-select')
  label_.innerText = 'Language'
  insertAttr(['class=form-select', 'id=compiler_lang'], labelItem_)

  fetch('/lang_data', { method: 'GET' }).then(res => res.json()).then(function(c_lang) {
    for (let i = 0; i < c_lang.length; i++) {
      _Choice = c_lang[i]['name']
      optn = makeElm('option');
      optn.innerText = c_lang[i]['name']
      optn.setAttribute('value', c_lang[i]['id']);
      labelItem_.appendChild(optn)

    }
    if (localStorage.getItem('language_id') != null) {
      labelItem_.value = localStorage.getItem('language_id')
    }
  });
  [btn_row, btn_col1, btn_label, btn_col2, btn_labelItem] = AddElm(parentElm, 'button')
  btn_col2.setAttribute('class', 'col pt-3 pb-1');
  btn_labelItem.innerText = 'RUN'
  insertAttr(["class=btn btn-primary", 'id=saveBnt'], btn_labelItem)
  btn_labelItem.addEventListener('click', () => {
    localStorage.setItem('language_id', labelItem_.value);
    getValues()
  })

  let b = makeElm('textarea')
  insertAttr(['class=form-control w-100 m-0', 'id=results_output'], b);
  insertAttr(["height:500px", "color:white", "backgroundColor:black", "fontFamily:times new roman", "fontSize:12px"], b, true);
  parentElm.appendChild(b);
}

let elmIds = ['compiler_lang']
let options = ['language_id']

function getValues() {
  let req = {}
  let optn
  for (let i = 0; i < elmIds.length; i++) {
    optn = document.getElementById(elmIds[i]).value
    // console.log(optn)
    req[options[i]] = optn

  }
  let code = window.aceEditor.getValue()
  let l_id = localStorage.getItem('language_id')
  let output_ = document.getElementById('results_output')
  fetch('/run_code', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "language_id": l_id,
      "source_code": code
    })
  }).then(res => res.json()).then(function(resp) {
    out_ = resp['stdout']
    err_ = resp['stderr']
    c_out = resp['compile_output']
    if (out_ != null) {
      output_.value += "$ "+out_ +'\n'
    } else {
      if (err_ != null) {
        output_.value += "$ "+err_ +"\n"
      } else {
        output_.value = "$ "+c_out+"\n"
      }
    }
  })
}