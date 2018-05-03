const levels = {};

/*
LEVEL TEMPLATE
==============

levels["level0"] = {
    grid: [
        ["********************"],
        ["*..................*"],
        ["*..................*"],
        ["*..................*"],
        ["*..................*"],
        ["*..................*"],
        ["*..................*"],
        ["*..................*"],
        ["*..................*"],
        ["*..................*"],
        ["*..................*"],
        ["********************"],
    ]
}

. = empty space
* = wall
@ = cactus (rewind)
! = cake (win state)
$ = player (controller)
# = turret
*/

levels["level1"] = {
    grid: [
        ["********************"],
        ["*@@@@@@@@@@@@@@@@@@*"],
        ["*@...............!@*"],
        ["*@.@@@@@@@@@@@@@@@@*"],
        ["*@.@@@@@@@@@@@@@@@@*"],
        ["*@................@*"],
        ["*@................@*"],
        ["*@..@@@@@@@@@@@@..@*"],
        ["*@................@*"],
        ["*@...............$@*"],
        ["*@@@@@@@@@@@@@@@@@@*"],
        ["********************"],
    ]
}

levels["level2"] = {
    grid: [
        ["********************"],
        ["*..@@@@@@@@@@@@@@@@*"],
        ["*.................!*"],
        ["*..@@@@@@@@@@@@@@@@*"],
        ["*..................*"],
        ["****....@@@....*****"],
        ["*..................*"],
        ["*..**************..*"],
        ["*..................*"],
        ["*@@@@@...@@..@@@@@@*"],
        ["*$.................*"],
        ["********************"],
    ]
}

levels["level3"] = {
    grid: [
        ["********************"],
        ["*!.@..*......*.....*"],
        ["*..@..*...@..*..*@.*"],
        ["*..@..*...*..*..*..*"],
        ["*..@..*...@..*..*.@*"],
        ["*..@..*...*..*@.*..*"],
        ["*..@..*...@..*..*@.*"],
        ["*..@..*...*..*..*..*"],
        ["*..@..*...@..*..*.@*"],
        ["*..@..*...*..@..*..*"],
        ["*.........*.....*.$*"],
        ["********************"],
    ]
}

levels["level4"] = {
    grid: [
        ["********************"],
        ["*..@@@@@@@@@@@@@@@@*"],
        ["*.................!*"],
        ["*..@@@@@@@@@@@@@@@@*"],
        ["*..................*"],
        ["****....@#@....*****"],
        ["*..................*"],
        ["*..**************..*"],
        ["*..................*"],
        ["*@@@@@...@@..@@@@@@*"],
        ["*$.................*"],
        ["********************"],
    ]
}

levels["level5"] = {
    grid: [
        ["********************"],
        ["*!.@..*......*.....*"],
        ["*..@..*...@..*..*@.*"],
        ["*..@..*...*..*..*..*"],
        ["*..@..*...#..*..*.@*"],
        ["*..#..*...*..*@.*..*"],
        ["*..@..*...@..*..*@.*"],
        ["*..@..*...*..*..*..*"],
        ["*..@..*...@..*..*.@*"],
        ["*..@..*...*..@..*..*"],
        ["*.........*.....*.$*"],
        ["********************"],
    ]
}

levels["level6"] = {
    grid: [
        ["********************"],
        ["*.!.@.@.@.@.@.@.@.@*"],
        ["*..................*"],
        ["*@*@.@.@.@.@.@.@.@.*"],
        ["*..................*"],
        ["*.@.@.@.@.@.@.@.@.@*"],
        ["*..................*"],
        ["*@.@.@.@.@.@.@.@.@.*"],
        ["*..................*"],
        ["*.@.@.@.@.@.@.@.@.@*"],
        ["*.................$*"],
        ["********************"],
    ]
}

levels["level7"] = {
    grid: [
        ["********************"],
        ["*..................*"],
        ["*@..@@@@...@@@@**@.*"],
        ["*...@.........@....*"],
        ["*..*@.*@@@@@*.@.@***"],
        ["*...@..@.$.@..@....*"],
        ["*@..@*.@@.@@.*@**@.*"],
        ["*...@.........@....*"],
        ["*..*@@@@@@@@@@@.@***"],
        ["*..*...*...*....@@@*"],
        ["*....@...@...@@...!*"],
        ["********************"],
    ]
}

levels["level8"] = {
    grid: [
        ["********************"],
        ["*..................*"],
        ["*........**........*"],
        ["*........**$.......*"],
        ["***@.@@@****@@@**@.*"],
        ["***@.@...!!...@....*"],
        ["*....@...!!...@.@***"],
        ["*.@***.@*@@*@.*....*"],
        ["*.@**@........@**@.*"],
        ["*....@@@*..*@@@....*"],
        ["****............****"],
        ["********************"],
    ]
}

levels["level9"] = {
    grid: [
        ["********************"],
        ["*$.................*"],
        ["*@@@@@@@@@@@@@@@@@.*"],
        ["*..................*"],
        ["*.@@@@@@@@@@@@@@@@@*"],
        ["*..................*"],
        ["*@@@@@@@@@@@@@@@@@.*"],
        ["*..................*"],
        ["*.@@@@@@@@@@@@@@@@@*"],
        ["*..................*"],
        ["*@@@@@@@@@@@@@@@@@!*"],
        ["********************"],
    ]
}

levels["level10"] = {
    grid: [
        ["********************"],
        ["*!!..@........@..!!*"],
        ["*.@@.@..@..@..@.@@.*"],
        ["*....@..@..@..@....*"],
        ["*.@@@@..*..*..@@@@.*"],
        ["*.......*$.*.......*"],
        ["*.......*..*.......*"],
        ["*.@@@@..*..*..@@@@.*"],
        ["*....@..@..@..@....*"],
        ["*.@@.@..@..@..@.@@.*"],
        ["*!!..@........@..!!*"],
        ["********************"],
    ]
}

levels["level11"] = {
    grid: [
        ["********************"],
        ["*$*................*"],
        ["*.*................*"],
        ["*.*................*"],
        ["*.*................*"],
        ["*.*................*"],
        ["*.*................*"],
        ["*.*................*"],
        ["*.*..............*.*"],
        ["*..**************..*"],
        ["*@................@*"],
        ["********************"],
    ]
}