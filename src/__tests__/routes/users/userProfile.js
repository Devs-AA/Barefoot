import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../../index';

import db from '../../../models';
import { roles } from '../../../__mocks__/userRoles';
import { invalidUserToken } from '../../../__mocks__/emailVerification';

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

let request;
let token;

describe('USER PROFILE', () => {
  // seed data to department table
  const seedDepartmentDb = async () => {
    await db.departments.create({
      id: 1,
      name: 'IT',
      managerId: 5
    });
    await db.departments.create({
      id: 2,
      name: 'ACCOUNTS',
      managerId: 6
    });
    await db.departments.create({
      id: 3,
      name: 'ADMINISTARTION',
      managerId: 7
    });
    await db.departments.create({
      id: 4,
      name: 'HUMAN RESOURCE',
      managerId: 8
    });
  };
  // seed data to user table
  const seedUserDb = async () => {
    await db.users.create({
      firstName: 'futhermaths',
      lastName: 'Physics',
      email: 'youremail1@andela.com',
      roleId: 5
    });
    await db.users.create({
      firstName: 'futhermaths',
      lastName: 'Physics',
      email: 'youremail2@andela.com',
      roleId: 5
    });
    await db.users.create({
      firstName: 'futhermaths',
      lastName: 'Physics',
      email: 'youremail3@andela.com',
      roleId: 5
    });
    await db.users.create({
      firstName: 'futhermaths',
      lastName: 'Physics',
      email: 'youremail4@andela.com',
      roleId: 5
    });
    await db.users.create({
      firstName: 'futhermaths',
      lastName: 'Physics',
      email: 'youremail5@andela.com',
      roleId: 5
    });
    await db.users.create({
      firstName: 'futhermaths',
      lastName: 'Physics',
      email: 'youremail6@andela.com',
      roleId: 5
    });
    await db.users.create({
      firstName: 'futhermaths',
      lastName: 'Physics',
      email: 'youremail7@andela.com',
      roleId: 5
    });
    await db.users.create({
      firstName: 'futhermaths',
      lastName: 'Physics',
      email: 'youremail8@andela.com',
      roleId: 5
    });
  };

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
    await seedUserDb();
    await seedDepartmentDb();
  });

  afterEach(async () => {
    sinon.restore();
  });
  after(async () => {
    await db.logins.destroy({ where: {} });
    await db.users.destroy({ where: {} });
    await db.logouts.destroy({ where: {} });
    await db.roles.destroy({ where: {} });
    await db.departments.destroy({ where: {} });
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

  describe('GET USER PROFILE', () => {
    it('should get user profile with a status of 200', async () => {
      const tokenHeader = `Bearer ${token}`;
      const response = await request.get('/api/v1/users/profile')
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal('Succesfully found user');
    }).timeout(0);
  });

  describe('GET USER PROFILE', () => {
    it('should throw user not found error', async () => {
      const tokenHeader = `Bearer ${invalidUserToken}`;
      const response = await request.get('/api/v1/users/profile')
        .set('authorization', tokenHeader);
      expect(response.status).to.equal(401);
      expect(response.body.success).to.equal(false);
      expect(response.body.message).to.equal('User not found');
    }).timeout(0);
  });

  describe('PATCH USER PROFILE', () => {
    it('should update user profile', async () => {
      const body = {
        firstName: 'Adewale',
        lastName: 'Olaoye',
      };
      const tokenHeader = `Bearer ${token}`;
      const response = await request.patch('/api/v1/users/profile').send(body)
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(201);
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal('You\'ve successfully updated your profile');
    }).timeout(0);

    it('should return 400 and not update user profile because department field contains alpaphet', async () => {
      const body = {
        firstName: 'Adewale',
        lastName: 'Olaoye',
        department: 'IT',
        departmentId: 'HF'

      };
      const tokenHeader = `Bearer ${token}`;
      const response = await request.patch('/api/v1/users/profile').send(body)
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(400);
      expect(response.body.success).to.equal(false);
      expect(response.body.message[0]).to.equal('Only digit are permitted departmentId');
    }).timeout(0);

    it('should return 403 and not update user profile because department does not match departmentId', async () => {
      const body = {
        firstName: 'Adewale',
        lastName: 'Olaoye',
        department: 'IT',
        departmentId: '2'

      };
      const tokenHeader = `Bearer ${token}`;
      const response = await request.patch('/api/v1/users/profile').send(body)
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(403);
      expect(response.body.success).to.equal(false);
      expect(response.body.message).to.equal('The department name does not exist for that departmentId, \n          please contact your company department');
    }).timeout(0);

    it('should return 201 and update user profile because department do match departmentId', async () => {
      const body = {
        firstName: 'Adewale',
        lastName: 'Olaoye',
        department: 'Accounts',
        departmentId: '2'

      };
      const tokenHeader = `Bearer ${token}`;
      const response = await request.patch('/api/v1/users/profile').send(body)
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(201);
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal('You\'ve successfully updated your profile');
    }).timeout(0);

    it('should return 400 and not update user profile because lineManager field contains alpaphet', async () => {
      const body = {
        firstName: 'Adewale',
        lastName: 'Olaoye',
        lineManager: 'GGF',
        departmentId: '2'
      };

      const tokenHeader = `Bearer ${token}`;
      const response = await request.patch('/api/v1/users/profile').send(body)
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(400);
      expect(response.body.success).to.equal(false);
      expect(response.body.message[0]).to.equal('Only digit are permitted lineManager');
    }).timeout(0);

    it('should return 403 and not update user profile because lineManager does not match departmentId', async () => {
      const body = {
        firstName: 'Adewale',
        lastName: 'Olaoye',
        lineManager: '7',
        departmentId: '2'
      };

      const tokenHeader = `Bearer ${token}`;
      const response = await request.patch('/api/v1/users/profile').send(body)
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(403);
      expect(response.body.success).to.equal(false);
      expect(response.body.message).to.equal('The lineManager id does not exist for that departmentId, \n          please contact your company department');
    }).timeout(0);

    it('should return 201 and update user profile because lineManager do match departmentId', async () => {
      const body = {
        firstName: 'Adewale',
        lastName: 'Olaoye',
        lineManager: '6',
        departmentId: '2'

      };
      const tokenHeader = `Bearer ${token}`;
      const response = await request.patch('/api/v1/users/profile').send(body)
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(201);
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal('You\'ve successfully updated your profile');
    }).timeout(0);
  });

  describe('PATCH USER PROFILE', () => {
    it('should validate user details', async () => {
      const body = {
        firstName: 'a',
        lastName: 'Olaoye'
      };
      const tokenHeader = `Bearer ${token}`;
      const response = await request.patch('/api/v1/users/profile').send(body)
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(400);
      expect(response.body.success).to.equal(false);
      expect(response.body.message[0]).to.equal('firstName length must be at least 2 characters long');
    }).timeout(0);
  });

  describe('PATCH USER PROFILE', () => {
    it('should throw user not found error', async () => {
      const tokenHeader = `Bearer ${invalidUserToken}`;
      const response = await request.patch('/api/v1/users/profile')
        .set('authorization', tokenHeader);
      expect(response.status).to.equal(401);
      expect(response.body.success).to.equal(false);
      expect(response.body.message).to.equal('User not found');
    }).timeout(0);
  });
});
