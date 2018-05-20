module.exports = () => {
  return {
    region: 'ap-northeast-1',
    apikey: '<API_KEY_NAME>',
    adminBucketName: '<S3_BUCKET_NAME>',

    // Lambda time zone
    timezone: 'Asia/Tokyo',

    // Access-Control-Allow-Origin
    origin: '*',

    // public repository
    client: {
      bucketName: '<S3_WEBSITE_BUCKET_NAME>'
    },

    firebase: {
      // server key
      key: '<FIREBASE_SERVER_KEY>',
      topicName: 'topic'
    }
  }
}
