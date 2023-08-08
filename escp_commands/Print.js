import { BrotherGenericCommand } from './_command.js';

class CmdPrint extends BrotherGenericCommand {
    constructor(isLastPage = true) {
        super();
        this.isLastPage = isLastPage;
    }

    toBuffer() {
        return this.isLastPage ? Buffer.from([0x1A]) : Buffer.from([0x0C]);
    }
}

export { CmdPrint };

