docker container start lemonade-api-api-1;
docker container start lemonade-flask_server-1;
cd ~/Repos/lemonade; 
code .; 
cd ~/Repos/lemonade-api/; 
code .;
st -e zsh -c "cd ~/Repos/lemonade; yarn start" & disown;
st -e zsh -c "cd ~/Repos/lemonade; yarn storybook" & disown;
docui;

