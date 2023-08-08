import { BrotherESCPCommand } from './_command.js';

class CmdCommandModeSwitch extends BrotherESCPCommand {
    static MODE_ESCP = 0;
    static MODE_RASTER = 1;

    constructor(mode) {
        super(Buffer.from('ia'));
        this.mode = mode;
    }

    compile() {
        return Buffer.from([this.mode]);
    }
}

export { CmdCommandModeSwitch };

