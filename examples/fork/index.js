var os = require('os');
var pty = require('../..');

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

var ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

ptyProcess.on('data', function(data) {
  // console.log(data);
  process.stdout.write(data);
});

ptyProcess.write('ls\r');
// ptyProcess.resize(100, 40);
// ptyProcess.write('ls\r');

setTimeout(() => {
  ptyProcess.write('ls\r');
}, 2000);

process.on('exit', () => {
  ptyProcess.kill();
});

setTimeout(() => {
  process.exit();
}, 5000);
