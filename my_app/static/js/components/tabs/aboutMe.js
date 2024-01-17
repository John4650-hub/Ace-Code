
export default function aboutMe(_par){
  let parentElm = document.querySelector(_par);
  let about_me_section = makeElm('div')
  insertAttr(['class=container'],about_me_section)
  let title = makeElm('h2');
  title.innerText = "Contact developer"
  let about_me_body = makeElm('div')
  insertAttr(['class=container'],about_me_body)
  let git=makeElm('div')
  insertAttr(['class=row align-items-center'],git)
  let gitcol = makeElm('div')
  insertAttr(['class=col'],git)
  gitcol.innerHTML = `<a href="#"> <i class="fab fa-github text-light" style="width:50;height:50;"> </i> </a>`
  git.appendChild(gitcol)
  about_me_body.appendChild(git)
  about_me_section.appendChild(title)
  about_me_section.appendChild(about_me_body)
  parentElm.appendChild(about_me_section)
}