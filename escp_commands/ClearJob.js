import { BrotherGenericCommand } from './_command.js';

class CmdClearJob extends BrotherGenericCommand {

    /* According to manual: In order to clear any jobs with errors remaining in
    printer, send 200 bytes of Invalid Command. */

    toBuffer() {
        return Buffer.alloc(200);
    }
}

export { CmdClearJob };

