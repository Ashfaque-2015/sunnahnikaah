/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  //find thread, if not found then create one and send the thread
  findThread: function (req, res) {
    //console.log(req.body);

    //var searchParams = {'me': req.body.user1, 'other_user': req.body.user2};
    var searchParams = {
      or: [
        {'me': req.body.user1, 'other_user': req.body.user2},
        {'me': req.body.user2, 'other_user': req.body.user1}
      ]
    };

    Thread.find(searchParams)
      .exec(function (err, data) {
        if (err) return next(err);

        if (data.length) {
          //console.log("thread paise"); return;
//reset notification reset_notification
          if (req.body.hasOwnProperty('reset_notification') && req.body.reset_notification) {

            //console.log(data);
            //console.log(req.body);

            var resetWhichNotification = {};
            if (data[0].me == req.body.user1 && data[0].other_user == req.body.user2)
              resetWhichNotification = {me_unread_notification: 0};
            else if (data[0].me == req.body.user2 && data[0].other_user == req.body.user1)
              resetWhichNotification = {other_user_unread_notification: 0};

            //console.log("resetWhichNotification");
            //console.log(resetWhichNotification);

            Thread.update({'id': data[0].id}, resetWhichNotification).exec(function (err5, data5) {
              if (err5)
                console.log(err5);

              console.log("ere zero korse",resetWhichNotification);
              console.log("ere zero korse",data5[0]);

              Thread.findOne({'id': data5[0].id}).populate('me').populate('other_user').exec(function (err, expectedThread) {
                if (err) {
                  console.log(err);
                }
                //console.log(expectedThread);
                res.json(expectedThread);
              });

            })
          }

        }
        else {
          //searchParams = {'me': req.body.user2, 'other_user': req.body.user1};
          //Thread.find(searchParams)
          //  .exec(function (err2, data2) {
          //if (data2.length) {
          //
          //  //reset notification reset_notification
          //  if (req.body.hasOwnProperty('reset_notification') && req.body.reset_notification) {
          //    Thread.update({'id': data2[0].id}, {'other_user_unread_notification': 0}).exec(function (err5, data5) {
          //      if (err5)
          //        console.log(err5);
          //
          //      console.log("other_user_unread_notification zero holo");
          //      res.json(data5[0]);
          //    })
          //  }
          //}
          //else {
          var newThread = {
            'me': req.body.user1,
            'other_user': req.body.user2,
            'me_jid': req.body.me_jid,
            'other_user_jid': req.body.other_user_jid
          };

          //console.log("thread create korte ashche");

          Thread.create(newThread).exec(function (err3, data3) {
            if (err3)
              return res.serverError(err3);

            //var roster_obj = {"user_id": req.body.user2, "thread_id": data3.id};

            //update one user
            //User.findOne({'id': req.body.user1}, function (err, user) {
            //  if (err) {
            //    console.log(err);
            //  }
            //  console.log(user);
            //
            //  user.roster_contacts[req.body.user2] = data3.id;
            //  console.log(user);
            //
            //  User.update({'id': req.body.user1}, {'roster_contacts': user.roster_contacts}).exec(function (err4, data4) {
            //    console.log(data4);
            //    //console.log("user update hoise");
            //  })
            //});

            //update two user
            //User.findOne({'id': req.body.user2}, function (err, user2) {
            //  if (err) {
            //    console.log(err);
            //  }
            //  console.log(user2);
            //
            //  user2.roster_contacts[req.body.user1] = data3.id;
            //  console.log(user2);
            //
            //  User.update({'id': req.body.user2}, {'roster_contacts': user2.roster_contacts}).exec(function (err5, data5) {
            //    console.log(data5);
            //    //console.log("user update hoise");
            //  })
            //});


            //res.json(data3);

            console.log("new thread create shesh ekhon sending with pululation",data3);


            Thread.findOne({'id': data3.id}).populate('me').populate('other_user').exec(function (err, expectedThread) {
              if (err) {
                console.log(err);
              }
              console.log(expectedThread);
              res.json(expectedThread);
            });
          });

          //}
          //});
        }
      });
  },

  findThread2: function (req, res) {
    //console.log(req.body);

    var searchParams = {'me': req.body.user1, 'other_user': req.body.user2};

    Thread.find(searchParams)
      .exec(function (err, data) {
        if (err) return next(err);

        if (data.length) {
          //reset notification reset_notification
          if (req.body.hasOwnProperty('reset_notification') && req.body.reset_notification) {
            Thread.update({'id': data[0].id}, {'me_unread_notification': 0}).exec(function (err5, data5) {
              if (err5)
                console.log(err5);
              console.log("me_unread_notification zero holo");
              res.json(data5[0]);
            })
          }

        }
        else {
          searchParams = {'me': req.body.user2, 'other_user': req.body.user1};
          Thread.find(searchParams)
            .exec(function (err2, data2) {
              if (data2.length) {

                //reset notification reset_notification
                if (req.body.hasOwnProperty('reset_notification') && req.body.reset_notification) {
                  Thread.update({'id': data2[0].id}, {'other_user_unread_notification': 0}).exec(function (err5, data5) {
                    if (err5)
                      console.log(err5);

                    console.log("other_user_unread_notification zero holo");
                    res.json(data5[0]);
                  })
                }
              }
              else {
                var newThread = {
                  'me': req.body.user1,
                  'other_user': req.body.user2,
                  'me_jid': req.body.me_jid,
                  'other_user_jid': req.body.other_user_jid
                };

                //console.log("thread create korte ashche");

                Thread.create(newThread).exec(function (err3, data3) {
                  if (err3)
                    return res.serverError(err3);

                  var roster_obj = {"user_id": req.body.user2, "thread_id": data3.id};

                  //update one user
                  User.findOne({'id': req.body.user1}, function (err, user) {
                    if (err) {
                      console.log(err);
                    }
                    console.log(user);

                    user.roster_contacts[req.body.user2] = data3.id;
                    console.log(user);

                    User.update({'id': req.body.user1}, {'roster_contacts': user.roster_contacts}).exec(function (err4, data4) {
                      console.log(data4);
                      //console.log("user update hoise");
                    })
                  });

                  //update two user
                  User.findOne({'id': req.body.user2}, function (err, user2) {
                    if (err) {
                      console.log(err);
                    }
                    console.log(user2);

                    user2.roster_contacts[req.body.user1] = data3.id;
                    console.log(user2);

                    User.update({'id': req.body.user2}, {'roster_contacts': user2.roster_contacts}).exec(function (err5, data5) {
                      console.log(data5);
                      //console.log("user update hoise");
                    })
                  });


                  res.json(data3);
                });

              }
            });
        }
      });
  },

  //get roster contacts for unread notifications (without user d
  getMyRosterContacts: function (req, res) {
    if (req.body.userId) {
      Thread
        .find({or: [{me: req.body.userId}, {other_user: req.body.userId}]})
        .exec(function (err, data) {
          if (err) return next(err);
          res.json(data);
        });
    }
  },

  //get roster contacts with user detail
  populateMyRosterContacts: function (req, res) {
    if (req.body.userId) {
      var th = Thread;
      th = th.find({or: [{me: req.body.userId}, {other_user: req.body.userId}]});

      th = th.populate('me');
      th = th.populate('other_user');
      if (req.body.hasOwnProperty('count') && req.body.count != -1)
        th = th.limit(req.body.count);
      th = th.sort({updatedAt: 'desc'});
      th = th.exec(function (err, data) {
        if (err) return next(err);
        res.json(data);
      });
    }
  },

  updateUserRoster: function () {

  }
};
