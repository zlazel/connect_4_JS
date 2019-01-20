"use strict"
var arrCells = [
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1]
];

function displayArray(arr) {
        for (const row in arr) {
                for (const col in arr[row]) {
                        document.getElementById("ArrValue").innerHTML += arr[row][col] + "-";
                }
                document.getElementById("ArrValue").innerHTML += "<br>"
        }
}
//insertCellInCol(0, 4)
//displayArray(arrCells);

class Cell {
        constructor(col1, row1) {

                this.col = col1;
                // this.row = arrCells.length - 1 - row;
                this.row = row1;
                // console.log("-----------------col: "+this.col+"\trow: "+this.row);
        }
        val() {
                if(arrCells[this.row][this.col] != undefined)
                        return arrCells[this.row][this.col];
                else
                        console.error("val() function: Undefined Value");
        }
        right() {
                if (this.col + 1 < arrCells[0].length) {
                        var rightCell = new Cell(this.col + 1, this.row)
                        return rightCell;
                }
                else
                        return -1;
        }
        left() {
                if (this.col - 1 > -1) {
                        var preCell = new Cell(this.col - 1, this.row)
                        return arrCells[preCell.row][preCell.col];
                }
                else {
                        return -1;
                }
        }
        up() {
                if (this.row + 1 < arrCells.length) {
                        var upCell = new Cell(this.col, this.row + 1)
                        // return arrCells[upCell.row][upCell.col];
                        return upCell;
                }
                else
                        return -1;

        }
        down() {
                if (this.row - 1 > -1) {
                        var downCell = new Cell(this.col, this.row - 1)
                        // return arrCells[downCell.row][downCell.col];
                        return downCell;
                }
                else
                        return -1;
        }
        upRight() {
                console.log("upRight     Col: "+this.col+" Row: "+this.row);
                if (this.col + 1 < arrCells[0].length && this.row + 1 < arrCells.length) {
                        var upRightCell = new Cell(this.col + 1, this.row + 1)
                        // return arrCells[upRightCell.row][upRightCell.col];
                        return upRightCell;
                }
                else
                        return;
        }
        upLeft() {
                if (this.col - 1 > -1 && this.row + 1 < arrCells.length) {
                        var upLeftCell = new Cell(this.col - 1, this.row + 1)
                        // return arrCells[upLeftCell.row][upLeftCell.col];
                        return upLeftCell;
                }
                else {
                        // console.log(12);
                        return -1;
                }
        }
        downRight() {
                if (this.row - 1 > -1 && this.col + 1 < arrCells[0].length) {
                        var downRightCell = new Cell(this.col + 1, this.row - 1)
                        return arrCells[downRightCell.row][downRightCell.col];
                }
                else
                        return -1;
        }
        downLeft() {
                if (this.row - 1 > -1 && this.col - 1 > -1) {
                        var downLeftCell = new Cell(this.col - 1, this.row - 1)
                        return arrCells[downLeftCell.row][downLeftCell.col];
                }
                else
                        return -1;
        }

}

function checkRight(c, r) {
        // if(c > 3 )
        //     return -1;
        let tempCell = new Cell(c, r);
        let tempCell1 = tempCell.right();

        //  console.log("-----cell col " + tempUpCell.col + " row " + tempUpCell.row+"value: " +tempUpCell.val())
        for (let index = 0; index < 3; index++) {
                if (tempCell.val() == tempCell1.val()) {
                        tempCell = tempCell1;
                        tempCell1 = tempCell1.right();
                }
                else {
                        return -1;
                }
        }
        return tempCell.val();
}
// console.log("func return "+checkRight(0, 1));

