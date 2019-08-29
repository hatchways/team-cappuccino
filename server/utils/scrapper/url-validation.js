const isUrl = (url) => {
    const validURL = new RegExp('^(https?:\\/\\/)?');
    return validURL.test(url);
}

module.exports = isUrl;