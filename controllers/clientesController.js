import {Clientes} from "../models/Clientes.js";

//agrega nuevo ciente
const nuevoCliente = async(req, res, next) => {
   const cliente = new Clientes(req.body)

   try{
        await cliente.save()
        res.json({
            mensaje: "Se agrego un nuevo cliente",
            cliente: cliente
        })
   }catch(error){
        res.json({
            mensaje: "Hubo un error",
            error: error
        })
        //console.log(error)
        next()
   }
}

//lista todos los clientes
const obtenerClientes = async(req, res, next) => {
    try{
        const clientes = await Clientes.find({})
        res.json(clientes)

    }catch(error){
        res.json({
            mensaje: "Hubo un error",
            error: error
        })
        //console.log(error)
        next()
    }
}

//Obtener un cliente por id
const obtenerCliente = async(req, res, next) => {
    try{
        const id = req.params.id
        const cliente = await Clientes.findById(req.params.id)

        if(!cliente){
            res.json({mensaje: 'Ese cliente no existe'})
            next()
        }
        
        res.json(cliente)

    }catch(error){
        res.json({
            mensaje: "Hubo un error",
            error: error
        })
        //console.log(error)
        next()
    }
} 

//actualizar cliente
const updateCliente = async(req, res, next) => {
    try{
            const cliente = await Clientes.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
            res.json(cliente)
    }catch(error){
        res.json({
            mensaje: "Hubo un error",
            error: error
        })
        next()
    }
}

//borrar cliente
const deleteCliente = async(req, res, next) => {
    try{
            const cliente = await Clientes.findOneAndDelete({_id: req.params.id})
            res.json({mensaje: "Cliente eliminado"})
            
    }catch(error){
        res.json({
            mensaje: "Hubo un error",
            error: error
        })
        next()
    }
}

export {  
    nuevoCliente,
    obtenerClientes,
    obtenerCliente,
    updateCliente,
    deleteCliente
}