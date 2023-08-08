import { readdir } from 'fs/promises';
import { Printer } from "./_printer";


class PrinterIOLinuxKernel extends Printer {

    constructor(dev_path) {
        super();
        this.dev_path = dev_path;
    }

    static async list() {
        let read = await readdir("/dev/usb/");
        

        return await globPromise("/dev/usb/lp*");
    }

    async open() {
        this.dev = fs.openSync(this.dev_path, 'r+');
        return this;
    }

    close() {
        fs.closeSync(this.dev);
    }

    async read(timeout = 5, length = 1024) {
        let data = Buffer.alloc(0);
        let start = Date.now();

        while (!data.length && (Date.now() - start < timeout * 1000)) {
            let buf = Buffer.alloc(length);
            let bytesRead = fs.readSync(this.dev, buf, 0, length, null);
            if (bytesRead > 0) {
                data = Buffer.concat([data, buf.slice(0, bytesRead)]);
            }
            if (data.length) break;
            await new Promise(resolve => setTimeout(resolve, 1));
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
            data = Buffer.from(data.toString());
        }
        fs.writeSync(this.dev, data);
    }
}

export { PrinterIOLinuxKernel };
