const { series } = require('gulp');
const exec = require('child_process').exec;

// Importar las tareas existentes desde gulpfile.base.js
const baseGulpfile = require('./build/gulpfile.base');

// Nueva tarea para compilar componentes React
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

// Referencia a la tarea existente 'vscode-linux-x64'
const existingBuildTask = baseGulpfile['vscode-linux-x64'];

// Definir la nueva tarea 'vscode-linux-x64' que incluye 'buildReact' antes
exports['vscode-linux-x64'] = series(buildReact, existingBuildTask);

// Exportar otras tareas existentes
Object.assign(exports, baseGulpfile);
