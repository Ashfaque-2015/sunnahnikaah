/**
 * FriendController
 *
 * @description :: Server-side logic for managing friends
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  getFavoriteList: function(req, res, next) {
    //if(req.method === 'GET')
    //  return res.json({'status':'GET not allowed'});
    // Search via GET is error

    console.log(req.body);
    //return;
    //  User.find();
    //  User.find().where({email:'wahid@wahid.com'})
    //
    //.where({email:'abc@abc.com'})
    //var emails = ['abc@abc.com','wahid@wahid.com'];
    //console.log(req.query);
    //var searchParams = {};
    //
    //Object.keys(req.query).forEach(function (key) {
    //
    //  //if(key=="min_age"){
    //  //  searchParams["min_age"]=req.query[key];
    //  //}
    //  //if(key=="min_age"){
    //  //  searchParams["min_age"]=req.query[key];
    //  //}
    //  if(key=="country" && req.query[key]!==""){
    //    searchParams["country"]=req.query[key];
    //    User.find().where({ "country": req.query[key]})
    //    console.log("countyyyy");
    //  }
    //  if(key=="myprofile_ethnicity" && req.query[key]!==""){
    //    searchParams["min_age"]=req.query[key];
    //    User.find().where({ "country": req.query[key]})
    //  }
    //  if(key=="profession" && req.query[key]!==""){
    //    searchParams["myprofile_profession"]=req.query[key];
    //  }
    //  if(key=="education" && req.query[key]!==""){
    //    searchParams["myprofile_education"]=req.query[key];
    //  }
    //  if(key=="marital_status" && req.query[key]!==""){
    //    searchParams["myprofile_marital_status"]=req.query[key];
    //  }
    //  if(key=="salah" && req.query[key]!==""){
    //    searchParams["myprofile_salah"]=req.query[key];
    //  }
    //  if(key=="religiousness" && req.query[key]!==""){
    //    searchParams["myprofile_religious_strictness"]=req.query[key];
    //  }
    //  if(key=="build" && req.query[key]!==""){
    //    searchParams["myprofile_build"]=req.query[key];
    //  }
    //});

    //console.log(searchParams);
    //return;

    //User.find()
    //  .where({key : req.query[key]})
    //  .where()
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

    //User.find( {email:emails})
    Friend.find(req.body)
      .exec(function(err, data) {
        if (err) return next(err);
        res.json(data);
      });
  }
};

