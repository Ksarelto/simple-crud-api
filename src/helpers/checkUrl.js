const checkUrl = (url) => {
    const arr = url.split('/').splice(1);
    const pathName = arr[0];
    const queryId = arr[1];
    if(arr.length > 2) return false;
    if(pathName !== 'person') return false;
    return {path: pathName, id: queryId};
};

module.exports = checkUrl ;
