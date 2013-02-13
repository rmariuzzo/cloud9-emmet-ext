require('shelljs/global');
var tmp = require('tmp');
var fs  = require('fs');

// Check prerequisites.
if (!which('git')) {
    console.log('Warning: `git` not installed.');
}
else if (!which('ant')) {
    console.log('Warning: `ant` not installed.');
}
else {
    var vendorsPath = pwd() + '/vendors';
    // Get Emmet.io sources.
    tmp.dir(function(err, path) {
        if (test('-d', path)) {
            rm('-rf', path);
        }
        exec('git clone https://github.com/emmetio/emmet.git ' + path);
        cd(path);
        exec('ant plugin.generic-full');
        if (test('-d', vendorsPath)) {
            rm('-rf', vendorsPath + '/*');
        } else {
            mkdir('-p', vendorsPath);
        }
        cp('-f', path + '/dist/emmet-full.js', vendorsPath);
        cp('-f', path + '/javascript/underscore.js', vendorsPath);
        rm('-rf', path);
    });
}