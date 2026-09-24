import process from 'node:process';

const nodeEnv = process.env.NODE_ENV || 'development';

console.log(nodeEnv);


// process.argv[] -> first two arguments are the path to the node executable and the path to the script file being executed. The remaining arguments are the command-line arguments passed to the script. 
// from 2nd index onwards, we can access the command line arguments passed to the script.
// process.argv[0] -> path to the node executable
// process.argv[1] -> path to the script file being executed
// process.argv[2] -> first command line argument passed to the script

const command = process.argv[2] ?? "start";
const shouldCrashed = process.argv.includes("--crash");
const shouldFailed = process.argv.includes("--fail");


process.on("exit",(code)=>{
    console.log(`Process is shutting down with exit code of ${code}`);
})

function runApp()  : void {
    console.log(`Running the app with command: ${command}`);
    if (shouldFailed) {
        console.error("Manual failed triggred with --failed flag");
        process.exit(1);
    }
    if (shouldCrashed) {
        console.error("Manual crashed triggred with --crashed flag");
        process.exit(1);
    }
}

runApp();
