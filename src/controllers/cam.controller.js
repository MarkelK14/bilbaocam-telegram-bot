const { time } = require('console');
const Cam = require('../models/cam.model.js');
const Requests = require('../models/request.model.js');
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

const getCamById = async (id, username) => {
    try {
        const cam = await Cam.findOne({ id });
        cam.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${cam.geometry.latitude},${cam.geometry.longitude}`;

        

        // await Requests.create({
        //     id: cam.id,
        //     nombre: cam.nombre,
        //     texto_spa: cam.nombre,
        //     camid: cam.camid,
        //     geometry: {
        //         latitude: cam.geometry.latitude,
        //         longitude: cam.geometry.longitude
        //     },
        //     url: cam.url,
        //     google_maps_url: cam.googleMapsUrl
        // });

        try {
            // Busca si ya existe en Requests
            const req = await Requests.findOne({ id });
        
            if (req) {
                // Si existe, actualiza
                await Requests.updateOne(
                    { id },
                    {
                        $inc: { request_count: 1 },
                        $push: { requests: { requested_on: new Date() } }
                    }
                );
            } else {
                // Si no existe, crea
                await Requests.create({
                    id: cam.id,
                    nombre: cam.nombre,
                    texto_spa: cam.nombre,
                    camid: cam.camid,
                    geometry: {
                        latitude: cam.geometry.latitude,
                        longitude: cam.geometry.longitude
                    },
                    url: cam.url,
                    google_maps_url: cam.googleMapsUrl,
                    request_count: 1,
                    requests: [{ requested_on: new Date() }]
                });
            }
        } catch (error) {
            console.error('Error buscando request por ID:', error);
            return null;            
        }

        return cam;
    }
    catch (error) {
        console.error('Error buscando cam por ID:', error);
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