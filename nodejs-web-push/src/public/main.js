const PUBLIC_VAPID_KEY = "BOykdeXSmYpuTvfwHVVWrfRwRZ_mHcc6RBPJwozdqrn3yKeLg4tfBqsnFv8vXkCM0VpinFtEqlw7WlLNd_p8PaM";

//Funcion otorgada en la documentación de web-push para convertir la información
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const subscription = async () => {

    //Service Worker
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: "/"
    });

    const subscript = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    await fetch('/suscription', {
        method: 'POST',
        body: JSON.stringify(subscript),
        headers: {
            "Content-Type": "application/json"
        }
    });

}

const form = document.querySelector('#my-form');
const message = document.querySelector('#msg');

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch('/new-message', {
        method: 'POST',
        body: JSON.stringify({
            message: message.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    form.reset();
});

subscription();