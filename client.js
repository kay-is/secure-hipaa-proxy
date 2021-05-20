const axios = require("axios");

async function logEvent(event) {
  return axios.post("http://localhost:9000/event", { event });
}

async function getResults() {
  const response = await axios.get("http://localhost:9000/results");
  return response.data.results;
}

async function testPlaintext() {
  console.log("[Client   ] ========== Testing plaintext ==========");
  console.log("[Client   ] Sending event: plaintext-event-a");
  await logEvent("plaintext-event-a");
  console.log("[Client   ] Sending event: plaintext-event-a");
  await logEvent("plaintext-event-a");
  console.log("[Client   ] Sending event: plaintext-event-a");
  await logEvent("plaintext-event-a");

  console.log("[Client   ] Sending event: plaintext-event-b");
  await logEvent("plaintext-event-b");
  console.log("[Client   ] Sending event: plaintext-event-b");
  await logEvent("plaintext-event-b");

  const results = await getResults();
  console.log("[Client   ] Results: ", results);
}

async function logEventProxy(event) {
  return axios.post("http://localhost:9999/event", { event });
}

async function getResultsProxy() {
  const response = await axios.get("http://localhost:9999/results");
  return response.data.results;
}

async function testEncrypted() {
  console.log("[Client   ] ========== Testing encrypted ==========");
  console.log("[Client   ] Sending event: secret-event-a");
  await logEventProxy("secret-event-a");
  console.log("[Client   ] Sending event: secret-event-a");
  await logEventProxy("secret-event-a");
  console.log("[Client   ] Sending event: secret-event-a");
  await logEventProxy("secret-event-a");

  console.log("[Client   ] Sending event: secret-event-b");
  await logEventProxy("secret-event-b");
  console.log("[Client   ] Sending event: secret-event-b");
  await logEventProxy("secret-event-b");

  const results = await getResultsProxy();
  console.log("[Client   ] Results: ", results);
}

exports.start = async () => {
  await testPlaintext();
  await testEncrypted();
};
