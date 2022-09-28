import {Clientes} from "../models/Clientes.js";

//agrega nuevo ciente
const nuevoCliente = async(req, res, next) => {
   const cliente = new Clientes(req.body)

   try{
        await cliente.save()
        res.json({
            mensaje: "Se agrego un nuevo cliente",
            cliente: req.body
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

export {  
    nuevoCliente
}