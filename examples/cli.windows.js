const { PrinterIOWindowsSerial, Job } = 
    require("../dist/node-brotherqlprinter.dev.js");
const fs = require("fs");

async function printImage() {
    let printers = await PrinterIOWindowsSerial.list();
    console.log("Found printers:\n" + printers.join("\n"));

    let printer = new PrinterIOWindowsSerial(printers[0]);

    try{
        if (process.argv.length < 2) {
            console.log("Please provide an image path.");
            process.exit();
        }

        let imagePath = process.argv[2];

        if(!imagePath) throw Error("Path of image not specified.");
        console.log("Printing file:", imagePath);


        let job = new Job(printer);
        await job.init();

        let imageBuffer = fs.readFileSync(imagePath);

        await job.readAndPrint(imageBuffer);
        //await job.readAndPrint(imageBuffer);
        // or job.readAndPrint(imagePath);
    } catch(e){
        console.error(e);
    } finally {
        await new Promise((resolve, _)=>{
            setTimeout(resolve, 10000);
        })
        printer.close();
    }
}

printImage();
