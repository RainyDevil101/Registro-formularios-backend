const { User, Material, Applicant, Entry, Ubication, Dispatcher, Role, Category, Out, Position, Supplier, Storage, Forum } = require('../models');

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
const userByIdExists = async ( id ) => {
    const userExists = await User.findById( id );
    if (!userExists) {
        throw new Error(`El id ${id} no existe`);
    }
}
const storageNameExists = async ( name, res ) => {
    const storageId = res.req.params.id
    const idStorageExists = await Storage.find({status: true}).where('_id').ne(storageId).then(function(idStorageExists) {
        return idStorageExists.filter( storage => storage.name.toLowerCase() === name.toLowerCase() )
    })
    if ( idStorageExists.length >= 1 ) {
        throw new Error(`El nombre ${ name } ya se encuentra en uso`);
    }
}
const storageByIdExists = async ( id ) => {
    const storageExists = await Storage.findById( id );
    if ( !storageExists ) {
        throw new Error (`El id: ${id} no existe`);
    }
}

const forumByIdExists = async ( id ) => {
    console.log(id);
    const forumExists = await Forum.findById( id );
    
    if ( !forumExists ) {
        console.log('pepe');
        throw new Error (`El id: ${id} no existe`);
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
    storageByIdExists,
    storageNameExists,
    userByIdExists,
    validRole,
    allowedCollections,
    forumByIdExists,
}