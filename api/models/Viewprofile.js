/**
* Viewprofile.js
*
* @description :: This model will store user profile view statistics.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    me: {
      model: 'user'
    },
    visitor: {
      model: 'user'
    },
    how_many:{
      type: 'integer'
    },
    visit_time_ip:{
      type: 'array' //key = when visit time, value = ip address (from where user visiting)
    }
  }

};

