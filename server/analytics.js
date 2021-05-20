const express = require("express");

exports.start = () =>
  new Promise((resolve) => {
    const eventStore = [];

    const api = express();
    api.use(express.json());

    api.post("/event", ({ body: { event } }, response) => {
      console.log("[Analytics] Received: " + event);
      eventStore.push(event);
      response.status(201).json("201 - Created");
    });

    api.get("/results", (request, response) => {
      const results = eventStore.reduce((results, event) => {
        if (!results[event]) results[event] = 0;
        results[event]++;
        return results;
      }, {});

      console.log("[Analytics] Sending results: ", results);

      response.status(200).json({ results });
    });

    api.listen(9000, () => {
      console.log("[Analytics] Listening on port 9000");
      resolve();
    });
  });
