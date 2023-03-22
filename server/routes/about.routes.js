const about = require("express").Router();

const message = {
  client: {
    host: "10.101.53.35",
  },
  server: {
    current_time: 1631790000,
    services: [
      {
        name: "weather",
        widgets: [
          {
            name: "city_temperature",
            description: "Display temperature for a city",
            params: [
              {
                name: "city",
                type: "string",
              },
            ],
          },
        ],
      },
      {
        name: "exchange",
        widgets: [
          {
            name: "exchange_rate",
            description: "Display exchange rate for a currency",
            params: [
              {
                name: "currency_base",
                type: "string",
              },
              {
                name: "currency_target",
                type: "string",
              },
            ],
          },
        ],
      },
      {
        name: "youtube",
        widgets: [
          {
            name: "youtube_video",
            description: "Display number of views for a video",
            params: [
              {
                name: "video_id",
                type: "string",
              },
            ],
          },
        ],
      },
    ],
  },
};

about.get("/", (req, res) => {
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const currentTime = new Date(); // Obtenir l'heure actuelle

  // Mettre à jour l'objet message avec les informations d'adresse IP et de temps actuel
  message.client.host = ipAddress;
  message.server.current_time = currentTime.getTime();

  res.json({ message });
});

module.exports = about;
