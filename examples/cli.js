const jimp = require("jimp");
const { PrinterConsoleDebug, PrinterIOLinuxKernel, Job } = 
    require("../dist/node-brotherqlprinter.dev.js");

async function printImage() {
    //let printer = new PrinterConsoleDebug();
    let printer = new PrinterIOLinuxKernel("/dev/usb/lp0");

    if (process.argv.length < 2) {
        console.log("Please provide an image path.");
        process.exit();
    }

    let imagePath = process.argv[2];

    console.log(imagePath);
    let image = await jimp.read(imagePath);

    let job = new Job(printer);
    job.print(image);
}

printImage();