import fs from "fs";
import { BrotherGenericCommand } from "app/escp_commands/_command";
import { Printer } from "./_printer";
import { SerialPort } from 'serialport';
import { usb, getDeviceList, findByIds } from "usb";

const debug = require("debug")(APPNAME+":PrinterIOWindowsSerial");

class PrinterIOWindowsSerial extends Printer {

    #device;
    #endpoint_out;
    #endpoint_in;

    constructor(listed_dev_item) {
        super();
        let vid = listed_dev_item.deviceDescriptor.idVendor,
            pid = listed_dev_item.deviceDescriptor.idProduct;

        this.#device = findByIds(vid, pid);  
        if(!this.#device) throw Error("Device not found.");
    }

    static async list() {
        let all_usb_devices = getDeviceList();
        return all_usb_devices.filter((e)=>{
            if(e.deviceDescriptor && e.deviceDescriptor.idVendor == 1273){
                return true;
            }
            return false;
        });
    }

    async open() {
        this.#device.open();
        this.#endpoint_in = this.#endpoint_out = null;

        debug("Open printer device...");
        debug("Determining device endpoints...");

        let interfaces = this.#device.interfaces || [];
        interfaces.forEach((iface)=>{
            iface.claim();
            for(let endpoint of iface.endpoints){
                if(
                    endpoint.direction == "out" &&
                    !this.#endpoint_out
                ){
                    this.#endpoint_out = endpoint;
                }
                if(
                    endpoint.direction == "in" &&
                    !this.#endpoint_in
                ){
                    this.#endpoint_in = endpoint;
                }
            }
        });

        if(!this.#endpoint_in || !this.#endpoint_out){
            throw Error("Cannot get device endpoint.");
        }
        debug("Device opened. Found in/out endpoint.");
        return this;
    }

    async close() {
        if(this.#device && this.#device.close()){
            this.#device.close();
        }
        try{
            //fs.closeSync(this.dev);
        } catch(e){
        }
        this.#endpoint_in = this.#endpoint_out = null;
    }

    async read({ timeout = 5, length = 1024}) {
        let data = Buffer.alloc(0);
        let start = Date.now();

        let readBuf = (length)=>new Promise((resolve, reject)=>{
            this.#endpoint_in.transfer(length, (err, data)=>{
                if(err) return reject(err);
                return resolve(data);
            });
        });

        while (!data.length && (Date.now() - start < timeout * 1000)) {
            let buf = await readBuf(length);
            let bytesRead = buf.length;
            if (bytesRead > 0) {
                data = Buffer.concat([data, buf.slice(0, bytesRead)]);
            }
            if (data.length) break;
        }
        if (!data.length) {
            let buf = await readBuf(length);
            let bytesRead = buf.length;
            if (bytesRead > 0) {
                data = Buffer.concat([data, buf.slice(0, bytesRead)]);
            }
            return data;
        } else {
            return data;
        }
    }

    async write(data) {
        if (data instanceof BrotherGenericCommand) {
            data = data.toBuffer();
        }
        debug("write to printer", data.length, "bytes");
        if(!this.#endpoint_out) throw Error("Device not opened.");
        return await new Promise((resolve, reject)=>{
            this.#endpoint_out.transfer(data, (err, data)=>{
                if(err) return reject(err);
                return resolve(data);
            }); 
        });        
    }
}

export { PrinterIOWindowsSerial };
