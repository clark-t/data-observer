
export class HashSet {
    constructor() {
        this.sets = [];
    }

    add(obj) {
        if (!this.sets.some(set => obj === set)) {
            this.sets.push(obj);
        }
    }

    toArray() {
        return this.sets.slice(0);
    }
}

export function getData(dataPath) {
    let paths = dataPath.split('.');

    return function (dr) {
        let data = dr;

        for (let i = 0, max = paths.length; i < max; i++) {
            data = data[paths[i]];
        }

        return data;
    };
}
