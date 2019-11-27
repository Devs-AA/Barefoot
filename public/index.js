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
  let register = await navigator.serviceWorker.getRegistration('/worker.js');
  if (!register) {
    register = await navigator.serviceWorker.register('/worker.js');
  }
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey)
  });
  const reqObj = {
    subscription,
    message
  };
  try {
    await fetch('http://localhost:9003/api/v1/notifications/notify', {
      method: 'post',
      body: JSON.stringify(reqObj),
      headers: {
        'content-type': 'application/json'
      }
    });
  } catch (error) {
    console.log(error);
  }
 
};

const publicKey = 'BDBWrChIwSY82qo-sN2Oi7tzOA5nhyXVonLm312OPKIVhw1CAjhT0l9FIVJcifRHQzvC0nBEI2nK4CWjSHt6mb8';
socket.on('notify-11', async (data) => {
  try {
    if ('serviceWorker' in navigator) {
      await send(data);
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
});
socket.on('notify-15', async (data) => {
  try {
    if ('serviceWorker' in navigator) {
      await send(data);
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
});
