# egg-multipart-mailer

[nodemailer](https://github.com/nodemailer/nodemailer) plugin for Egg.js.

可用于多个email发送实例插件;
可用于saas系统；
根据实时配置实例化发送邮件实例。

## Install

```bash
$ npm i egg-multipart-mailer --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.multipartMailer = {
  enable: true,
  package: 'egg-multipart-mailer',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
 不用配置，调用时才传入
exports.multipartMailer = {
};
```

see [nodemailer](https://nodemailer.com/about/) for more detail.

## Example
```js
// app/controller/home.js
class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    const config ={
              // host: "smtp.ethereal.email",
              service: "qq",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: testAccount.user, // generated ethereal user 
                pass: testAccount.pass  // generated ethereal password 如何获取这些密码。参考https://blog.csdn.net/qq_40571631/article/details/89206851
              }
            };
    const mailer = this.app.initMultipartMailer(config);
    // 注意下面的from的值要跟上面的cofig.auth.user的一样
    // sync
    await mailer.send({
      from: testAccount.user, // sender address
      // // Array => ['bar@example.com', 'baz@example.com']
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    });
    // async
    mailer.send({
      from: testAccount.user,
      // Array => ['bar@example.com', 'baz@example.com']
      to: "bar@example.com, baz@example.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>"
    }, function (err, info) {
      if (err) {
        throw err;
      }
      console.log(info);
    });
    ctx.body = 'hi, multipart mailer';
  }
}
```


## License

[MIT](LICENSE)
