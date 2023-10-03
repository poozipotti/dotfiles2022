kitty --class="startupprogram" --detach zsh -c "slack & disown;i3-msg move to workspace 1" & disown;

kitty --class="startupprogram" --detach zsh -c "i3-msg move to workspace 2;cd ~/Repos/lemonade; yarn start" & disown;
kitty --class="startupprogram" --detach zsh -c "i3-msg move to workspace 2;cd ~/Repos/lemonade; yarn storybook" & disown;
kitty --class="startupprogram" --detach zsh -c "i3-msg move to workspace 2;ngrok start --all" & disown;
kitty --class="startupprogram" --detach zsh -c 'i3-msg move to workspace 2;docui' & disown;

docker restart $(docker ps -a -q) & disown;



