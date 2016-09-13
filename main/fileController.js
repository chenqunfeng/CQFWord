const fs = require('fs')
const nconf = require('nconf')
var _nconf;
function openFile(fileName) {
    dir = getUserHome() + '/CQF'
    //若目录不存在，则创建
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir)
    path = dir + '/' + fileName
    if (path != this.path) {
        _nconf = nconf.file({file: path});
        this.fileName = fileName
        this.path = path;
    }
}
function saveSettings(settingKey, settingValue, fileName) {
    fileName && this.openFile(fileName || this.fileName)
    _nconf.set(settingKey, settingValue);
    _nconf.save();
}

function readSettings(settingKey, fileName) {
    fileName && this.openFile(fileName || this.fileName)
    _nconf.load();
    return _nconf.get(settingKey);
}

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

module.exports = {
    openFile: openFile,
    saveSettings: saveSettings,
    readSettings: readSettings
};
