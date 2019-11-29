import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import models from '../../../models';
import {
  users, destinations, login, departments
} from '../../../__mocks__/createRequest';
import {
  valid, validAccommodationBooking, noLodgeInDate, noLodgeOutDate, invalidLodgeInDate,
  invalidLodgeOutDate, expiredLodgeInDate, noBookingTripDate, invalidBookingTripDate
} from '../../../__mocks__/accommodations';
import Request from '../../../services/requestService';


chai.use(chaiHttp);

const { assert } = chai;
const route = '/api/v1/accommodations/1';

describe('Book accommodation', () => {
  let permittedToken, notPermittedToken;
  before(async () => {
    try {
      await models.users.sync({ force: true });
      await models.departments.sync({ force: true });
      await models.logins.sync({ force: true });
      await models.destinations.sync({ force: true });
      await models.requests.sync({ force: true });
      await models.accommodations.sync({ force: true });
      await models.bookings.sync({ force: true });
      await models.users.bulkCreate(users);
      await models.destinations.bulkCreate(destinations);
      await models.departments.bulkCreate(departments);
      await models.logins.bulkCreate(login);
      await models.accommodations.create(valid);
      await Request.create({
        tripType: 'oneWay',
        requesterId: 3,
        departmentId: 1,
        managerId: 11,
        reason: 'Business',
        active: true
      });
      await Request.updateStatus(1, 'approved');
      (({ body: { token: permittedToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'requester1@gmail.com', password: 'Password1$' })));
      (({ body: { token: notPermittedToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'abc123@gmail.com', password: 'Password1$' })));
    } catch (error) {
      console.log(error);
    }
  });
  after(async () => {
    try {
      await models.bookings.destroy({ where: {} });
      await models.accommodations.destroy({ where: {} });
      await models.requests.destroy({ where: {} });
      await models.departments.destroy({ where: {} });
      await models.destinations.destroy({ where: {} });
      await models.logins.destroy({ where: {} });
      await models.users.destroy({ where: {} });
    } catch (error) {
      console.log(error);
    }
  });

  describe("It should validate user's input", () => {
    it('It should return 401 for no Token', async () => {
      const res = await chai.request(server)
        .post(route)
        .send(valid);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for invalid token', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', '65e65jhvjhvjvj67')
        .send(valid);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for non permitted roles', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${notPermittedToken}`)
        .send(valid);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if no arrival date was given', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(noLodgeInDate);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if no departure date was given', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(noLodgeOutDate);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if departure date is invalid', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(invalidLodgeOutDate);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if arrival date is invalid', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(invalidLodgeInDate);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if arrival date is earlier than trip date', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(expiredLodgeInDate);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if no trip date is given', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(noBookingTripDate);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if invalid trip date is given', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(invalidBookingTripDate);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
  });


  describe('Book an Accomodation', async () => {
    it('It should book an accommodation', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(validAccommodationBooking);

      assert.equal(201, res.status);
      assert.isObject(res.body.data);
      assert.equal(res.body.success, true);
    });
    it('It should return a 403 error if user has no active request', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(validAccommodationBooking);

      assert.equal(404, res.status);
      assert.equal(res.body.success, false);
    });
  });
});
