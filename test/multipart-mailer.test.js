'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/multipart-mailer.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/multipart-mailer-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should send email', async () => {
    try {
      const emailConf = {
        // host: "smtp.ethereal.email",
        service: 'qq',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'xxx@qq.com', // generated ethereal user //把这几个值修改下就可以测试
          pass: 'tzwkksppnvrjbbaj',//把这几个值修改下就可以测试
        },
      };
      const ctx = app.mockContext();
      const mailer = ctx.app.initMultipartMailer(emailConf);
      // sync
      await mailer.send({
        from: 'xxx@qq.com', // sender address, [options] default to user//把这几个值修改下就可以测试
        // // Array => ['bar@example.com', 'baz@example.com']//把这几个值修改下就可以测试
        to: 'xxx@163.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
      });
      assert(true);
    } catch (error) {
      console.log({ error });
      assert(false);
    }
  });
});
