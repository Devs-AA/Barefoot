import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import models from '../../../models';
import {
  requests, users, token, departments, destinations, accommodations, trips, login
} from '../../../__mocks__/createRequest';
import Request from '../../../services/requestService';

chai.use(chaiHttp);

const { assert } = chai;
const route = '/api/v1/requests/1/trips';

describe('REQUESTS', () => {
  before(async () => {
    try {
      await models.users.sync({ force: true });
      await models.logins.sync({ force: true });
      await models.departments.sync({ force: true });
      await models.destinations.sync({ force: true });
      await models.accommodations.sync({ force: true });
      await models.requests.sync({ force: true });
      await models.trips.sync({ force: true });
      await models.departments.bulkCreate(departments);
      await models.logins.bulkCreate(login);
      await models.users.bulkCreate(users);
      await models.destinations.bulkCreate(destinations);
      await models.accommodations.bulkCreate(accommodations);
      await models.departments.bulkCreate(departments);
      await models.requests.create({
        ...requests.valid,
        requesterId: 19,
        managerId: 2
      });
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
    it('Returns 400 for no trips ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.noTrips);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no destination ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.noDestination);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
      assert.isNotNull(res.body.errors);
    });
    it('Returns 400 for invalid request Id', async () => {
      const res = await chai.request(server)
        .post('/api/v1/requests/h/trips')
        .set('authorization', token.requester2)
        .send(trips.noDestination);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
      assert.isNotNull(res.body.errors);
    });
    it('Returns 404 for invalid request Id', async () => {
      const res = await chai.request(server)
        .post('/api/v1/requests/10000/trips')
        .set('authorization', token.requester2)
        .send(trips.noDestination);

      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
      assert.isNotNull(res.body.error);
    });
    it('Returns 400 for invalid destination ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidDestination);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no departure ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.noDeparture);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid departure ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidDeparture);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no accommodation Id', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.noAccommodation);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid accommodation Id ', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidAccommodation);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for no departure date', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.noDate);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for invalid departure date', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidDate);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 if destination is the same as present location', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidReturn);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a return trip if user is not returning from travelled location', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidReturn2);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a return trip if no return trip was given', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidReturn3);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a trip with past date', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidRequest);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a trip with past date', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidRequest);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a muti-city/return trip where all trips have the same date', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidRequest2);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a muti-city/return trip where a trip is missing', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidRequest2);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a trip with accommodation destination not corresponding to trip destination', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidOneWay);

      assert.equal(res.status, 422);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a one way trip having more than on trip', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidOneWay2);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a request without trips array', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidRequest3);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 for a request without a trip object', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidRequest4);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 if return trip has more than two trips', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidReturn4);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
    it('Returns 400 if multi-city trip has less than two trips', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.invalidMultiCity);

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
    });
  });

  describe('Should Create Trip Request', () => {
    before(async () => {
      const request1 = {
        reason: 'Training',
        tripType: 'oneWay',
        departmentId: 2,
        managerId: 2,
        requesterId: 19
      };
      try {
        await models.requests.create(request1);
        await Request.updateStatus(2, 'approved');
      } catch (error) {
        console.log(error);
      }
    });
    after(async () => {
      try {
        await models.requests.destroy({
          where: {
            id: 2
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
    it('should create a one-way trip request', async () => {
      const res = await chai.request(server)
        .post('/api/v1/requests/2/trips')
        .set('authorization', token.requester2)
        .send(trips.oneWay);

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.tripType, 'oneWay');
      assert.hasAnyKeys(res.body.data, ['id', 'requesterId', 'managerId', 'trips', 'status']);
      assert.isArray(res.body.data.trips);
      assert.equal(res.body.data.trips.length, 1);
    });
  });

  describe('Should Create Trip Request', () => {
    before(async () => {
      const request2 = {
        reason: 'Training',
        tripType: 'return',
        departmentId: 2,
        managerId: 2,
        requesterId: 19
      };
      try {
        await models.requests.create(request2);
        await Request.updateStatus(2, 'approved');
      } catch (error) {
        console.log(error);
      }
    });
    after(async () => {
      try {
        await models.requests.destroy({
          where: {
            id: 2
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
    it('should create a return trip request', async () => {
      const res = await chai.request(server)
        .post('/api/v1/requests/3/trips')
        .set('authorization', token.requester2)
        .send(trips.return);

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.tripType, 'return');
      assert.hasAnyKeys(res.body.data, ['id', 'requesterId', 'managerId', 'trips', 'status']);
      assert.isArray(res.body.data.trips);
      assert.isAbove(res.body.data.trips.length, 1);
    });
  });
  describe('Should Create Trip Request', () => {
    before(async () => {
      const request3 = {
        reason: 'Training',
        tripType: 'multiCity',
        requesterId: 19,
        departmentId: 2,
        managerId: 2
      };
      try {
        await models.requests.create(request3);
        await Request.updateStatus(2, 'approved');
      } catch (error) {
        console.log(error);
      }
    });
    after(async () => {
      try {
        await models.requests.destroy({
          where: {
            id: 2
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
    it('should create a multi city trip request', async () => {
      const res = await chai.request(server)
        .post('/api/v1/requests/4/trips')
        .set('authorization', token.requester2)
        .send(trips.multiCity);

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.tripType, 'multiCity');
      assert.hasAnyKeys(res.body.data, ['id', 'requesterId', 'managerId', 'trips', 'status']);
      assert.isArray(res.body.data.trips);
      assert.isAbove(res.body.data.trips.length, 1);
    });
  });
  describe('Should Return 404 for missing trip data', () => {
    it('should return 404 id departure does not exist', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.nonExistentDeparture);

      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
    });
    it('should return 404 id destination does not exist', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.nonExistentDestination);

      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
    });
    it('should return 404 if accommodation does not exist', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester2)
        .send(trips.nonExistentAccommodation);

      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
    });
  });

  describe('Should Return 403 if  user does not own request', () => {
    it('should return 403 error', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', token.requester)
        .send(trips.oneWay);

      assert.equal(res.status, 403);
      assert.equal(res.body.success, false);
    });
  });
});
