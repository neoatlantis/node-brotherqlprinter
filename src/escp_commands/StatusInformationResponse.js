import { Buffer } from "buffer";

class StatusInformationResponse {
    constructor(raw) {
        if(!Buffer.isBuffer(raw) || raw.length !== 32 || raw[0] !== 0x80 || raw[1] !== 0x20) {
            throw new Error('Invalid raw input.');
        }

        this._printerTypeCode = raw.slice(3, 5).toString('ascii');
        this._error1 = raw[8];
        this._error2 = raw[9];
        this._mediaWidth = raw[10];
        this._mediaType = raw[11];
        this._mediaLength = raw[17];
        this._statusType = raw[18];
    }

    get printerCode() {
        return this._printerTypeCode;
    }

    get mediaWidth() { // millimeter
        return this._mediaWidth;
    }

    get mediaLength() {
        return this._mediaLength;
    }

    get mediaPresent() {
        return this._mediaType !== 0x00;
    }

    get isContinuousMedia() {
        return this._mediaType === 0x0A;
    }

    get isLabelMedia() {
        return this._mediaType === 0x0B;
    }

    get error1Code() {
        return this._error1;
    }

    get error2Code() {
        return this._error2;
    }

    get errors() {
        let output = [];
        function add(cond, error) {
            if (cond) output.push(error);
        }
        add(this._error1 & 0x01, "No media when printing.");
        add(this._error1 & 0x02, "End of media (labels).");
        add(this._error1 & 0x04, "Tape cutter jam.");
        add(this._error1 & 0x10, "Main unit in use.");
        add(this._error1 & 0x80, "Fan failure.");
        add(this._error2 & 0x04, "Transmission error.");
        add(this._error2 & 0x10, "Cover opened while printing.");
        add(this._error2 & 0x40, "Cannot feed paper.");
        add(this._error2 & 0x80, "System error.");
        return output;
    }

    toString() {
        let yn = i => i ? "Yes" : "No";
        let ret = [
            "Printer status:",
            ` - printer type code: ${this.printerCode}`,
            ` - media present: ${yn(this.mediaPresent)}`,
            ` - media size: ${this.mediaWidth}mm x ${this.isContinuousMedia ? "Continuous" : this.mediaLength + "mm"}`,
            " - errors:",
            this.errors.length > 0 ? "   * " + this.errors.join("\n   * ") : "   None"
        ];
        return ret.join("\n");
    }
}

export { StatusInformationResponse };

