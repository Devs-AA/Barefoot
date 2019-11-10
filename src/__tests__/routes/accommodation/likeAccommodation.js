import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import models from '../../../models';
import {
  users, destinations, login, departments
} from '../../../__mocks__/createRequest';
import { valid } from '../../../__mocks__/accommodations';
import Request from '../../../services/requestService';
import Booking from '../../../services/accommodationBooking';


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
      await models.likes.sync({ force: true });
      await models.unlikes.sync({ force: true });
      await models.users.bulkCreate(users);
      await models.destinations.bulkCreate(destinations);
      await models.departments.bulkCreate(departments);
      await models.logins.bulkCreate(login);
      await models.accommodations.create(valid);
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
      const acc = {
        noOfTimesVisited: 1,
        id: 1
      };
      await Booking.create({
        tripDate: '2017/09/08',
        lodgeInDate: '2019/09/09',
        lodgeOutDate: '2019/09/09',
        requesterId: 3,
        accommodationId: 1
      }, acc, 1);
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
      await models.likes.destroy({ where: {} });
      await models.unlikes.destroy({ where: {} });
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
        .patch(route)
        .send({});

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for invalid token', async () => {
      const res = await chai.request(server)
        .patch(route)
        .set('authorization', '65e65jhvjhvjvj67')
        .send({});

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 for invalid accommodation id', async () => {
      const res = await chai.request(server)
        .patch('/api/v1/accommodations/j')
        .set('authorization', `Bearer ${permittedToken}`)
        .send({ unlike: true });

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 404 if accommodation does not exist', async () => {
      const res = await chai.request(server)
        .patch('/api/v1/accommodations/200')
        .set('authorization', `Bearer ${permittedToken}`)
        .send({ like: true });

      assert.equal(404, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for non permitted roles', async () => {
      const res = await chai.request(server)
        .patch(route)
        .set('authorization', `Bearer ${notPermittedToken}`)
        .send({});

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if like/unlike is not provided', async () => {
      const res = await chai.request(server)
        .patch(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send({});

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if like/unlike is not Boolean', async () => {
      const res = await chai.request(server)
        .patch(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send({ like: 33 });

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 403 if user did not book that accommodation', async () => {
      const res = await chai.request(server)
        .patch('/api/v1/accommodations/2')
        .set('authorization', `Bearer ${permittedToken}`)
        .send({ like: true });

      assert.equal(403, res.status);
      assert.equal(res.body.success, false);
    });
  });


  describe('Like / Unlike an Accomodation', async () => {
    it('It should like an accommodation', async () => {
      const res = await chai.request(server)
        .patch(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send({ like: true });

      assert.equal(201, res.status);
      assert.isObject(res.body.data);
      assert.equal(res.body.success, true);
    });

    it('It should return a 403 error if user has already liked the accommodation', async () => {
      const res = await chai.request(server)
        .patch(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send({ like: true });

      assert.equal(403, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should unlike an accommodation', async () => {
      const res = await chai.request(server)
        .patch(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send({ like: false });

      assert.equal(201, res.status);
      assert.isObject(res.body.data);
      assert.equal(res.body.success, true);
    });

    it('It should return a 403 error if user has already unliked the accommodation', async () => {
      const res = await chai.request(server)
        .patch(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send({ like: false });

      assert.equal(403, res.status);
      assert.equal(res.body.success, false);
    });
  });
});
