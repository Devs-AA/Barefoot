import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import models from '../../../models';
import {
  users, destinations, login
} from '../../../__mocks__/createRequest';
import {
  valid, noName, noAddress, noDescription, noDestinationId, noNumberOfRooms,
  noPrice, nonExistentDestination, invalidAddOn, invalidAddress, invalidDescription,
  invalidDestinationId, invalidName, invalidNumberOfRooms, invalidPrice
} from '../../../__mocks__/accommodations';


chai.use(chaiHttp);

const { assert } = chai;
const route = '/api/v1/accommodations';

describe('Accommodations', () => {
  let permittedToken, notPermittedToken;
  before(async () => {
    try {
      await models.users.sync({ force: true });
      await models.logins.sync({ force: true });
      await models.destinations.sync({ force: true });
      await models.users.bulkCreate(users);
      await models.departments.bulkCreate(destinations);
      await models.logins.bulkCreate(login);
      (({ body: { token: notPermittedToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'requester1@gmail.com', password: 'Password1$' })));
      (({ body: { token: permittedToken } } = await chai.request(server)
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
    it('It should return 400 if no name is given', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(noName);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if name is invalid', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(invalidName);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if number of rooms is not given', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(noNumberOfRooms);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if number of rooms is invalid', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(invalidNumberOfRooms);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if no description is given', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(noDescription);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if description is invalid', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(invalidDescription);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if no price is given', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(noPrice);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if price is invalid', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(invalidPrice);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if no destination id is given', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(noDestinationId);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if destination id is invalid', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(invalidDestinationId);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 404 if destination does not exist', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(nonExistentDestination);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if no address is given', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(noAddress);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if address is invalid', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(invalidAddress);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 400 if add on services is invalid', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(invalidAddOn);

      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });
  });


  describe('Create new Accomodation', async () => {
    it('It should create a new accommodation', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${permittedToken}`)
        .send(valid);

      assert.equal(201, res.status);
      assert.isObject(res.body.data);
      assert.equal(res.body.success, true);
    });
  });
});
