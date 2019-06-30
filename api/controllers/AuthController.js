/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var nodemailer = require('nodemailer');

module.exports = {
	authenticate: function(req, res) {
    //var email = req.param('email');
    var username = req.param('username');
    var password = req.param('password');

    if (!username || !password) {
      console.log(username);
      return res.json(401, {err: 'username and password required'});
    }

    User.findOneByUsername(username, function(err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid username or password'});
      }

      User.validPassword(password, user, function(err, valid) {
        if (err) {
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          return res.json(401, {err: 'invalid username or password'});
        } else {
          res.json({user: user, token: sailsTokenAuth.issueToken({sid: user.id})});
        }
      });
    })
  },

  register: function(req, res) {
    //TODO: Do some validation on the input
    //console.log(req.body);
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {err: 'Password doesn\'t match'});
    }
    //var queryObj = {email: req.body.email, password: req.body.password};
    //User.create(queryObj).exec(function(err, user) {
    User.create(req.body).exec(function(err, user) {
      if (err) {
        res.json(err.status, {err: err});
        return;
      }
      if(user){

        //check if the user is paid or free
        //if he is free then no need to create jabbered/xmpp user otherwise create for




        //send email to the registrant
        var transporter = nodemailer.createTransport();
        var mailSubject = 'Registration Confirmation from SunnahNikaah.com';
        var mailTo = user.email;
        var mailFrom = 'noreply@sunnahnikaah.com';
        var mailBody = 'Hi '+ user.first_name + " " + user.last_name + ", You have successfully registered at our site.";

        //console.log(mailTo);
        //console.log(mailFrom);
        //console.log(mailBody);

        transporter.sendMail({
          from: mailFrom,
          to: mailTo,
          subject: mailSubject,
          text: mailBody
        });

        res.json({user: user, token: sailsTokenAuth.issueToken({sid: user.id})});
      }
    });
  }
};
