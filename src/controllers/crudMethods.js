const { postItem, putItem, deleteItem, getAll, getOne } = require('../db_methods/dbMethods.js');
const { getRequestBody, validateID, validateBody, sendMessage } = require('../helpers/utils.js')

const getMethod = (req, res, query) => {
    const isValid = query.id ? validateID(query.id) : true;

    if(!isValid) {
        sendMessage(res, 400, '<h1>Invalid person <em>id</em></h1>');
        return;
    }

    const answer = query.id ? getOne(query.id) : getAll();

    if(!answer) {
        sendMessage(res, 404, '<h1>Page not found</h1>');
        return;
    }
    sendMessage(res, 200, answer);
}

const postMethod = async (req, res, query) => {
    const body = await getRequestBody(req);
    if (query.id) {
        sendMessage(res, 500, '<h1>Incorrect adress, dont use person id</h1>');
    } else if (!query.id && validateBody(body)){
        const result = await postItem(body);
        sendMessage(res, 200, result);
    } else {
        sendMessage(res, 400, '<h1>Incorrect required filds(name, age, hobbies)</h1>');
    }
}

const putMethod = async (req, res, query) => {
    const body = await getRequestBody(req);
    const isValidId = validateID(query.id);
    const isValidBody = validateBody(body);
    if(!isValidId) {
        sendMessage(res, 400, '<h1>Invalid person <em>id</em></h1>');
        return;
    }
    if(!isValidBody) {
        sendMessage(res, 400, '<h1>Incorrect required filds(name, age, hobbies)</h1>');
        return;
    }
    const result = await putItem(query.id, body);
    if(!result) {
        sendMessage(res, 404, '<h1>Page not found</h1>');
        return;
    }
    sendMessage(res, 200, result);
}

const deleteMethod = async (req, res, query) => {
    const isValidId = validateID(query.id);
    if(!isValidId) {
        sendMessage(res, 400, '<h1>Invalid person <em>id</em></h1>');
        return;
    }
    const result = await deleteItem(query.id);
    if(!result) {
        sendMessage(res, 404, '<h1>Page not found</h1>');
        return;
    }
    sendMessage(res, 200, result);
}

module.exports = {
    getMethod, postMethod, putMethod, deleteMethod
}