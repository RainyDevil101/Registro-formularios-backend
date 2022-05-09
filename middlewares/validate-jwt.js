const { response, request } = require('express');
const jwt = require('jsonwebtoken');    
const { User } = require('../models');
const validateJWT = async ( req = request, res = response, next ) => {
    
    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición.'
        })
    }
    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await User.findById( uid );
        if ( !user ) {
            return res.status(401).json({
                msg: 'Token no válido.'
            })
        }
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Token no válido.'
            })
        }
        
        req.user = user;
        console.log(req.body.name);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido.'
        })
    }
}
module.exports = {
    validateJWT
}