const socket = io.connect('http://localhost:9003');

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const send = async (message) => {

  const register = await navigator.serviceWorker.register('/worker.js');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey)
  });
  const str = subscription;
  const ab = {
    subscription: str,
    message
  };
  await fetch('http://localhost:9003/api/v1/notifications/notify', {
    method: 'post',
    body: JSON.stringify(ab),
    headers: {
      'content-type': 'application/json'
    }
  });
};

const publicKey = 'BDBWrChIwSY82qo-sN2Oi7tzOA5nhyXVonLm312OPKIVhw1CAjhT0l9FIVJcifRHQzvC0nBEI2nK4CWjSHt6mb8';
socket.on('request-notification-11', async (data) => {
  try {
    if ('serviceWorker' in navigator) {
      await send(data);
    }
  } catch (error) {
    console.log(error.message);
  }

});
