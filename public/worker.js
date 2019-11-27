self.addEventListener('push', async (e) => {
  const data = e.data.json();
  console.log(data);
  await self.registration.showNotification(data.title, {
    body: data.body,
  });
});
