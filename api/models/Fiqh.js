/**
 * Blog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
      fiqh_title: {
          type: 'string'
      },
      fiqh_title_slug: {
          type: 'string'
      },
      fiqh_desc: {
          type: 'string'
      },
      fiqh_category: {
          model: 'fiqhcategory'
      },
      fiqh_status: {
          type: 'string'//unpublished, published,trashed
      },
      fiqh_image:{
          type: 'string'
      },
      fiqh_author:{
        model: 'author'
      },
      tag_fiqhs: {
        collection: 'fiqhtag',
        via : "fiqh"
      }
      //fiqh_tag:{
      //  model: 'tag'
      //}

    }
};

