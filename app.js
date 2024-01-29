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
    const { nombre, empresa, email, fono, servicio, problema, experiencia, presupuesto } = req.body
    console.log(req.body)
    const info = await transporter.sendMail({
        from: USER_MAIL,
        to: `marcelo.milla@gmail.com, ${email}`,
        subject: `Cotización ${servicio}`,
        text: `Nombre: ${nombre}\nEmpresa: ${empresa}\nEmail: ${email}\nFono: ${fono}\nServicio: ${servicio}\nProblema: ${problema}\nExperiencia: ${experiencia}\nPresupuesto: ${presupuesto}`,
    })
    res.send(info.response)
})

app.post('/dataflow/contacto', async (req, res) => {
    // Formulario de Contacto de Página Web de DataFlow
    const { nombre, email, fono, problema } = req.body

    const info = await transporter.sendMail({
        from: USER_MAIL,
        to: `marcelo.milla@gmail.com, ${email}`,
        subject: 'Contacto',
        text: `Nombre: ${nombre}\nFrom Email: ${email}\nFono: ${fono}\nProblema: ${problema}`,
    })

    res.send(info.response)
})

app.listen(PORT, () => `app listening on port ${PORT}`)