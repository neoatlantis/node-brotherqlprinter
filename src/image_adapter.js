import jimp from 'jimp';
import { PrinterModel } from './models/index.js';
import { Label, FormFactor } from './labels/index.js';

async function adaptImage(image, printerModel, label) {
    if (!(printerModel instanceof PrinterModel)) {
        throw new Error('printerModel must be an instance of PrinterModel.');
    }
    if (!(label instanceof Label)) {
        throw new Error('label must be an instance of Label.');
    }

    if (label.formFactor === FormFactor.ENDLESS) {
        if (image.bitmap.width !== label.dotsPrintable[0]) {
            let hsize = Math.floor(
                label.dotsPrintable[0] / image.bitmap.width * image.bitmap.height);
            image = await image.resize(
                label.dotsPrintable[0], hsize, jimp.RESIZE_BILINEAR
            );
        }

        let devicePixelWidth = printerModel.bytesPerRow * 8;
        if (image.bitmap.width < devicePixelWidth) {
            let newImage = await new jimp(
                devicePixelWidth, image.bitmap.height, 0xFFFFFFFF
            );
            newImage.composite(
                image, 
                devicePixelWidth - image.bitmap.width - printerModel.offsetRightAdjust, 0
            );
            image = newImage;
        }
    } else {
        throw new Error("Not implemented yet.");
    }

    return image;
}

export { adaptImage };

