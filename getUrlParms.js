const getUrlParms = (key) => {
    const str = decodeURIComponent(location.search.slice(1));

    if (!str) return '';
    
    const split = (str, tag) => str.split(tag);

    const map = split(str, '&').reduce((acc, cur) => {
        const item = split(cur, '=');
        const key = item[0] || '';
        const val = item[1] || '';
        if (key) {
            acc[key] = val;
        }
        return acc;
    }, {});

    return key ? map[key] : map;
}