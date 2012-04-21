var fs = require('fs'),
    exec = require('child_process').exec,
    basename = require('path').basename,
    vm = require('vm'),
    temp = (process.env.TEMP || '/tmp') + '/';

require.extensions['.dart'] = function(info, filename) {
    var tempFile = temp + 'frog-compiled-' + basename(filename);
    var data = fs.readFileSync(filename);

    // Write a temporary file to compile.
    fs.writeFileSync(tempFile, data);

    // Compile with Frog. Assume it's in the PATH.
    exec('frogc ' + tempFile, function(error, stdout, stderr) {
        if (error !== null) {
            throw new Error('Could not compile .dart source file to JavaScript.');
        }
    });

    while (true) {
        // This eats your CPU while compiling -- bad :(.
        try {
            var code = fs.readFileSync(tempFile + '.js', 'utf8');

            if (code.length) {
                fs.unlink(tempFile);
                fs.unlink(tempFile + '.js');
                return vm.runInThisContext(code, filename, true);
            }
        } catch (e) {
            // readFileSync will fail until file exists.
        }
    }
};