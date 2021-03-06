/* eslint-disable no-unreachable */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../lib/App');
const DumbName = require('../lib/DumbName');

describe('app routes', () => {
  const mongo = new MongoMemoryServer();
  beforeAll(() => {
    return mongo.getUri()
      .then(uri => mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }));
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('create a new dumbname', () => {
    return request(app)
      .post('/dumbnames')
      .send({
        name: 'some dumb name',
        likes: 3
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          name: 'some dumb name',
          likes: 3,
          __v: 0
        });
      });
  });

  it('lists all of the dumbnames', async() => {
    await DumbName.create({
      name: 'Slim Timmy',
      likes: 3
    });

    return request(app)
      .get('/dumbnames')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.anything(),
          name: 'Slim Timmy',
          likes: 3,
          __v: 0
        }]);
      });

  });


  it('get one dumb name by id', async() => {
    const newName = await DumbName.create({
      name: 'Slim Timmy',
      likes: 3
    });

    return request(app)
      .get(`/dumbnames/${newName._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: newName.id,
          name: 'Slim Timmy',
          likes: 3,
          __v: 0
        });
      });

  });

  it('updates a dumbname', async() => {
    const oldName = await DumbName.create({
      name: 'Slim Timmy',
      likes: 3
    });

    const newName = {
      name: 'Steven Stevenson'
    };

    return request(app)
    
      .patch(`/dumbnames/update/${oldName._id}`)
      .send(newName)
      .then(res => {
        expect(res.body).toEqual({
          _id: oldName.id,
          name: 'Steven Stevenson',
          likes: 3,
          __v: 0
        });
      });

  });

  it('deletes a dumbname', async() => {
    const newName = await DumbName.create({
      name: 'Slim Timmy',
      likes: 3
    });

    return request(app)
      .delete(`/dumbnames/${newName._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: newName.id,
          name: 'Slim Timmy',
          likes: 3,
          __v: 0
        });
      });
  });
});
