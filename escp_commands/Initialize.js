import { BrotherESCPCommand } from './_command.js';

class CmdInitialize extends BrotherESCPCommand {
    constructor() {
        super(Buffer.from('@'));
    }

    compile() {
        return Buffer.alloc(0);
    }
}

export { CmdInitialize };

