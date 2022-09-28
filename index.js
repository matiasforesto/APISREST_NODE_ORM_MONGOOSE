import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import routes from './routes/index.js'

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapi', {
    useNewUrlParser: true
});

//crear el servidor
const app = express()

//Habilitar bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Rutaaaas de la app
app.use('/', routes())
//puerto
app.listen(5000)