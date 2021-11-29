const { postItem, putItem, deleteItem, getAll, getOne } = require('../db_methods/dbMethods.js');
const { getRequestBody, validateID, validateBody, sendMessage } = require('../helpers/utils.js')
const { errorCodes, errorMessages } = require('../helpers/constants.js');

const getMethod = (req, res, query) => {
    const isValid = query.id === undefined ? true : validateID(query.id);

    if(!isValid) {
        sendMessage(res, errorCodes.invalidId, errorMessages.invalid);
        return;
    }

    const answer = query.id ? getOne(query.id) : getAll();

    if(!answer) {
        sendMessage(res, errorCodes.notFound, errorMessages.notExist);
        return;
    }
    sendMessage(res, errorCodes.successCode, answer);
}

const postMethod = async (req, res, query) => {
    const body = await getRequestBody(req, res);
    if (query.id || query.id === '') {
        sendMessage(res, errorCodes.internalError, errorMessages.incorrectAdress);
    } else if (!query.id && validateBody(body)){
        const result = await postItem(body);
        sendMessage(res, errorCodes.successCreatePerson, result);
    } else {
        sendMessage(res, errorCodes.invalidId, errorMessages.incorrectFields);
    }
}

const putMethod = async (req, res, query) => {
    const body = await getRequestBody(req, res);
    const isValidId = validateID(query.id);
    const isValidBody = validateBody(body);
    if(!isValidId) {
        sendMessage(res, errorCodes.invalidId, errorMessages.invalid);
        return;
    }
    if(!isValidBody) {
        sendMessage(res, errorCodes.invalidId, errorMessages.incorrectFields);
        return;
    }
    const result = await putItem(query.id, body);
    if(!result) {
        sendMessage(res, errorCodes.notFound, errorMessages.notExist);
        return;
    }
    sendMessage(res, errorCodes.successCode, result);
}

const deleteMethod = async (req, res, query) => {
    const isValidId = validateID(query.id);
    if(!isValidId) {
        sendMessage(res, errorCodes.invalidId, errorMessages.invalid);
        return;
    }
    const result = await deleteItem(query.id);
    if(!result) {
        sendMessage(res, errorCodes.notFound, errorMessages.notExist);
        return;
    }
    sendMessage(res, errorCodes.successCodeDelete, result);
}

module.exports = {
    getMethod, postMethod, putMethod, deleteMethod
}