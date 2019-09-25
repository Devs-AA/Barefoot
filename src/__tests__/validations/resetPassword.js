import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

const apiVersion = '/api/v1';
const forgotPasswordURL = `${apiVersion}/users/passwords/forgot`;
const resetPasswordURL = `${apiVersion}/users/passwords/reset`;
const validId = 2;
const resetToken = '12ererfbuib23iub328o7rg8hbiuva';

describe('Email and Password validations', () => {
  describe('POST /api/users/passwords/forgot', () => {
    it('should not generate reset link without an email of an existing user', (done) => {
      chai
        .request(app)
        .post(`${forgotPasswordURL}`)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.be.equal(false);
          expect(res.body.error.email).to.be.equal('Email is required');
          done();
        });
    });

    it('should not generate reset link without a valid email', (done) => {
      chai
        .request(app)
        .post(`${forgotPasswordURL}`)
        .send({ email: '123xyz' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.be.equal(false);
          expect(res.body.error.email).to.be.equal('Email is invalid');
          done();
        });
    });
  });

  describe('POST /api/users/passwords/reset', () => {
    it('should not reset password without new password from existing user', (done) => {
      chai
        .request(app)
        .post(`${resetPasswordURL}/${validId}?token=${resetToken}`)
        .send({ confirmPassword: '' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.be.equal(false);
          expect(res.body.error.password).to.be.equal('Password and Confirm password is required');
          done();
        });
    });

    it('should not reset password without valid password', (done) => {
      chai
        .request(app)
        .post(`${resetPasswordURL}/${validId}?token=${resetToken}`)
        .send({
          password: '1',
          confirmPassword: '1'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.be.equal(false);
          expect(res.body.error.password).to.be.equal('Password is invalid');
          done();
        });
    });

    it('should not reset password without confirm password', (done) => {
      chai
        .request(app)
        .post(`${resetPasswordURL}/${validId}?token=${resetToken}`)
        .send({
          password: '123456',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.success).to.be.equal(false);
          expect(res.body.error.password).to.be.equal('Password and Confirm password is required');
          done();
        });
    });

    it('should not reset password if passwords do not match', (done) => {
      chai
        .request(app)
        .post(`${resetPasswordURL}/${validId}?token=${resetToken}`)
        .send({
          password: 'password10',
          confirmPassword: 'password9'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.success).to.be.equal(false);
          expect(res.body.error.password).to.be.equal('Passwords must match');
          done();
        });
    });
  });
});
