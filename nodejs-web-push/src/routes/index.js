const { Router } = require('express');
const router = Router();
const webpush = require('../webpush');

let pushSusbcription;

//Esta es la ruta que obtiene la suscripción del usuario al cargar la página
router.post('/suscription', async (req, res) => {
    //Recibimos en el body la infromación del cliente, keys, expiration time, etc..
    pushSusbcription = req.body;
    res.status(200).json();
});

router.post('/new-message', async (req, res) => {

    const { message } = req.body;

    //Esta es la notificación que queremos enviar al cliente, en formato string
    const payload = JSON.stringify({
        title: "Custo Push Message",
        message: message,
        icon: 'https://thumbs.dreamstime.com/b/icono-del-vector-mensaje-aislado-en-el-fondo-transparente-127331568.jpg'
    })

    //Aquí enviamos la notificación, y le decimos a que endpoint y que dato, esta información viene
    //desde el mismo body
    await webpush.sendNotification(pushSusbcription, payload);
})


module.exports = router;    
