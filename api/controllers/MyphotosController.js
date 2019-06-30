/**
 * MyphotosController
 *
 * @description :: Server-side logic for managing myphotos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs');
module.exports = {

  deleteImage: function (req, res){
    console.log('id',req.body.myPhotoId);
    console.log('path',req.body.myPhotoPath);
    try{

      //console.log('ki vai');
      fs.unlinkSync(sails.config.appPath + req.body.myPhotoPath, function (err) {
        if (err) throw err;
        console.log('successfully deleted ');

        Myphotos.destroy(req.body.myPhotoId).exec(function (err,data) {
          if (err) throw err;
          console.log('delete  from database');
          return res.json(data);
        });
      });
    }
    catch(exception){
      Myphotos.destroy(req.body.myPhotoId).exec(function (err,data) {
        if (err) throw err;
        console.log('delete  from database');
        //return res.json(data);
      });
      //console.log('error asce');
      return  res.json(exception);

    }

  }

};

