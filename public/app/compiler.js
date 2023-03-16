
let editor;
editor = document.getElementById('editor');

var btn = document.getElementById('button-container')
const input = document.getElementById('input')
const output = document.getElementById('output');
const message=document.getElementById('message')

editor.innerHTML='#include &ltstdio.h>\n\nint main(){\n\tprintf("Hellow world! welcome to online IDE");\n}'
output.textContent='output will be shown here'

window.onload = function () {
    btn.classList.add("light")
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/c_cpp");//default c or cpp  
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

var fild = document.getElementById('fild');
var list = document.getElementById('list');
var options = document.getElementsByClassName('options');
var selected = document.getElementById('selected');
var arrow = document.getElementById('arrow');
var language='c';

function dark(){
  btn.classList.toggle("light")
  btn.classList.add("dark")
}
function light(){
  btn.classList.toggle("dark")
  btn.classList.add("light")
}

fild.onclick = function () {
  list.classList.toggle("hide")
  arrow.classList.toggle("arrow")
}

list.onmouseleave=function(){
  list.classList.add('hide')
  arrow.classList.toggle("arrow")
}
function value(x) {
  switch (x) {
    case (1): return 'c';
    case (2): return 'cpp';
    case (3): return 'java';
    case (4): return 'php';
    case (5): return 'python';
    case (6): return 'node';
    default: break;
  }
}

for (option of options) {
  option.onclick = function () {
    selected.innerHTML = this.innerHTML;
    language = value(this.value);
    list.classList.toggle("hide")
    arrow.classList.toggle("arrow")
    changeLanguage(language)
  }
}

function copy(){
  navigator.clipboard.writeText(output.textContent)
  message.classList.toggle('hide')
  setTimeout(()=>{
    message.classList.add('hide')
  },2000)
}

function clearout(){
  output.textContent='';
}


function pastein(){
  navigator.clipboard.readText().then( cliptext => (document.getElementById('input').innerText=cliptext),
  err =>console.log(err))
}

function changeLanguage(language) {
    //console.log(language)
    if (language == 'c' || language == 'cpp'){
        editor.session.setMode("ace/mode/c_cpp");
    } else if (language == 'php'){
        editor.session.setMode("ace/mode/php");
    } else if (language == 'python') {
        editor.session.setMode("ace/mode/python");
    }else if (language == 'node') {
        editor.session.setMode("ace/mode/javascript");
    }
}

let url;
url = 'http://localhost:3000/'; 


async function executeCode() {

    // let language = document.getElementById('languages');
    // language=language.value
    //console.log(language)
    document.getElementById('output').scrollIntoView();

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify({
            language: language,
            editor: editor.getSession().getValue(),
            input: input.value
        })
    })

    console.log(res);

    const data = await res.json()

    output.innerHTML = data;
}

