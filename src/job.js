import { CmdClearJob } from './escp_commands/ClearJob.js';
import { CmdInitialize } from './escp_commands/Initialize.js';
import { CmdStatusInformationRequest } from './escp_commands/StatusInformationRequest.js';
import { StatusInformationResponse } from './escp_commands/StatusInformationResponse.js';

import { CmdCommandModeSwitch } from './escp_commands/CommandModeSwitch.js';
import { CmdSetEachMode } from './escp_commands/SetEachMode.js';
import { CmdSetExpandedMode } from './escp_commands/CmdSetExpandedMode.js';
import { CmdSetFeedAmount } from './escp_commands/CmdSetFeedAmount.js';
import { CmdPrintInformation } from './escp_commands/PrintInformation.js';
import { CmdRasterImageTransfer } from './escp_commands/RasterImageTransfer.js';
import { CmdPrint } from './escp_commands/Print.js';

import { findLabel, FormFactor } from './labels/index.js';
import { findPrinter } from './models/index.js';
import { adaptImage } from './image_adapter.js';

class Job {
    constructor(printer) {
        this.printer = printer;

        printer.write(new CmdClearJob());
        printer.write(new CmdInitialize());

        printer.write(new CmdStatusInformationRequest());
        let resp = printer.read({ timeout: 3 });

        if (!resp) {
            throw new Error("No response from printer.");
        }

        resp = new StatusInformationResponse(resp);
        console.log(resp.toString());

        let printerModel = findPrinter(resp.printerCode);
        let label = findLabel(
            resp.mediaWidth,
            resp.isContinuousMedia ? FormFactor.ENDLESS : null,
            resp.mediaLength
        );

        if (label.length !== 1) {
            throw new Error("Cannot determine label type.");
        }

        this.labelType = label[0];
        this.printerModel = printerModel;
    }

    async print(image) {
        image = await adaptImage(image, this.printerModel, this.labelType);

        let cmdList = [
            new CmdCommandModeSwitch(CmdCommandModeSwitch.MODE_RASTER),
            new CmdPrintInformation(this.labelType, image, true),
            new CmdSetEachMode(true),
            new CmdSetExpandedMode(true, false),
            new CmdSetFeedAmount(this.labelType.feedMargin),
            new CmdRasterImageTransfer(image, this.labelType, this.printerModel),
            new CmdPrint()
        ];

        for (let cmd of cmdList) {
            this.printer.write(cmd);
        }

        let resp = this.printer.read({ timeout: 3 });
        if (resp) {
            resp = new StatusInformationResponse(resp);
            console.log(resp.toString());
            return resp;
        }
        return null;
    }
}

export { Job };

