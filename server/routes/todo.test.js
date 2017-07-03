import request from 'supertest';

import App from '../index';

test('GET /todos', (done) => {
  request(App)
    .get('/todos')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(err).toEqual(null);
      expect(res.data).toMatchSnapshot();
      done();
    })
})

test('POST /todos', (done) => {
  const todo = {
    name: 'Wash the dishes',
    description: 'Use soap to wash the dishes',
    dueDate: new Date(),
    completionDate: new Date(),
    priority: 'URGENT'
  };
  request(App)
    .post('/todos')
    .type('json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .send({"todo": todo})
    .end((err, res) => {
      // console.log(res);
      expect(err).toEqual(null);
      expect(res.body.data.name).toEqual(todo.name);
      expect(res.body.data.description).toEqual(todo.description);
      expect(new Date(res.body.data.dueDate)).toEqual(todo.dueDate);
      expect(res.body.data.priority).toEqual(todo.priority);
      done();
    });
})
