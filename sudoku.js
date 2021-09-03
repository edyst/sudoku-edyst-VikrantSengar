// global variables
easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3---",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];
currentCell = "";

id("Diff-easy").addEventListener("click", EasyStart);
id("Diff-medium").addEventListener("click", MediumStart);
id("Diff-hard").addEventListener("click", HardStart);
id("valid").addEventListener("click", ValidateSudoku);

const selectedCell = function () {
    let x = this.id;
    currentCell = x;
    console.log(x);
    clearSelectedCell();
    id(x).classList.add("current");
    highlightRowCol();
    highlightGrid();
    highlightprefilled();
}

// onclick function
for (let x = 1; x <= 81; x++) {
    id(x).onclick = selectedCell;
}


// highlight rows and columns
function highlightRowCol() {
    let y = currentCell;
    for (let q = 0; q < 81;) {
        let r = y % 9;
        if (r == 0) { r = 9; }
        let e = q + r;
        id(e).classList.add("highlighted","prefilled-highlight");
        q = q + 9;
        for (let x = 1; x <= 81; x++) {
            for (i = 0; i < 9; i++) {
                let j = i + 1;
                if (y / 9 > i && y / 9 <= j && x / 9 > i && x / 9 <= j) {
                    id(x).classList.add("highlighted","prefilled-highlight");
                }
            }
        }
    }
}
// highlight grid
function highlightGrid() {
    let y = currentCell;
    for (let i = 1; i <= 81; i++) {
        let d = y % 9;
        let s = i % 9;
        if (d == 1 || d == 2 || d == 3) {
            if (s == 1 || s == 2 || s == 3) {
                if (y <= 21 && i <= 21) {
                    id(i).classList.add("highlighted");
                }
                else if (y > 21 && y <= 48 && i > 21 && i <= 48) {
                    id(i).classList.add("highlighted");
                }
                else if (y > 48 && y <= 75 && i > 48 && i <= 75) {
                    id(i).classList.add("highlighted");
                }
            }
        }
        if (d == 4 || d == 5 || d == 6) {
            if (s == 4 || s == 5 || s == 6) {
                if (y <= 24 && i <= 24) {
                    id(i).classList.add("highlighted");
                }
                else if (y > 24 && y <= 51 && i > 24 && i <= 51) {
                    id(i).classList.add("highlighted");
                }
                else if (y > 51 && y <= 78 && i > 51 && i <= 78) {
                    id(i).classList.add("highlighted");
                }
            }
        }
        if (d == 7 || d == 8 || d == 0) {
            if (s == 7 || s == 8 || s == 0) {
                if (y <= 27 && i <= 27) {
                    id(i).classList.add("highlighted");
                }
                else if (y > 27 && y <= 54 && i > 27 && i <= 54) {
                    id(i).classList.add("highlighted");
                }
                else if (y > 54 && y <= 81 && i > 54 && i <= 81) {
                    id(i).classList.add("highlighted");
                }
            }
        }
    }
}
// prefilled highlight
function highlightprefilled() {
    for (let b = 1; b <= 81; b++) {
        let v = id(b).classList.contains("predefined");
        if (v == true) {
            id(b).classList.remove("highlighted","current");
        }
    }
}


// difficulty function
function EasyStart() {
    ClearPrevious();
    sudoku = easy[0];
    startSudoku();
}
function MediumStart() {
    ClearPrevious();
    sudoku = medium[0];
    startSudoku();
}
function HardStart() {
    ClearPrevious();
    sudoku = hard[0];
    startSudoku();
}


// Sudoku Board
var sol;
function startSudoku() {
    if (sudoku == easy[0]) {
        sol = easy[1];
    }
    if (sudoku == medium[0]) {
        sol = medium[1];
    }
    if (sudoku == hard[0]) {
        sol = hard[1];
    }

    clearBad();
    for (let x = 0; x < 81; x++) {
        let y = x + 1;
        if (sudoku.charAt(x) != "-") {
            id(y).value = sudoku.charAt(x);
            id(y).setAttribute("readonly", "");
            id(y).classList.add("predefined");
            clearSelectedCell();
        }
        else {
            id(y).setAttribute("onkeypress", "return onetonine(event)");
            id(y).setAttribute("onkeyup", "look()");
        }
    }
}

// validate function
function ValidateSudoku() {
    let count = 0;
    for (let x = 0; x < 81; x++) {
        let y = x + 1;
        if (sol.charAt(x) == id(y).value) {
            count++;
        }
    }
    if (count == 81) {
        alert("Yeah!! Success");
        clearprev();
    }
    else alert("Something bad!! Keep Trying")
}


