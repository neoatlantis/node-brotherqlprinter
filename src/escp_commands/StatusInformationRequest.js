import { BrotherESCPCommand } from './_command.js';

class CmdStatusInformationRequest extends BrotherESCPCommand {
    constructor() {
        super(Buffer.from('iS'));
    }

    compile() {
        return Buffer.alloc(0);
    }
}

export { CmdStatusInformationRequest };

