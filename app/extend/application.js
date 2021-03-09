'use strict';
const nodemailer = require('nodemailer');

module.exports = {
  initMultipartMailer(config) {
    const mailer = nodemailer.createTransport(config);

    mailer.send = async (data, callback) => {
      const defaultData = Object.assign(
        {},
        {
          from: config.mailer && config.mailer.auth && config.mailer.auth.user,
        },
        data
      );

      if (Array.isArray(defaultData.to)) {
        defaultData.to = defaultData.to.join();
      }

      if (typeof callback === 'function') {
        mailer.sendMail(defaultData, callback);
        return;
      }

      return new Promise((resolve, reject) => {
        mailer.sendMail(defaultData, function(err, info) {
          if (err) {
            reject(err);
          }
          resolve(info);
        });
      });
    };

    return mailer;
  },
};
