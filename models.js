class PrinterModel {
    constructor(name, code, bytesPerRow, offsetRightAdjust=0) {
        this.name = name;
        this.code = code;
        this.bytesPerRow = bytesPerRow;
        this.offsetRightAdjust = offsetRightAdjust;
    }
}

const ALL_MODELS = [
    new PrinterModel('QL-1100', '4C', 162, 44),
    // more PrinterModel instances...
];

function findPrinter(code) {
    const found = ALL_MODELS.filter(model => model.code === code);
    return found.length > 0 ? found[0] : null;
}

export { PrinterModel, findPrinter };

