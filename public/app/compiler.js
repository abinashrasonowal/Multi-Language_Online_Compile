
let editor;

window.onload = function () {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/c_cpp");
}

function changeLanguage() {

    let language = $("#languages").val();

    if (language == 'c' || language == 'cpp') editor.session.setMode("ace/mode/c_cpp");
    else if (language == 'php') editor.session.setMode("ace/mode/php");
    else if (language == 'python') editor.session.setMode("ace/mode/python");
    else if (language == 'node') editor.session.setMode("ace/mode/javascript");
}

const input = document.getElementById('input')
output2 = document.getElementById('output2');
editor = document.getElementById('editor');
const url = 'http://localhost:8000/';

input.value = "type your input here";
async function executeCode() {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify({
            language: $("#languages").val(),
            editor1: editor.getSession().getValue(),
            input: input.value
        })
    })

    console.log(res);

    const data = await res.json()

    output2.innerHTML = data;
}
