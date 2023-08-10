import { BrotherESCPCommand } from './_command.js';

class CmdSetFeedAmount extends BrotherESCPCommand {
    constructor(feed) {
        super(Buffer.from('id'));
        if(!feed) feed = 35;
        this.feed = feed;
    }

    compile() {
        let buffer = Buffer.alloc(2);
        buffer.writeUInt16LE(this.feed);
        return buffer;
    }
}

export { CmdSetFeedAmount };

