cd ~/Repos/lemonade; 
code .; 
cd ~/Repos/lemonade-api/; 
code .;
st -e zsh -c "cd ~/Repos/lemonade; yarn start" & disown;
st -e zsh -c "cd ~/Repos/lemonade; yarn storybook" & disown;
docker container start lemonade_flask_server_1;
docker container start lemonade-api_api_1;
