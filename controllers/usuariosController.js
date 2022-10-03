import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import {Usuarios} from "../models/Usuarios.js"

const registrarUsuario = async(req, res, next) => {
    //leet los datos y pasarlos al modelo
    const usuario = new Usuarios(req.body)
    const {password} = req.body
    usuario.password = await bcrypt.hash(password, 12) //cantidad de saltos
    
    try{
        await usuario.save(),
        res.json({
            mensaje: "Usuario creado correctamente",
            usuario: usuario
        })

    }catch(error){
        res.json({
            mensaje: "Hubo un error",
            error: error
        })
        next()
    }
}

const autenticarUsuario = async(req, res, next) => {
    try{
        const {email, password} = req.body
        const usuario = await Usuarios.findOne({email})

        if(!usuario){//no existe
            await res.status(401).json({mensaje: 'Ese usuario no existe'})
            next()
        }else{//existe, verificamos el pass
            if(!bcrypt.compareSync(password, usuario.password))
            {
                await res.status(401).json({mensaje: 'Password incorrecto'})
                next()
            }else{
                //password correcto, firmar el token
                const token = jwt.sign({
                    email: usuario.email,
                    nombre: usuario.nombre,
                    id: usuario._id
                }, 'LLAVESECRETA',//poner en variables de entorno
                {
                    expiresIn: '6h'
                })

                res.json({token})
            }
        }

    }catch(error){

    }
}

export {
    registrarUsuario,
    autenticarUsuario
}