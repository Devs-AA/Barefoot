import dotenv from 'dotenv';
import Mail from './Mail';
import { resetPasswwordTemplate } from './template/resetPassword';
import { signUpResetPasswordTemplate } from './template/signupResetPassword';
import { newRequestNotification } from './template/notification'

dotenv.config();

const { env } = process;
const CLIENT_URL = env.NODE_ENV === 'test' || 'development' ? `http://localhost:${env.PORT}/api/v1` : env.CLIENT_URL;
const expiry = parseInt(process.env.TOKENEXPIRY / 60 / 60) || 3;

const sendResetMail = async (user, resetToken) => {
  const msgBody = {
    user, resetToken, expiry, CLIENT_URL
  };
  const msg = resetPasswwordTemplate(msgBody);
  const emailDetails = { Subject: 'Reset Password', Recipient: user.email };

  try {
    const sendMailResponse = await new Mail(emailDetails, msg).main();
    if (sendMailResponse.message) {
      return false;
    }
    if (sendMailResponse) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const sendSignupMail = async (email) => {
  const msg = signUpResetPasswordTemplate();
  const emailDetails = { Subject: 'Sign up on Barefoot Nomad', Recipient: email };
  try {
    const sendMailResponse = await new Mail(emailDetails, msg).main();

    if (sendMailResponse.message) {
      return false;
    }
    if (sendMailResponse) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const newRequestNotificationMail = async (email, message) => {
  // const message = 'Hello, your direct report has made a new travel request. The request is awaiting your decision'
  const html = newRequestNotification(message);
  const emailDetails = {
    Subject: 'New Travel Request',
    Recipient: email
  }
  try {
    const sendMailResponse = await new Mail(emailDetails, html).main();

    if (sendMailResponse.message) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
export { sendResetMail, sendSignupMail };
