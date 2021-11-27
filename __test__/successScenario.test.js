const request = require('supertest');
const { server } = require('../src/index.js');
const db = require('../db.json');

const newFirstPerson = {
  name: 'Peter',
  age: 24,
  hobbies: ['Run', 'Ride', 'Jump']
}

const newSecondPerson = {
  name: 'Romel',
  age: 14,
  hobbies: ['Jump']
}

const newThirdPerson = {
  name: 'Bob',
  age: 66,
  hobbies: ['Hide', 'Purr']
}

describe('success scenarios os requests two', () => {
  let persons;

  beforeAll(() => {
    db.person = []
  })
  test('should add some new persons', async () => {
    const responseOne = await request(server).post('/person').send(newFirstPerson);
    expect(responseOne.status).toBe(200);
    const responseTwo = await request(server).post('/person').send(newSecondPerson);
    expect(responseTwo.status).toBe(200);
    const responseThree = await request(server).post('/person').send(newThirdPerson);
    expect(responseThree.status).toBe(200);
  })
  test('should get all persons', async () => {
    const response = await request(server).get('/person');
    expect(response.status).toBe(200);
    const personsArray = JSON.parse(response.text);
    const personsNum = personsArray.length;
    expect(personsNum).toBe(3);
  })
  test('should get one of the persons', async () => {
    const id = db.person[1].id;
    const response = await request(server).get(`/person/${id}`);
    const returnedPerson = JSON.parse(response.text)[0];
    expect(returnedPerson).toEqual(db.person[1]);
    expect(response.status).toBe(200);
  })
  test('should delete the last person', async () => {
    const id = db.person[2].id;
    const response = await request(server).delete(`/person/${id}`);
    expect(response.status).toBe(200);
  })
  test('should get persons without deleted', async () => {
    const response = await request(server).get(`/person`);
    const returnedPerson = JSON.parse(response.text);
    expect(returnedPerson).toEqual(db.person);
    expect(response.status).toBe(200);
  })
})