const encryptor = require("simple-encryptor");
const express = require("express");
const axios = require("axios");

exports.start = (secret) =>
  new Promise((resolve) => {
    const crypto = encryptor(secret);
    const cryptoStore = {
      encrypt(event) {
        if (!this[event]) {
          this[event] = crypto.encrypt(event);
          this[cryptoStore[event]] = event;
        }
        return this[event];
      },
      decrypt(encryptedEvent) {
        return this[encryptedEvent];
      },
    };

    const api = express();

    api.use(express.json());

    api.post("/event", async ({ body: { event } }, response) => {
      console.log("[Proxy    ] Received: " + event);

      const res = await axios.post("http://localhost:9000/event", {
        event: cryptoStore.encrypt(event),
      });

      response.status(res.status).end(res.data);
    });

    api.get("/results", async (request, response) => {
      const { data, status } = await axios.get("http://localhost:9000/results");

      const decryptedResults = {};
      Object.keys(data.results).forEach((encryptedEvent) => {
        const event = cryptoStore.decrypt(encryptedEvent);
        if (!event) {
          decryptedResults[encryptedEvent] = data.results[encryptedEvent];
        } else {
          decryptedResults[event] = data.results[encryptedEvent];
        }
      });

      response.status(status).json({ results: decryptedResults });
    });

    api.listen(9999, () => {
      console.log("[Proxy    ] Listening on port 9999");
      resolve();
    });
  });
