import { BrotherESCPCommand } from './_command.js';

class CmdSetEachMode extends BrotherESCPCommand {
    constructor(autoCut) {
        super(Buffer.from('iM'));
        this.mode = autoCut ? 0b1000000 : 0b0000000;
    }

    compile() {
        return Buffer.from([this.mode]);
    }
}

export { CmdSetEachMode };

