import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "./utils/firebaseClient";

const messaging = getMessaging(app);

// 🔥 REQUEST PERMISSION + GET TOKEN
export const initNotifications = async () => {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (!isMobile) {
    console.log("Notifications blocked on desktop");
    return;
  }

  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BGs6FHftBRoc269_qJ0kEPKpWGbnM1S4D-TjWCxFZ1c8sWABjb-ZeWYbJ5TFD9GIZLwzWAG-rUDhOCnT6SNRzsk",
    });

    console.log("FCM TOKEN:", token);
  }
};

// 🔥 FOREGROUND NOTIFICATION
export const listenMessages = () => {
  onMessage(messaging, (payload) => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // 🚫 BLOCK DESKTOP
    if (!isMobile) return;

    new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: "/icon-192.png",
    });

    // 📳 vibration
    if ("vibrate" in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  });
};