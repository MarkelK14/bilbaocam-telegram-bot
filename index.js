// Import necessary modules
const express = require('express');
const { Telegraf } = require('telegraf');
const { getAllCamNames, getCamById, getCamImageById } = require('./src/controllers/cam.controller');

// Load environment variables
require('dotenv').config();

// Config DB
require("./src/config/db");

// Initialize Express app and middleware
const app = express();
app.use(express.json());

// Initialize Telegram bot with token from environment variables
const bot = new Telegraf(process.env.BOT_TOKEN);

// Set up bot webhook
app.use(bot.webhookCallback('/telegram-bot'));
bot.telegram.setWebhook(`${process.env.BOT_URL}/telegram-bot`);

// Define a basic endpoint for testing
app.post('/telegram-bot', (req, res) => res.send('All OK'));

// Add your bot commands below in this section
bot.command('start', (ctx) => {
    ctx.reply('Welcome!');
});

bot.command('all', async (ctx) => {
    ctx.reply('This is a command to get all items.');
    const cams = await getAllCamNames();
    await ctx.reply(cams.map(cam => `${cam.nombre} /${cam.id}`).join('\n'));
});

bot.hears(/^\/(\d+)$/, async (ctx) => {
    const camId = ctx.match[1];

    const cam = await getCamById(camId);
    if (!cam) {
        ctx.reply('Cámara no encontrada.');
        return;
    }
    ctx.reply(`Cámara ${cam.nombre}`);

    const buffer = await getCamImageById(camId);
    if (buffer) {
        await ctx.replyWithPhoto({ source: buffer });
    } else {
        ctx.reply('No se pudo obtener la imagen de la cámara.');
    }
    ctx.reply('Ejecutado');
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});