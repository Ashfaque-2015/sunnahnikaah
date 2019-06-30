module.exports = {
  attributes: {
    thread: {
      model: 'thread'
    },
    from: {
      type: 'string'
    },
    to: {
      type: 'string'
    },
    body: {
      type: 'string',
      required: true
    },
    is_read: {
      type: 'boolean'
    },
    is_deleted: {
      type: 'boolean'
    }
  }
};
