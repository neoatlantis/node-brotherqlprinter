import { BrotherESCPCommand } from './_command.js';

class CmdSetExpandedMode extends BrotherESCPCommand {
    constructor(cutAtEnd = true, hires = false) {
        super(Buffer.from('iK'));
        this.mode = 0x00 | ((Number(cutAtEnd) << 3) | (Number(hires) << 6));
    }

    compile() {
        return Buffer.from([this.mode]);
    }
}

export { CmdSetExpandedMode };
