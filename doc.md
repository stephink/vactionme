create a .env
copy .env_sample to .env
# to get pm2 service install pm2 
npm i pm2 -g
# to run 
pm2 start ecosystem.config.cjs

# to show the status 

pm2 log

# Benchmarking

Eg:- 
npm i -g autocannon
autocannon -c 50 -d 10 localhost:7001/admin/userstest -H "authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaWppbiIsImlhdCI6MTU5NTMyNjc3Mn0.Bg_JexyEP476OkHvTIHUoIK6xrudXW-s7MzFd1IMCn4"

