/**
 * Video.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    video_title: {
      type: 'string'
    },
    video_slug: {
      type: 'string'
    },
    video_desc: {
      type: 'string'
    },
    video_category: {
      model: 'videocategory'
    },
    video_type: {
      type: 'string'//youtube, embeded,
    },
    video_link: {
      type: 'string'
    },
    video_status: {
      type: 'string'//unpublished, published, trashed
    },
    video_author: {
      model: 'author'
    },
    tag_videos: {
      collection: 'videotag',
      via : "video"
    }
    //video_tag: {
    //  model: 'tag'
    //}
  }
};

