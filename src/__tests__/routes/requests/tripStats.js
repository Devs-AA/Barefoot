import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import models from '../../../models';
import {
  requests, users, departments, destinations, accommodations, trips, login
} from '../../../__mocks__/createRequest';
import Request from '../../../services/requestService';
import {
  getStatsUser, getStatsManager, noEndDate, noStartDate, nonExistentUser,
  invalidEndDate, invalidStartDate, invalidEmail, wrongDepartment
} from '../../../__mocks__/trips';

chai.use(chaiHttp);

const { assert } = chai;
const route = '/api/v1/trips/stats';

describe('REQUESTS', () => {
  let requesterToken, managerToken, notManagerToken, notRequesterToken;
  before(async () => {
    try {
      await models.users.sync({ force: true });
      await models.logouts.sync({ force: true });
      await models.logins.sync({ force: true });
      await models.departments.sync({ force: true });
      await models.destinations.sync({ force: true });
      await models.accommodations.sync({ force: true });
      await models.requests.sync({ force: true });
      await models.trips.sync({ force: true });
      await models.logins.bulkCreate(login);
      await models.users.bulkCreate(users);
      await models.destinations.bulkCreate(destinations);
      await models.accommodations.bulkCreate(accommodations);
      await models.departments.bulkCreate(departments);
      [1, 2, 3].forEach(async () => {
        await models.requests.create({
          ...requests.valid,
          requesterId: 19,
          managerId: 2
        });
        await Request.updateStatus(1, 'approved');
        await models.trips.create(trips.oneWay);
      });
      (({ body: { token: requesterToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'requester1@gmail.com', password: 'Password1$' })));
      (({ body: { token: managerToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'barefoot1@gmail.com', password: 'Password1$' })));
      (({ body: { token: notManagerToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'barefoot2@gmail.com', password: 'Password1$' })));
      (({ body: { token: notRequesterToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'abc123@gmail.com', password: 'Password1$' })));
    } catch (error) {
      console.log(error);
    }
  });
  after(async () => {
    await models.accommodations.destroy({ where: {} });
    await models.destinations.destroy({ where: {} });
    await models.trips.destroy({ where: {} });
    await models.requests.destroy({ where: {} });
    await models.departments.destroy({ where: {} });
    await models.users.destroy({ where: {} });
    await models.logouts.destroy({ where: {} });
  });
  describe('Should validate token', () => {
    it('Returns 401 if no token is provided ', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', '')
        .send(getStatsUser);

      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });
    it('Returns 401 for invalid Token ', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', 'hgvy565eheu3y87d2dhb2vdu62276t72gd7')
        .send(getStatsUser);
      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });
    it('Returns 401 if user is not permitted', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${notRequesterToken}`)
        .send(getStatsUser);

      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });
  });

  describe("Should validate user's input", () => {
    it('Returns 400 for no start date', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${requesterToken}`)
        .send(noStartDate);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid start date', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${requesterToken}`)
        .send(invalidStartDate);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no end date', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${requesterToken}`)
        .send(noEndDate);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid end date', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${requesterToken}`)
        .send(invalidEndDate);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid email', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${managerToken}`)
        .send(invalidEmail);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
      assert.isNotNull(res.body.errors);
    });
  });

  describe('Should validate user', () => {
    it('should return 404 if user does not exist ', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${managerToken}`)
        .send(nonExistentUser);

      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
    });
    it('should return 403 if staff and manager are not of the same department', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${notManagerToken}`)
        .send(wrongDepartment);

      assert.equal(res.status, 403);
      assert.equal(res.body.success, false);
    });
  });

  describe('Should Return 200 if successful', () => {
    it('should return 200 if user successfully gets his/her trip stats', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${requesterToken}`)
        .send(getStatsUser);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.isArray(res.body.data);
    });
    it("should return 200 if manager successfully gets user's trip stats", async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${managerToken}`)
        .send(getStatsManager);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.isArray(res.body.data);
    });
  });
});
