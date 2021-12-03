const headers = {
    'Content-Type': 'application/json', 
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "*"
}

const idRegEx = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/;

const errorCodes = {
    notFound: 404,
    invalidId: 400,
    internalError: 500,
    successCode: 200,
    successCodeDelete: 204,
    successCreatePerson: 201
  }
  
  const errorMessages = {
    invalid: 'Invalid person id',
    notExist: 'Person with such id is not exist',
    incorrectAdress: 'Incorrect adress, dont use person id',
    incorrectFields: 'Incorrect required filds(name, age, hobbies)',
    incorrectBody: 'Incorrect request Body',
    notFound: 'Page is not found',
    notSupported: 'Such method is not supported',
    internError: 'Internal error on server'
  }


module.exports = {
    headers,
    idRegEx,
    errorCodes,
    errorMessages
}