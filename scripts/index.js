require("/custom_functions.js");

global.routes = require("/routes.js")();

module.exports = function() {
  let contentType = env.content_type || "";
  console.log("Starting scripts/index.js: upstream response code:", env.status, "contentType:", contentType);

  // If running locally and the url includes ?moov_debug=true, break here.
  if (env.path.indexOf("moov_debug=true") >= 0) {
    breakpoint("Parameter 'moov_debug=true' detected in the URL.");
  }

  // If the content is HTML, parse the DOM and use scripts/html.js to transform the HTML
  if (contentType.indexOf("html") > -1) {
    fns.init$(body);
    fns.constructPageType();

    // Perfect Proxy means we return the HTML to the user unmodified.
    if (fns.shouldPerfectProxy(env, routes)) {
      return {
        htmlparsed: false
      };
    }

    // Run the scripts/html.js HTML transformer
    require("/html.js")();
    return {
      body: $.html(),
      htmlparsed: true
    };
  }

  // If the content is JSON, use scripts/json.js to transform the JSON body
  if (contentType.indexOf("application/json") > -1) {
    return {
      body: require("/json.js")(),
      htmlparsed: false
    };

  }

  if (fns.isRobots()) {
    // Prevents crawlers from accessing non-production urls
    return {
      body: fns.handleRobots(body),
      htmlparsed: true
    };

  }

  // If the content is XML, you can transform the xml body here
  if (contentType.indexOf("xml") > -1) {
    fns.init$(body, { xmlMode: true });
    return {
      body: $.xml(),
      htmlparsed: true
    };

  }

  // When we haven"t matched any content-type that we plan on transforming
  console.log("Passing through " + contentType + " unmodified.");
  return { htmlparsed: false };
};
