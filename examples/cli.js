const { PrinterIOLinuxKernel, Job } = 
    require("../dist/node-brotherqlprinter.dev.js");
const fs = require("fs");

async function printImage() {
    let printers = await PrinterIOLinuxKernel.list();
    console.log("Found printers:\n" + printers.join("\n"));

    let printer = new PrinterIOLinuxKernel(printers[0]);

    if (process.argv.length < 2) {
        console.log("Please provide an image path.");
        process.exit();
    }

    let imagePath = process.argv[2];

    console.log(imagePath);

    let job = new Job(printer);

    let imageBuffer = fs.readFileSync(imagePath);

    job.readAndPrint(imageBuffer);
    // or job.readAndPrint(imagePath);
}

printImage();