/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

module.exports = {

  schema: true,

  attributes: {
    user_group:{
      type: 'string' //registered, admin, super admin
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    encryptedPassword: {
      type: 'string'
    },
    //received_messages: {
    //  collection: 'message',
    //  via: 'receiver'
    //},
    //sent_messages: {
    //  collection: 'message',
    //  via: 'sender'
    //},

    threads1: {
      collection: 'thread',
      via: 'me'
    },
    threads2: {
      collection: 'thread',
      via: 'other_user'
    },
    roster_contacts: {
      type: 'json',
      defaultsTo: {}
    },
    profile_images: {
      collection: 'profileimages',
      via: 'user_id'
    },
    my_photos: {
      collection: 'myphotos',
      via: 'user_id'
    },
    my_friends: {
      collection: 'friend',
      via: 'me'
    },
    me_with: {
      collection: 'friend',
      via: 'with'
    },

    username: {
      type: 'string',
      required: true,
      unique: true
    },
    details: {
      type: 'string',
      required: false
    },

    looking_for_details: {
      type: 'string',
      required: false
    },

    first_name: {
      type: 'string',
      required: false
    },
    last_name: {
      type: 'string',
      required: false
    },
    maharam_email:{
      type: 'string',
      required: false
    },


    gender: {
      type: 'string',
      required: false
    },
    account_openning_for: {
      type: 'string',
      required: false
    },
    observe_salah_completely: {
      type: 'boolean',
      required: false
    },
    birthday: {
      type: 'string',
      required: false
    },
    address: {
      type: 'string',
      required: false
    },
    city: {
      type: 'string',
      required: false
    },
    country: {
      type: 'string',
      required: false
    },
    phone: {
      type: 'string',
      required: false
    },
    dob:{
      type:'date',
      required:false
    },
    dob_timestamp:{
      type:'integer',
      required:false
    },
    honest_search: {
      type: 'string',
      required: false
    },
    searching_for: {
      type: 'string',
      required: false
    },

//begin my profile
    myprofile_image: {
      type: 'string',
      required: false
    },

    myprofile_beard: {
      type: 'string',
      required: false
    },

    myprofile_religious_strictness: {
      type: 'string',
      required: false
    },

    myprofile_salah: {
      type: 'string',
      required: false
    },

    myprofile_quran_knowledge: {
      type: 'string',
      required: false
    },


    myprofile_arabic_knowledge: {
      type: 'string',
      required: false
    },


    myprofile_religious_history: {
      type: 'string',
      required: false
    },


    myprofile_addiction: {
      type: 'string',
      required: false
    },

    //another section

    myprofile_complexion: {
      type: 'string',
      required: false
    },

    myprofile_build: {
      type: 'string',
      required: false
    },

    myprofile_height: {
      type: 'string',
      required: false
    },


    myprofile_haircolor: {
      type: 'string',
      required: false
    },

    myprofile_disability: {
      type: 'string',
      required: false
    },

    myprofile_medicational_needs: {
      type: 'string',
      required: false
    },

    myprofile_lifelong_disease: {
      type: 'string',
      required: false
    },

    myprofile_education: {
      type: 'string',
      required: false
    },


    myprofile_profession: {
      type: 'string',
      required: false
    },
    myprofile_annual_income: {
      type: 'string',
      required: false
    },

    myprofile_own_house: {
      type: 'string',
      required: false
    },

    myprofile_net_asset: {
      type: 'string',
      required: false
    },

    myprofile_fathers_profession: {
      type: 'string',
      required: false
    },


    myprofile_mothers_profession: {
      type: 'string',
      required: false
    },
    myprofile_living_arrangements: {
      type: 'string',
      required: false
    },

    myprofile_marital_status: {
      type: 'string',
      required: false
    },

    myprofile_children: {
      type: 'string',
      required: false
    },


    myprofile_siblings: {
      type: 'string',
      required: false
    },

    myprofile_ethnicity: {
      type: 'string',
      required: false
    },


    myprofile_residency_status: {
      type: 'string',
      required: false
    },
    myprofile_first_language: {
      type: 'string',
      required: false
    },

// looking for

    lookingfor_beard: {
      type: 'string',
      required: false
    },
    lookingfor_religious_strictness: {
      type: 'string',
      required: false
    },
    lookingfor_salah: {
      type: 'string',
      required: false
    },
    lookingfor_religious_history: {
      type: 'string',
      required: false
    },
    lookingfor_quranic_knowledge: {
      type: 'string',
      required: false
    },
    lookingfor_arabic_knowledge: {
      type: 'string',
      required: false
    },
    lookingfor_build: {
      type: 'string',
      required: false
    },
    lookingfor_preferred_height: {
      type: 'string',
      required: false
    },
    lookingfor_age_group: {
      type: 'string',
      required: false
    },
    lookingfor_smoker: {
      type: 'string',
      required: false
    },
    lookingfor_physical_disability: {
      type: 'string',
      required: false
    },
    lookingfor_minimum_education: {
      type: 'string',
      required: false
    },
    lookingfor_annual_income: {
      type: 'string',
      required: false
    },
    lookingfor_asset: {
      type: 'string',
      required: false
    },
    lookingfor_social_class: {
      type: 'string',
      required: false
    },
    lookingfor_mahr: {
      type: 'string',
      required: false
    },

    lookingfor_marital_status: {
      type: 'string',
      required: false
    },
    lookingfor_living_arrangements: {
      type: 'string',
      required: false
    },
    lookingfor_willing_to_relocate: {
      type: 'string',
      required: false
    },
    lookingfor_view_towards_children: {
      type: 'string',
      required: false
    },
    lookingfor_family_type: {
      type: 'string',
      required: false
    },
    lookingfor_preferred_locations: {
      type: 'array'
    },
    lookingfor_ethnicity: {
      type: 'array'
    },
    lookingfor_preferred_professions: {
      type: 'array'
    },
    creedquestion_my_shahada_means: {
      type: 'string',
      required: false
    },
    creedquestion_I_make_dua_to: {
      type: 'string',
      required: false
    },
    creedquestion_Where_is_Allah: {
      type: 'string',
      required: false
    },
    creedquestion_My_Destiny_is: {
      type: 'string',
      required: false
    },
    creedquestion_Celebriting_prophets_birthday: {
      type: 'string',
      required: false
    },
    jid: {
      type: 'string',
      required: false
    },
    jpassword: {
      type: 'string',
      required: false
    },
  //--forgot pass-----------------

    fppasscode: {
      type: 'string',
      required: false
    },
    fptime: {
      type: 'integer',
      required: false
    },

 //---arf-----start----------------
 //   package: {
 //     type: 'string',
 //     required: false
 //   },

    bill_first_name: {
      type: 'string',
      required: false
    },

    bill_last_name: {
      type: 'string',
      required: false
    },

    bill_work_phone: {
      type: 'string',
      required: false
    },

    bill_home_phone: {
      type: 'string',
      required: false
    },

    bill_email: {
      type: 'string',
      required: false
    },

    bill_address: {
      type: 'string',
      required: false
    },

    bill_state: {
      type: 'string',
      required: false
    },

    bill_city: {
      type: 'string',
      required: false
    },
    bill_zip: {
      type: 'string',
      required: false
    },
    bill_country: {
      type: 'string',
      required: false
    },
    pay_first_name: {
      type: 'string',
      required: false
    },
    pay_last_name: {
      type: 'string',
      required: false
    },
    pay_work_phone: {
      type: 'string',
      required: false
    },
    pay_home_phone: {
      type: 'string',
      required: false
    },
    pay_email: {
      type: 'string',
      required: false
    },
    pay_address: {
      type: 'string',
      required: false
    },
    pay_state: {
      type: 'string',
      required: false
    },
    pay_city: {
      type: 'string',
      required: false
    },
    pay_zip: {
      type: 'string',
      required: false
    },
    pay_country: {
      type: 'string',
      required: false
    },
    card_number: {
      type: 'string',
      required: false
    },
    issue_date: {
      type: 'string',
      required: false
    },
    expiry_date: {
      type: 'string',
      required: false
    },
    expiry_month: {
      type: 'string',
      required: false
    },
    expiry_year: {
      type: 'string',
      required: false
    },
    card_type: {
      type: 'string',
      required: false
    },
    cvv2: {
      type: 'string',
      required: false
    },
 //--arf------end-----------------

    toJSON: function() {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  },

  beforeCreate: function(values, next) {
    //console.log("ekhane ki ashe update er shomoy");
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      //console.log("update pass",values.password);
      //console.log("update salt", salt);

      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) return next(err);

        values.encryptedPassword = hash;
        next();
      });
    });
  },

  beforeUpdate: function(values, next){
    console.log("update korte aise");
    if(values.hasOwnProperty("password") && values.password!="" && values.hasOwnProperty("confirmPassword") && values.confirmPassword!="" && values.password == values.confirmPassword){
      bcrypt.genSalt(10, function(err, salt){
        if (err) return next(err);
        console.log("update pass",values.password);
        console.log("update salt", salt);
        bcrypt.hash(values.password, salt, function(err, hash) {
          if (err) return next(err);
          console.log(hash);
          values.encryptedPassword = hash;
          next();
        });
      });
    }
    else
      next();
    //bcrypt.genSalt(10, function(err, salt){
    //  if (err) return next(err);
    //  console.log("update pass",values.password);
    //  console.log("update salt", salt);
    //  bcrypt.hash(values.password, salt, function(err, hash) {
    //    if (err) return next(err);
    //
    //    values.encryptedPassword = hash;
    //   next();
    //  });
    //});
  },

  validPassword: function(password, user, cb) {
    bcrypt.compare(password, user.encryptedPassword, function(err, match) {
      if (err) cb(err);

      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    });
  }
};
