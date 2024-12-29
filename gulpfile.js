/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const { series } = require('gulp');
const exec = require('child_process').exec;

// Existing gulpfile import
require('./build/gulpfile.base');

// New task to build React components
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

// Import the existing build task (adjust the actual task name as needed)
const existingBuildTask = require('./build/gulpfile.base')['vscode-linux-x64'];

// Modify the existing build task to include React build
exports['vscode-linux-x64'] = series(buildReact, existingBuildTask);

// Export other existing tasks
module.exports = require('./build/gulpfile.base');
