/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs')
  , path = require('path');

module.exports = {


  //uploading profile images
  upload: function  (req, res) {
    if(req.method === 'GET')
      return res.json({'status':'GET not allowed'});
    // Call to /upload via GET is error

    //var uploadFile = req.file('uploadFile');
    console.log('reqbody',req.body);
    console.log('req userid',req.body.userId);
    var uploadFile = req.file('file');
    //console.log(uploadFile);

    uploadFile.upload({

      // You can apply a file upload limit (in bytes)
      maxBytes: 1000000,

      //dirname: require('path').resolve(sails.config.appPath, '/assets/images')
      dirname: sails.config.appPath+'/uploads/'+req.body.userId+'/'

    },function onUploadComplete (err, files) {
      // Files will be uploaded to .tmp/uploads

      // IF ERROR Return and send 500 error with error
      if (err) return res.serverError(err);

      var baseAbsolutePath = process.cwd();
      var imagePath = files[0].fd.replace(baseAbsolutePath,'');

      //insert all profile images at database
      var profileImgObj = {user_id:req.body.userId,img_path:imagePath};
      Profileimages.create(profileImgObj).exec(function createCB(err,data,created){
        if(err)
          console.log(err);
        else
          console.log("inserted profile image path at database");

        //updated to database image path
        User.update({id:req.body.userId},{myprofile_image:imagePath}).exec(function afterwards(err,updated){
          if (err)
            return res.serverError(err);
          console.log('updated images path as '+imagePath)
          res.json({status:200,file:imagePath,newImageRecord:data});
        });
      });


    });
  },

  //upload my photos
  myphotoupload: function  (req, res) {
    if(req.method === 'GET')
      return res.json({'status':'GET not allowed'});
    // Call to /upload via GET is error

    //var uploadFile = req.file('uploadFile');
    var uploadFile = req.file('file');

    uploadFile.upload({

      // You can apply a file upload limit (in bytes)
      maxBytes: 1000000,

      //dirname: require('path').resolve(sails.config.appPath, '/assets/images')
      dirname: sails.config.appPath+'/uploads/'+req.body.userId+'-myphotos'+'/'

    },function onUploadComplete (err, files) {
      //when file is uploaded successfully then need to create a record at db myphotos


      // IF ERROR Return and send 500 error with error
      if (err) return res.serverError(err);

      var baseAbsolutePath = process.cwd();
      var imagePath = files[0].fd.replace(baseAbsolutePath,'');

      var newImageRecord = {};

      //insert all profile images at database
      var myphotosObj = {user_id:req.body.userId,img_path:imagePath}
      Myphotos.create(myphotosObj).exec(function createCB(err,data,created){
        if(err)
          console.log(err);
        else {
          res.json({status:200,newImageRecord:data});
        }
      });
    });
  },

  /**
   * `FileController.s3upload()`
   *
   * Upload file(s) to an S3 bucket.
   *
   * NOTE:
   * If this is a really big file, you'll want to change
   * the TCP connection timeout.  This is demonstrated as the
   * first line of the action below.
   */
  s3upload: function (req, res) {

    // e.g.
    // 0 => infinite
    // 240000 => 4 minutes (240,000 miliseconds)
    // etc.
    //
    // Node defaults to 2 minutes.
    res.setTimeout(0);

    req.file('avatar').upload({
      adapter: require('skipper-s3'),
      bucket: process.env.BUCKET,
      key: process.env.KEY,
      secret: process.env.SECRET
    }, function whenDone(err, uploadedFiles) {
      if (err) return res.serverError(err);
      else return res.json({
        files: uploadedFiles,
        textParams: req.params.all()
      });
    });
  },


  /**
   * FileController.download()
   *
   * Download a file from the server's disk.
   */
  download: function (req, res) {
    require('fs').createReadStream(req.param('path'))
    .on('error', function (err) {
      return res.serverError(err);
    })
    .pipe(res);
  }
};
