var http = require('http');
var url = require('url')
var queryString = require('querystring');
var { info, error } = require('./modules/my-log');
var {countries} = require('countries-list');

var server = http.createServer(function (req, res) {
    var parsed = url.parse(req.url);
    console.log('parsed',parsed);

    var pathName = parsed.pathname;
    var query = queryString.parse(parsed.query);
    console.log("query",query);

    switch (pathName) {
        case "/":
            res.writeHead(200, { 'Content-type': 'text/html' }).write('<h2>Working</h2>');
            res.end();
            break;
        case "/exit":
            res.writeHead(200, { 'Content-type': 'text/html' }).write('<h2>Bye</h2>');
            res.end();
            break;
        case "/info":
            var result = info(req.url);
            res.writeHead(200, { 'Content-type': 'text/html' }).write(result);
            res.end();
            break;
        case "/error":
            var result = error(req.url);
            res.writeHead(200, { 'Content-type': 'text/html' }).write(result);
            res.end();
            break;
        case "/countries":
            var result = info(pathName);
            res.writeHead(200, { 'Content-type': 'application/json'}).write(JSON.stringify(countries[query.code]));
            res.end();
            break;
        default:
            res.writeHead(200, { 'Content-type': 'text/html' }).write('<h2>Not Found</h2>');
            res.end();
            break;
    }


});

server.listen(3000);
console.log('runing on 3000')
