import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'
// Load env variables
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
// .env file variables
const PORT = process.env.PORT || 9000
const USER_MAIL = process.env.USER_MAIL
const USER_PASS = process.env.USER_PASS

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: USER_MAIL,
        pass: USER_PASS,
    },
})

app.get('/', (req, res) => {
    res.send(`Logs de Correos Enviados`)
})

app.post('/dataflow/cotizacion', async (req, res) => {
    // Datos Formulario de Cotización de Página Web de DataFlow
    const { nombre, empresa, email, fono, servicio, problema, presupuesto } = req.body
    console.log(req.body)
    const info = await transporter.sendMail({
        from: USER_MAIL,
        to: `formcontactos@gmail.com`,
        subject: `Cotización ${servicio}`,
        html: `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cotización ${servicio}</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    background-color: white;
                    color: #444;
                    font-family: Arial, Helvetica, sans-serif;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }
                h1 {
                    background-color: white;
                    color: orange;
                    text-align: center;
                    font-weight: bold;
                    font-size: 70px;
                    margin: 0;
                    padding: 30px;
                }
                main {
                    display: flex;
                    flex-direction: column;
                    margin-top: 30px;
                    padding: 0 200px 200px 200px;
                }
                h2 {
                    text-align: center;
                    font-weight: 700;
                    font-size: 40px;
                }
                .label-input {
                    display: block;
                    position: relative;
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
                label {
                    display: block;
                    font-size: 19px;
                    font-weight: 600;
                }
                input {
                    display: block;
                    width: 100%;
                    border-radius: 10px;
                    padding: 25px 25px;
                    margin-top: 10px;
                    margin-bottom: 20px;
                    font-size: 18px;
                    border: 0;
                    color: #444;
                    font-weight: 700;
                    background-color: orange;
                }
                textarea {
                    resize: none;
                    margin-top: 10px;
                    border-radius: 10px;
                    padding: 20px;
                    font-size: 18px;
                    font-weight: 700;
                    border: none;
                    color: #444;
                    background-color: orange;
                    width: 100%;
                }
            </style>
        </head>
        <body>
            <h1>Cotización ${servicio}</h1>
            <main>
                <div class="label-input">
                    <label for="nombre">Nombre</label>
                    <input id="nombre" type="text" value="${nombre}" disabled>
                </div>
                <div class="label-input">
                    <label for="empresa">Empresa</label>
                    <input id="empresa" type="text" value="${empresa}" disabled>
                </div>
                <div class="label-input">
                    <label for="email">Email</label>
                    <input id="email" type="text" value="${email}" disabled>
                </div>
                <div class="label-input">
                    <label for="fono">Número Celular</label>
                    <input id="fono" type="text" value="${fono}" disabled>
                </div>
                <h2>Problema</h2>
                <textarea rows="17" cols="50" disabled>${problema}</textarea>
            </main>
        </body>
        </html>`,
    })
    res.send(info.response)
})

app.post('/dataflow/contacto', async (req, res) => {
    // Formulario de Contacto de Página Web de DataFlow
    const { nombre, email, fono, problema } = req.body
    console.log(req.body)
    const info = await transporter.sendMail({
        from: USER_MAIL,
        to: `formcontactos@gmail.com`,
        subject: 'Contacto',
        text: `Nombre: ${nombre}\nFrom Email: ${email}\nFono: ${fono}\nProblema: ${problema}`,
    })

    res.send(info.response)
})

app.listen(PORT, () => `app listening on port ${PORT}`)