'use strict';

(() => {
  const API_URL = '<API_URL>';
  const API_KEY = '<API_KEY>';
  const TOPIC_NAME = 'topic';

  var wait = (millisec) => {
    return new Promise((resolve) => {
      setTimeout(resolve, millisec)
    });
  };

  var config = {/** <FIRE_BASE_CONFIG> **/};

  navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
    return navigator.serviceWorker.ready;
  }).catch((err) => {
    console.error(err);
  }).then((registration) => {
    firebase.initializeApp(config);

    const messaging = firebase.messaging();

    messaging.useServiceWorker(registration);
    messaging.requestPermission()
      .then(() => wait(5000))
      .then(() => messaging.getToken())
      .then((myToken) => {
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'X-API-KEY': API_KEY
          },
          body: JSON.stringify({
            token: myToken,
            topic: TOPIC_NAME,
          }),
        });
      })
      .catch(e => console.log(e));
  });
})();
