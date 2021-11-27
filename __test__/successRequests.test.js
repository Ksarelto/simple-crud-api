const request = require('supertest');
const { server } = require('../src/index.js');
const db = require('../db.json');

const newPerson = {
  name: 'Peter',
  age: 24,
  hobbies: ['Run', 'Ride', 'Jump']
}

const changedPerson = {
  name: 'Andrew',
  age: 33,
  hobbies: []
}

describe('success scenario requests', function() {
  beforeAll(() => {
    db.person = [];
  })
  test('should get empty array', async () => {
    const response = await request(server).get('/person');
    expect(JSON.parse(response.text)).toEqual(db.person);
    expect(response.status).toBe(200);
  });
  test('should create new person', async () => {
    const response = await request(server).post('/person').send(newPerson);
    const createdPerson = JSON.parse(response.text)[0];
    expect(createdPerson).toEqual(newPerson);
    expect(response.status).toBe(200);
  });
  test('should get created person', async () => {
    const id = db.person[0].id;
    const response = await request(server).get(`/person/${id}`);
    const returnedPerson = JSON.parse(response.text)[0];
    expect(returnedPerson).toEqual(db.person[0]);
    expect(response.status).toBe(200);
  });
  test('should change created person', async () => {
    const id = db.person[0].id;
    const response = await request(server).put(`/person/${id}`).send(changedPerson);
    const returnedPerson = JSON.parse(response.text)[0];
    expect(returnedPerson).toEqual(changedPerson);
    expect(response.status).toBe(200);
  });
  test('should check that person is deleted', async () => {
    const id = db.person[0].id;
    const beforeDeletingPerson = db.person[0];
    const response = await request(server).delete(`/person/${id}`);
    const deletedPerson = JSON.parse(response.text)[0];
    expect(deletedPerson).toEqual(beforeDeletingPerson);
    expect(response.status).toBe(200);
    const afterDeletResponse = await request(server).get(`/person/${id}`);
    expect(JSON.parse(afterDeletResponse.text)).toBe('<h1>Page not found</h1>');
    expect(afterDeletResponse.status).toBe(404);
  });
});