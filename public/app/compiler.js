
let editor;

window.onload = function () {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/c_cpp");//default c or cpp
}

const input = document.getElementById('input')
output = document.getElementById('output');
editor = document.getElementById('editor');
editor.innerHTML='#include &ltstdio.h>\n\nint main(){\n\tprintf("Hellow world! welcome to online IDE");\n}'

let language = document.getElementById('languages');
    language=language.value

function changeLanguage() {

    let language = document.getElementById('languages');
    language=language.value

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

const url = 'http://localhost:8000/';

input.value = "type your input here";
async function executeCode() {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify({
            language: `${language}`,
            editor: editor.getSession().getValue(),
            input: input.innerHTML
        })
    })

    console.log(res);

    const data = await res.json()

    output.innerHTML = data;
}
