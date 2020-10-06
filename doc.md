create a .env
copy .env_sample to .env
<!-- to get pm2 service install pm2 --!>
npm i pm2 -g
<!-- to run -->
pm2 start ecosystem.config.cjs

<!-- to show the status -->

pm2 log
