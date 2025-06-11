const { request } = require('express');
const { model, Schema } = require('mongoose');

const requestLogSchema = new Schema({
    id: String,
    nombre: String,
    texto_spa: String,
    camid: String,
    geometry: {
        latitude: Number,
        longitude: Number,
    },
    url: String,
    google_maps_url: String,
    request_count: {
        type: Number,
        default: 1
    },
    requests: [
        {
            requested_on: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: false, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field
});

const Request = model('request', requestLogSchema);

module.exports = Request;
