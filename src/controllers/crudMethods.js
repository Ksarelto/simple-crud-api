const { postItem, putItem, deleteItem, getAll, getOne } = require('../db_methods/dbMethods.js');
const { getRequestBody, validateID, validateBody, sendMessage } = require('../helpers/utils.js')

const getMethod = (req, res, query) => {
    const isValid = query.id === undefined ? true : validateID(query.id);

    if(!isValid) {
        sendMessage(res, 400, 'Invalid person id');
        return;
    }

    const answer = query.id ? getOne(query.id) : getAll();

    if(!answer) {
        sendMessage(res, 404, 'Person with such id is not exist');
        return;
    }
    sendMessage(res, 200, answer);
}

const postMethod = async (req, res, query) => {
    const body = await getRequestBody(req);
    if (query.id || query.id === '') {
        sendMessage(res, 500, 'Incorrect adress, dont use person id');
    } else if (!body){
        sendMessage(res, 500, 'There is no request body');
    }else if (!query.id && validateBody(body)){
        const result = await postItem(body);
        sendMessage(res, 201, result);
    } else {
        sendMessage(res, 400, 'Incorrect required filds(name, age, hobbies)');
    }
}

const putMethod = async (req, res, query) => {
    const body = await getRequestBody(req);
    if(!body) {
        sendMessage(res, 500, 'There is no request body');
        return;
    };
    const isValidId = validateID(query.id);
    const isValidBody = validateBody(body);
    if(!isValidId) {
        sendMessage(res, 400, 'Invalid person id');
        return;
    }
    if(!isValidBody) {
        sendMessage(res, 400, 'Incorrect required filds(name, age, hobbies)');
        return;
    }
    const result = await putItem(query.id, body);
    if(!result) {
        sendMessage(res, 404, 'Person with such id is not exist');
        return;
    }
    sendMessage(res, 200, result);
}

const deleteMethod = async (req, res, query) => {
    const isValidId = validateID(query.id);
    if(!isValidId) {
        sendMessage(res, 400, 'Invalid person id');
        return;
    }
    const result = await deleteItem(query.id);
    if(!result) {
        sendMessage(res, 404, 'Person with such id is not exist');
        return;
    }
    sendMessage(res, 200, result);
}

module.exports = {
    getMethod, postMethod, putMethod, deleteMethod
}