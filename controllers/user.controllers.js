const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');

const usersGet = async (req = request, res = response) => {
    const { limit = 10000000, from = 0 } = req.query;
    const query = { status: true };
    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .populate('position', 'name')
        .populate('task', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);
    res.json({
        total,
        users
    });
}

const getUser = async (req = request, res = response) => {
    const {id} = req.params;
    const user = await User.findById(id).where('status').equals(true)
                    .sort({'name': 1 })
                    .populate('position', 'name')
                    .populate('task', 'name')
    res.json(user);
}

const usersPost = async (req, res = response) => {
    const { name, mail, password, role, ...data } = req.body;
    const user = new User({ name, mail, password, role, ...data });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.json({
        user
    });
}
const usersDelete = async (req, res = response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate( id, { status: false } );
    res.json({ user });
}
const usersPut = async (req, res = response) => {
    const { id } = req.params;
    const { uid, password , ...rest } = req.body;
    if (password) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(id, rest, { new: true });
    res.json(updatedUser);
}
module.exports = {
    usersGet,
    usersPost,
    usersDelete,
    getUser,
    usersPut
}