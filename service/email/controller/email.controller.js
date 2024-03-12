const util = require('../../../utils/response');
const message = require('../../../utils/messages.json');
const sendEmail = require('../../../config/sendEmail');

class EmailHandler {

  async emailSend(req, res) {

    let reqData = req.body;
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    try {
      if (typeof reqData.email == "undefined" || (typeof reqData.email != "undefined" && reqData.email == "")) {
        res.status(200).send(util.error(res, message.email_empty));
      } else if (!emailRegexp.test(reqData.email)) {
        res.status(200).send(util.error(res, message.invalid_email_format));

      } else {
        const sendOtp = await sendEmail(reqData.email, 'Welcome Email', `Hello,Welcome to our app`);
        res.send(util.success({}, message.email_success));
      }
    } catch (err) {
      console.log(err, "err")
      return res.send(util.error(res, message.something_went_wrong));
    }
  }

}

module.exports = new EmailHandler();