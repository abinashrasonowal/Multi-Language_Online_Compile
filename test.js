const childProcess = require("child_process");

const bash_run = childProcess.execFile('python',
	["public/temp/rough.py"]);

bash_run.stdout.on('data', function (data) {
	console.log('stdout: ' + data);
});
bash_run.stderr.on('data', function (data) {
	console.log('stderr: ' + data);
});

const fs = require("fs");

//const input = fs.createReadStream("input.txt");

//bash_run.stdout.pipe(output);

// input.pipe(bash_run.stdin);
