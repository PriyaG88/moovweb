module.exports = function() {
    console.log('Starting scripts/sections/browsersync.js');

    $body.append('<script type="text/javascript" id="__bs_script__">//<![CDATA[\n \
      var path = "http://"+location.hostname+":9099/browser-sync/browser-sync-client.js";\n \
      var script = document.createElement("script");\n \
      script.src = path; script.async = true;\n \
      document.write(script.outerHTML);\n \
      //]]></script>');
};
