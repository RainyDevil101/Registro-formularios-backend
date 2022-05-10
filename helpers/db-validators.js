const { User, Role, Forum } = require('../models');

const validRole = async (role = '') => {
   
    const roleExists = await Role.findOne({ role })
    if (!roleExists) {
        throw new Error(`El rol ${role} no existe`)
    }
}
const mExists = async (mail = '') => {
    const emailExist = await User.findOne({ mail });
    if (emailExist) {
        throw new Error(`El correo ${mail} ya está registrado`)
    }
}
const emailNameExists = async ( mail, res ) => {
    const userId = res.req.params.id
    const idUserExists = await User.find().where('_id').ne(userId).then(function(idUserExists) {
        return idUserExists.filter( user => user.mail === mail )
    })
    if ( idUserExists.length >= 1 ) {
        throw new Error(`El email ${ mail } ya se encuentra en uso`);
    }
}
const userByIdExists = async ( id ) => {
    const userExists = await User.findById( id );
    if (!userExists) {
        throw new Error(`El id ${id} no existe`);
    }
}

const forumByIdExists = async ( id ) => {
    const forumExists = await Forum.findById( id );
    
    if ( !forumExists ) {
        console.log('pepe');
        throw new Error (`El id: ${id} no existe`);
    }
}

const validPassword = async ( password, res ) => {

    if (password) {
        
        if (password.length < 6)
        throw new Error ('La contraseña debe tener un mínimo de 6 carácteres al momento de ser actualizada')

    }

}

const allowedCollections = ( collection = '', collections = []) => {

    console.log(collection, collections);

    const included = collections.includes( collection );
    if (!included) {
        throw new Error(`La colección ${collection} no es permitida, ${collections}`)
    }

    return true;
}

module.exports = {
    mExists,
    userByIdExists,
    validRole,
    allowedCollections,
    forumByIdExists,
    emailNameExists,
    validPassword,
}