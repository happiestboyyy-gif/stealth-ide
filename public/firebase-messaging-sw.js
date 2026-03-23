importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD_mSrX-dLTjq-SN6miy9CMiGUrmZA7SE4",
  authDomain: "stealth-ide.firebaseapp.com",
  projectId: "stealth-ide",
  storageBucket: "stealth-ide.firebasestorage.app",
  messagingSenderId: "309579499450",
  appId: "1:309579499450:web:d5413a19692d1ccb6d3f83",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification("New Message 💬", {
    body: payload.notification.body,
    icon: "/icon-192.png",
  });
});