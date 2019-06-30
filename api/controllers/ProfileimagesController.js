/**
 * ProfileimagesController
 *
 * @description :: Server-side logic for managing profileimages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs');
module.exports = {

  //getImages : function(req, res){
  //  Profileimages.find({user_id:req.body.userId}).exec(function (err, allImages) {
  //    if(err)
  //      if (err) return res.serverError(err);
  //
  //    console.log(allImages);
  //    res.json(allImages);
  //  });
  //}

  deleteImage: function (req, res) {
    //console.log('id',req.body.profileimageId);
    //console.log('path',req.body.profileimagePath);
    try{
      fs.exists(sails.config.appPath + req.body.profileimagePath, function (exists) {
        if(exists){
          fs.unlinkSync(sails.config.appPath + req.body.profileimagePath, function (err) {
            if (err) throw err;
            console.log('successfully deleted '+ sails.config.appPath + req.body.profileimagePath);
          });
        }
        else{
          console.log('File not exist : ' + sails.config.appPath + req.body.profileimagePath);
          console.log('But deleting from database ');
          Profileimages.destroy(req.body.profileimageId).exec(function (err,data) {
            if (err) throw err;
            console.log('delete  from database');
            return res.json(data);
          });
        }
      });
    }
    catch(exception){
      Profileimages.destroy(req.body.profileimageId).exec(function (err,data) {
        if (err) throw err;
        console.log('delete  from database');
        //return res.json(data);
      });
      console.log('Some error occured at the time of deleting profile image and data record');
      return  res.json(exception);
    }
  },

  getDefaultMaleAvatar : function(req, res){
    fs.readdir(sails.config.appPath + '/assets/images/male-avatars', function(err, files){
      if(err)
        throw err;

      var patternMatch = /.png/;
      var filteredFile = [];
      for(i=0;i<files.length;i++){
        if(patternMatch.test(files[i])){
          filteredFile.push(files[i]);
        }
      }

      return  res.json({imgdir:'/images/male-avatars',images: filteredFile});
    });
  },

  getDefaultFemaleAvatar : function(req, res){
    fs.readdir(sails.config.appPath + '/assets/images/female-avatars', function(err, files){
      if(err)
        throw err;

      var patternMatch = /.png/;
      var filteredFile = [];
      for(i=0;i<files.length;i++){
        if(patternMatch.test(files[i])){
          filteredFile.push(files[i]);
        }
      }

      return  res.json({imgdir:'/images/female-avatars',images: filteredFile});
    });
  }
};


