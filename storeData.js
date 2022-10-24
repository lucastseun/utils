const store = (key, value) => {
    try {
        if (!key || typeof key !== 'string') {
            throw 'Excepted a string key'
        }
        if (key && value) {
           return sessionStorage.setItem(key, JSON.stringify(value));
        }
        if (key && value === undefined) {
           return JSON.parse(sessionStorage.getItem(key));
        }
        if (key && value === null) {
           return sessionStorage.removeItem(key);
        }
    } catch (err) {
        console.log(err);
    }
}

export default store