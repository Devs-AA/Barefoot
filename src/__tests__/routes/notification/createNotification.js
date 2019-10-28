import { assert } from 'chai';
import sinon from 'sinon';
import models from '../../../models';
import { users } from '../../../__mocks__/createRequest';
import Notification from '../../../services/notificationService';

describe('', () => {
  before(async () => {
    try {
      await models.users.sync({ force: true });
      await models.notifications.sync({ force: true });
      await models.users.bulkCreate(users);
    } catch (error) {
      console.log(error);
    }
  });
  after(async () => {
    await models.notifications.destroy({ where: {} });
    await models.users.destroy({ where: {} });
  });

  describe('Create Notification', async () => {
    let stubCreate;
    before(async () => {
      const result = {
        dataValues: { id: 1, title: 'Notification created' }
      };
      stubCreate = sinon.stub(models.notifications, 'create').returns(result);
    });
    after(async () => {
      stubCreate.restore();
    });
    it('Should successfully create notification', async () => {
      const newNotification = {
        title: 'New Travel Request',
        recipientId: 1,
        requestId: 1
      };
      const res = await Notification.create(newNotification);
      assert.isObject(res);
      assert.hasAllKeys(res, ['id', 'title']);
    });
  });

  describe('Should Throw an Error', async () => {
    let stubCreate;
    before(async () => {
      stubCreate = sinon.stub(Notification, 'create').throws('The error');
    });
    after(async () => {
      stubCreate.restore();
    });
    it('Throws error', async () => {
      const newNotification = {
        title: 'New Travel Request',
        recipientId: 1,
        requestId: 1
      };
      assert.throws(() => Notification.create(newNotification), Error);
    });
  });
});
