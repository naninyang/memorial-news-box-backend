"use strict";

module.exports = {
  async findCollections(ctx) {
    try {
      const collections = Object.keys(strapi.contentTypes)
        .filter((type) => strapi.contentTypes[type].kind === "collectionType")
        .map((type) => ({
          name: type,
          attributes: Object.keys(strapi.contentTypes[type].attributes),
        }));

      ctx.send(collections);
    } catch (error) {
      ctx.send({ error: "Unable to fetch collection types" }, 500);
    }
  },
  async searchInCollection(ctx) {
    const { keyword, collectionName } = ctx.query;

    if (!keyword || !collectionName) {
      return ctx.send(
        { message: "Please provide a search keyword and collection name" },
        400
      );
    }

    try {
      const collectionType =
        strapi.contentTypes[`api::${collectionName}.${collectionName}`];

      if (!collectionType) {
        return ctx.send({ message: "Collection not found" }, 404);
      }

      const searchConditions = Object.keys(collectionType.attributes).map(
        (attr) => ({
          [attr]: { $containsi: keyword },
        })
      );

      const entries = await strapi
        .query(`api::${collectionName}.${collectionName}`)
        .findMany({
          where: { _or: searchConditions },
        });

      ctx.send(entries);
    } catch (error) {
      ctx.send({ error: "Unable to perform search" }, 500);
    }
  },
};
