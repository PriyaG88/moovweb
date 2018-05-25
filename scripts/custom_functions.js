
// Override node_modules functions or create your own custom functions here.
fns.checkRedirect = function() {
  // Sets up redirection system by checking for the presence of a
  // "mobile_redirect" meta tag.
  let redirectUrl;
  if ($head.find("meta[name='mobile_redirect']").length > 0) {
    redirectUrl = $head.find("meta[name='mobile_redirect']").attr("content");
    console.log("==> Found mobile_redirect meta tag in the head, redirecting to " + redirectUrl);
    fns.export("Location", redirectUrl);
  }
};

fns.shouldPerfectProxy = function(environment, data) {
  let isStatus200 = environment.status.indexOf("2") === 0;
  let isStatus300 = environment.status.indexOf("3") === 0;
  let shouldPP = Object.keys(data.pageType).length === 0 || data.pageType.passthrough === "perfectProxy";
  return isStatus300 || (isStatus200 && shouldPP);
};

fns.constructPageType = function() {
  // Constructs the routes.pageType object that holds the data required for mapping
  // the given page.
  let path = env.path;
  let mappings = routes.mappings;
  let elementCheck; // check for content using CSS element selector on the page
  let pathCheck; // check by path

  for (let i = 0; i < mappings.length; i++) {
    // This loop sets the routes.pageType object for this response
    let page = mappings[i];
    elementCheck = page.element && $html.find(page.element).length > 0;
    pathCheck = page.url && page.url.test(path);
    if (elementCheck || pathCheck) {
      routes.pageType = page;
      fns.setPageType(routes.pageType.name); // moov_stdlib: stack trace debugging
      break;
    }
  }
};

fns.importTransformations = function() {
  // Constructs the proper mapping output by require()ing (importing) all files
  // associated with the page. Will not operate on 300s, since they're handled
  // via the fns.shouldPerfectProxy() call in index.js.
  if (env.status.indexOf("2") === 0) {
    // 2xx (200s, ...)
    if (routes.pageType.imports) {
      for (let i = 0; i < routes.pageType.imports.length; i++) {
        // import all files associated with this pageType
        let filepath = routes.pageType.imports[i];
        console.log("Starting scripts" + filepath);
        require(filepath)();
      }
    }
  } else {
    // 4xx (404s, ...)
    require("/pages/error.js")();
  }
};
