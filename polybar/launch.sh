#!/usr/bin/env sh

# Terminate already running bar instances
killall -q polybar;
while pgrep -u $UID -x polybar > /dev/null; do sleep 1; done

for m in $(polybar --list-monitors | cut -d":" -f1); do
    PRIMARY=$(polybar --list-monitors | grep primary | cut -d":" -f1)
    if [ "$m" = "$PRIMARY" ]; then
        MONITOR=$m polybar top
    else
        MONITOR=$m polybar secondary
    fi

done
