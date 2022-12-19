Server Installations (Common):

Extras -> sudo yum install screen nano libcurl-devel 

Datadog agent (from there website) 

Node JS/NPM/NVM -> sudo yum install -y nodejs nvm  

To launch:
yarn && yarn build && pm2 start "yarn start:prod" --name "kafkabackend"
