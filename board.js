/**
 * Created by davide on 03/04/15.
 */

var letters = [ "A", "B", "C", "D", "E", "F", "G", "H" ];

function indexesToCellPosition(row, column)
{
    return letters[column] + (row + 1);
}

function createCells()
{
    var darken = false;

    for (var row = 7; row >= 0; row--) {

        document.write("<div class=\"row\">");

        for (var col = 0; col < 8; col++) {

            var cellPos = indexesToCellPosition(row, col);

            if (darken)
                document.write("<div id=\"" + cellPos + "\" class=\"cell dark\">");
            else
                document.write("<div id=\"" + cellPos + "\" class=\"cell light\">");

            document.write("<p class=\"coordinate\">" + cellPos + "</p>");

            document.write("</div>");

            darken = !darken;
        }

        darken = !darken;
        document.write("</div>");
    }
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
    console.log("ELM:" + indexesToCellPosition(row, column));
    console.log("Piece: " + piece);
    document.getElementById(indexesToCellPosition(row, column)).style.backgroundImage = "url('assets/pieces/" + piece  + ".png')";
}