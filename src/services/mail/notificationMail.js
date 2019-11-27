import { CLIENT_URL } from './resetMail';
import Mail from './Mail';
import { newRequestNotification } from './template/notification';

// eslint-disable-next-line import/prefer-default-export
export const newRequestNotificationMail = async (email, message) => {
  const html = newRequestNotification(message, CLIENT_URL);
  const emailDetails = {
    Subject: 'New Travel Request',
    Recipient: email
  };
  try {
    const sendMailResponse = await new Mail(emailDetails, html).main();
    if (sendMailResponse.message) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
};
