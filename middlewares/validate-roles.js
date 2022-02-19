const { response, request } = require("express");
const adminRole = ( req, res = response, next  ) => {
    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token.'
        })
    }
    const { role, name } = req.user;
    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: '${name} no es administrador'
        });
    }
    next();
}
const hasRole = ( ...roles ) => {
    return ( req, res = response, next ) => {
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token.'
            })
        }
        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `No cumple con alguno de los roles ${ roles }`
            });
        }
        next();
    } 
}
module.exports = {
    adminRole,
    hasRole
}