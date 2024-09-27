"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
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
