const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { User, Task } = require('../models');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {

    const { mail, password } = req.body;

    try {

        //Verify if mail exists
        const user = await User.findOne({ mail })

        if ( !user ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        //Verify if user is active
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        //Verify password
        const validatePassword = bcryptjs.compareSync( password, user.password );
        if ( !validatePassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })
        }
        const userTask = await Task.findById(user.task);
        
        

        //Generate JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token,
            userTask,
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador.'
        });

    }
}

const renovateToken = async ( req, res = response ) => {

    const { user } = req;
    const token = await generateJWT( user.id );
    const userTask = await Task.findById(user.task);
    res.json({
        user,
        token,
        userTask
    })

}
module.exports = {
    login,
    renovateToken
}