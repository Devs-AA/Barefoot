import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import models from '../../../models';
import { users, login } from '../../../__mocks__/createRequest';

chai.use(chaiHttp);
const { assert } = chai;

const route = '/api/v1//notifications/unsubscribe';
describe('Unsubscribe Email Notification', async () => {
  let requesterToken;
  before(async () => {
    try {
      await models.users.sync({ force: true });
      await models.logins.sync({ force: true });
      await models.users.bulkCreate(users);
      await models.logins.bulkCreate(login);
      (({ body: { token: requesterToken } } = await chai.request(server)
        .post('/api/v1/users/auth/login')
        .send({ email: 'requester1@gmail.com', password: 'Password1$' })));
    } catch (error) {
      console.log(error);
    }
  });
  after(async () => {
    await models.logins.destroy({ where: {} });
    await models.users.destroy({ where: {} });
  });
  it('Unsubscribes email notification for a user', async () => {
    const res = await chai.request(server)
      .patch(route)
      .set('authorization', `Bearer ${requesterToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'You have successfully unsubscribed from email notifications');
  });

  it('Should return an error for already unsubscribed users', async () => {
    const res = await chai.request(server)
      .patch(route)
      .set('authorization', `Bearer ${requesterToken}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.message, 'You already unsubscribed from email notification');
  });
});
