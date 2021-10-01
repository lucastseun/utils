const deepCopy = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    const isArray = (obj) => Object.prototype.toString.call(obj) === '[object Array]';

    const copy = isArray(obj) ? [] : {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }

    return copy;
}

export default deepCopy;