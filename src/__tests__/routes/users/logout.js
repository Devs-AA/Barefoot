import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../../index';

import db from '../../../models';
import { roles } from '../../../__mocks__/userRoles';

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

let request;
let token;

describe('LOGOUT', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
    const {
      superAdmin, travelAdmin, travelTeamMember, manager, requester
    } = roles;
    await db.roles.sync({ force: true });
    await db.users.sync({ force: true });
    await db.logouts.sync({ force: true });
    await db.logins.sync({ force: true });
    await db.roles.bulkCreate([superAdmin, travelAdmin, travelTeamMember, manager, requester]);
  });

  afterEach(async () => {
    sinon.restore();
  });
  after(async () => {
    await db.logins.destroy({ where: {} });
    await db.users.destroy({ where: {} });
    await db.logouts.destroy({ where: {} });
    await db.roles.destroy({ where: {} });
  });

  describe('SIGN UP USER FIRST', () => {
    it('should sign up user first to get user credentials', async () => {
      const body = {
        user: {
          email: 'akps.i@yahoo.com',
          firstName: 'Aniefiok',
          lastName: 'Akpan',
          password: 'ADsd23$$'
        }
      };
      const response = await request.post('/api/v1/users/auth/register').send(body.user);
      token = response.body.data.token;

      expect(response.status).to.equal(201);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('LOGOUT USER', () => {
    it('should logout a user an return a status of 200', async () => {
      const tokenHeader = `Bearer ${token}`;
      const response = await request.delete('/api/v1/users/auth/logout')
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal('Successfully Logout');
    }).timeout(0);
  });

  describe('INVALIDTOKEN PLEASE SIGN IN AGAIN', () => {
    it('should return "Please login again, Your Session has expired" and a status of 200', async () => {
      const tokenHeader = `Bearer ${token}`;
      const response = await request.get('/api/v1/users/myaccount')
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(401);
      expect(response.body.success).to.equal(false);
      expect(response.body.message).to.equal('Please login again, Your Session has expired');
    }).timeout(0);
  });
});
