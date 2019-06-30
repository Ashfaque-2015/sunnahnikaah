module.exports = {

  attributes: {
    category_title: {
      type: 'string',
      required: true
    },
    category_slug: {
      type: 'string',
      required: true
    },
    category_desc: {
      type: 'string'
    },
    category_status: {
      type: 'string'//published, unpublished, trashed
    },
    posts: {
      collection: 'blog',
      via: 'post_category'
    }


  }
};

