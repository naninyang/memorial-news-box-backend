"use strict";

module.exports = {
  async findCollections(ctx) {
    try {
      // Strapi의 content-types 서비스를 사용하여 컬렉션 타입 가져오기
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
};
