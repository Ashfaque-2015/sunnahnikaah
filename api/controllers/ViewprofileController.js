/**
 * ViewprofileController
 *
 * @description :: Server-side logic for managing viewprofiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var geoip = require('geoip-lite');

module.exports = {

  getvisitor: function(req, res){
    console.log(req.body.me);
    Viewprofile.find().exec(function(err, result){
      if(!err){
        res.json(result);
      }
      else(console.log(err))
    })
  },

  getfriends: function(req, res){
    console.log(req.body.user);
    res.json(req.body);
  },
  storeVisitStat: function(req, res) {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    //console.log(req.headers);
    //console.log(req.connection);
    //console.log("req.headers['x-forwarded-for']",req.headers['x-forwarded-for']);
    //console.log("req.connection.remoteAddress",req.connection.remoteAddress);
    //console.log("req.socket.remoteAddress",req.socket.remoteAddress);
    //console.log("req.connection.socket.remoteAddress",req.connection.socket.remoteAddress);

    //console.log("storeVisitStat");
    var currentTime = new Date().getTime();
    //console.log("=======",currentTime,'------');
    //update one user
    Viewprofile.findOne({'me': req.body.me, visitor : req.body.visitor}, function (err, viewprofileData) {
      if (err) {
        console.log(err);
      }
      //console.log(viewprofileData);

      if(viewprofileData){
        if(viewprofileData.hasOwnProperty('visit_time_ip'))
          var visitTimeIp = viewprofileData.visit_time_ip;
        else
          var visitTimeIp = [];

        if(viewprofileData.hasOwnProperty('how_many')){
          var howMany = viewprofileData.how_many + 1;
        }else{
          var howMany = 1;
        }

        //console.log('visitTimeIp',visitTimeIp);
        //console.log('howMany',howMany);

        if(req.headers['x-forwarded-for']){
          var geo = geoip.lookup(ip);

          var ipcountry = geo.hasOwnProperty('country')?geo.country:'';
          var ipcity = geo.hasOwnProperty('city')?geo.region:'';
          var ipcity = geo.hasOwnProperty('city')?geo.city:'';

          visitTimeIp.push({
            timeStamp:currentTime,
            ip:req.headers['x-forwarded-for'],
            country: ipcountry,
            region: ipcity,
            city: ipcity
          });
        }
        else{
          visitTimeIp.push({
            timeStamp:currentTime,
            ip:'127.0.0.1',
            country: ipcountry,
            region: ipcity,
            city: ipcity
          });
        }

        Viewprofile.update({'id': viewprofileData.id}, {how_many:howMany,visit_time_ip:visitTimeIp}).exec(function (err2, data2) {
          if (err2)
            return res.serverError(err2);

          //console.log("updated",data2);
          res.json(data2);
        })
      }
      else{
        //console.log("creating new");
        //var visitTimeIp = [];
        var visitTimeIp = [];
        if(req.headers['x-forwarded-for']){
          var geo = geoip.lookup(ip);

          var ipcountry = geo.hasOwnProperty('country')?geo.country:'';
          var ipcity = geo.hasOwnProperty('city')?geo.region:'';
          var ipcity = geo.hasOwnProperty('city')?geo.city:'';


          visitTimeIp.push({
            timeStamp:currentTime,
            ip:req.headers['x-forwarded-for'],
            country: ipcountry,
            region: ipcity,
            city: ipcity
          });
        }
        else{
          visitTimeIp.push({
            timeStamp:currentTime,
            ip:'127.0.0.1',
            country: ipcountry,
            region: ipcity,
            city: ipcity
          });
        }
        //console.log(visitTimeIp);
        Viewprofile.create({'me': req.body.me, visitor : req.body.visitor, how_many:1,visit_time_ip:visitTimeIp}).exec(function (err2, data2) {
          if (err2)

            return res.serverError(err2);

          res.json(data2);
        });
      }


    });

  }
};

