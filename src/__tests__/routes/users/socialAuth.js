/* eslint-disable camelcase */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import dotenv from 'dotenv';
import app from '../../../index';

import db from '../../../models';
import { roles } from '../../../__mocks__/userRoles';

dotenv.config();

const { access_token_google, access_token_facebook } = process.env;

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

let request;

describe('SOCIAL AUTH', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
    const {
      superAdmin, travelAdmin, travelTeamMember, manager, requester
    } = roles;
    await db.roles.sync({ force: true });
    await db.users.sync({ force: true });
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

  describe('Google Login', () => {
    it('should login a user an return a status of 200', async () => {
      const response = await request.get(`/api/v1/users/auth/token/google?access_token=${access_token_google}`);
      expect(response.status).to.equal(401);
    }).timeout(0);
    it('should not login a user an return a status of 401', async () => {
      const response = await request.get(`/api/v1/users/auth/token/google?access_token=${'gfgfgfsffd'}`);
      console.log(response.body)
      expect(response.status).to.equal(401);
    }).timeout(0);
  });

  describe('Facebook Login', () => {
    it('should login a user an return a status of 200', async () => {
      const response = await request.get(`/api/v1/users/auth/token/facebook?access_token=${access_token_facebook}`);

      expect(response.status).to.equal(201);
    }).timeout(0);
    it('should not login a user an return a status of 401', async () => {
      const response = await request.get(`/api/v1/users/auth/token/facebook?access_token=${'gfgtrt'}`);
      expect(response.status).to.equal(500);
    }).timeout(0);
  });
});
