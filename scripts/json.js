module.exports = function() {
  console.log("Starting scripts/json.js");
  return body.replace(env.source_host, env.host);
};
