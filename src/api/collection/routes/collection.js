"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/collections",
      handler: "collection.findCollections",
      config: {
        auth: false,
      },
    },
  ],
};
