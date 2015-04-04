/**
 * Created by davide on 03/04/15.
 */

var letters = [ "A", "B", "C", "D", "E", "F", "G", "H" ];
var selected = "";

function indexesToCellPosition(row, column)
{
    return letters[column] + (row + 1);
}

function createChessBoardCells()
{
    var darken = false;

    for (var row = 7; row >= 0; row--) {

        document.write("<div class=\"row\">");

        for (var col = 0; col < 8; col++) {

            var cellPos = indexesToCellPosition(row, col);

            document.write("<div id=\"" + cellPos + "\" class=\"cell ");
            if (darken) document.write("dark"); else document.write("light");
            document.write("\" onmouseover=\"cellHover('"+cellPos+"',1)\" "
                            + "onmouseleave=\"cellHover('"+cellPos+"',0)\" "
                            + "onclick=\"cellToggle('"+cellPos+"')\" >");

            //document.write("<p class=\"coordinate\">" + cellPos + "</p>");

            document.write("</div>");

            darken = !darken;
        };

        darken = !darken;
        document.write("</div>");
    }
}

// Increases or decreases a colour's hex code by a modifier
function cellHover(cellID, direction)
{
     //= (direction) ? "5px solid " + ((selected == "") ? "red" : "blue") : ((selected == cellID) ? "" : ;

    var borderString = "";

    // Hover In
    if (direction) {
        borderString = "5px solid";

        if (selected == "")
            borderString += " red";
        else
            borderString += " blue";
    }
    // Hover Out
    else {
        if (selected != cellID)
            borderString = "0px";
        else
            return;
    }

    document.getElementById(cellID).style.border = borderString;

    /*
    console.log("COLOR: " + getStyle(document.getElementById(cellID), "background-color"));
    var oldColour = getStyle(document.getElementById(cellID), "background-color");
    var r, g, b;
    r = oldColour.substring(oldColour.indexOf('(') + 1, oldColour.indexOf(','));
    oldColour = oldColour.substring(oldColour.indexOf(',') + 1);
    g = oldColour.substr(1, oldColour.indexOf(',') - 1);
    oldColour = oldColour.substring(oldColour.indexOf(',') + 1);
    b = oldColour.substring(1, oldColour.indexOf(')'));

    var modifier = 50;

    if (direction == 0)
        modifier = -modifier;

    document.getElementById(cellID).style.backgroundColor = "rgb(" + (Number(r) + modifier)  + "," + (Number(g) + modifier) + "," + (Number(b) + modifier) + ")";

    console.log("COLOR CHANGED: " + getStyle(document.getElementById(cellID), "background-color")); */
}

function cellToggle(cellID)
{
    document.getElementById(cellID).style.border = (selected == cellID) ? "0px" : "5px solid red";

    // Deselect
    if (selected == cellID)
        selected == "";
    // Select
    else {
        // If anything was selected before, deselect that
        // and move piece
        if (selected != "") {
            movePiece(selected, cellID);
            document.getElementById(selected).style.border = "0px";
            selected = "";
        }
        // Otherwise, select current
        else
            selected = cellID;
    }
}

function movePiece(from, to)
{
    if (isMoveValid(from, to)) {
        document.getElementById(to).style.backgroundImage = document.getElementById(from).style.backgroundImage;
        document.getElementById(from).style.backgroundImage = "";
    }
}

function isMoveValid(from, to)
{
    return 1;
}

function newGame()
{
    var layout = ['r', 'h', 'b', 'q', 'k', 'b', 'h', 'r'];

    for (var col = 0; col < 8; col++) {
        setPositionPiece(1, col, 'wp');
        setPositionPiece(6, col, 'bp');

        setPositionPiece(0, col, 'w' + layout[col]);
        setPositionPiece(7, col, 'b' + layout[col]);
    }
}

function setPositionPiece(row, column, piece)
{
    document.getElementById(indexesToCellPosition(row, column)).style.backgroundImage = "url('assets/pieces/" + piece  + ".png')";
}

//  http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    console.log(hex);
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    console.log(result);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// http://stackoverflow.com/questions/4172871/javascript-get-styles

function getStyle(oElm, strCssRule){
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    }
    else if(oElm.currentStyle){
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
}