import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import moment from 'moment';
import app from '../../../index';
import db from '../../../models';
import { sendResetMail, sendSignupMail } from '../../../services/mail/resetMail';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const apiVersion = '/api/v1';
const forgotPasswordURL = `${apiVersion}/users/passwords/forgot`;
const resetPasswordURL = `${apiVersion}/users/passwords/reset`;
const validId = 2;
const resetToken = '12ererfbuib23iub328o7rg8hbiuva';

// Create table and seed database
const seedTestDb = async () => {
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

  await db.logins.create({
    email: 'youremail3@andela.com',
    password: 'password'
  });

  await db.logins.create({
    email: 'youremail4@andela.com',
    password: 'password'
  });

  await db.resets.create({
    email: 'youremail3@andela.com',
    expireTime: new Date(),
    resetToken: '$2a$10$Yc4fNidn3ih0Z0wRajFhq.AwneQLYR2RWWYQT7PGJdJj4UN1BGJ1K'
  });

  await db.resets.create({
    email: 'youremail4@andela.com',
    expireTime: moment
      .utc()
      .add(process.env.TOKENEXPIRY, 'seconds')
      .toLocaleString(),
    resetToken: '$2a$10$Yc4fNidn3ih0Z0wRajFhq.AwneQLYR2RWWYQT7PGJdJj4UN1BGJ1K2'
  });
};

// Clear tables of seed
const clearTestDb = async () => {
  try {
    await db.users.sync({ force: true });
    await db.logins.sync({ force: true });
    await db.logouts.sync({ force: true });
    await db.resets.sync({ force: true });
  } catch (err) {
    throw err;
  }
};

// clear database and seed data before test
before(async () => {
  try {
    await db.users.sync({ force: true });
    await db.logins.sync({ force: true });
    await db.logouts.sync({ force: true });
    await db.resets.sync({ force: true });
    await seedTestDb();
  } catch (err) {
    throw err;
  }
});

// clear database after test
after(async () => {
  try {
    await clearTestDb();
  } catch (err) {
    throw err;
  }
});

afterEach(() => sinon.restore());

describe('Forgot and Reset Password Test', () => {
  describe('Forgot Password Controller', () => {
    const newReset2 = {
      id: 2,
      email: 'youremail34@andela.com',
      resetToken: 'theResetToken'
    };

    it('should send signup mail to the email of a non user', async () => {
      const signupMailStub = sinon.stub(await sendSignupMail());
      chai
        .request(app)
        .post(`${forgotPasswordURL}`)
        .send({ email: newReset2.email })
        .end(async (err, res) => {
          expect(await signupMailStub.firstCall.args[0]).to.equal(newReset2.email);
          expect(res).to.have.status(200);
          expect(res.body.success).to.be.equal(true);
          expect(res.body.message).to.be.equal(
            'Check your mail for further instruction'
          );
        });
    });
  });

  describe('Reset Password Controller', () => {
    describe('POST /api/users/passwords/reset', () => {
      it('should not reset password if reset password link is invalid', (done) => {
        chai
          .request(app)
          .post(`${resetPasswordURL}/${validId}?token=${resetToken}`)
          .send({
            password: 'password10',
            confirmPassword: 'password10'
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.error.password).to.be.equal('Password is invalid');
            done();
          });
      });

      it('should return invalid reset token if user did not request password reset', (done) => {
        chai
          .request(app)
          .post(`${resetPasswordURL}/10?token=${resetToken}`)
          .send({
            password: 'password10',
            confirmPassword: 'password10'
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.error.password).to.be.equal('Password is invalid');
            done();
          });
      });
    });
  });
});