function checkUp(c, r) {

        var tempCell = new Cell(c, r);
        var tempCell1 = tempCell.up();
        for (let index = 0; index < 3; index++) {
                // console.log("index "+index);

                if (tempCell.val() == tempCell1.val()) {
                        tempCell = tempCell1;
                        tempCell1 = tempCell1.up();
                        // console.log("index:"+index+"    cell1 val :"+tempCell.val()+"   cell2 val :"+tempCell1.val())
                }
                else {
                        return -1;
                }
        }
        return tempCell.val();
}
function checkDiagRight(c, r) {

        var tempCell = new Cell(c, r);
        var tempCell1 = tempCell.upRight();
        for (let index = 0; index < 3; index++) {
                // console.log("index:"+index+"    cell1 val :"+tempCell.val()+"   cell2 val :"+tempCell.val())

                if (tempCell.val() == tempCell1.val()) {
                        tempCell = tempCell1;
                        tempCell1 = tempCell1.upRight();
                        // console.log("index:"+index+"    cell1 val :"+tempCell.val()+"   cell2 val :"+tempCell1.val())
                }
                else {
                        return -1;
                }
        }
        return tempCell.val();
}
function checkLastCol() {
        let count = 0;
        let tempC = new Cell(6, 5)
        for (let c = 0; c < 6; c++) {
                if (tempC.val() == tempC.down().val()) {
                        count++;
                        if (count == 4)
                                return tempC.val();
                } else {
                        count = 0;
                }
        }
        return -1;
}
// console.log("func return "+checkDiagRight(5,0));

function checkDiagLeft(c, r) {

        var tempCell = new Cell(c + 3, r);
        var tempCell1 = tempCell.upLeft();
        for (let index = 0; index < 3; index++) {
                if (tempCell.val() == tempCell1.val()) {
                        tempCell = tempCell1;
                        tempCell1 = tempCell1.upLeft();
                }
                else {
                        return -1;
                }
        }
        return tempCell.val();
}

function checkWin(c, r) {
        //  check down right row (4 cells)
        if (checkRight(c, r + 3) > 0) {
                return checkRight(c, r + 3);
        }
        //  check top right row (4 cells)
        else if (checkRight(c, r) > 0) {
                return checkRight(c, r);
        }
        //  check down right column (4 cells)
        else if (checkUp(c + 3, r) > 0) {
                return checkUp(c + 3, r);
        }
        //  check down left column (4 cells)
        else if (checkUp(c, r) > 0) {
                return checkUp(c, r);
        }
        //  check down Right Diagonal (4 cells)
        else if (checkDiagRight(c, r) > 0) {
                return checkDiagRight(c, r);
        }
        //  check last column (6 cells)
        else if (checkLastCol() > 0) {
                return checkDiagRight();
        }
        else
        //  check down left Diagonal (4 cells)
        {
                return checkDiagLeft(c, r);
        }
}
var noWinnerFlag = 0;
function insertCellInCol(selectedColumn, palyerNo) {
        if (selectedColumn < 7 && selectedColumn > -1) {

                for (let emptyRow = 5; emptyRow >= 0; emptyRow--) {
                        if (arrCells[emptyRow][selectedColumn] < 1) {
                                arrCells[emptyRow][selectedColumn] = palyerNo;
                                noWinnerFlag += 1;
                                return true;
                        }
                }
        }
        return false;
}

function check() {
        let col = 0;
        let row = 2;
        for (let i = 2; i >= 0; i--) {
                for (let j = 0; j < 4; j++) {
                        if (checkWin(j, i) > 0) {
                                // console.log('winner:' + checkWin(j, i) + ' in col:' + j + 'row:' + i);
                                return checkWin(j, i);
                        }
                }

        }

}
//check();

/*--------------------------------------------------------------------------------------------------*/

