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
    console.log('blog body',req.body);

    console.log('id',req.body.id);
    console.log('path',req.body.post_image);
    try{

      fs.unlinkSync(sails.config.appPath + req.body.post_image, function (err) {
        if (err) {
          console.log('failed or no image found deleted ');
        }
        if(!err){
          console.log('successfully deleted ');
        }


        Blog.destroy(req.body.id).exec(function (err,data) {
          if (err) throw err;
          console.log('deleted  from database');
          return res.json(data);
        });
      });
    }
    catch(exception){
      Blog.destroy(req.body.id).exec(function (err,data) {
        if (err) throw err;
        console.log('deleted  from database');
        //return res.json(data);
      });
      //console.log('error asce');
      return  res.json(exception);
    }
  },

  //uploading blog images
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
      dirname: sails.config.appPath+'/uploads/blog-images/'

    },function onUploadComplete (err, files) {
      // Files will be uploaded to .tmp/uploads

      // IF ERROR Return and send 500 error with error
      if (err) return res.serverError(err);

      var baseAbsolutePath = process.cwd();
      var imagePath = files[0].fd.replace(baseAbsolutePath,'');

      //insert all profile images at database
      //var profileImgObj = {user_id:req.body.userId,img_path:imagePath}
      req.body.post_image = imagePath;
      //updated to database image path

      req.body.post_tag = JSON.parse(req.body.post_tag); //convert post_tag ids string to array
      var tags = req.body.post_tag; // save post_tag in a variable before delete
      console.log('req.body',req.body);
      delete req.body.post_tag; //delete post_tag from req.body
      console.log('req.body',req.body);
      console.log('tags',tags);
      Blog.create(req.body).exec(function afterwards(err,data,updated){
        if (err)
          return res.serverError(err);
        console.log("new post created: ");
        addBlogTag(data.id);
        res.json({status:200,data:data});
      });
      function addBlogTag(blogid){
        tags.forEach(function(value){
          var body = {blog:blogid,tag:value};
          BlogTag.create(body).exec(function afterwards(err,data,updated){
            if (err)
              return res.serverError(err);
            console.log("added tag id is: ",value);
            //res.json({status:200,data:data});
          }); //eng BlogTag Create
        }); //end tagsForeach
      } //end addBlogTag
    });
  }//,
  //
  //destroy: function(req,res){
  //  Blog.update({ id: req.param('id') }, { deleted: true })
  //    .exec(function (err, data) {
  //      console.log('inside');
  //      if (err) return res.json(err, 400);
  //      return res.json(data[0]);
  //      deleteTags(data.id);
  //    });
  //
  //  function deleteTags(blogid){
  //    BlogTag.update({ blog: blogid }, { deleted: true })
  //      .exec(function (err, data) {
  //        //if (err) return res.json(err, 400);
  //        //return res.json(data[0]);
  //        if (err) console.log(err);
  //        else console.log('deleted');
  //        //return res.json(data[0]);
  //      })
  //  }
  //}
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
