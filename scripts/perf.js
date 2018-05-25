module.exports = function() {
  console.log("Starting scripts/perf.js");

  // This incorporates the moov_perf module, used for improving performance
  // of sites on mobile devices by reducing overhead of images
  const Perf = require("moov_perf");
  global.perf = new Perf(cheerio);

  // optimizeImg() will rewrite all img tags in the current scope to point to our optimizer
  $body.find("img").quality("80").optimizeImg();

  // Any images with srcs hosted by ignored domains will be skipped by optimizeImg
  // perf.ignore("www.domain.to.ignore")
};
