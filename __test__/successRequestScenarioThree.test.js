const request = require('supertest');
const { server } = require('../src/index.js');
const db = require('../db.json');

const newPerson = {
  name: 'Romel',
  age: 14,
  hobbies: ['Jump']
}

const newFirstPerson = {
  name: 'Peter',
  age: 24,
  hobbies: ['Run', 'Ride', 'Jump']
}

const newSecondPerson = {
  name: 'Test',
  age: 14,
  hobbies: ['Jump']
}


describe('success scenarios', function() {
  beforeAll(() => {
    db.person = [
      {"name":"Peter","age":24,"hobbies":["Run","Ride","Jump"],"id":"b8b842fe-d279-4a15-9a16-f5d25ad3d5ca"},
      {"name":"Cris","age":14,"hobbies":["Run","Jump"],"id":"b8b842fe-d279-4a15-9d16-f5d22ad3d5ca"},
      {"name":"Randy","age":25,"hobbies":["Run","Drink","Jump"],"id":"b8b842fe-d279-4a15-1d16-f5d25ad3d5ca"},
      {"name":"Morse","age":76,"hobbies":["Run",],"id":"b8b842fe-d279-4a15-9d16-f5d25ad3d8ca"}
    ];
  })
  test('responds with json', async () => {
    const response = await request(server).get('/person');
    expect(JSON.parse(response.text)).toEqual(db.person);
    expect(response.status).toBe(200);
  });
  test('responds with json', async () => {
    const id = db.person[2].id;
    const thirdPerson = db.person[2];
    const putResponse = await request(server).put(`/person/${id}`).send(newPerson);
    expect(putResponse.status).toBe(200);
    const getResponse = await request(server).get(`/person/${id}`);
    expect(getResponse.status).toBe(200);
    expect(JSON.parse(getResponse.text)[0]).not.toEqual(thirdPerson);
  });
  test('responds with json', async () => {
    const idFirstPerson = db.person[0].id;
    const idSecondPerson = db.person[2].id;
    const deleteFirstPerson = await request(server).delete(`/person/${idFirstPerson}`);
    expect(deleteFirstPerson.status).toBe(204);
    const deleteSecondPerson = await request(server).delete(`/person/${idSecondPerson}`);
    expect(deleteSecondPerson.status).toBe(204);
    const response = await request(server).get(`/person`);
    expect(JSON.parse(response.text).length).toBe(2);
    expect(response.status).toBe(200);
  });
  test('responds with json', async () => {
    const responseOne = await request(server).post('/person').send(newFirstPerson);
    expect(responseOne.status).toBe(201);
    const responseTwo = await request(server).post('/person').send(newSecondPerson);
    expect(responseTwo.status).toBe(201);
    const response = await request(server).get(`/person`);
    expect(JSON.parse(response.text).length).toBe(4);
    expect(response.status).toBe(200);
  });
});