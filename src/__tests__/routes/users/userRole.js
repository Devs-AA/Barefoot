import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import models from '../../../models';
import {
  unauthorizedToken, authorizedToken, validInfoRole, unauthorisedRoleUser, invalidInfoRole1,
  invalidInfoRole2, invalidInfoRole3, users, roles
} from '../../../__mocks__/userRoles';


chai.use(chaiHttp);

const { assert } = chai;

describe('User Role Setting', () => {
  before(async () => {
    const {
      superAdmin, travelAdmin, travelTeamMember, manager, requester
    } = roles;
    await models.users.sync({ force: true });
    await models.roles.sync({ force: true });
    await models.users.bulkCreate([users.superAdmin, users.nonadmin]);
    await models.roles.bulkCreate([superAdmin, travelAdmin, travelTeamMember, manager, requester]);
  });
  after(async () => {
    await models.users.destroy({ where: {} });
    await models.roles.destroy({ where: {} });
  });
  describe('Set User Role', () => {
    it('Should return an error for unauthorised users', async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/users/roles')
        .set('authorization', unauthorizedToken)
        .send(unauthorisedRoleUser);

      assert.equal(res.status, 401, 'Should return 401 for unauthorized users');
      assert.equal(res.body.success, false, 'Should equal false');
    });

    it('Should return an error for missing role field', async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/users/roles')
        .set('authorization', authorizedToken)
        .send(invalidInfoRole2);

      assert.equal(
        res.status,
        400,
        'Should return 401 for invalid Role Id input'
      );
      assert.equal(res.body.success, false, 'Should equal error');
    });

    it('Should return an error for missing email field', async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/users/roles')
        .set('authorization', authorizedToken)
        .send(invalidInfoRole1);
      assert.equal(
        res.status,
        400,
        'Should return 400 for invalid email input'
      );
      assert.equal(res.body.success, false, 'Should equal error');
    });

    it("Should return an error if email doesn't exist in database", async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/users/roles')
        .set('authorization', authorizedToken)
        .send(invalidInfoRole3);

      assert.equal(res.status, 404, 'Should return 404 if email does not exist');
      assert.equal(res.body.success, false, 'Should equal error');
    });

    it("Should update user's roleId", async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/users/roles')
        .set('authorization', authorizedToken)
        .send(validInfoRole);

      assert.equal(
        res.status,
        200,
        'Should return 200 status for successfully operation'
      );
      assert.equal(res.body.status, 'success', 'Should equal false');
      assert.equal(
        res.body.data.roleId,
        validInfoRole.roleId,
        'Should return the updated role ID'
      );
      assert.equal(
        res.body.data.email,
        validInfoRole.email,
        'The user with the given email should be updated and returned'
      );
    });

    it('Should return an error if Super Admin tries to change his/her role', async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/users/roles')
        .set('authorization', authorizedToken)
        .send({ email: 'aniefioka@gmail.com', roleId: 2 });

      assert.equal(
        res.status,
        403,
        'Should return 403 status'
      );
      assert.equal(res.body.success, false, 'Should equal false');
      assert.equal(
        res.body.message,
        'You are not allowed to perform this operation',
      );
    });

    it('Should return an error user already belongs to the role', async () => {
      const res = await chai
        .request(server)
        .patch('/api/v1/users/roles')
        .set('authorization', authorizedToken)
        .send(validInfoRole);

      assert.equal(
        res.status,
        409,
        'Should return 409 status'
      );
      assert.equal(res.body.success, false, 'Should equal success');
      assert.isNotNull(
        res.body.message,
        'Should return an error message'
      );
    });
  });
});
