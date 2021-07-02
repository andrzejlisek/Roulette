// 0 - Standard with racetrack
// 1 - Mini
// 2 - 100 numbers
var GameType = -1;

var WheelPos = 0;
var WheelPosT = 0;
var WheelNumCount = 0;
var WheelNums = [];
var NumRed = [];

//var WheelSign = ["0", "\u2664", "\u2661", "\u2662", "\u2667"];
//var WheelSign = ["0", "\u2660", "\u2665", "\u2666", "\u2663"];
var WheelSign = ["A", "B", "C", "D", "E"];

var ProbMode = false;

function InitStart()
{
    StateLoad();

    if (GameType >= 0)
    {
        Init(-1);
    }
    else
    {
        document.getElementById("GameSelect").style["display"] = "block";
    }
}

function Init(GameType_)
{
    document.getElementById("GameSelect").style["display"] = "none";
    if (GameType_ >= 0)
    {
        StateRefresh();
        GameType = GameType_;
    }
    StateSaveGame();

    if (GameType == 0)
    {
        document.getElementById("ProbNums100").style["display"] = "none";

        WheelNumCount = 37;
        WheelNums = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
        //                ZERO     ]                                                                                                               [ ZERO
        //               SERIE 0/2/3                 | ORPH.    |                  SERIE 5/8                  |    ORPH.        |   SERIE 0/2/3

        NumRed = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1];
        // SERIE 0/2/3 - Vousins du Zero (9x) | Neighbours of Zero:
        //   2x  0,2,3
        //   1x  4,7
        //   1x  12,15
        //   1x  18,21
        //   1x  19,22
        //   2x  25,26,28,29      <==>  1x  25,28  +   1x  26,29
        //   1x  32,35
        // SERIE 5/8 - Tiers du Cylindre (6x) | Thirds of the wheel:
        //   1x  5,8
        //   1x  10,11
        //   1x  13,16
        //   1x  23,24
        //   1x  27,30
        //   1x  33,36
        // Orphelins (5x) | Orphans:
        //   1x  1
        //   1x  6,9
        //   1x  14,17
        //   1x  17,20
        //   1x  31,34
        // 0-spiel (4x) | Zero Game:
        //   1x  0,3
        //   1x  12,15
        //   1x  32,35
        //   1x  26


    }
    if (GameType == 1)
    {
        WheelNumCount = 13;
        WheelNums = [0, 5, 12, 3, 10, 1, 8, 9, 2, 7, 6, 11, 4];
        NumRed = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];

        for (var I = 13; I <= 36; I++)
        {
            document.getElementById("ProbN" + I).style["display"] = "none";
        }

        document.getElementById("ProbNums100").style["display"] = "none";
    }
    if (GameType == 2)
    {
        document.getElementById("ProbNums").style["display"] = "none";

        WheelNumCount = 105;
        // 0 - 0
        // 101 - Spades
        // 102 - Hearts
        // 103 - Diamonds
        // 104 - Clubs
    
        // 0, trefl, kier, karo, pik
        WheelNums = [
           0, 74,  4, 45, 59,100, 19, 21, 66, 38, 82,  1, 77, 43, 91, 56, 28, 83, 64, 18, 11,
         104, 54, 79, 20, 95, 25, 48, 85, 62, 14, 93, 36, 53,  9, 46, 32, 71, 67, 88, 58, 97,
         102,  7, 68, 16, 30,  3, 73, 40, 99, 27, 86, 52, 39, 61, 15, 98, 24, 47, 70, 12, 31,
         103, 49, 75, 23,  6, 92, 37, 80, 10, 63, 51, 29, 42, 72,  8, 94, 35, 87, 13, 65, 57,
         101, 41,  2, 78, 55, 96, 84, 60, 26, 89, 33,  5, 44, 76, 50, 34, 90, 69, 17, 81, 22];
        NumRed = [2,
         1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
         1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
         1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
         1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
         1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 2, 2, 2];
    }


    document.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);

    TableDispSvg.onmousedown = function(e)
    {
        var X = e.clientX + window.scrollX - parseInt(TableDispSvg.getBoundingClientRect().left);
        var Y = e.clientY + window.scrollY - parseInt(TableDispSvg.getBoundingClientRect().top);
        TableClick(X, Y, e.buttons);
    };

    StatePlayerLoad(true);

    window.addEventListener("resize", WindowResize, false);
    WindowResize();
}

function WindowResize()
{
    TableW = window.innerWidth;
    TableH = window.innerHeight;
    TableW = document.documentElement.clientWidth;
    TableH = document.documentElement.clientHeight;

    TableDispSvg.setAttribute("width", TableW);
    TableDispSvg.setAttribute("height", TableH);
    TableDispSvgScr.setAttribute("width", TableW);
    TableDispSvgScr.setAttribute("height", TableH);

    SetView();
    PaintGame();
}

function PlusMinus(Val)
{
    if (Val > 0)
    {
        return "+" + Val + "";
    }
    else
    {
        return "" + Val + "";
    }
}

function DisplayHelp()
{
    var Obj = document.getElementById("HelpScreen");
    Obj.style.display = "block";
}

function CloseHelp()
{
    var Obj = document.getElementById("HelpScreen");
    Obj.style.display = "none";
}
