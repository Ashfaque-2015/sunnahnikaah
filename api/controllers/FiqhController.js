/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs')
    , path = require('path');

module.exports = {
  //delete blog image and delete post after
  deleteImage: function (req, res){
    console.log('fiqh body',req.body);

    console.log('id',req.body.id);
    console.log('path',req.body.fiqh_image);
    try{
      fs.unlinkSync(sails.config.appPath + req.body.fiqh_image, function (err) {
        if (err) {
          console.log('failed or no image found deleted ');
        }
        if(!err){
          console.log('successfully deleted ');
        }

        Fiqh.destroy(req.body.id).exec(function (err,data) {
          if (err) throw err;
          console.log('delete  from database');
          return res.json(data);
        });
      });
    }
    catch(exception){
      //console.log('error asce');
      return  res.json(exception);
    }
  },
    //uploading profile images
    upload: function  (req, res) {
        if(req.method === 'GET')
            return res.json({'status':'GET not allowed'});
        // Call to /upload via GET is error

        //var uploadFile = req.file('uploadFile');
        console.log(req.body.userId);
        var uploadFile = req.file('file');
        //console.log(uploadFile);

        uploadFile.upload({

            // You can apply a file upload limit (in bytes)
            maxBytes: 1000000,

            //dirname: require('path').resolve(sails.config.appPath, '/assets/images')
            dirname: sails.config.appPath+'/uploads/fiqh-images/'

        },function onUploadComplete (err, files) {
            // Files will be uploaded to .tmp/uploads

            // IF ERROR Return and send 500 error with error
            if (err) return res.serverError(err);

            var baseAbsolutePath = process.cwd();
            var imagePath = files[0].fd.replace(baseAbsolutePath,'');

            //insert all profile images at database
            //var profileImgObj = {user_id:req.body.userId,img_path:imagePath}
            req.body.fiqh_image = imagePath;
            //updated to database image path

            req.body.fiqh_tag = JSON.parse(req.body.fiqh_tag); //convert post_tag ids string to array
            var tags = req.body.fiqh_tag; // save post_tag in a variable before delete
            console.log('req.body',req.body);
            delete req.body.fiqh_tag; //delete post_tag from req.body
            console.log('req.body',req.body);
            console.log('tags',tags);
            Fiqh.create(req.body).exec(function afterwards(err,data,updated){
              if (err)
                return res.serverError(err);
              console.log("new fiqh created: ");
              addFiqhTag(data.id);
              res.json({status:200,data:data});
            });
            function addFiqhTag(fiqhid){
              tags.forEach(function(value){
                var body = {fiqh:fiqhid,tag:value};
                FiqhTag.create(body).exec(function afterwards(err,data,updated){
                  if (err)
                    return res.serverError(err);
                  console.log("added tag id is: ",value);
                  //res.json({status:200,data:data});
                }); //eng BlogTag Create
              }); //end tagsForeach
            } //end addBlogTag
        });
    }
};


//$scope.blog.category_slug = $scope.blog.category_title; //todo: needed to filter and make it perfect slug
//var queryString = {"category_title":$scope.blog.category_title,"category_slug":$scope.blog.category_slug,"category_desc":$scope.blog.category_desc};
//$http.post("/category/create",queryString).
//  success(function(data, status, headers, config) {
//    $scope.alerts.push({ type: 'success', msg: 'Well done! You have successfully created a category( '+data.category_title+' ).' });
//  }).
//  error(function(data, status, headers, config) {
//    $scope.alerts.push({ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' });
//  });
