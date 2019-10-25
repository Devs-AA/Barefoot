import { assert } from 'chai';
import Mailer from 'nodemailer';
import sinon from 'sinon';
import { newRequestNotification } from '../../../services/mail/template/notification';
import { newRequestNotificationMail } from '../../../services/mail/notificationMail';

describe('Notifications', async () => {
  describe('It should Send Email Notification', () => {
    let stubbedMailer;
    beforeEach(() => {
      const a = {
        sendMail: () => '',
      };
      stubbedMailer = sinon.stub(Mailer, 'createTransport').returns(a);
    });

    afterEach(() => {
      stubbedMailer.restore();
    });
    it('Should generate html template for new request email notification', async () => {
      const htmlTemplate = newRequestNotification('Message', 'Url');
      assert.isString(htmlTemplate);
    });

    it('Should send email notification', async () => {
      const res = await newRequestNotificationMail('asd@gmail.com', 'url');
      assert.equal(res, true);
    });
  });

  describe('It should Send Email Notification', () => {
    let stubbedMailer;
    beforeEach(() => {
      const message = {
        message: 'No internet connection'
      };
      const a = {
        sendMail: () => message,
      };
      stubbedMailer = sinon.stub(Mailer, 'createTransport').returns(a);
    });

    afterEach(() => {
      stubbedMailer.restore();
    });
    it('Should not send email notification if no internet connection', async () => {
      const res = await newRequestNotificationMail('asd@gmail.com', 'url');
      assert.equal(res, false);
    });
  });
});
