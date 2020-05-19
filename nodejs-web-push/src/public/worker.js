console.log("Service Worker!");

//De esta forma el worker, escucha el evento push de su propio archivo con 'self'
self.addEventListener('push', e => {
    const data = e.data.json();
    console.log(data);
    self.registration.showNotification(data.title, {
        body: data.message,
        
    });
});