const FormFactor = {
    DIE_CUT: 1,
    ENDLESS: 2,
    ROUND_DIE_CUT: 3,
};

class Label {
    constructor(name, size, formFactor, dotsTotal, dotsPrintable, offsetRight, feedMargin=0) {
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
    // array of Label instances as in Python code...
];

function getLabel(name) {
    const matches = ALL_LABELS.filter(e => e.name === name);
    return matches.length > 0 ? matches[0] : null;
}

function findLabel(width = null, length = null, formFactor = null) {
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

