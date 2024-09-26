"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/search",
      handler: "collection.searchInCollection",
      config: {
        auth: false,
      },
    },
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
