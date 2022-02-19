const { response } = require('express');
const { Ubication } = require('../models');
const getUbications = async ( req, res = response ) => {
    const { limit = 1000000000000000000, from = 0 } = req.query;
    const query = { status: true };
    const [ total, ubications ] = await Promise.all([
        Ubication.countDocuments(query).where('storage').equals(req.user.storage),
        Ubication.find(query).where('storage').equals(req.user.storage)
                .populate( 'user', 'name' )
                .skip(Number( from ))
                .limit(Number( limit ))
    ]);
    res.json({
        total,
        ubications
    })
};
const getUbication = async ( req, res = response ) => {
    const { id } = req.params;
    const ubication = await Ubication.findById( id ).where('status').equals(true)
                                                    .where('storage').equals(req.user.storage)
            .populate( 'user', 'name' )
    res.json( ubication );
};
const createUbication = async ( req, res = response ) => {
    
    const { user, storage, ...body }  = req.body;
    const name = req.body.name.toUpperCase();
    const ubicationNameDB = await Ubication.findOne({ name });
    const ubicationCodeDB = await Ubication.findOne().sort({'_id':-1}).limit(1);
    const ubicationCode = ubicationCodeDB.ubicationCode + 1;
    if ( ubicationNameDB ) {
        return res.status(400).json({
            msg: `La ubicación ${ ubicationNameDB.name } ya se encuentra registrada.`
        });
    }
    // Generate DATA
    const data = {
        ...body,
        ubicationCode,
        storage: req.user.storage,
        name: req.body.name.toUpperCase(),
        user: req.user._id
    }
    const ubication = new Ubication( data );
    //Save DB
    await ubication.save();
    res.status(201).json( ubication );
}
const updateUbication = async (req, res = response) => {
    const { id } = req.params;
    const { status, ...data } = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.storage = req.user.storage,
    data.user = req.user._id;
    const updatedUbication = await Ubication.findByIdAndUpdate(id, data, { new: true });
    res.json(updatedUbication)
}
const deleteUbication = async ( req, res = response ) => {
    const { id } = req.params;
    const deletedUbication = await Ubication.findByIdAndUpdate( id, { status: false }, { new: true });
    res.json( deletedUbication )
}
module.exports = {
    createUbication,
    getUbication,
    getUbications,
    updateUbication,
    deleteUbication
}