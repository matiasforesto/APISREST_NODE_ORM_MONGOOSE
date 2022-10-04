import jwt from 'jsonwebtoken'

const authHeader = (req, res, next) => {
    //autorizacion por el header
    const auth = req.get('Authorization')

    if(!auth){
        const error = new Error('No autenticado, sin Token')
        error.statusCode = 401;
        
        res.json({
            mensaje: "No autenticado, sin Token",
            error: error
        })
        throw error
    }

    //obtener el token y verificarlo
    const token = auth.split(' ')[1] // posicion 0 viene Bearer y posicion 1 viene el token
    let revisarToken
    try {
        revisarToken = jwt.verify(token, 'LLAVESECRETA')//poner en variables de entorno
    } catch (error) {
        error.statusCode = 500;
        res.json({
            mensaje: "Error al validar el token",
            error: error
        })
        throw error
    }

    //Si es un token valido, pero hay algun error
    if(!revisarToken){
        const error = new Error('No autenticado')
        error.statusCode = 401
        res.json({
            mensaje: "Token expirado",
            error: error
        })
        throw error
    }

    next();
}

export{
    authHeader
}