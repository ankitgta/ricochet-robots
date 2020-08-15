var boardSize = 16;
var playerCount = 5;
var colors = {
    RED: 0,
    BLUE: 1,
    SILVER: 2,
    GREEN: 3,
    YELLOW: 4,
    DEFAULT: 5,
    NUMCOLORS: 6
}
var colorNames = ["crimson", "steelblue", "silver", "green", "yellowgreen"];
var cssColors = ["Crimson", "SteelBlue", "DimGray", "DarkOliveGreen", "Wheat", "Cornsilk"];
var gameBorderColor = "Black";
var gameBorderSize = "2";
var blockBorderColor = "Grey";
var blockBorderSize = "1";
var timerVar;

// Load the updateText on first load for now
window.onload = function () {
    // newSeed();
    newGame();
};

function helpButton() {
    var txt = "1. Dots are Robots.\n2. Chip with G is Goal.\n3. Robots can go horizontal or vertical and can't jump over walls or players.\n4. Goal: Take same-colored Robot to Goal in less steps than other players.\n5. Check Result by clicking \"Show Solution\"";
    confirm(txt);
};

function newGame() {
    generateGame();
}

function loadGame() {

}

function help() {

}

function generateGame() {
    startTimer();
    drawBoard();
}

function startTimer() {
    // Output the result in an element with id="demo"
    var timerDuration = 180;
    clearInterval(timerVar);
    timerVar = setInterval(function () {
        timerDuration -= 1;
        var minutes = Math.floor(timerDuration / 60);
        var seconds = Math.floor(timerDuration % 60);
        if (seconds < 10) {
            var stylish = "<span>";
            if (timerDuration < 10) {
                stylish = "<span style=\"background-color: red\">"
            }
            document.getElementById("Timer").innerHTML = stylish + minutes + ":0" + seconds + "</span>";
        } else {
            document.getElementById("Timer").innerHTML = minutes + ":" + seconds;
        }

        // If the count down is over, write some text 
        if (timerDuration < 0) {
            clearInterval(timerVar);
            document.getElementById("Timer").innerHTML = "EXPIRED!!";
        }
    }, 1000);
}

function drawBoard() {
    var rows = boardSize / 2;
    var cols = rows;

    // var top_walls = placeWalls();
    var players = placePlayers();
    var chipLocation = chipLocationF();
    var chipColor = chipColorF();

    var tbl = document.getElementById('GameTable'), tr;
    tbl.innerHTML = "";
    tbl.classList.add("grid");

    for (var i = 0; i < rows; ++i) {
        tr = tbl.insertRow();
        for (var j = 0; j < cols; ++j) {
            var td = tr.insertCell();
            td.classList.add("cell");
            // Define Center
            if (i == rows / 2 - 1) {
                if (j == cols / 2 - 1) {
                    td.classList.add("cell-top-border");
                    td.classList.add("cell-left-border");
                    td.classList.add("cell-center");
                }
                if (j == cols / 2) {
                    td.classList.add("cell-top-border");
                    td.classList.add("cell-right-border");
                    td.classList.add("cell-center");
                }
            }

            if (i == rows / 2) {
                if (j == cols / 2 - 1) {
                    td.classList.add("cell-bottom-border");
                    td.classList.add("cell-left-border");
                    td.classList.add("cell-center");
                }
                if (j == cols / 2) {
                    td.classList.add("cell-bottom-border");
                    td.classList.add("cell-right-border");
                    td.classList.add("cell-center");
                }
            }

            // Place Walls
            // Default Walls
            if (i == 0 && j == cols / 2) {
                td.classList.add("cell-left-border");
            }
            if (i == rows / 2 && (j == 0 || j == cols - 1)) {
                td.classList.add("cell-top-border");
            }

            if (i == rows - 1 && j == cols / 2) {
                td.classList.add("cell-left-border");
            }


            // Place Players
            var player = "<span>";
            if (players["RED"] === i * 8 + j) {
                player = "<span class = \"red-player\">";
            }
            if (players["BLUE"] === i * 8 + j) {
                player = "<span class = \"blue-player\">";
            }
            if (players["GREEN"] === i * 8 + j) {
                player = "<span class = \"green-player\">";
            }
            if (players["SILVER"] === i * 8 + j) {
                player = "<span class = \"silver-player\">";
            }
            if (players["YELLOW"] === i * 8 + j) {
                player = "<span class = \"yellow-player\">";
            }

            // Place Chip
            if (i * 8 + j === chipLocation) {
                player = "<span class = \"cell-chip\" style = \"background-color: ";
                player += colorNames[chipColor];
                player += "\">G";
            }

            player += "</span>";

            td.innerHTML = player;
        }
    }
}

function placeWalls() {

}

function placePlayers() {
    var players = {
        "RED": 4,
        "BLUE": 32,
        "GREEN": 21,
        "SILVER": 52,
        "YELLOW": 57
    };
    return players;
}

function chipColorF() {
    return colors.RED;
}

function chipLocationF() {
    return 37;
}