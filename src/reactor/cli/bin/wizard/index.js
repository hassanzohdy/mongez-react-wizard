const { app, serve } = require('./server');
const { readdirSync } = require('fs');
const createModule = require('./createModule');
const env = require('dotenv');

env.config();

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

const root = path => process.cwd() + '/' + path;

const appsList = getDirectories(root('src/modules'));

const localeCodes = String(process.env.REACT_APP_LOCALE_CODES_LIST || '').split(',');

const port = 2311;

app.get('/', function (req, res) {
    res.sendFile('./builder/index.html');
});

app.get('/settings', function (req, res) {
    res.send({
        apps: appsList,
        locales: localeCodes,
    });
});

app.post('/create-module', createModule);

module.exports = function () {
    serve(port);
};