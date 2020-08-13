#!/bin/bash
printSeparator() {
    echo -e ""
    echo -e ""
}

printColored() {
    TEXT="${1}";

    printf "\e[38;2;248;138;0m${TEXT} \e[0m\n";
}

printError() {
    TEXT="${1}";

    printf "\e[38;2;255;0;0m${TEXT}\e[0m\n";
}

printListItem() {
    TEXT="${1}";
    CHECK_MARK="\e[38;2;0;255;0m\xE2\x9C\x94\e[0m";

    echo -e "${CHECK_MARK} ${TEXT}";
}

printHeader() {
    clear;
    printColored "   _____                           __                  _   ___         _      ";
    printColored "  / ___/___  ______   _____  _____/ /__  __________   / | / (_)___    (_)___ _";
    printColored "  \__ \/ _ \/ ___/ | / / _ \/ ___/ / _ \/ ___/ ___/  /  |/ / / __ \  / / __ \`/";
    printColored " ___/ /  __/ /   | |/ /  __/ /  / /  __(__  |__  )  / /|  / / / / / / / /_/ / ";
    printColored "/____/\___/_/    |___/\___/_/  /_/\___/____/____/  /_/ |_/_/_/ /_/_/ /\__,_/  ";
    printColored "                                                                /___/         ";
}

printHeader
printSeparator
printColored "Installing node modules on your directories"
printSeparator

for d in */ ; do
    printColored "$d"
    cd $d
    npm i &> /dev/null
    cd ..
done

printSeparator;
read -n 1 -s -r -p "Press any key to continue....";
clear;