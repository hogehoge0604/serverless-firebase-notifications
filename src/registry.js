'use strict'

const AWS = require('aws-sdk');
const S3 = new AWS.S3({ apiVersion: '2006-03-01' });
const request = require('request');

module.exports = (event, callback) => {
  const params = JSON.parse(event.body);

  console.log('https://iid.googleapis.com/iid/v1/' + params.token + '/rel/topics/' + params.topic);

  request.post({
    url: 'https://iid.googleapis.com/iid/v1/' + params.token + '/rel/topics/' + params.topic,
    method: 'POST',
    headers: {
      'Authorization': 'key=' + process.env.FIREBASE_SERVER_KEY
    }
  },  (err, response, body) => {
    if(err) {
      console.log(err);
    }
    console.log(body);
    return callback(200, {message: 'success'});
  });
}
