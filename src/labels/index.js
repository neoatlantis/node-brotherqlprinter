const FormFactor = {
    DIE_CUT: 1,
    ENDLESS: 2,
    ROUND_DIE_CUT: 3,
};

class Label {
    constructor(name, size, formFactor, dotsTotal, dotsPrintable, offsetRight, feedMargin) {
        this.name = name;
        this.size = size;
        this.formFactor = formFactor;
        this.dotsTotal = dotsTotal;
        this.dotsPrintable = dotsPrintable;
        this.offsetRight = offsetRight;
        this.feedMargin = feedMargin;
    }

    toString() {
        return `<Label ${this.name}>`;
    }
}

const ALL_LABELS = [
    new Label("12",     [ 12,   0], FormFactor.ENDLESS,       [ 142,    0], [ 106,    0],  29 , 35),
    new Label("29",     [ 29,   0], FormFactor.ENDLESS,       [ 342,    0], [ 306,    0],   6 , 35),
    new Label("38",     [ 38,   0], FormFactor.ENDLESS,       [ 449,    0], [ 413,    0],  12 , 35),
    new Label("50",     [ 50,   0], FormFactor.ENDLESS,       [ 590,    0], [ 554,    0],  12 , 35),
    new Label("54",     [ 54,   0], FormFactor.ENDLESS,       [ 636,    0], [ 590,    0],   0 , 35),
    new Label("62",     [ 62,   0], FormFactor.ENDLESS,       [ 732,    0], [ 696,    0],  12 , 35),
    new Label("102",    [102,   0], FormFactor.ENDLESS,       [1200,    0], [1164,    0],  12 , 35),
    new Label("103",    [104,   0], FormFactor.ENDLESS,       [1224,    0], [1200,    0],  12 , 35),
    new Label("17x54",  [ 17,  54], FormFactor.DIE_CUT,       [ 201,  636], [ 165,  566],   0 ),
    new Label("17x87",  [ 17,  87], FormFactor.DIE_CUT,       [ 201, 1026], [ 165,  956],   0 ),
    new Label("23x23",  [ 23,  23], FormFactor.DIE_CUT,       [ 272,  272], [ 202,  202],  42 ),
    new Label("29x42",  [ 29,  42], FormFactor.DIE_CUT,       [ 342,  495], [ 306,  425],   6 ),
    new Label("29x90",  [ 29,  90], FormFactor.DIE_CUT,       [ 342, 1061], [ 306,  991],   6 ),
    new Label("39x90",  [ 38,  90], FormFactor.DIE_CUT,       [ 449, 1061], [ 413,  991],  12 ),
    new Label("39x48",  [ 39,  48], FormFactor.DIE_CUT,       [ 461,  565], [ 425,  495],   6 ),
    new Label("52x29",  [ 52,  29], FormFactor.DIE_CUT,       [ 614,  341], [ 578,  271],   0 ),
    new Label("62x29",  [ 62,  29], FormFactor.DIE_CUT,       [ 732,  341], [ 696,  271],  12 ),
    new Label("62x100", [ 62, 100], FormFactor.DIE_CUT,       [ 732, 1179], [ 696, 1109],  12 ),
    new Label("102x51", [102,  51], FormFactor.DIE_CUT,       [1200,  596], [1164,  526],  12 ),
    new Label("102x152",[102, 153], FormFactor.DIE_CUT,       [1200, 1804], [1164, 1660],  12 ),
    // size 103 has media width 104
    new Label("103x164",[104, 164], FormFactor.DIE_CUT,       [1224, 1941], [1200, 1822],  12 ),
    new Label("d12",    [ 12,  12], FormFactor.ROUND_DIE_CUT, [ 142,  142], [  94,   94], 113 ),
    new Label("d24",    [ 24,  24], FormFactor.ROUND_DIE_CUT, [ 284,  284], [ 236,  236],  42 ),
    new Label("d58",    [ 58,  58], FormFactor.ROUND_DIE_CUT, [ 688,  688], [ 618,  618],  51 ),
];

function getLabel(name) {
    const matches = ALL_LABELS.filter(e => e.name === name);
    return matches.length > 0 ? matches[0] : null;
}

function findLabel({width = null, length = null, formFactor = null}){
    let found = ALL_LABELS;
    if (formFactor) {
        found = found.filter(e => e.formFactor === formFactor);
    }
    if (width) {
        found = found.filter(e => e.size[0] === width);
    }
    if (length) {
        found = found.filter(e => e.size[1] === length);
    }
    return found;
}

export { FormFactor, Label, getLabel, findLabel };

