import fs from 'fs';
import { promisify } from 'util';
import jimp from 'jimp';
import { PrinterIOLinuxKernel } from './io.js';
import { Job } from './job.js';

const fileExists = promisify(fs.access);

async function printImage() {
    let printerList = PrinterIOLinuxKernel.list();

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
        await fileExists(imagePath, fs.constants.F_OK);
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

