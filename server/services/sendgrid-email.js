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

const sendScrapping = (email, item, price) => {
  const msgContents = {
    to: email,
    from: "test@test.com",
    templateId: "d-1b13f858b1d545a29894dc00b83af967",
    dynamic_template_data: {
      item: item,
      price: price
    }
  };
  sgMail.send(msgContents);
}

module.exports = { sendSignUpConfirmation, sendScrapping };
