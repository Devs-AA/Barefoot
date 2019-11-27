self.addEventListener('push', async (e) => {
  const data = e.data.json();
  await self.registration.showNotification(data.title, {
    body: data.body,
  });
});
