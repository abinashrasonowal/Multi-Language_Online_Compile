const express = require('express');
const cp = require("child_process");
const cors = require("cors");
const fs = require('fs');

const app = express();

const port = 8000;

app.use(express.static('public'))
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('C:/Users/abina/Desktop/ide/public/ide.html');
})

app.post('/', (req, res) => {
    const { language } = req.body
    const { editor } = req.body
    const { input } = req.body

    // console.log(language)
    // console.log(editor)
    var code = editor;

    //if input of editor is empty
    if (!editor) {
        return res.status(400).json('please write your code')
    }

    let path = `public/temp/rough.${language}`
    let command = `${language}`

    let x;
    //input from file
    fs.writeFile('input.txt', input, (err, fd) => {
        if (err) console.log(err);
    })
    const inputstream = fs.createReadStream("input.txt");

    //cases for different language
    switch (language) {
        case ('c'): command = 'gcc'; break;
        case ('cpp'): command = 'g++'; break;
        case ('python'): path = `public/temp/rough.py`; break;
        case ('node'): path = `public/temp/rough.js`;break;
        default: break;
    }

    //writing code into required destination
    fs.writeFile(path, code, (err, fd) => {
        if (err) {
            console.log(err);
        }
    })
    //exicute code through chile process
    if (language == 'c' || language == 'cpp') {
        cp.execFile(command, [path], (error, stdout, stderr) => {
            if (error) {
                console.log(stderr)
                return res.status(400).json(stderr)
            } else {
                y = cp.execFile('./a.exe', (error, out, err) => {
                    if (error) {
                        return  res.status(400).json(err)
                    } else {
                        //console.log(out);
                        res.status(200).json(out);
                    }
                })
                inputstream.pipe(y.stdin)
            }
        })
    } else {
        x = cp.execFile(command, [path], (error, stdout, stderr) => {
            if (error) {
                console.log(stderr);
                return res.status(400).json(stderr)
            } 
           // console.log(stdout);
        })
        x.stdout.on('data', (data) => {
            res.status(200).json(data)
        });
        inputstream.pipe(x.stdin);
    }
})

app.listen(port, () => console.log(`server is running on port ${port}`))

