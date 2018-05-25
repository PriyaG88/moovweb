module.exports = function() {
  console.log("Starting scripts/sections/footer.js");

  let $mwFooter = $(tag("footer", {
    class: "mw-footer"
  }, "Powered by Moovweb"));
  $body.append($mwFooter);

  // This injects a snippet of code used locally with gulp live-reloading
  // Note: assert statements are ignored in production.
  fns.assert(true, function() {
    if (fns.layer("live-reload")) {
      require("/sections/browsersync.js")();
    }
  });
};
