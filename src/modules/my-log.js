info = (text) => {
    console.log('INFO : ' + text);
    return text;
}
error = (text) => {
    console.log('Error : ' + text);
    return text;
}
module.exports.info = info;
module.exports.error = error;