'use strict';

const FIREBASE_REGISTRY = require('./registry.js');
const FIREBASE_SEND_NOTIFICATION = require('./notification.js');

module.exports.registry = (event, context, callback) => {
  FIREBASE_REGISTRY(event, (status, result) => {
    const response = {
      statusCode: status,
      headers: {
        "Access-Control-Allow-Origin" : process.env.ALLOW_ORIGIN
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  })
}

module.exports.notification = (event, context, callback) => {
  FIREBASE_SEND_NOTIFICATION(event, (status, result) => {
    context.succeed({});
  })
}
