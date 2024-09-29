module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "https://semo-cq.vercel.app",
        "https://semo.dev1stud.io",
        "https://nol2tr.dev1stud.io",
        "http://localhost:8282",
        "http://localhost:3123",
        "http://localhost:3007",
      ],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
