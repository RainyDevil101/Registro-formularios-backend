const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Applicant, Material, Entry, Dispatcher, Category, Out, Supplier, Ubication, Position, Storage, Request } = require('../models');

const allowedCollections = [
    'applicants',
    'categories',
    'dispatchers',
    'entries',
    'materials',
    'outs',
    'positions',
    'storage',
    'suppliers',
    'ubications',
    'users',
    'requests',
];

const searchUsers = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const user = await User.findById(term);
        res.json({
            results: (user) ? [user] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const users = await User.find({
        $or: [{ name: regex }, { mail: regex }],
        $and: [{ state: true }]
    });
    res.json({
        results: users
    })
}
const searchMaterials = async (term = '', req, res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const material = await Material.findById(term);
        return res.json({
            results: (material) ? [material] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const materials = await Material.find({ name: regex, status: true }).where('storage').equals(req);
    res.json({
        results: materials
    })
}
const searchEntries = async (term = '', req, res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const entry = await Entry.findById(term);
        return res.json({
            results: (entry) ? [entry] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const entries = await Entry.find({ name: regex, status: true }).where('storage').equals(req);
    res.json({
        results: entries
    })
}
const searchApplicants = async (term = '', req, res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const applicant = await Applicant.findById(term).where('status').equals(true);
        return res.json({
            results: (applicant) ? [applicant] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const code = Number(term);
    if (isNaN(term)) {
        const applicants = await Applicant.find({ name: regex, status: true }).where('storage').equals(req);
        res.json({
            results: applicants
        })
    } else {
        const applicants = await Applicant.find({ code: code, status: true }).where('storage').equals(req);
        res.json({
            results: applicants
        })
    }
}
const searchCategories = async (term = '', req, res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const category = await Category.findById(term).where('status').equals(true);
        return res.json({
            results: (category) ? [category] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const code = Number(term);
    if (isNaN(term)) {
        const categories = await Category.find({ name: regex, status: true }).where('storage').equals(req);
        res.json({
            results: categories
        })
    } else {
        const categories = await Category.find({ code: code, status: true }).where('storage').equals(req);
        res.json({
            results: categories
        })
    }
}
const searchDispatchers = async (term = '', req, res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const dispatcher = await Dispatcher.findById(term);
        return res.json({
            results: (dispatcher) ? [dispatcher] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const dispatchers = await Dispatcher.find({ name: regex, status: true }).where('storage').equals(req);
    res.json({
        results: dispatchers
    })
}
const searchOuts = async (term = '', req, res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const outs = await Out.findById(term);
        return res.json({
            results: (outs) ? [outs] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const outs = await Out.find({ name: regex, status: true }).where('storage').equals(req);
    res.json({
        results: outs
    })
}
const searchSuppliers = async (term = '', req, res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const supplier = await Supplier.findById(term).where('status').equals(true);
        return res.json({
            results: (supplier) ? [supplier] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const code = Number(term);
    if (isNaN(term)) {
        const suppliers = await Supplier.find({ name: regex, status: true }).where('storage').equals(req);
        res.json({
            results: suppliers
        })
    } else {
        const suppliers = await Supplier.find({
            $or: [{ code: code }, { rut: code }],
            $and: [{ state: true }]
        });
        res.json({
            results: suppliers
        })
    }
}
const searchUbications = async (term = '', req, res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const ubication = await Ubication.findById(term).where('status').equals(true);
        return res.json({
            results: (ubication) ? [ubication] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const code = Number(term);
    if (isNaN(term)) {
        const ubications = await Ubication.find({ name: regex, status: true }).where('storage').equals(req);
        res.json({
            results: ubications
        })
    } else {
        const ubications = await Ubication.find({ code: code, status: true }).where('storage').equals(req);
        res.json({
            results: ubications
        })
    }
}
const searchPositions = async (term = '', req, res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const position = await Position.findById(term).where('status').equals(true);
        return res.json({
            results: (position) ? [position] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const code = Number(term);
    if (isNaN(term)) {
        const positions = await Position.find({ name: regex, status: true }).where('storage').equals(req);
        res.json({
            results: positions
        })
    } else {
        const positions = await Position.find({ code: code, status: true }).where('storage').equals(req);
        res.json({
            results: positions
        })
    }
}
const searchRequests = async (term = '', req, res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const request = await Request.findById(term).where('status').equals(true);
        return res.json({
            results: (request) ? [request] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const code = Number(term);
    if (isNaN(term)) {
        const requests = await Request.find({ name: regex, status: true }).where('storage').equals(req);
        res.json({
            results: requests
        })
    } else {
        const requests = await Request.find({ code: code, status: true }).where('storage').equals(req);
        res.json({
            results: requests
        })
    }
}
const searchStorages = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const storage = await Storage.findById(term).where('status').equals(true);
        return res.json({
            results: (storage) ? [storage] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const code = Number(term);
    if (isNaN(term)) {
        const storages = await Storage.find({ name: regex, status: true });
        res.json({
            results: storages
        })
    } else {
        const storages = await Storage.find({ code: code, status: true });
        res.json({
            results: storages
        })
    }
}
const search = (req, res = response) => {
    const storageUser = req.user.storage;
    const { collection, term } = req.params;
    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${allowedCollections}.`
        })
    }
    switch (collection) {
        case 'users':
            searchUsers(term, res);
            break;
        case 'materials':
            searchMaterials(term, storageUser, res);
            break;
        case 'entries':
            searchEntries(term, storageUser, res);
            break;
        case 'applicants':
            searchApplicants(term, storageUser, res);
            break;
        case 'categories':
            searchCategories(term, storageUser, res);
            break;
        case 'outs':
            searchOuts(term, storageUser, res);
            break;
        case 'suppliers':
            searchSuppliers(term, storageUser, res);
            break;
        case 'ubications':
            searchUbications(term, storageUser, res);
            break;
        case 'storages':
            searchStorages(term, res);
            break;
        case 'dispatchers':
            searchDispatchers(term, storageUser, res);
            break;
        case 'positions':
            searchPositions(term, storageUser, res);
            break;
        case 'requests':
            searchRequests(term, storageUser, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvidó hacer esta busqueda.'
            })
    }
}
module.exports = {
    search
}