module.exports = {

  attributes: {

    me: {
      model: 'user'
    },
    me_jid: {
      type: 'string'
    },
    other_user: {
      model: 'user'
    },
    other_user_jid: {
      type: 'string'
    },
    messages: {
      collection: 'message',
      via : "id"
    },
    last_message : {
      type:'string'
    },
    is_approved: { //for both way subscription done at ejabberd server
      type: 'boolean'
    },
    me_approved: { //only me subscribe
      type: 'boolean'
    },
    other_user_approved: { //only other user subscribe
      type: 'boolean'
    },
    me_unread_notification : {
      type : 'integer'
    },
    other_user_unread_notification : {
      type : 'integer'
    }

  }

};