// Clear functions
function ClearPrevious() {
    for (let i = 1; i <= 81; i++) {
        id(i).removeAttribute("readonly");
        id(i).classList.remove("same", "bad", "predefined", "highlighted", "current");
        id(i).value = "";
    }
}
function clearSelectedCell() {
    for (let i = 1; i <= 81; i++) {
        id(i).classList.remove("current", "same", "prefilled-highlight", "highlighted");
    }
}
function clearSame() {
    for (x = 1; x <= 81; x++) {
        id(x).classList.remove("same");
    }
}
function clearBad() {
    for (let j = 1; j <= 81; j++) {
        id(j).classList.remove("bad");
    }
}



// lookfordouble functions
function look() {
    clearSame();
    clearBad();
    lookforRows();
    lookforCols();
    lookfor3x3();
    lookforSame();
}
// look for rows
function lookforRows() {
    for (let x = 1; x <= 81; x++) {
        for (let z = 1; z <= 81; z++) {
            for (let i = 0; i < 9; i++) {
                let j = i + 1;
                if (x / 9 <= j && z / 9 <= j && x / 9 > i && z / 9 > i && x != z) {
                    if (id(x).value == id(z).value) {
                        id(x).classList.add("bad");
                        id(z).classList.add("bad");
                    }
                }
            }
        }
    }
}
// look for columns
function lookforCols() {
    for (let x = 1; x <= 81; x++) {
        for (let z = 1; z <= 81; z++) {
            if ((x % 9 == z % 9) && x != z) {
                if (id(x).value == id(z).value) {
                    id(x).classList.add("bad");
                    id(z).classList.add("bad");
                }
            }
        }
    }
}

// look for 3x3 Grid
function lookfor3x3() {
    for (let x = 1; x <= 81; x++) {
        let y = x % 9;
        let z = x / 9;
        let i = currentCell % 9;
        let j = currentCell / 9;
        if ((id(x).value == id(currentCell).value) && x != currentCell) {
            if ((y == 1 || y == 2 || y == 3) && (i == 1 || i == 2 || i == 3)) {
                if (z > 0 && z <= 3 && j > 0 && j <= 3) {
                    id(x).classList.add("bad");
                    id(currentCell).classList.add("bad");

                }
                if (z > 3 && z <= 6 && j > 3 && j <= 6) {
                    id(x).classList.add("bad");
                    id(currentCell).classList.add("bad");

                }
                if (z > 6 && z <= 9 && j > 6 && j <= 9) {
                    id(x).classList.add("bad");
                    id(currentCell).classList.add("bad");

                }
            }

            if ((y == 4 || y == 5 || y == 6) && (i == 4 || i == 5 || i == 6)) {
                if (z > 0 && z <= 3 && j > 0 && j <= 3) {
                    id(x).classList.add("bad");
                    id(currentCell).classList.add("bad");

                }
                if (z > 3 && z <= 6 && j > 3 && j <= 6) {
                    id(x).classList.add("bad");
                    id(currentCell).classList.add("bad");

                }
                if (z > 6 && z <= 9 && j > 6 && j <= 9) {
                    id(x).classList.add("bad");
                    id(currentCell).classList.add("bad");

                }
            }

            if ((y == 7 || y == 8 || y == 0) && (i == 7 || i == 8 || i == 0)) {
                if (z > 0 && z <= 3 && j > 0 && j <= 3) {
                    id(x).classList.add("bad");
                    id(currentCell).classList.add("bad");

                }
                if (z > 3 && z <= 6 && j > 3 && j <= 6) {
                    id(x).classList.add("bad");
                    id(currentCell).classList.add("bad");

                }
                if (z > 6 && z <= 9 && j > 6 && j <= 9) {
                    id(x).classList.add("bad");
                    id(currentCell).classList.add("bad");

                }
            }
        }
    }
}
// look for same value throughout board
function lookforSame() {
    for (let x = 1; x <= 81; x++) {
        if (x != currentCell && (id(x).value == id(currentCell).value) && (id(currentCell).value != "")) {
            id(x).classList.add("same");
            id(currentCell).classList.add("same");
        }
    }
}

// one to nine input
function onetonine(e) {
    var key = e.which || e.KeyCode;
    if (key > 48 && key <= 57) {
        return true;
    }
    else return false;
}


// helper Functions
function id(id) {
    return document.getElementById(id);
}
function cls(cls) {
    return document.getElementsByClassName(cls);
}