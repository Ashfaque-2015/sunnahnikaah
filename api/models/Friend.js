/**
* Friend.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    me: {
      model: 'user',
      required: true
    },
    with: {
      model: 'user',
      required: true
    },

    invitation_status: {
      type: 'string'//,//pending, withdrawn/accepted/declined
      //required: true
    },
    favorite_status: {
      type: 'boolean'
    },
    show_photo_status:{
      type: 'string'//pending, withdrawn/accepted/declined
    }


  }
};

