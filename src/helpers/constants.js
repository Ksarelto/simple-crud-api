const headers = {
    'Content-Type': 'application/json', 
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "*"
}

const idRegEx = /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/;


module.export = {
    headers,
    idRegEx,
}