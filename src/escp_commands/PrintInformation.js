import { BrotherESCPCommand } from './_command.js';
import { FormFactor } from '../labels/index.js';

class CmdPrintInformation extends BrotherESCPCommand {
    constructor(label, image, isStartingPage) {
        super(Buffer.from('iz'));

        let n1 = 0x02 | 0x04 | 0x08;
        let n2 = label.formFactor === FormFactor.ENDLESS ? 0x0A : 0x0B;
        let n3 = label.size[0];
        let n4 = label.size[1];

        let n5n8 = Buffer.alloc(4);
        n5n8.writeUInt32LE(image.bitmap.height);

        let n9 = isStartingPage ? 0 : 1;
        let n10 = 0;

        this._data = Buffer.concat([
            Buffer.from([n1, n2, n3, n4]),
            n5n8,
            Buffer.from([n9, n10])
        ]);
    }

    compile() {
        return this._data;
    }
}

export { CmdPrintInformation };

