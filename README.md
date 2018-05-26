# Serverless Firebase Push notifications

Push notifications by use of serverless framework

## Installation

If yet serverless framework not been installed. Please install from the following URL
https://serverless.com/framework/docs/providers/aws/guide/installation/

1. Create Firebase Project
https://firebase.google.com/

2. Clone `serverless-firebase-notifications` from github
```bash
git clone https://github.com/hogehoge0604/serverless-firebase-notifications.git
```
OR
```bash
wget https://github.com/hogehoge0604/serverless-firebase-notifications/archive/master.zip -O serverless-firebase-notifications.zip
unzip serverless-firebase-notifications.zip
```

2. Execute npm command
```bash
cd serverless-firebase-notifications
npm install
```

3. Edit file
conf/custom.js
___
```
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
```

| Edit place | Description |
-------------|-------------|
| <API_KEY_NAME> | Key name associated with API. Set appropriate key name |
| <S3_BUCKET_NAME> | Set the bucket name to store notification contents. |
| <S3_WEBSITE_BUCKET_NAME> | Set the bucket name to store the sample page. |
| <FIREBASE_SERVER_KEY> | Set the server key obtained from the Firebase project page. |

4. Deploy

```bash
serverless deploy
```

5. Edit file
client/dist/firebase-messaging-sw.js
___
```bash
firebase.initializeApp({
  'messagingSenderId': '<FIREBASE_SENDER_ID>'
});
```
| Edit place | Description |
-------------|-------------|
| <FIREBASE_SENDER_ID> | Set the sender id obtained from the Firebase project page. |

client/dist/js/app.js
___
```
const API_URL = '<API_URL>';
const API_KEY = '<API_KEY>';
```

| Edit place | Description |
-------------|-------------|
| <API_URL> | Set `endpoints` displayed when `serverless deploy` is completed |
| <API_KEY> | Set `api keys` displayed when `serverless deploy` is completed |

```
var config = {/** <FIRE_BASE_CONFIG> **/};
```

| Edit place | Description |
-------------|-------------|
| <FIRE_BASE_CONFIG> | Set the config obtained from the Firebase `Add Firebase to your web app` page. |

6. Deploy S3

```bash
serverless client deploy
```

## Usage

## License
The MIT License
