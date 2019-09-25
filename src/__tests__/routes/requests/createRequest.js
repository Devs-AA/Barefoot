import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import models from '../../../models';
import {
  requests, users, token, departments
} from '../../../__mocks__/createRequest';

chai.use(chaiHttp);

const { assert } = chai;
const route = '/api/v1/requests';

describe('REQUESTS', () => {
  before(async () => {
    try {
      await models.users.sync({ force: true });
      await models.departments.sync({ force: true });
      await models.requests.sync({ force: true });
      await models.users.bulkCreate(users);
      await models.departments.bulkCreate(departments);
    } catch (error) {
      console.log(error);
    }
  });
  after(async () => {
    await models.requests.destroy({ where: {} });
    await models.departments.destroy({ where: {} });
    await models.users.destroy({ where: {} });
  });
  describe('Should validate token', () => {
    it('Returns 401 if no token is provided ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', '')
        .send(requests.oneWay);

      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });
    it('Returns 401 for invalid Token ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', 'hgvy565eheu3y87d2dhb2vdu62276t72gd7')
        .send(requests.oneWay);
      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });
  });

  describe('Should Return error non permitted roles', () => {
    it('Returns 401 if user is not permitted', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.nonRequester)
        .send(requests.oneWay);

      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });
  });
  describe('Should validate user input', () => {
    it('Returns 400 if no reason is provided', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(requests.noReason);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid trip request reason ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(requests.invalidReason);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no request trip type ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(requests.noTripType);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid request trip type ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(requests.invalidTripType);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no department', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(requests.noDepartment);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid department ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(requests.invalidDepartment);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
  });
  describe('Should create a new request', () => {
    it('Should createa new request', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(requests.valid);

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.hasAnyKeys(res.body.data, ['id', 'tripType', 'status', 'managerId', 'reason']);
    });
  });
});
