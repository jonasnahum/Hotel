var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {

        var transporter = nodemailer.createTransport({
            service: 'Mailgun',
            auth: {
                user: process.env.EMAIL_USER || 'postmaster@sandboxf9a06959cc684146bef93b1b8250ac9b.mailgun.org',
                pass: process.env.EMAIL_PASS || '52e52c9ac4f8dcc9468b236345d0559b'
            }
        });
         var html = '<p><b>Nombre:</b> ' + req.body.name +'</p>'+
               '<p><b>Email:</b> ' + req.body.email +'</p>'+
               '<p><b>Teléfono:</b> ' + req.body.phone +'</p>'+
               '<p><b>Mensage:</b> ' + req.body.message +'</p>';
        var mailOptions = {
            from: "weburuapan@gmail.com",
            to: "jonasnahum@gmail.com",//a quien le va a llegar el correo.
            subject: "Páginas Web Uruapan",
            text: req.body.message,
            html: html
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                return next(error);
            }
            console.log("exito");
            res.json({ success: true });
        });
});

module.exports = router;
