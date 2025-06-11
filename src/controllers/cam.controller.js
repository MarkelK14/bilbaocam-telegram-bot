const Cam = require('../models/cam.model.js');
const https = require('https');

const getAllCamNames = async () => {
    try {
        const cams = await Cam.find({}, 'id nombre');
        return cams;
    } catch (error) {
        return null;
    }
}

const getCamsByName = async (name) => {
    try {
        // const cams = await Cam.find({ nombre: new RegExp(name, 'i') }); // case-insensitive search
        const cams = await Cam.find({});
        const normalizado = quitarTildes(name).toLowerCase();
        const filtrados = cams.filter(cam =>
            quitarTildes(cam.nombre).toLowerCase().includes(normalizado)
        );
        return filtrados;
    } catch (error) {
        console.error('Error buscando cams:', error);
        return null;
    }
};

const getCamById = async (id) => {
    try {
        const cam = await Cam.findOne({ id });
        return cam;
    }
    catch (error) {
        return null;
    }
}

const getCamImageById = async (id) => {
    try {
        const cam = await Cam.findOne({ id });
        if (!cam || !cam.url) {
            return null;
        }

        return new Promise((resolve, reject) => {
            https.get(cam.url, (res) => {
                const data = [];
                res.on('data', chunk => data.push(chunk));
                res.on('end', () => {
                    const buffer = Buffer.concat(data);
                    resolve(buffer);
                });
            }).on('error', (err) => {
                reject(null);
            });
        });
        
    }
    catch (error) {
        return null;
    }
}

const quitarTildes = (texto) =>{
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports = {
    getAllCamNames,
    getCamsByName,
    getCamById,
    getCamImageById
};