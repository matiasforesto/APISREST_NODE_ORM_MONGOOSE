import express from "express"

import {registrarUsuario, autenticarUsuario} from "../controllers/usuariosController.js"

import {nuevoCliente, 
        obtenerClientes, obtenerCliente, 
        updateCliente, 
        deleteCliente} from "../controllers/clientesController.js"

//middleware para proteger las rutas
import {authHeader} from '../middleware/auth.js'

const router = express.Router()


//Usuarios
router.post('/crear-cuenta', authHeader, registrarUsuario)
router.post('/iniciar-sesion', autenticarUsuario)

//Crear Cliente
router.post('/clientes', authHeader, nuevoCliente)

//Ontener todos los clientes
router.get('/clientes', authHeader, obtenerClientes)

//Obtener un cliente
router.get('/clientes/:id', authHeader, obtenerCliente) 

//Actualizar cliente
router.put('/clientes/:id', authHeader, updateCliente)

//Eliminar cliente
router.delete('/clientes/:id', authHeader, deleteCliente)

export default function(){
    return router;
}
