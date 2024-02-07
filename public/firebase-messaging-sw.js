importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyDbpEMidLyoKRtxjFVtWu7_d32eH6fDS3o",
    authDomain: "tom-tobar-dev-portfolio-chat.firebaseapp.com",
    projectId: "tom-tobar-dev-portfolio-chat",
    storageBucket: "tom-tobar-dev-portfolio-chat.appspot.com",
    messagingSenderId: "261103496619",
    appId: "1:261103496619:web:778b234c59ec3d63dfb6ee",
    measurementId: "G-559XLB4R1W"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
