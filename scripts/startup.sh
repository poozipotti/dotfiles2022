#cd ~/Repos/lemonade; 
#code .; 
#cd ~/Repos/lemonade-api/; 
#code .;
kitty --class="startupprogram" --detach zsh -c "cd ~/Repos/lemonade; yarn start" & disown;
kitty --class="startupprogram" --detach zsh -c "cd ~/Repos/lemonade; yarn storybook" & disown;
kitty --class="startupprogram" --detach zsh -c "ngrok start --all" & disown;
#kitty --class="startupprogram" --detach zsh -c 'ngrok http localhost:5000 --hostname "george-treasury.ngrok.io" --region us' & disown;
#kitty --class="startupprogram" --detach zsh -c 'ngrok http 127.0.0.1:9000 --hostname=george-webhook.ngrok.io --region us' & disown;
#kitty --class="startupprogram" --detach zsh -c 'ngrok http 127.0.0.1:3000 --hostname "*.mighty.george.ngrok.io" --region us' & disown;
kitty --class="startupprogram" --detach zsh -c 'docui' & disown;

docker restart $(docker ps -a -q);

