module.exports = {
  apps: [
    {
      name: "memorial-news-box-backend",
      script: "pnpm",
      args: "start",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
