const deepCopy = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    let isArray = (obj) => Object.prototype.toString.call(obj) === '[object Array]';

    let copy = isArray(obj) ? [] : {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }

    return copy;
}

export default deepCopy;