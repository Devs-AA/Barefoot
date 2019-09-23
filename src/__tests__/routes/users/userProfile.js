import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../../index';

import db from '../../../models';
import { roles } from '../../../__mocks__/userRoles';
import { invalidUserToken } from '../../../__mocks__/emailVerification'

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

let request;
let token;

describe('USER PROFILE', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
    const {
      superAdmin, travelAdmin, travelTeamMember, manager, requester
    } = roles;
    await db.roles.sync({ force: true });
    await db.users.sync({ force: true });
    await db.logins.sync({ force: true });
    await db.roles.bulkCreate([superAdmin, travelAdmin, travelTeamMember, manager, requester]);
  });

  afterEach(async () => {
    sinon.restore();
  });
  after(async () => {
    await db.logins.destroy({ where: {} });
    await db.users.destroy({ where: {} });
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
      const response = await request.post(`/api/v1/users/auth/register`).send(body.user);
      token = response.body.data.token;

      expect(response.status).to.equal(201);
      expect(response.body).to.be.a('object');
    }).timeout(0)
  })

  describe('GET USER PROFILE', () => {
    it('should get user profile with a status of 200', async () => {
      const tokenHeader = `Bearer ${token}`
      const response = await request.get(`/api/v1/users/profile`)
        .set('Authorization', tokenHeader)
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      expect(response.body.message).to.equal('Succesfully found user');
    }).timeout(0)
  });

  describe('GET USER PROFILE', () => {
    it('should throw user not found error', async () => {
      const tokenHeader = `Bearer ${invalidUserToken}`
      const response = await request.get(`/api/v1/users/profile`)
        .set('Authorization', tokenHeader)
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal('User not found');
    }).timeout(0)
  });

  describe('PATCH USER PROFILE', () => {
    it('should update user profile', async () => {
      const body = {
        firstName: 'Adewale',
        lastName: 'Olaoye',
        department: 'Mathematics'
      };
      const tokenHeader = `Bearer ${token}`
      const response = await request.patch(`/api/v1/users/profile`).send(body)
        .set('Authorization', tokenHeader)
      expect(response.status).to.equal(201);
      expect(response.body.status).to.equal('success');
      expect(response.body.message).to.equal('You ve successfully updated your profile');
    }).timeout(0)
  });

  describe('PATCH USER PROFILE', () => {
    it('should validate user details', async () => {
      const body = {
        firstName: 'a',
        lastName: 'Olaoye'
      };
      const tokenHeader = `Bearer ${token}`
      const response = await request.patch(`/api/v1/users/profile`).send(body)
        .set('Authorization', tokenHeader)
      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal('error');
      expect(response.body.message[0]).to.equal('firstName length must be at least 2 characters long');
    }).timeout(0)
  });

  describe('PATCH USER PROFILE', () => {
    it('should throw user not found error', async () => {
      const tokenHeader = `Bearer ${invalidUserToken}`
      const response = await request.patch(`/api/v1/users/profile`)
        .set('Authorization', tokenHeader)
      expect(response.status).to.equal(401);
      expect(response.body.status).to.equal('error');
      expect(response.body.message).to.equal('User not found');
    }).timeout(0)
  });
});
