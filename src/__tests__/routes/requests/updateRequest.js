import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';

import models from '../../../models';
import {
  users, departments, login, token
} from '../../../__mocks__/createRequest';

chai.use(chaiHttp);


const route = '/api/v1/requests/1';
describe('Update Request status', () => {
  const status = {
    approved: { status: 'approved' },
    rejected: { status: 'rejected' }
  };
  let token1, token2;
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
      await models.logins.bulkCreate(login);
      await models.departments.bulkCreate(departments);
      await models.requests.create(request);
      const manager = await chai.request(server).post('/api/v1/users/auth/login').send({ email: 'barefoot1@gmail.com', password: 'Password1$' });
      const manager2 = await chai.request(server).post('/api/v1/users/auth/login').send({ email: 'barefoot2@gmail.com', password: 'Password1$' });
      token1 = manager.body.token;
      token2 = manager2.body.token;
    } catch (error) {
      console.log(error);
    }
  });

  after(async () => {
    await models.requests.destroy({ where: {} });
    await models.departments.destroy({ where: {} });
    await models.logins.destroy({ where: {} });
    await models.users.destroy({ where: {} });
  });

  describe('It should validate Token', () => {
    it('It should return 401 for no Token', async () => {
      const res = await chai.request(server)
        .patch('/api/v1/requests/e')
        .send(status.approved);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for invalid token', async () => {
      const res = await chai.request(server)
        .patch(route)
        .set('authorization', '65e65jhvjhvjvj67')
        .send(status.rejected);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for non permitted roles', async () => {
      const res = await chai.request(server)
        .patch(route)
        .set('authorization', `Bearer ${token.requester}`)
        .send(status.rejected);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
  });

  describe('It should validate input', () => {
    it('It should return 400 for invalid request id', async () => {
      const res = await chai.request(server)
        .patch('/api/v1/requests/e')
        .send(status.approved)
        .set('authorization', `Bearer ${token1}`);

      assert.equal(400, res.status,);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if no status key in the req object', async () => {
      const res = await chai.request(server)
        .patch(route)
        .send('')
        .set('authorization', `Bearer ${token1}`);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if status is invalid', async () => {
      const res = await chai.request(server)
        .patch(route)
        .send({ status: 'newStatus' })
        .set('authorization', `Bearer ${token1}`);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
  });

  describe('It should check request logic', () => {
    it('It should return 403 non department manager', async () => {
      const res = await chai.request(server)
        .patch(route)
        .send(status.approved)
        .set('authorization', `Bearer ${token2}`);

      assert.equal(res.status, 403);
      assert.equal(res.body.success, false);
      assert.equal(res.body.message, 'You are not allowed to perform this operation');
    });
    it('It should return 404 if request does not exist', async () => {
      const res = await chai.request(server)
        .patch('/api/v1/requests/10')
        .send(status.rejected)
        .set('authorization', `Bearer ${token1}`);

      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
      assert.equal(res.body.message, 'Request not found');
    });
    it('It should return 200 for successfully updating a request', async () => {
      const res = await chai.request(server)
        .patch(route)
        .send(status.approved)
        .set('authorization', `Bearer ${token1}`);
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.status, 'approved');
    });
    it('It should return 403 if request has already been updated', async () => {
      const res = await chai.request(server)
        .patch(route)
        .send(status.rejected)
        .set('authorization', `Bearer ${token1}`);

      assert.equal(res.status, 403);
      assert.equal(res.body.success, false);
      assert.equal(res.body.message, 'Request already approved');
    });
  });
});
