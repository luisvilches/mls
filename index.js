const express = require("express");
const app =  express();
const body = require("connect-multiparty")();
const cors = require("cors");
const NodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

app.use(cors());
app.get("/", (req,res) => {
    send("No deberias estar acá");
});

app.post("/lva",body,(req,res) => {
    var name = req.body.name;
    var mail = req.body.mail;
    var msg = req.body.msg;

    var template = `<section>
            <br><h3>Estimado administrador</h3><br>
            <p>Un nuevo mensaje enviado desde el formulario de luisvilches.cl</p>
            <br>
            <h4>Nombre: <b>${name}</b></h4>
            <h4>Correo: <b>${mail}</b></h4>
            <h4>Mensaje:</h4>
            <p>${msg}</p>
            <br/>
            <br>
            <h3><b>Atte. luisvilches.cl</b></h3>
    </section>`;

    let mailOptions = {
        from: 'lvilches21@gmail.com',
        to: 'lvilches21@gmail.com',
        subject: 'Formulario de Contacto luisvilches.cl',
        html: template
    };

    let transporter = NodeMailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'lvilches21@gmail.com',
            pass: 'andres3190'
        }
    }));

    transporter.sendMail(mailOptions, function(error, info){
    if (error){
        res.status(500).json({state:"error"});
    } else {
        res.status(200).json({state:"success"});
        console.log("Email sent");
    }})
})


app.listen(12345, err => {
    if(err) throw err;
    console.log("running")
})