/**
* Tag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    tag_title: {
      type: 'string'
    },
    tag_slug: {
      type: 'string'
    },
    tag_desc: {
      type: 'string'
    },
    tag_status: {
      type: 'string'//published, unpublished, trashed
    },
    //posts: {
    //  type: 'array'
    //},
    //videos: {
    //  type: 'array'
    //},
    //fiqh:{
    //  type:'array'
    //},
    blog_tags: {
      collection: 'blogtag',
      via : "tag"
    },
    video_tags: {
      collection: 'videotag',
      via : "tag"
    },
    fiqh_tags: {
      collection: 'fiqhtag',
      via : "tag"
    }
  }
};

