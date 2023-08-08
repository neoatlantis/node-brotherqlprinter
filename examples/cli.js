const jimp = require("jimp");
const { PrinterConsoleDebug, Job } = 
    require("../dist/node-brotherqlprinter.dev.js");

async function printImage() {
    let printer = new PrinterConsoleDebug();

    if (process.argv.length < 2) {
        console.log("Please provide an image path.");
        process.exit();
    }

    let imagePath = process.argv[2];

    let image = await jimp.read(imagePath);

    let job = new Job(printer);
    job.print(image);
}

printImage();