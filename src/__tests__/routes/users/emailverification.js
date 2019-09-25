import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../../index';
import { handleEmptyEmailBody } from '../../../middlewares/mail';
import emailverification from '../../../controllers/emailController';
import { emailVerifyToken } from '../../../utils/index';
import validation from '../../../helpers/validation';
import { idUnset, idWrong } from '../../../__mocks__/emailVerification';

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;
const { isValidEmail } = validation;

let request;
let tokenEmail;

describe('EMAIL ROUTE', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());


  describe('EMAIL VERIFICATION ROUTE', () => {
    it('should have a status of 200 when message is sent succesfully', async () => {
      const body = {
        email: 'akp.axcni@yahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan'
      };
      const response = await request.post('/api/v1/users/email/test').send(body);
      tokenEmail = response.body.data.token;
      expect(response.status).to.equal(200);
      expect(response.body).to.be.a('object');
    }).timeout(0);

    it('should have a status of 403 email is not present before sending', async () => {
      const response = await request.post('/api/v1/users/email/test');
      expect(response.status).to.equal(403);
      expect(response.body).to.be.a('object');
    }).timeout(0);

    it('should have a status of 403 when BODY is not present', async () => {
      const response = await request.post('/api/v1/users/email/test');
      expect(response.status).to.equal(403);
      expect(response.body).to.be.a('object');
    }).timeout(0);

    it('should have a status of 403 and a messsage of "Email, firstName and lastName is required"  when some body is not present', async () => {
      const body = {
        email: 'akp.acni@yahoo.com',
        firstName: 'Aniefiok',
        lastName: ''
      };
      const response = await request.post('/api/v1/users/email/test').send(body);
      expect(response.body.error).to.equal('Email, firstName and lastName is required');
      expect(response.status).to.equal(403);
      expect(response.body).to.be.a('object');
    }).timeout(0);

    it('should have a status of 403 and a messsage of "Please provide a valid email"  when some bemail is invalid', async () => {
      const body = {
        email: 'akp.aniyahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan'
      };
      const response = await request.post('/api/v1/users/email/test').send(body);
      expect(response.body.error).to.equal('Please provide a valid email');
      expect(response.status).to.equal(403);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('UTILS/ EMAIL TOKEN', () => {
    it('it should assign a token to newly registered users', async () => {
      const id = idUnset;
      const token = await emailVerifyToken(id);
      expect(token).to.equal(token);
    }).timeout(0);
  });

  describe('EMAIL TOKEN CONFIRMATION ROUTE', () => {
    it('should have a status of 400 when invalid token is sent as query string', async () => {
      const id = idWrong;
      const response = await request.get(`/api/v1/users/email/verify?id=${id}`);
      expect(response.status).to.equal(400);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('CONTROLLER RESPONSE', () => {
    it('fakes server success for email verification controller', async () => {
      const req = {
        body: {
          email: 'akp.anvfi@yahoo.com',
          firstName: 'Aniefiok',
          lastName: 'Akpan'
        },
        verificationMailResponse: null
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();

      await emailverification.signUp(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('fakes server response for email confirmation', async () => {
      const req = {
        url: tokenEmail
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();

      await emailverification.confirmEmailVerificaionToken(req, res);
      expect(res.status).to.have.been.calledWith(400);
    });

    it('should not send forgot mail if email service is not configured with right API key', () => {
      const req = {
        url: tokenEmail
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(res, 'json').returnsThis();

      handleEmptyEmailBody(req, res);
      expect(res.json).to.have.been.calledWith({ error: 'No body property is presented in the req object', status: 403 });
    });
  });
  describe('VALIDATION EMAIL VERIFICATION', () => {
    it('It checks if email is valid', async () => {
      const email = 'akp.ani@yahoo.com';
      const test = isValidEmail(email);
      expect(test).to.be.equal(true);
    });

    it('It checks if email is not valid', async () => {
      const email = 'akp.aniyahoo.com';
      const test = isValidEmail(email);
      expect(test).to.be.equal(false);
    });
  });
});
