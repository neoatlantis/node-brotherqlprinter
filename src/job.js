import { CmdClearJob } from './escp_commands/ClearJob.js';
import { CmdInitialize } from './escp_commands/Initialize.js';
import { CmdStatusInformationRequest } from './escp_commands/StatusInformationRequest.js';
import { StatusInformationResponse } from './escp_commands/StatusInformationResponse.js';

import { CmdCommandModeSwitch } from './escp_commands/CommandModeSwitch.js';
import { CmdSetEachMode } from './escp_commands/SetEachMode.js';
import { CmdSetExpandedMode } from './escp_commands/CmdSetExpandedMode.js';
import { CmdSetFeedAmount } from './escp_commands/CmdSetFeedAmount.js';
import { CmdPrintInformation } from './escp_commands/PrintInformation.js';
import { CmdRasterImageTransfer } from './escp_commands/CmdRasterImageTransfer.js';
import { CmdPrint } from './escp_commands/Print.js';

import { findLabel, FormFactor } from './labels/index.js';
import { findPrinter } from './models/index.js';
import { adaptImage } from './image_adapter.js';

const jimp = require("jimp");
const debug = require("debug")(APPNAME+":Job")


class Job {
    constructor(printer) {
        this.printer = printer;
        this.printer.open();

        printer.write(new CmdClearJob());
        printer.write(new CmdInitialize());
        printer.write(new CmdStatusInformationRequest());

        let resp = printer.read({ timeout: 3 });
        
        this.printer.close();

        if (!resp) {
            throw new Error("No response from printer.");
        }

        resp = new StatusInformationResponse(resp);
        debug("Printer status read:", resp.toString());

        let printerModel = findPrinter(resp.printerCode);
        let label = findLabel({
            width: resp.mediaWidth,
            formFactor: resp.isContinuousMedia ? FormFactor.ENDLESS : null,
            length: resp.mediaLength,
        });

        if (label.length !== 1) {
            throw new Error("Cannot determine label type.");
        }

        this.labelType = label[0];
        this.printerModel = printerModel;
    }

    async print(image) {
        let err = null;
        this.printer.open();

        try{
            image = await adaptImage(image, this.printerModel, this.labelType);

            let cmdList = [
                new CmdCommandModeSwitch(CmdCommandModeSwitch.MODE_RASTER),
                new CmdPrintInformation(this.labelType, image, true),
                new CmdSetEachMode(true),
                new CmdSetExpandedMode({ cutAtEnd: true, hires: false}),
                new CmdSetFeedAmount(this.labelType.feedMargin),
                new CmdRasterImageTransfer(image, this.labelType, this.printerModel),
                new CmdPrint()
            ];

            for (let cmd of cmdList) {
                this.printer.write(cmd);
            }
        } catch(e) {
            err = e;
        }

        if(err){
            this.printer.close();
            throw err;
        }

        try{
            let resp = this.printer.read({ timeout: 3 });
            if (resp) {
                resp = new StatusInformationResponse(resp);
                console.log(resp.toString());
                this.printer.close();
                return resp;
            }
            this.printer.close();
            return null;
        } finally {
            this.printer.close();
            return null;
        }
    }

    async readAndPrint(){
        let image = await jimp.read.apply(this, [...arguments]);
        return await this.print(image);
    }
}

export { Job };

