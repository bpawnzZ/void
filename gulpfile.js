const { series } = require('gulp');
const exec = require('child_process').exec;

// Import the base gulpfile tasks
const baseGulpfile = require('./build/gulpfile.base');

// New task for compiling React components
function buildReact(cb) {
  console.log('Building React components...');
  exec('npm run buildreact', function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    if (err) {
      console.error('React build failed:', err);
      return cb(err);
    }
    cb();
  });
}

// Combine base task with React build
exports['vscode-linux-x64'] = series(buildReact, baseGulpfile['vscode-linux-x64']);

// Export other tasks from base gulpfile
Object.assign(exports, baseGulpfile);
