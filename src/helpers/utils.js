const { headers } = require('./constants.js');

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
      try{
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            resolve(JSON.parse(data));
        })
      } catch(err) {
          reject(err);
      }
  })
}

const sendMessage = (res, code, message) => {
    res.writeHead(code, {  ...headers});
    res.end(JSON.stringify(message));
}

const validateID = (id) => {
    if(!id.match(/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/g)) return false;
    return true;
}

const validateBody = (body) => {
    if(typeof body.name !== 'string') return false;
    if(typeof body.age !== 'number') return false;
    if(!Array.isArray(body.hobbies)) return false;
    return true;
}

module.exports = { getRequestBody, validateID, validateBody, sendMessage };