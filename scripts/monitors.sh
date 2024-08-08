#!/bin/sh
killall -q polybar;

MONITORS=$( xrandr --query | rg " connected" | cut -d " " -f 1) 
LAPTOP_MONITOR="eDP-1"
MONITOR_COUNT=0

for m in $MONITORS; do
    MONITOR_COUNT=$(($MONITOR_COUNT+1))
    if [ "$m" != "$LAPTOP_MONITOR" ]; then
        xrandr --output $m --auto --left-of $LAPTOP_MONITOR --primary;
        MONITOR=$m polybar top & disown;
    else
        MONITOR=$m polybar secondary & disown;
    fi
done 

MULTI_BACKGROUND="Pictures/Wallpapers/FairyLand/full_wallpaper.png"
BACKGROUND=$MULTI_BACKGROUND

if [ $MONITOR_COUNT -gt 1 ]; then
        echo "multi"
        feh --bg-scale --no-xinerama -Z $MULTI_BACKGROUND;
    else 
        killall -q polybar;
        MONITOR=$LAPTOP_MONITOR polybar top & disown;
        xrandr --auto;
        xrandr --output eDP-1 --primary;
        echo "single";
        feh --bg-tile --no-xinerama -Z $BACKGROUND;
fi

