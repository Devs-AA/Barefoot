import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import models from '../../../models';
import comment from '../../../__mocks__/comment';
import {
  users, departments, login
} from '../../../__mocks__/createRequest';

chai.use(chaiHttp);

const { assert } = chai;
const route = '/api/v1/requests/1/comments';

describe('CREATE COMMENTS', () => {
  let requesterToken, managerToken, randomToken;
  before(async () => {
    const request = {
      reason: 'Meeting',
      tripType: 'return',
      departmentId: 1,
      managerId: 1,
      requesterId: 3,
      status: 'open'
    };
    const request2 = {
      reason: 'Meeting',
      tripType: 'return',
      departmentId: 1,
      managerId: 1,
      requesterId: 3,
      status: 'approved'
    };
    try {
      await models.users.sync({ force: true });
      await models.logins.sync({ force: true });
      await models.departments.sync({ force: true });
      await models.requests.sync({ force: true });
      await models.comments.sync({ force: true });
      await models.users.bulkCreate(users);
      await models.departments.bulkCreate(departments);
      await models.logins.bulkCreate(login);
      await models.requests.create(request);
      await models.requests.create(request2);
      (({ body: { token: requesterToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'requester1@gmail.com', password: 'Password1$' })));
      (({ body: { token: managerToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'barefoot1@gmail.com', password: 'Password1$' })));
      (({ body: { token: randomToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'requester2@gmail.com', password: 'Password1$' })));
    } catch (error) {
      console.log(error);
    }
  });
  after(async () => {
    await models.requests.destroy({ where: {} });
    await models.comments.destroy({ where: {} });
    await models.departments.destroy({ where: {} });
    await models.logins.destroy({ where: {} });
    await models.users.destroy({ where: {} });
  });

  describe('It should validate Token', () => {
    it('It should return 401 for no Token', async () => {
      const res = await chai.request(server)
        .post(route)
        .send(comment.valid);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for invalid token', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', '65e65jhvjhvjvj67')
        .send(comment.valid);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for non permitted roles', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${randomToken}`)
        .send(comment.valid);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
  });

  describe("It should Validate user's input", () => {
    it('It should return 400 if req body is empty', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${requesterToken}`)
        .send();
      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });

    it('It should return 400 if no message is given', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${requesterToken}`)
        .send(comment.noMessage);
      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });

    it('It should return 400 for invalid quoted comment Id', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${requesterToken}`)
        .send(comment.invalidQuote);
      assert.equal(400, res.status);
      assert.equal(res.body.success, false);
    });

    it('It should return 401 if user is not owner of the request or manager of the requester', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${randomToken}`)
        .send(comment.valid);
      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });

    it('It should return 404 if request does not exist', async () => {
      const res = await chai.request(server)
        .post('/api/v1/requests/10/comments')
        .set('authorization', `Bearer ${requesterToken}`)
        .send(comment.valid);

      assert.equal(404, res.status);
      assert.equal(res.body.success, false);
    });

    it('It should return 404 if request does not exist', async () => {
      const res = await chai.request(server)
        .post('/api/v1/requests/2/comments')
        .set('authorization', `Bearer ${requesterToken}`)
        .send(comment.valid);

      assert.equal(403, res.status);
      assert.equal(res.body.success, false);
    });
  });

  describe('It should Create a Comment', () => {
    it('It should return 201 for creating new comment for a requester', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${requesterToken}`)
        .send(comment.valid);

      assert.equal(201, res.status);
      assert.equal(res.body.success, true);
    });

    it('It should be able to quote a comment', async () => {
      const res = await chai.request(server)
        .post(route)
        .set('authorization', `Bearer ${managerToken}`)
        .send({ ...comment.valid, quotedCommentId: 1 });

      assert.equal(201, res.status);
      assert.equal(res.body.success, true);
      assert.isNumber(res.body.data.quotedCommentId);
    });
  });
});
