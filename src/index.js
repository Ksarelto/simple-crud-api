const http = require('http');
const checkUrl = require('./helpers/checkUrl.js');
const { getMethod, postMethod, putMethod, deleteMethod } = require('./controllers/crudMethods.js');
const { errorCodes, errorMessages } = require('./helpers/constants.js');
require('dotenv').config();

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;

const server = http.createServer((req, res) => {
    try{
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
                    res.writeHead(errorCodes.internalError, { 'Content-Type': 'text/plain'});
                    res.end(errorMessages.notSupported);
            }
        } else {
            res.writeHead(errorCodes.notFound, { 'Content-Type': 'text/html'});
            res.end(errorMessages.notFound);
        }
    } catch(err) {
        res.writeHead(errorCodes.internalError, { 'Content-Type': 'text/html'});
        res.end(errorMessages.internError);
    }

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