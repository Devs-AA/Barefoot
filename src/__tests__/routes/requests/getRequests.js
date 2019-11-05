import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import server from '../../../index';
import models from '../../../models';
import {
  users, departments, login
} from '../../../__mocks__/createRequest';

chai.use(chaiHttp);

const { assert } = chai;
const route = '/api/v1/requests';
const route2 = '/api/v1/requests/1';

describe('Get all requests belonging to a user', () => {
  let permittedToken, notPermittedToken, notPermittedToken2;
  before(async () => {
    const request = {
      reason: 'Meeting',
      tripType: 'return',
      departmentId: 1,
      managerId: 1,
      requesterId: 3,
      status: 'open'
    };
    try {
      await models.users.sync({ force: true });
      await models.logins.sync({ force: true });
      await models.departments.sync({ force: true });
      await models.requests.sync({ force: true });
      await models.users.bulkCreate(users);
      await models.departments.bulkCreate(departments);
      await models.logins.bulkCreate(login);
      await models.requests.create(request);
      (({ body: { token: permittedToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'requester1@gmail.com', password: 'Password1$' })));
      (({ body: { token: notPermittedToken2 } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'requester3@gmail.com', password: 'Password1$' })));
      (({ body: { token: notPermittedToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'abc123@gmail.com', password: 'Password1$' })));
    } catch (error) {
      console.log(error);
    }
  });
  after(async () => {
    try {
      await models.requests.destroy({ where: {} });
      await models.departments.destroy({ where: {} });
      await models.logins.destroy({ where: {} });
      await models.users.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });

  describe('It should auththenticate and authorize users', () => {
    it('It should return 401 for no Token', async () => {
      const res = await chai.request(server)
        .get(route);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for invalid token', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', '65e65jhvjhvjvj67');

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for non permitted roles', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${notPermittedToken}`);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 if not owner', async () => {
      const res = await chai.request(server)
        .get(route2)
        .set('authorization', `Bearer ${notPermittedToken2}`);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 404 if request does not exist', async () => {
      const res = await chai.request(server)
        .get('/api/v1/requests/200')
        .set('authorization', `Bearer ${permittedToken}`);

      assert.equal(404, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 for invalid request id', async () => {
      const res = await chai.request(server)
        .get('/api/v1/requests/200')
        .set('authorization', `Bearer ${permittedToken}`);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
  });


  describe('Get all requests', async () => {
    it('It should get all requests ', async () => {
      const { user } = await jwt.decode(permittedToken, process.env.SECRET_KEY_SIGNUP);
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${permittedToken}`);
      console.log(res.body)
      assert.equal(200, res.status);
      assert.isObject(res.body.data);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.requesterId, user.id);
    });
  });

  describe('Get specific request', async () => {
    it('It should get a request ', async () => {
      const res = await chai.request(server)
        .get(route2)
        .set('authorization', `Bearer ${permittedToken}`);

      assert.equal(200, res.status);
      assert.isObject(res.body.data);
      assert.equal(res.body.success, true);
    });
  });
});
