import { BrotherESCPCommand } from './_command.js';

class CmdSetFeedAmount extends BrotherESCPCommand {
    constructor(feed = 35) {
        super(Buffer.from('id'));
        this.feed = feed;
    }

    compile() {
        let buffer = Buffer.alloc(2);
        buffer.writeUInt16LE(this.feed);
        return buffer;
    }
}

export { CmdSetFeedAmount };

