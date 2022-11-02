#!/usr/bin/env sh

# Terminate already running bar instances
killall -q polybar;
while pgrep -u $UID -x polybar > /dev/null; do sleep 1; done

for m in $(polybar --list-monitors | cut -d":" -f1); do
    PRIMARY=$(polybar --list-monitors | grep primary | cut -d":" -f1)
    echo $PRIMARY
    if [ "$m" = "$PRIMARY" ]; then
        MONITOR=$m polybar --reload top &
    else
        MONITOR=$m polybar --reload secondary &
    fi

done
