const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { uploadFile } = require('../helpers');

const { Forum } = require('../models');

const uploadFileCon = async (req, res = response) => {

    try {
        // const name = await uploadFile( req.files, ['txt', 'md'] );
        const name = await uploadFile( req.files, undefined, 'imgs' );

        res.json({name});

    } catch (msg) {
        res.status(400).json({msg})
    }

}

const updateImage = async (req, res = response) => {

    const { id, collection } = req.params;

    let modelo;

    switch (collection) {
        case 'forum':
            
                modelo = await Forum.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: 'No existe un usuario con ese id'
                    })
                }

            break;
    
        default:
            return res.status(500).json({ msg: "Error" })
    }

    //Clear prev images

    if (modelo.imgAn) {
        const pathImage = path.join(__dirname, '../uploads', collection, modelo.imgAn);
        if ( fs.existsSync(pathImage) ) {
            fs.unlinkSync(pathImage);
        }
    }

    const name = await uploadFile( req.files, undefined, collection );
    modelo.imgAn = name;

    await modelo.save();

    res.json(modelo)

}

    module.exports = {
        uploadFileCon,
        updateImage
    }