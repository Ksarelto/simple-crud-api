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

const incorrectPerson = {
  name: 'Fail',
  age: null,
  hobbies: 'None'
}

const randomUUID = '123e4567-e89b-12d3-a456-426655440000';

describe('error scenarios', () => {
  beforeAll(() => {
    db.person = [];
  })
  test('should throw error because incorrect method', async () => {
    const response = await request(server).patch('/person');
    expect(response.text).toBe('Such method is not supported');
    expect(response.status).toBe(500);
  });
  test('should throw error because incorrect path', async () => {
    const response = await request(server).get('/some/incorrect/path');
    expect(response.text).toBe('<h1>Page is not found</h1>');
    expect(response.status).toBe(404);
  });
  test('should throw error because incorrect path person', async () => {
    const response = await request(server).get('/pers');
    expect(response.text).toBe('<h1>Page is not found</h1>');
    expect(response.status).toBe(404);
  });
  test('should throw error because incorrect id', async () => {
    const response = await request(server).get('/person/123');
    expect(JSON.parse(response.text)).toBe('<h1>Invalid person <em>id</em></h1>');
    expect(response.status).toBe(400);
  });
  test('should throw error because incorrect path to post method', async () => {
    const response = await request(server).post('/person/123').send(newPerson);
    expect(JSON.parse(response.text)).toBe('<h1>Incorrect adress, dont use person id</h1>');
    expect(response.status).toBe(500);
  });
  test('should throw error because incorrect body to request', async () => {
    const response = await request(server).post('/person').send(incorrectPerson);
    expect(JSON.parse(response.text)).toBe('<h1>Incorrect required filds(name, age, hobbies)</h1>');
    expect(response.status).toBe(400);
  });
  test('should throw error because incorrect id to put method', async () => {
    const response = await request(server).put('/person/123').send(newPerson);
    expect(JSON.parse(response.text)).toBe('<h1>Invalid person <em>id</em></h1>');
    expect(response.status).toBe(400);
  });
  test('should throw error because incorrect body to put method', async () => {
    const response = await request(server).post('/person').send(newPerson);
    const id = db.person[0].id;
    const newResponse = await request(server).put(`/person/${id}`).send(incorrectPerson);
    expect(JSON.parse(newResponse.text)).toBe('<h1>Incorrect required filds(name, age, hobbies)</h1>');
    expect(newResponse.status).toBe(400);
  });
  test('should throw error because person is not existed', async () => {
    const response = await request(server).put(`/person/${randomUUID}`).send(changedPerson);
    expect(JSON.parse(response.text)).toBe('<h1>Page not found</h1>');
    expect(response.status).toBe(404);
  });
  test('should throw error because incorrect id to delete method', async () => {
    const newResponse = await request(server).delete(`/person/123`);
    expect(JSON.parse(newResponse.text)).toBe('<h1>Invalid person <em>id</em></h1>');
    expect(newResponse.status).toBe(400);
  });
  test('should throw error because deleted person is not exist', async () => {
    const response = await request(server).delete(`/person/${randomUUID}`);
    expect(JSON.parse(response.text)).toBe('<h1>Page not found</h1>');
    expect(response.status).toBe(404);
  });
})
