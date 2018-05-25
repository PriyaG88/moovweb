module.exports = function() {
  console.log("Starting scripts/sections/header.js");

  let $mwHeader = $(tag("header", { class: "mw-header" }));
  $body.prepend($mwHeader);
};
