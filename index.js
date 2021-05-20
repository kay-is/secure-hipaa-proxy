const servers = require("./server");
const client = require("./client");

const secret = "MUST_BE_LONGER_THAN_16_CHARACTERS";

async function main() {
  await servers.start(secret);
  await client.start();
}

main();
