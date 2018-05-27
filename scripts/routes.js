module.exports = function() {
  console.log("Starting scripts/routes.js");

  let routes = {
    pageType: {},
    mappings: []
  };

  // Add page type objects to mappings using .push() arguments. Properties:
  // 1. Required. `name` [pageType name, string]
  // 2. Required. `url` [path, regex] OR `element` [CSS selector, string]
  // 3. Required. `imports` [filename paths, array] OR `passthrough` [string of
  //  extra data for conditional passthrough, such as "perfectProxy"]

  routes.mappings.push(
    {
      name: "home",
      url: /^\/($|\?)/,
      imports: ["/pages/home.js"]
    },
    {
      name: "category",
      url: /shop/,
      imports: ["/pages/category.js"]
    },
    {
      name: "product",
      url: /sample-product/,
      imports: ["/pages/product.js"]
    },
    {
      name: "cart",
      element: "#CartContent",
      imports: ["/pages/cart.js"]
    }
  );

  return routes;
};
