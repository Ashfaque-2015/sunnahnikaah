/**
* Myphotos.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    user_id: {
      model: 'user'
    },
    img_path: {
      type: 'string',
      required: true
    },
    img_caption: {
      type: 'string'
    }
  }

};

