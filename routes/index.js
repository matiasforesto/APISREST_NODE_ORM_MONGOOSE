import express from "express"

import {registrarUsuario, autenticarUsuario} from "../controllers/usuariosController.js"

import {nuevoCliente, 
        obtenerClientes, obtenerCliente, 
        updateCliente, 
        deleteCliente} from "../controllers/clientesController.js"


const router = express.Router()


//Usuarios
router.post('/crear-cuenta', registrarUsuario)
router.post('/iniciar-sesion', autenticarUsuario)

//Crear Cliente
router.post('/clientes', nuevoCliente)

//Ontener todos los clientes
router.get('/clientes', obtenerClientes)

//Obtener un cliente
router.get('/clientes/:id', obtenerCliente) 

//Actualizar cliente
router.put('/clientes/:id', updateCliente)

//Eliminar cliente
router.delete('/clientes/:id', deleteCliente)

export default function(){
    return router;
}
