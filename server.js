const express = require('express');
const cp = require("child_process");
let cors = require("cors");
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
    const { editor1 } = req.body
    const { input } = req.body

    console.log(language)
    console.log(editor1)
    var code = editor1;

    let x, flag = 0;
    fs.writeFile('input.txt',input, (err, fd) => {
        if (err) console.log(err);
    })
    const inputstream = fs.createReadStream("input.txt");

    if (language == 'python') {

        fs.writeFile('public/temp/rough.py', code, (err, fd) => {
            if (err) console.log(err);
        })

        x = cp.execFile('python', ['public/temp/rough.py'], (error, stdout, stderr) => {
            console.log(stdout);
        })

        flag = 1;

    } else if (language == 'java') {
        fs.writeFile('public/temp/rough.java', code, (err, fd) => {
            if (err) console.log(err);
        })

        x = cp.execFile('java', ['public/temp/rough.java'], (error, stdout, stderr) => {
            // console.log(stdout);
        })

        flag = 1;
    } else if (language == 'c') {

        fs.writeFile('public/temp/rough.c', code, (err, fd) => {
            if (err) console.log(err);
        })

        x=cp.execFile('gcc', ['public/temp/rough.c'], (error, stdout, stderr) => {
            if (error) {
                res.status(400)  
                throw error;
            } else {
               cp.execFile('./a.exe', (error, out, err) => {
                    if (error) {
                        res.status(400) 
                        throw error;  
                    } else {
                        console.log(out);
                        res.status(200).json(out);
                    }
                })
            }
        })

        inputstream.pipe(x.stdin) 
        flag = 2;
    } else if (language == 'cpp') {
        fs.writeFile('public/temp/rough.cpp', code, (err, fd) => {
            if (err) console.log(err);
        })

        cp.execFile('g++', ['public/temp/rough.cpp'], (error, stdout, stderr) => {
            if (error) {
                throw error;
            } else {
                cp.execFile('./a.exe', (error, out, err) => {
                    if (error) {
                        throw error;
                    } else {
                        console.log(out);
                        res.status(200).json(out);
                    }
                })
            }
        })
        flag = 2;
    } else if (language == 'node') {

        fs.writeFile('public/temp/rough.js', code, (err, fd) => {
            if (err) console.log(err);
        })

        x = cp.execFile('node', ['public/temp/rough.js'], (error, stdout, stderr) => {
            console.log(stdout);
        })
        flag = 1;
    } else if (language == 'php') {

        fs.writeFile('public/temp/rough.php', code, (err, fd) => {
            if (err) console.log(err);
        })

        x = cp.execFile('php', ['public/temp/rough.php'], (error, stdout, stderr) => {
            console.log(stdout);
        })
        flag = 1;
    }

    if (!editor1) {
        return res.status(400).send({ status: 'failed' })
    }
    if (flag == 1) {

        x.stdout.on('data', (data) => {
            res.status(200).json(data)
        });

        inputstream.pipe(x.stdin);

    } else if (flag == 0) {
        return res.status(400).send({ status: 'failed' })
    }

})

app.listen(port, () => console.log(`server is running on port ${port}`))

