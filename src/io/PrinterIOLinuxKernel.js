import fs from "fs";
import { BrotherGenericCommand } from "app/escp_commands/_command";
import { readdir } from 'fs/promises';
import { Printer } from "./_printer";

const debug = require("debug")(APPNAME+":PrinterIOLinuxKernel");

class PrinterIOLinuxKernel extends Printer {

    constructor(dev_path) {
        super();
        this.dev_path = dev_path;
        debug("Device path: ", this.dev_path);
    }

    static async list() {
        let found = await readdir("/dev/usb/");
        found = found.filter(e=>e.slice(0,2)=='lp');
        return found.map(e=>"/dev/usb/"+e);
    }

    async open() {
        this.dev = fs.openSync(this.dev_path, 'r+');
        return this;
    }

    close() {
        fs.closeSync(this.dev);
    }

    read({ timeout = 5, length = 1024}) {
        let data = Buffer.alloc(0);
        let start = Date.now();

        while (!data.length && (Date.now() - start < timeout * 1000)) {
            let buf = Buffer.alloc(length);
            let bytesRead = fs.readSync(this.dev, buf, 0, length, null);
            if (bytesRead > 0) {
                data = Buffer.concat([data, buf.slice(0, bytesRead)]);
            }
            if (data.length) break;
        }
        if (!data.length) {
            let buf = Buffer.alloc(length);
            let bytesRead = fs.readSync(this.dev, buf, 0, length, null);
            if (bytesRead > 0) {
                data = Buffer.concat([data, buf.slice(0, bytesRead)]);
            }
            return data;
        } else {
            return data;
        }
    }

    write(data) {
        if (data instanceof BrotherGenericCommand) {
            data = data.toBuffer();
        }
        debug("write to printer", data.length, "bytes");
        fs.writeSync(this.dev, data);
    }
}

export { PrinterIOLinuxKernel };
