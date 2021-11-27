const http = require('http');
const checkUrl = require('./helpers/checkUrl.js');
const { getMethod, postMethod, putMethod, deleteMethod } = require('./controllers/crudMethods.js');
require('dotenv').config();

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;

const server = http.createServer((req, res) => {
    const urlRest = checkUrl(req.url);
    if(urlRest){
        switch(req.method){
            case 'GET':
                getMethod(req,res,urlRest);
                break;
            case 'POST':
                postMethod(req, res, urlRest);
                break;
            case 'PUT':
                putMethod(req, res, urlRest);
                break;
            case 'DELETE':
                deleteMethod(req, res, urlRest);
                break;
            default:
                res.writeHead(500, { 'Content-Type': 'text/plain'});
                res.end('Such method is not supported');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html'});
        res.end('<h1>Page is not found</h1>');
    }

    req.on('error', () => {
        res.writeHead(500, { 'Content-Type': 'text/html'});
        res.end('<h1>Internal error on server</h1>');
    });
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log('Address in use, retrying...');
      setTimeout(() => {
        server.close();
        server.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
      }, 5000);
    } else {
        console.log(`Internal server error code: 500\n Error name: ${e.name}\n  Error message: ${e.message}`);
    }
  });

if(MODE !== 'test') server.listen(PORT, () => console.log(`Server is started on port ${PORT}`, MODE));

  module.exports = { server };