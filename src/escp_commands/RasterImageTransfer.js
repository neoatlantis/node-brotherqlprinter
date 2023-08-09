import { Image, open } from 'jimp';
import { BrotherGenericCommand } from './_command.js';
import { Label, FormFactor } from '../labels/index.js';

class CmdRasterImageTransfer extends BrotherGenericCommand {
    constructor(image, labelType, printerModel) {
        super();
        /*if (!(image instanceof Image)) {
            throw new Error('Image must be an instance of Jimp Image.');
        }*/
        if (!(labelType instanceof Label)) {
            throw new Error('labelType must be an instance of Label.');
        }
        if (image.bitmap.width !== printerModel.bytesPerRow * 8) {
            throw new Error('Invalid image width.');
        }

        this.image = image;
        this.bytesPerRow = printerModel.bytesPerRow;
    }

    async imageToInstructions(image) {
        image.flip(true, false); // Flip image left to right
        image.grayscale(); // Convert to grayscale
        image.invert(); // Invert colors

        let imageBytes = Buffer.from(image.bitmap.data);
        let output = Buffer.alloc(0);
        for (let start = 0; start < imageBytes.length; start += this.bytesPerRow) {
            let rowBytes = imageBytes.slice(start, start + this.bytesPerRow);
            let rowBytesLength = rowBytes.length;
            output = Buffer.concat([
                output,
                Buffer.from([0x67, 0x00, rowBytesLength]),
                rowBytes
            ]);
        }
        return output;
    }

    async toBuffer() {
        return await this.imageToInstructions(this.image);
    }
}

export { CmdRasterImageTransfer };
