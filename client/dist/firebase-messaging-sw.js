importScripts('https://www.gstatic.com/firebasejs/3.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.7.0/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '<FIREBASE_SENDER_ID>'
});

const messaging = firebase.messaging();

self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  const notification = event.data.json().data;
  event.waitUntil(self.registration.showNotification(notification.title, {
    "body": notification.body,
    "icon": notification.icon,
    "data": {
      "url": notification.url
    }
  }));
}, false);

self.addEventListener('notificationclick', (event) => {
  event.waitUntil(self.clients.openWindow(event.notification.data.url));
}, false);
