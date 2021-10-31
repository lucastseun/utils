const checkType = (obj) => {
    const type = Object.prototype.toString.call(obj).slice(8, -1)
    return type;
}

export default checkType;