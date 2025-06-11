const { model, Schema } = require('mongoose');

const camSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    nombre: String,
    texto_spa: String,
    camid: String,
    geometry: {
        latitude: Number,
        longitude: Number,
    },
    url: String,
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field
});

const Cams = model('cam', camSchema);

module.exports = Cams;