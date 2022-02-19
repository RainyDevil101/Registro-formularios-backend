const { response } = require('express');
const { Role } = require('../models');

const getRoles = async (req, res = response) => {
    const { limit = 100000, from = 0 } = req.query;
    const query = { status: true };
    const [total, roles] = await Promise.all([
        Role.countDocuments(query),
        Role.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .sort({ 'name': 1 })
    ]);
    res.json({
        total,
        roles
    })
};

module.exports = {
    getRoles,
}