var flagForPlayers = 0;
function ColorPlayer(columId, bgPlayer) {
        let firstcel = $("#col" + columId + "row5");
        let secondcel = $("#col" + columId + "row4");
        let thirdcel = $("#col" + columId + "row3");
        let fourthcell = $("#col" + columId + "row2");
        let fifthcel = $("#col" + columId + "row1");
        let sixthcel = $("#col" + columId + "row0");
        if (firstcel.hasClass("onclickBackgrondPlayer1") == false && firstcel.hasClass("onclickBackgrondPlayer2") == false) {
                firstcel.addClass(bgPlayer);
        }
        else if ((firstcel.hasClass("onclickBackgrondPlayer1") == true || firstcel.hasClass("onclickBackgrondPlayer2") == true)
                && (secondcel.hasClass("onclickBackgrondPlayer1") == false && secondcel.hasClass("onclickBackgrondPlayer2") == false)) {
                secondcel.addClass(bgPlayer);
        }
        else if ((firstcel.hasClass("onclickBackgrondPlayer1") == true || firstcel.hasClass("onclickBackgrondPlayer2"))
                && (secondcel.hasClass("onclickBackgrondPlayer1") == true || secondcel.hasClass("onclickBackgrondPlayer2") == true)
                && (thirdcel.hasClass("onclickBackgrondPlayer1") == false && thirdcel.hasClass("onclickBackgrondPlayer2") == false)) {
                thirdcel.addClass(bgPlayer);
        }
        else if ((firstcel.hasClass("onclickBackgrondPlayer1") == true || firstcel.hasClass("onclickBackgrondPlayer2") == true)
                && (secondcel.hasClass("onclickBackgrondPlayer1") == true || secondcel.hasClass("onclickBackgrondPlayer2") == true)
                && (thirdcel.hasClass("onclickBackgrondPlayer1") == true || thirdcel.hasClass("onclickBackgrondPlayer2") == true)
                && (fourthcell.hasClass("onclickBackgrondPlayer1") == false && fourthcell.hasClass("onclickBackgrondPlayer2") == false)) {
                fourthcell.addClass(bgPlayer);
        }
        else if ((firstcel.hasClass("onclickBackgrondPlayer1") == true || firstcel.hasClass("onclickBackgrondPlayer2") == true)
                && (secondcel.hasClass("onclickBackgrondPlayer1") == true || secondcel.hasClass("onclickBackgrondPlayer2") == true)
                && (thirdcel.hasClass("onclickBackgrondPlayer1") == true || thirdcel.hasClass("onclickBackgrondPlayer2") == true)
                && (fourthcell.hasClass("onclickBackgrondPlayer1") == true || fourthcell.hasClass("onclickBackgrondPlayer2") == true)
                && (fifthcel.hasClass("onclickBackgrondPlayer1") == false && fifthcel.hasClass("onclickBackgrondPlayer2") == false)) {
                fifthcel.addClass(bgPlayer);
        }
        else if ((firstcel.hasClass("onclickBackgrondPlayer1") == true || firstcel.hasClass("onclickBackgrondPlayer2") == true)
                && (secondcel.hasClass("onclickBackgrondPlayer1") == true || secondcel.hasClass("onclickBackgrondPlayer2") == true)
                && (thirdcel.hasClass("onclickBackgrondPlayer1") == true || thirdcel.hasClass("onclickBackgrondPlayer2") == true)
                && (fourthcell.hasClass("onclickBackgrondPlayer1") == true || fourthcell.hasClass("onclickBackgrondPlayer2") == true)
                && (fifthcel.hasClass("onclickBackgrondPlayer1") == true || fifthcel.hasClass("onclickBackgrondPlayer2") == true)
                && (sixthcel.hasClass("onclickBackgrondPlayer1") == false && sixthcel.hasClass("onclickBackgrondPlayer2") == false)) {
                sixthcel.addClass(bgPlayer);
        }
        // flagForPlayers = 1;
        flagForPlayers += 1;
}
function resetGrid() {
        $(".row").removeClass("onclickBackgrondPlayer1");
        $(".row").removeClass("onclickBackgrondPlayer2");
        arrCells = [
                [-1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1]
        ];
        // flagForPlayers = 0;
        flagForPlayers = (flagForPlayers+1 % 2);
        console.log(flagForPlayers +"will play")
}

$(function () {
        $('.column').click(function () {
                let clickedColumId = $(this).attr("id");
                if (flagForPlayers % 2 == 0) {

                        ColorPlayer(clickedColumId, "onclickBackgrondPlayer1");
                        insertCellInCol(clickedColumId, 1)
                }
                else {
                        ColorPlayer(clickedColumId, "onclickBackgrondPlayer2");
                        insertCellInCol(clickedColumId, 2)

                }
                console.log(arrCells);
                var winner = check();
                var winnerScore;
                if (winner > 0) {
                        winnerScore = parseInt($("#score-" + winner + " span").html()) + 1;
                        $("#score-" + winner + " span").text(winnerScore);
                        //console.log(winnerScore)
                        $("#dialog").dialog({ autoOpen: false });
                        $("#dialog").html("Player " + winner + " is Winner");

                        $("#dialog").dialog("open");
                        // alert("Congratolation! \n Winner Player " + winner);
                        resetGrid();

                }

        });
});

