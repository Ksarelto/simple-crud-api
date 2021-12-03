const db = require('../../db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const getAll = () => {
    return db.person;
}

const getOne = (id) => {
    const result = db.person.filter((el) => el.id === id);
    return result.length ? result : null;
}

const postItem = (data) => {
   return new Promise((resolve, reject) => {
    const dbJSON = db;
    const id = uuidv4();
    const newPerson = {...data, id};
    dbJSON.person.push(newPerson);
    fs.writeFile('./db.json', JSON.stringify(dbJSON), (err) => {
        if(err) {
            reject(err);
        } else {
            resolve([newPerson]);
        }
    });
   })
};

const putItem = (id, data) => {
    return new Promise((resolve, reject) => {
        const dbJSON = db;
        const person = dbJSON.person.find((el) => el.id === id);
        let changedPerson;
        if(!person) resolve(null);
        dbJSON.person = dbJSON.person.map((el) => {
            if(el.id === id){
                el = {...data, id: el.id};
                changedPerson = el;
            }
            return el;
        });

        fs.writeFile('./db.json', JSON.stringify(dbJSON), (err) => {
            if(err) {
               reject(err);
            } else {
                resolve([changedPerson]);
            }
        });
    });
}

const deleteItem = (id) => {
    return new Promise((resolve, reject) => {
        const dbJSON = db;
        const removedItem = dbJSON.person.find((el) => el.id === id);
        if(!removedItem) resolve(null);
        dbJSON.person = dbJSON.person.filter((el) => el.id !== id);
        fs.writeFile('./db.json', JSON.stringify(dbJSON), (err) => {
            if(err) {
                reject(err);
            } else {
                resolve([removedItem]);
            }
        });
    });
}

module.exports = {
    getAll, getOne, postItem, putItem, deleteItem
}