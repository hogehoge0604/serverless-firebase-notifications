'use strict'

const AWS = require('aws-sdk');
const S3 = new AWS.S3({ apiVersion: '2006-03-01' });
const request = require('request');

const dateformat = require('dateformat');

module.exports = (event, callback) => {
  const CURRENT_DATE = dateformat(new Date(), 'yyyymmdd_HHMM');
  console.log('begin: ' + CURRENT_DATE);

  const get_objects = () => {
    return new Promise((resolve, reject) => {
      S3.listObjects({
        Bucket: process.env.BUCKET,
      }, function (err, data) {
        if(err) {
          console.log(err);
          reject(err);
        }
        resolve(data.Contents);
      });
    });
  };

  const get_object = (key) => {
    return new Promise((resolve, reject) => {
      S3.getObject({
        Bucket: process.env.BUCKET,
        Key: key
      }, function (err, data) {
        if(err) {
          console.log(err);
          reject(err);
        }
        resolve(JSON.parse(data.Body.toString()));
      });
    });
  };

  const send_notification = (key, body) => {
    
    request.post({
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'key=' + process.env.FIREBASE_SERVER_KEY
      },
      body: JSON.stringify({
        to: '/topics/' + process.env.TOPIC_NAME,
        priority: 'high',
        data: body
      })
    },  (error, response, body) => {
      console.log(error);
      console.log(body);
    });
  };

  get_objects().then((objects) => {
    objects.forEach((object) => {
      if(object.Key.indexOf(CURRENT_DATE) === 0) {
        console.log('notification target key: ' + object.Key);
        get_object(object.Key).then((body) => {
          send_notification(object.Key, body);
        })
      }
    });
  });
}
