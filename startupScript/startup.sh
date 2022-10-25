docker container start pubsub;
docker container start lemonade-api-api-1;
docker container start lemonade-flask_server-1;
docker container start lemonade-api-treasury-1;
cd ~/Repos/lemonade; 
code .; 
cd ~/Repos/lemonade-api/; 
code .;
st -e zsh -c "cd ~/Repos/lemonade; yarn start" & disown;
st -e zsh -c "cd ~/Repos/lemonade; yarn storybook" & disown;
st -e zsh -c 'ngrok http localhost:5000 --hostname "george-treasury.ngrok.io" --region us' & disown;
st -e zsh -c 'ngrok http 127.0.0.1:9000 --hostname=george-webhook.ngrok.io --region us' & disown;
st -e zsh -c 'ngrok http 127.0.0.1:3000 --hostname "*.mighty.george.ngrok.io" --region us' & disown;


docui;

