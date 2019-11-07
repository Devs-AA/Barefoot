import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import models from '../../../models';
import {
  users, destinations, login, departments
} from '../../../__mocks__/createRequest';
import {
  valid, validRating, noRating, invalidRating, invalidMessage, outOfRangeRating
} from '../../../__mocks__/accommodations';
import Request from '../../../services/requestService';
import Booking from '../../../services/accommodationBooking';


chai.use(chaiHttp);

const { assert } = chai;
const route = '/api/v1/accommodations/1/feedback';

describe('Book accommodation', () => {
  let permittedToken, notPermittedToken, noBookingToken;
  before(async () => {
    try {
      await models.users.sync({ force: true });
      await models.departments.sync({ force: true });
      await models.logins.sync({ force: true });
      await models.destinations.sync({ force: true });
      await models.requests.sync({ force: true });
      await models.accommodations.sync({ force: true });
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
      await Booking.create({
        tripDate: '2017/09/08',
        lodgeInDate: '2019/09/09',
        lodgeOutDate: '2019/09/09',
        requesterId: 3,
        accommodationId: 1
      })(({ body: { token: permittedToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'requester1@gmail.com', password: 'Password1$' })));
      (({ body: { token: notPermittedToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'abc123@gmail.com', password: 'Password1$' })));
      (({ body: { token: noBookingToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'requester2@gmail.com', password: 'Password1$' })));
    } catch (error) {
      console.log(error);
    }
  });
  after(async () => {
    try {
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
        .send(validRating);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for invalid token', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', '65e65jhvjhvjvj67')
        .send(validRating);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for non permitted roles', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${notPermittedToken}`)
        .send(validRating);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if rating is not provided', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(noRating);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if rating is not a number', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(invalidRating);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if rating is less than 1 and greater than 5', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(outOfRangeRating);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if no message is not a string', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(invalidMessage);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 403 if user did not book that accommodation', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${noBookingToken}`)
        .send(validRating);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
  });


  describe('Rate an Accomodation', async () => {
    it('It should rate and give feedback for an accommodation', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(validRating);

      assert.equal(201, res.status);
      assert.isObject(res.body.data);
      assert.equal(res.body.success, true);
    });

    it('It should rturn a 403 error if user has already rated the accommodation', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(validRating);

      assert.equal(201, res.status);
      assert.isObject(res.body.data);
      assert.equal(res.body.success, true);
    });
  });
});
