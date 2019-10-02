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

describe('SAVE PROFILE', () => {
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

  describe('PATCH USER  SAVEPROFILE', () => {
    it('should update user saveProfile with a status of 200', async () => {
      const tokenHeader = `Bearer ${token}`;
      const body = {
        saveProfile: 'true'
      };
      const response = await request.patch('/api/v1/users/toggle/saveprofile').send(body)
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal('Profile setting has been saved');
    }).timeout(0);

    it('should update user saveProfile with a status of 409', async () => {
      const tokenHeader = `Bearer ${token}`;
      const body = {
        saveProfile: 'true'
      };
      const response = await request.patch('/api/v1/users/toggle/saveprofile').send(body)
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(409);
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal('You have already updated your profile');
    }).timeout(0);

    it('should update user saveProfile with a status of 200', async () => {
      const tokenHeader = `Bearer ${token}`;
      const body = {
        saveProfile: 'false'
      };
      const response = await request.patch('/api/v1/users/toggle/saveprofile').send(body)
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal('Profile setting has been saved');
    }).timeout(0);

    it('should update user saveProfile with a status of 200', async () => {
      const tokenHeader = `Bearer ${token}`;

      const response = await request.get('/api/v1/users/saveprofile')
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(403);
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal('You are yet to toggle the saveProfile radio button');
    }).timeout(0);

    it('should update user saveProfile with a status of 200', async () => {
      const tokenHeader = `Bearer ${token}`;
      const body = {
        saveProfile: 'true'
      };
      const response = await request.patch('/api/v1/users/toggle/saveprofile').send(body)
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal('Profile setting has been saved');
    }).timeout(0);

    it('should not update user saveProfile with a status of 403', async () => {
      const tokenHeader = `Bearer ${token}`;
      const body = {
        saveProfile: 'falsen'
      };
      const response = await request.patch('/api/v1/users/toggle/saveprofile').send(body)
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(403);
      expect(response.body.success).to.equal(false);
      expect(response.body.message).to.equal('saveProfile values can only be true or false');
    }).timeout(0);

    it('should get user saveProfile with a status of 200', async () => {
      const tokenHeader = `Bearer ${token}`;

      const response = await request.get('/api/v1/users/saveprofile')
        .set('Authorization', tokenHeader);
      expect(response.status).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal('Profile successfully retrieved');
    }).timeout(0);
  });
});
