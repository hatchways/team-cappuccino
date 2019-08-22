const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(keys.SENDGRID_API_KEY);

const sendSignUpConfirmation = (to, name) => {
  const msgContents = {
    to: to,
    from: "test@test.com",
    templateId: "d-727112fa5df44fc0b44f17f5832f7a91",
    dynamic_template_data: {
      name: name
    }
  };
  sgMail.send(msgContents);
};

module.exports.sendSignUpConfirmation = sendSignUpConfirmation;
