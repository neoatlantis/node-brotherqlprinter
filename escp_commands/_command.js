class BrotherGenericCommand {
    toBuffer() {
        throw new Error("Must override this.");
    }

    toString() {
        return `[BrotherESCPCommand: ${this.constructor.name}]`;
    }
}

class BrotherESCPCommand extends BrotherGenericCommand {
    constructor(leadingBytes) {
        super();
        this.leadingBytes = leadingBytes;
    }

    compile() {
        throw new Error("Must override this.");
    }

    toBuffer() {
        let data = this.compile();
        if (!(data instanceof Buffer)) {
            throw new Error('Compile method must return a Buffer.');
        }
        let ret = Buffer.concat([
            Buffer.from([0x1B]),
            this.leadingBytes,
            data
        ]);

        console.log(this.toString(), "\t", ret.toString('hex').match(/.{1,2}/g).join(' '));

        return ret;
    }
}

export { BrotherGenericCommand, BrotherESCPCommand };

