#!/bin/sh
MONITORS=$( xrandr --query | rg " connected" | cut -d " " -f 1) 
LAPTOP_MONITOR="eDP-1"
MONITOR_COUNT=0

for m in $MONITORS; do
    MONITOR_COUNT=$(($MONITOR_COUNT+1))
    if [ "$m" != "$LAPTOP_MONITOR" ]; then
        xrandr --output $m --auto --left-of $LAPTOP_MONITOR --primary;
    fi
done 

MULTI_BACKGROUND="Pictures/Wallpapers/buckerooflower.png"
BACKGROUND="Pictures/Wallpapers/buckerooflower.png"

if [ $MONITOR_COUNT > 1 ]; then
        echo "multi"
        feh --bg-scale --no-xinerama -Z $MULTI_BACKGROUND
        i3-msg "workspace 0, move workspace to output DP2"


    else 
        echo "single"
        feh --bg-tile --no-xinerama -Z $BACKGROUND
fi


sh ~/.config/polybar/launch.sh & disown;

