import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import server from '../../../index';
import models from '../../../models';
import body from '../../../__mocks__/editRequest';
import Request from '../../../services/requestService';
import {
  users, departments, login
} from '../../../__mocks__/createRequest';

chai.use(chaiHttp);

const { assert } = chai;
const route = '/api/v1/requests/1';

describe('Edit Requests with Open Status', () => {
  let permittedToken, notPermittedToken, notOwner;
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
      await models.logouts.sync({ force: true });
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
      (({ body: { token: notPermittedToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'abc123@gmail.com', password: 'Password1$' })));
      (({ body: { token: notOwner } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'requester2@gmail.com', password: 'Password1$' })));
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
      await models.logouts.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });

  describe('It should auththenticate and authorize users', () => {
    it('It should return 401 for no Token', async () => {
      const res = await chai.request(server)
        .put(route)
        .send(body.vaid);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for invalid token', async () => {
      const res = await chai.request(server)
        .put(route)
        .set('authorization', '65e65jhvjhvjvj67')
        .send(body.valid);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for non permitted roles', async () => {
      const res = await chai.request(server)
        .put(route)
        .set('authorization', `Bearer ${notPermittedToken}`)
        .send(body.valid);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
  });

  describe('It should validate input', () => {
    it('It should return 400 for invalid request id', async () => {
      const res = await chai.request(server)
        .put('/api/v1/requests/e')
        .send(body.valid)
        .set('authorization', `Bearer ${permittedToken}`);

      assert.equal(400, res.status);
      assert.equal(false, res.body.success);
    });
    it('It should return 400 if no data in the req object', async () => {
      const res = await chai.request(server)
        .put(route)
        .send('')
        .set('authorization', `Bearer ${permittedToken}`);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 for invalid data', async () => {
      const res = await chai.request(server)
        .put(route)
        .send(body.noReason)
        .set('authorization', `Bearer ${permittedToken}`);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 if use des not own the request ', async () => {
      const res = await chai.request(server)
        .put(route)
        .send(body.valid)
        .set('authorization', `Bearer ${notOwner}`);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 422 error if reason is the same', async () => {
      const res = await chai.request(server)
        .put(route)
        .send(body.sameReason)
        .set('authorization', `Bearer ${permittedToken}`);

      assert.equal(422, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 422 error if trip type is the same', async () => {
      const res = await chai.request(server)
        .put(route)
        .send(body.sameTripType)
        .set('authorization', `Bearer ${permittedToken}`);

      assert.equal(422, res.status);
      assert.equal(res.body.success, false);
    });
  });

  describe('Should Update request', async () => {
    it('It should update ', async () => {
      const user = await jwt.decode(permittedToken, process.env.SECRET_KEY_SIGNUP);
      const res = await chai.request(server)
        .put(route)
        .send(body.valid)
        .set('authorization', `Bearer ${permittedToken}`);

      assert.equal(200, res.status);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.requesterId, user.user.id);
      assert.hasAnyKeys(res.body.data, Object.keys(body.valid));
    });
    it('It should return 403 if request status is not open', async () => {
      await Request.updateStatus(1, 'approved');
      const res = await chai.request(server)
        .put(route)
        .send(body.valid)
        .set('authorization', `Bearer ${permittedToken}`);

      assert.equal(403, res.status);
      assert.equal(res.body.success, false);
    });
  });
});
