/**
* Notification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    me_id:{
      model: 'user'
    },
    other_id:{
      model: 'user'
    },
    thread_id:{
      model: 'thread'
    },
    last_message:{
      type: 'string'
    }  
  }
};
