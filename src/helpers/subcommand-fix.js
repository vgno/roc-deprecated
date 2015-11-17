import 'source-map-support/register';

module.exports = function(program) {
    // Killing the child process if the main process is terminated
    // https://github.com/tj/commander.js/pull/411
    const proc = program.runningCommand;
    if (proc) {
        process.on('SIGHUP', function() {
            if ((proc.killed === false) && (proc.exitCode === null)) {
                proc.kill('SIGHUP');
            }
        });
        process.on('SIGTERM', function() {
            if ((proc.killed === false) && (proc.exitCode === null)) {
                proc.kill('SIGTERM');
            }
        });
        process.on('SIGINT', function() {
            if ((proc.killed === false) && (proc.exitCode === null)) {
                proc.kill('SIGINT');
            }
        });

        proc.on('close', process.exit.bind(process));
    }
};
