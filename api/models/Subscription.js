/**
* Subscription.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    subscription_plan: {
      type: 'string',
      required: false
    },
    user_id: {
      type: 'string',
      required: false
    },
    start_time: {
      type: 'string',
      required: false
    },
    end_time: {
      type: 'string',
      required: false
    },
    payment_method: {
      type: 'string',
      enum: ['manual', 'paypal', ' authorize.net','credit_card']
    },
    transaction_status: {
      type: 'string',
      enum: ['created', 'payment_success', ' payment_failed']
    },
    subscription_status: {
      type: 'string',
      enum: ['alive', 'expired']
    }




  }
};

