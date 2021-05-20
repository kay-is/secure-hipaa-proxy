const analytics = require("./analytics");
const proxy = require("./proxy");

exports.start = async (secret) => {
  await analytics.start();
  await proxy.start(secret);
};
