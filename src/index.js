import { access } from 'fs/promises';
import jimp from 'jimp';
import {
    PrinterIOLinuxKernel,
    PrinterIOUSB,
    PrinterConsoleDebug
} from './io';
import { Job } from './job.js';

const debug = require("debug")(APPNAME+":index");



/*async function printImage() {
    let printerList = await PrinterIOLinuxKernel.list();
    debug("Listing all printers:", printerList);

    if (printerList.length < 1) {
        console.log("No printer found.");
        process.exit();
    }

    if (process.argv.length < 3) {
        console.log("Please provide an image path.");
        process.exit();
    }

    let imagePath = process.argv[2];

    try {
        await access(imagePath);
    } catch (error) {
        console.log("The provided image file does not exist.");
        process.exit();
    }

    let image = await jimp.read(imagePath);

    let printer = new PrinterIOLinuxKernel(printerList[0]);
    let job = new Job(printer);
    job.print(image);
}

printImage();

*/

export {
    PrinterIOLinuxKernel, PrinterIOUSB, PrinterConsoleDebug,
    Job,
}