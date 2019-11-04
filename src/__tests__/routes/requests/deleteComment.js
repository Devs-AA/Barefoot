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
const route = '/api/v1/requests/1/comments/1';

describe('COMMENTS', () => {
  let requesterToken, randomToken, newComment;
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
      await models.comments.sync({ force: true });
      await models.users.bulkCreate(users);
      await models.departments.bulkCreate(departments);
      await models.logins.bulkCreate(login);
      await models.requests.create(request);
      (({ body: { token: requesterToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'requester1@gmail.com', password: 'Password1$' })));
      (({ body: { token: randomToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'requester2@gmail.com', password: 'Password1$' })));
      comment.valid.ownerId = 3;
      newComment = await models.comments.create(comment.valid);
    } catch (error) {
      console.log(error);
    }
  });
  after(async () => {
    await models.comments.destroy({ where: {} });
    await models.requests.destroy({ where: {} });
    await models.departments.destroy({ where: {} });
    await models.logins.destroy({ where: {} });
    await models.users.destroy({ where: {} });
  });

  describe('It should validate User', () => {
    it('It should return 401 for non permitted roles', async () => {
      const res = await chai.request(server)
        .delete(`${route}`)
        .set('authorization', `Bearer ${randomToken}`);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 if user is not owner of the request', async () => {
      const res = await chai.request(server)
        .delete(route)
        .set('authorization', `Bearer ${randomToken}`);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
  });

  describe('It should if comment exists', () => {
    it('It should return 404 if comment does not exist', async () => {
      const res = await chai.request(server)
        .delete('/api/v1/requests/1/comments/10')
        .set('authorization', `Bearer ${requesterToken}`);

      assert.equal(404, res.status);
      assert.equal(res.body.success, false);
    });
  });

  describe('It should delete a Comment', () => {
    it('It should return 200 if successuful', async () => {
      const res = await chai.request(server)
        .delete(`/api/v1/requests/1/comments/${newComment.dataValues.id}`)
        .set('authorization', `Bearer ${requesterToken}`);

      assert.equal(200, res.status);
      assert.equal(res.body.success, true);
    });
  });
});
