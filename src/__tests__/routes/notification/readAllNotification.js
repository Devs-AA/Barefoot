import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../models';
import server from '../../../index';
import { users } from '../../../__mocks__/createRequest';
import Notification from '../../../services/notificationService';

chai.use(chaiHttp);

const route = '/api/v1/notifucations';

describe('Read Notification', () => {
  let requesterToken, randomToken;
  before(async () => {
    try {
      await models.users.sync({ force: true });
      await models.notifications.sync({ force: true });
      await models.users.bulkCreate(users);
      (({ body: { token: requesterToken } } = await chai.request(server)
        .get('/api/v1/users/auth/login')
        .send({ email: 'requester1@gmail.com', password: 'Password1$' })));
      (({ body: { token: randomToken } } = await chai.request(server)
        .get('/api/v1/users/auth/login')
        .send({ email: 'requester2@gmail.com', password: 'Password1$' })));
      const notifications = [{
        title: 'New Travel Request',
        recipientId: 1,
        requestId: 1
      }, {
        title: 'New Travel Request',
        recipientId: 1,
        requestId: 1
      }];
      await notifications.forEach(async (notification) => {
        await Notification.create(notification);
      });
    } catch (error) {
      console.log(error);
    }
  });
  after(async () => {
    await models.notifications.destroy({ where: {} });
    await models.users.destroy({ where: {} });
  });

  describe('Read Notification', async () => {
    it('It should return 401 for no Token', async () => {
      const res = await chai.request(server)
        .get(route);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for invalid token', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', '65e65jhvjhvjvj67');

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('It should return 401 for non permitted roles', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${randomToken}`);

      assert.equal(401, res.status);
      assert.equal(res.body.success, false);
    });
    it('Should successfully mark all notifications as read', async () => {
      const res = await chai.request(server)
        .get(route)
        .set('authorization', `Bearer ${requesterToken}`);
      assert.equal(200, res.status);
      res.body.data.forEach(({ isRead, recipientId }) => {
        assert.isTrue(isRead);
        assert.equal(3, recipientId);
      });
    });
  });
});
