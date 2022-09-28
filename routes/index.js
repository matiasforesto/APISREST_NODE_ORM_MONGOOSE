import express from "express"

import {nuevoCliente} from "../controllers/clienteController.js"


const router = express.Router()


router.post('/clientes', nuevoCliente)

export default function(){
    return router;
}
