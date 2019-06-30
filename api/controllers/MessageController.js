module.exports = {

  //chat: function (req, res) {
  //
  //  var user_one = req.param('user_one');
  //  var user_two = req.param('user_two');
  //
  //  Message.find(
  //    {
  //      or: [
  //        {sender: user_one},
  //        {receiver: user_one}
  //      ],
  //      or: [
  //        {sender: user_two},
  //        {receiver: user_two}
  //      ]
  //    }
  //  ).exec(function (err, posts) {
  //      if (err) return next(err);
  //      res.json(posts);
  //    });
  //},

  updatemessage: function (req, res) {
    //console.log('req.body');
    //console.log(req.body);

    console.log(req.body.msgType);

    var postMessages = {};

    var i = 0;
    //console.log("Showing all message");
    if (Array.isArray(req.body.messages)) {
      for (msg in req.body.messages) {
        console.log(i + " msg:", msg);
        i++;
      }
    }else{
      console.log("1 msg:",req.body.messages);
    }

    if (req.body.msgType == "sendmsg") {
      //multiple messages can come as array
      if (Array.isArray(req.body.messages)) {
        for (msg in req.body.messages) {

          //now only one message is saving but should be as a array
          postMessages.from = req.body.from_jid;
          postMessages.to = req.body.me_jid;
          postMessages.body = req.body.messages[0];
          postMessages.thread = req.body.thread;
          //postMessages.is_read = false;
        }
      }
      else {
        //if only one message come
        postMessages.from = req.body.from_jid;
        postMessages.to = req.body.me_jid;
        postMessages.body = req.body.messages;
        postMessages.thread = req.body.thread;
      }

      //creating one message record
      Message.create(postMessages).exec(function afterwards(err, data, updated) {
        if (err)
          return res.serverError(err);
        console.log("new message created");

        //updating last message at Thread model
        Thread.update({'id':data.thread},{'last_message':data.body}).exec(function(err2, data2){
          if (err2)
            return res.serverError(err2);

          res.json({'thread':data2,'message':data});
        })
      });
    }
    else {
      //just updating the message as read
      console.log("existing message updating:",req.body.msgId);
      postMessages.is_read = true;
      Message.update({id: req.body.msgId}, postMessages).exec(function afterwards(err, msgdata, updated) {
        if (err)
          return res.serverError(err);

        console.log('message updated id ' + req.body.msgId);


        //adding notification at Thread model if the message is not viewed
        console.log("msgViewing",req.body.msgViewing);
        if(req.body.msgViewing == "not-viewing"){
          Thread.find(req.body.thread).exec(function(err3,data3){
            if (err3)
              console.log(err3);

            var notificationCounter = 0, updateObject = {};

            if(data3.length){
              //msgViewing
              console.log(data3);
              console.log("thread khuje paise, ekhon notificaiton update korbe");

              console.log('data3.me_jid,data3.from_jid,req.body.me_jid');
              console.log(data3[0].me_jid,data3[0].other_user_jid,req.body.me_jid);

              if(data3[0].me_jid == req.body.me_jid){
                console.log("ekhane ki ashceeeeeeee");
                if(!data3[0].hasOwnProperty('me_unread_notification')){
                  console.log("======");
                  notificationCounter = 1;
                  updateObject = {'me_unread_notification':notificationCounter};
                }
                else{
                  console.log("------");
                  notificationCounter = parseInt(data3[0].me_unread_notification) + 1;
                  updateObject = {'me_unread_notification':notificationCounter};
                }
              }
              else if(data3[0].other_user_jid == req.body.me_jid){
                console.log("eihane aiseto");
                if(!data3[0].hasOwnProperty('other_user_unread_notification')){
                  notificationCounter = 1;
                  updateObject = {'other_user_unread_notification':notificationCounter};
                }
                else{
                  console.log("eihane to ashar kotha chilo");
                  notificationCounter = parseInt(data3[0].other_user_unread_notification) + 1;
                  updateObject = {'other_user_unread_notification':notificationCounter};
                }
              }

              console.log("notificaton updating...",updateObject);
              //updating thread
              Thread.update({'id':req.body.thread},updateObject).exec(function(err2, data2){
                if (err2)
                  return res.serverError(err2);
                console.log("notification update houar por",data2);


                res.json({'thread':data2,'message':msgdata});

              });
            }
          });
        }

      });


    }

    return true;
  },

  get20Message : function(req, res){
    console.log(req.body);
    if(!req.body.hasOwnProperty('limit')){
      req.body.limit = 20;
    }
    if(!req.body.hasOwnProperty('skip')){
      req.body.skip = 0;
    }
    if(req.body.threadId){
      Message.find()
        .where({ thread: req.body.threadId})
        .limit(req.body.limit)
        .skip(req.body.skip)
        .sort('createdAt DESC')
        .exec(function(err, messages) {
          if (err)
            return res.serverError(err);
          res.json(messages);
        });
    }
  }

};
