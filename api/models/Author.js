/**
* Author.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    author_name: {
      type: 'string'
    },
    author_type: {
      type: 'string'
    },
    author_slug: {
      type: 'string'
    },
    author_blogs: {
      collection: 'blog',
      via: 'post_author'
    },
    author_videos: {
      collection: 'video',
      via: 'video_author'
    },
    author_fiqhs: {
      collection: 'fiqh',
      via: 'fiqh_author'
    }
  }
};

