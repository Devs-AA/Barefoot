
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @class
 * @description Class based Mail for sending emails and formating as well
 * @param {object} emailDetails The Email details such as subject and recipients.
 * @param {string} html content to be rendered.
 */
class Mail {
  /**
 * @param {object} emailDetails The Email details such as subject and recipients.
 * @param {string} html content to be rendered.
 */
  constructor(emailDetails, html) {
    this.subject = emailDetails.Subject;
    this.recipient = emailDetails.Recipient;
    this.content = html;
    this.Recipients = this.formatRecipients();
  }

  /**
 *  When sending to multiple users.
 * @returns { array } An array of all users emails after it has been trimmed
 */
  formatRecipients() {
    const array = this.recipient.split(',');
    array.map((el) => el.trim());
    return array;
  }

  /**
 *  When sending to multiple users.
 * @returns { object } It returns either an object which
 *  contain either a success or failure mail response
 */
  async main() {
    const { subject, recipient, content } = this;
    // create reusable transporter object using the default SMTP transport
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const transporter = nodemailer.createTransport({
      service: process.env.LAYER,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });


    const mailOptions = {
      from: `"BareFoot" <${process.env.EMAIL}>`,
      to: recipient,
      subject,
      html: content,
    };

    try {
      const response = await transporter.sendMail(mailOptions);

      return response;
    } catch (error) {
      return error;
    }
  }
}


export default Mail;
