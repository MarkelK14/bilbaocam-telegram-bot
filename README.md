# BilbaoCam Telegram Bot

BilbaoCam Telegram Bot is a Node.js application that allows users to interact with real-time traffic cameras in Bilbao via Telegram. The bot provides live images, camera locations, and search functionality for all available city cameras.

## Features

- **List all cameras:** Get a list of all available traffic cameras in Bilbao.
- **Search by name:** Find cameras by typing part of their name (accent-insensitive).
- **Get camera by ID:** Retrieve the location and live image of a camera by sending its ID (e.g., `/4222`).
- **Camera location:** The bot sends the exact location of the camera as a map pin in Telegram, allowing you to open it directly in your preferred maps app.
- **Request logging:** The bot logs each camera request, including timestamps and request counts.

## Usage

### Telegram Commands

- `/start` — Show the welcome message and usage instructions.
- `/help` — Display help and available commands.
- `/all` — List all available cameras (split into multiple messages if needed).
- Type a camera name — Search for cameras by name (case and accent-insensitive).
- `/[camera_id]` — Get the location and live image for a specific camera (e.g., `/3872`).

### Example

```
/start
/help
/all
Plaza Euskadi (Museo Bellas Artes)
/4081
```

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/MarkelK14/bilbaocam-telegram-bot.git
   cd bilbaocam-telegram-bot
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file with the following variables:
   ```env
   BOT_TOKEN="your_telegram_bot_token"
   BOT_URL="https://your-server-url.com"
   NODE_ENV="DEVELOPMENT" # or "PRODUCTION" (must be one of these values)
   MONGO_DEVELOPMENT_URL="mongodb://localhost:27017/BilbaoCam"
   MONGO_PRODUCTION_URL="your_production_mongodb_url"
   ```
4. **Start the bot:**
   ```sh
   npm start
   ```

## Project Structure

- `index.js` — Main entry point and bot logic
- `src/controllers/` — Camera and request controllers
- `src/models/` — Mongoose models for cameras and requests
- `src/config/db.js` — Database connection setup

## Requirements

- Node.js 16+
- MongoDB database
- Telegram Bot Token

## License

This project is licensed under the MIT License.