module.exports = ({ env }) => ({
  "netlify-deployments": {
    enabled: true,
    config: {
      accessToken: process.env.NETLIFY_ACCESS_TOKEN,
      sites: [
        {
          name: env("NETLIFY_SITE_NAME"),
          id: env("NETLIFY_SITE_ID"),
          buildHook: `https://api.netlify.com/build_hooks/${env(
            "NETLIFY_BUILDHOOK"
          )}`,
          branch: "main",
        },
      ],
    },
  },
});
