import { Image, open } from 'jimp';
import { BrotherGenericCommand } from './_command.js';
import { Label, FormFactor } from '../labels/index.js';



function encodeImageAsBinary(image){
    image.grayscale().contrast(1);

    let imageBytes = Buffer.from(image.bitmap.data);
    let imageBytesBinary = Buffer.alloc(Math.floor(imageBytes.length/32));
    let binarize = (b)=>b>127?0xFF:0x00;
    for(let i=0; i<imageBytesBinary.length; i++){
        imageBytesBinary[i] = (
            (binarize(imageBytes[i*32+0*4]) & 0x80) |
            (binarize(imageBytes[i*32+1*4]) & 0x40) |
            (binarize(imageBytes[i*32+2*4]) & 0x20) |
            (binarize(imageBytes[i*32+3*4]) & 0x10) |
            (binarize(imageBytes[i*32+4*4]) & 0x08) |
            (binarize(imageBytes[i*32+5*4]) & 0x04) |
            (binarize(imageBytes[i*32+6*4]) & 0x02) |
            (binarize(imageBytes[i*32+7*4]) & 0x01)
        );
    }
    
    return imageBytesBinary;
}





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

    imageToInstructions(image) {
        image.flip(true, false); // Flip image left to right
        image.invert(); // Invert colors

        let imageBytes = encodeImageAsBinary(image);

        let output = Buffer.alloc(0);
        for (let start = 0; start < imageBytes.length; start += this.bytesPerRow){
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

    toBuffer() {
        return this.imageToInstructions(this.image);
    }
}

export { CmdRasterImageTransfer, encodeImageAsBinary };
