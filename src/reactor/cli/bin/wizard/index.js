const { app, serve } = require('./server');
const createModule = require('./createModule');
const settings = require('./wizard-settings');

const port = 2311;

// app.get('/', function (req, res) {
//     res.sendFile('./builder/index.html');
// });

app.get('/settings', function (req, res) {
    res.send(settings);
});

app.post('/create-module', createModule);

module.exports = function () {
    serve(port);
};