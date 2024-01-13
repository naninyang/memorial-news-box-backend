NODE_ENV=production pnpm build
pm2 restart ecosystem.config.js
