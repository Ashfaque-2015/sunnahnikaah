/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
//var q = require('q');
var fs = require('fs')
  , path = require('path')
  , q = require("bluebird");

var nodemailer = require('nodemailer');

module.exports = {
  // Doing a DELETE /user/:parentid/message/:id will not delete the message itself
  // We do that here.
  remove: function (req, res) {
    var relation = req.options.alias;
    switch (relation) {
      case 'messages':
        destroyMessage(req, res);
    }
  },

  create: function (req, res) {
    res.json(301, 'To create a user go to /auth/register');
  },

  search: function (req, res, next) {

    //this code temporarily placed and need to be placed at config/bootstrap.js folder
    var postsSource = path.join(process.cwd(), 'uploads')
      , postsDest = path.join(process.cwd(), '.tmp/public/uploads');

    fs.symlink(postsSource, postsDest, function (err) {
      //cb(err);
    });


    var searchParams = {};

    var today = new Date();
    var end_time = new Date((today.getFullYear() - 12), 0, 0, 0, 0, 0, 0).getTime();
    var start_date = new Date(1970, 0, 1, 6, 0, 0, 0);
    var start_time = new Date(1970, 0, 1, 6, 0, 0, 0).getTime();

    var end_time = new Date((today.getFullYear() - 12), 0, 0, 0, 0, 0, 0).getTime();

    var start_time = req.query['start_date'];
    var end_time = req.query['end_date'];


    searchParams["dob_timestamp"] = {};
    searchParams["dob_timestamp"][">"] = start_time;
    searchParams["dob_timestamp"]["<"] = end_time;

    Object.keys(req.query).forEach(function (key) {

      //if(key=="max_age" && req.query[key]!==""){
      //  var max_year = today.getFullYear()- req.query[key];
      //  start_time = new Date(max_year, 0, 0, 0, 0, 0, 0).getTime();
      //  searchParams["dob_timestamp"][">"]=start_time;
      //}
      //else{
      //
      //  start_time =  req.query[key]['start_date'];
      //
      //  searchParams["dob_timestamp"][">"]=start_time;
      //
      //}
      //
      //
      //
      //
      //if(key=="min_age" && req.query[key]!==""){
      //  var min_year = today.getFullYear()- req.query[key];
      //  end_time = new Date(min_year, 0, 0, 0, 0, 0, 0).getTime();
      //  searchParams["dob_timestamp"]["<"]=end_time;
      //}
      //else{
      //
      //
      //
      //  end_time = req.query[key]['end_date'];
      //  searchParams["dob_timestamp"]["<"]=end_time;
      //
      //}


      if (key == "gender" && req.query[key] !== "") {
        searchParams["gender"] = req.query[key];
        User.find().where({"gender": req.query[key]})
      }
      if (key == "country" && req.query[key] !== "") {
        searchParams["country"] = req.query[key];
        User.find().where({"country": req.query[key]})
      }
      if (key == "ethnicity" && req.query[key] !== "") {
        searchParams["myprofile_ethnicity"] = req.query[key];
        //console.log('ethnicity',req.query[key]);
        //User.find().where({ "country": req.query[key]})
      }
      if (key == "profession" && req.query[key] !== "") {
        searchParams["myprofile_profession"] = req.query[key];
      }
      if (key == "education" && req.query[key] !== "") {
        searchParams["myprofile_education"] = req.query[key];
      }
      if (key == "marital_status" && req.query[key] !== "") {
        searchParams["myprofile_marital_status"] = req.query[key];
      }
      if (key == "salah" && req.query[key] !== "") {
        searchParams["myprofile_salah"] = req.query[key];
      }
      if (key == "religiousness" && req.query[key] !== "") {
        searchParams["myprofile_religious_strictness"] = req.query[key];
      }
      if (key == "build" && req.query[key] !== "") {
        searchParams["myprofile_build"] = req.query[key];
      }
    });

    //User.find()
    //  .where({key : req.query[key]})
    //  .where()
    //  .limit(100)
    //  .exec(function(err, users){
    //    if (err) return next(err);
    //    res.json(data);
    //  });

    //User.find()
    //  .where({ id: { '>': 100 }})
    //  .where({ age: 21 })
    //  .limit(100)
    //  .sort('name')
    //  .exec(function(err, users) {
    //    // Do stuff here
    //  });

    //for or checking
    //User.find().where({
    //
    //  or: [{
    //
    //    score: {
    //      '>': parseInt(theScore)
    //    },
    //
    //    status: 'user'
    //  },
    //
    //    {  status: 'admin'}]
    //
    //}).exec(function(err, data) {
    //  if (err) return next(err);
    //  res.json(data);
    //});

    User.find(searchParams)
      .where({id: {not: req.query["currentUserId"]}})//,'>=': req.query['start_date']}})
      .exec(function (err, data) {
        if (err) return next(err);

        //console.log('user is ', req.user);
        var reqs = [];
        //console.log(data);
        data.forEach(function (val, index) {
          console.log('index', index);

          reqs[index] = q.all([Friend.find().where({
            me: req.query["currentUserId"],
            with: val.id,
            favorite_status: true
          }), index]).spread(function(data2, index2){
            if (!data2) return null;
            //console.log('value id',val.id);
            //console.log(data2);
            if (data2.length) {
              console.log("length is", data2);
              data[index2].isFav = data2;
              return data2;
            }
          });
        });



        q.all(reqs).then(function (values){
          console.log(data);
          res.json(data)
        });

        //res.json(data);
        //res.json(data);
      });

  },

  rosterlist: function (req, res) {

    //res.json(301, 'To create a user go to /auth/register');
  },

  forpassmail: function (req, res) {

    var email = req.body.userEmail;
    console.log(email);
    User.find({email: email})
      //.where({ email: req.query["email"]})//,'>=': req.query['start_date']}})
      .exec(function (err, data) {
        if (err) {
          return next(err);
        }
        else {
          console.log(data[0].id);
          var fppasscode = new Date().getTime();
          var fptime = fppasscode * (1000 * 60 * 60 * 2);
          console.log(fppasscode);
          console.log(fptime);
          User.update({'id': data[0].id}, {'fppasscode': fppasscode, 'fptime': fptime}).exec(function (err2, data2) {
            if (err) {
              console.log(err2);
            }
            else {
              console.log(data2);

              var maillnk = 'http://sunnahnikaah.com/#/passrecover/';


              //send email to the registrant
              var transporter = nodemailer.createTransport();
              var mailSubject = 'Password chage link for SunnahNikaah.com';
              //var mailTo = "zqarif@gmail.com";
              var mailTo = data[0].email;
              var mailFrom = 'noreply@sunnahnikaah.com';
              //var mailBody = 'Hi '+ user.first_name + " " + user.last_name + ", You have successfully registered at our site.";
              //var mailBody = "Hi  You have successfully registered at our site.";
              var mailBody = "<a href=" + maillnk + fppasscode + ">Pass change Link</a>";

              console.log(mailTo);
              console.log(mailFrom);
              console.log(mailBody);

              transporter.sendMail({
                from: mailFrom,
                to: mailTo,
                subject: mailSubject,
                text: mailBody
              });
              //console.log("user update hoise");
            }
          });
          res.json(data);
        }
      });
  },


  fprecover: function (req, res) {

    var passcode = req.body.passcode;

    var fptime = passcode * (1000 * 60 * 60 * 2);


    //console.log(passcode);
    //console.log(fptime);
    User.find({fppasscode: passcode, fptime: fptime})
      //.where({ email: req.query["email"]})//,'>=': req.query['start_date']}})
      .exec(function (err, data) {
        if (err) {
          return next(err);
        }
        else {
          //console.log(data[0].id);
          //var fppasscode = new Date().getTime();

          res.json(data);
        }
      });
  },

  passwordchange: function (req, res) {

    console.log(req.body);
    if (req.body.password !== req.body.confirmPassword) {
      return res.json({err: 'Password doesn\'t match'});
    }
    else {
      var uid = req.body.uid;
      console.log(uid);

      User.update({'id': uid}, {
        'password': req.body.password,
        'confirmPassword': req.body.confirmPassword,
        'fppasscode': 10,
        'fptime': 007
      }).exec(function (err2, data2) {
        if (err2) {
          console.log(err2);
        }
        else {
          console.log(data2);
          res.json(data2);

        }
      })
    }
  }


};
