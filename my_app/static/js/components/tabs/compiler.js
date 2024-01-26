//compiler

export default function compilerTab(_par) {
  let parentElm = document.querySelector(_par);
  let b = makeElm('textarea')
  insertAttr(['class=form-control w-100 m-0'], b);
  insertAttr(["height:100px", "color:white", "backgroundColor:black", "fontFamily:times new roman", "fontSize:12px"], b, true);
  parentElm.appendChild(b);
}