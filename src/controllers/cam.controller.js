const Cam = require('../models/cam.model.js');

const getAllCamNames = async () => {
    try {
        const cams = await Cam.find({}, 'id nombre');
        return cams;
    } catch (error) {
        return null;
    }
}

const getCamById = async (id) => {
    try {
        const cam = await Cam.findOne({ id }, 'url');
        return cam;
    }
    catch (error) {
        return null;
    }
}

module.exports = {
    getAllCamNames,
    getCamById
};