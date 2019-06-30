/**
* Blog.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    post_title: {
      type: 'string'
    },
    post_title_slug: {
      type: 'string'
    },
    post_desc: {
      type: 'string'
    },
    post_category: {
      model: 'blogcategory'
    },
    post_status: {
      type: 'string'//unpublished, published,trashed
    },
    post_image:{
      type: 'string'
    },
    post_author:{
      model: 'author'
    },
    //post_tag:{
    //  model: 'tag'
    //}
    post_tag: {
      type: 'array',
      required: false
    },
    tag_blogs: {
      collection: 'blogtag',
      via : "blog"
    }
  }
};

