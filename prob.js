var ProbArray = [];
var ProbCounts = [];

function ProbColorStat(Val)
{
    if (Val == 0)
    {
        return "rgb(160, 160, 0)";
    }
    if (Val > 0)
    {
        return "rgb(0, 160, 0)";
    }
    if (Val < 0)
    {
        return "rgb(160, 0, 0)";
    }
}

function ProbColor(Idx)
{
    if (ProbArray.length > Idx)
    {
        return ProbColorStat(ProbArray[Idx]);
    }
    else
    {
        return "rgb(160, 160, 160)";
    }
}

function ProbValue(Idx)
{
    if (ProbArray.length > Idx)
    {
        return ProbArray[Idx];
    }
    else
    {
        return 0;
    }
}

function ProbCalc()
{
    if (ProbMode)
    {
        ProbArray = [];
        ProbCounts = [];
        var CountsExists;
        var I;

        if ((GamePlayer_N >= 0) && (GamePlayer_N < GamePlayer_C))
        {
            GamePlayer_[GamePlayer_N].MoveSectorBets(true);
            for (I = 0; I < WheelNumCount; I++)
            {
                var NumVal = GamePlayer_[GamePlayer_N].Account(I, true);
                ProbArray[I] = NumVal;

                CountsExists = false;
                for (var II = 0; II < ProbCounts.length; II++)
                {
                    if (ProbCounts[II][0] == NumVal)
                    {
                        CountsExists = true;
                        ProbCounts[II][1]++;
                        if ((I != 0) && (I <= 100))
                        {
                            ProbCounts[II][2]++;
                        }
                    }
                }
                if (!CountsExists)
                {
                    ProbCounts.push([NumVal, 1, ((I == 0) || (I > 100)) ? 0 : 1]);
                }
            }
            GamePlayer_[GamePlayer_N].RemoveSectorBets();
        }

        var TempVal;
        for (I = 0; I < ProbCounts.length; I++)
        {
            for (var II = 0; II < ProbCounts.length; II++)
            {
                if (ProbCounts[I][0] > ProbCounts[II][0])
                {
                    TempVal = ProbCounts[I];
                    ProbCounts[I] = ProbCounts[II];
                    ProbCounts[II] = TempVal;
                }
            }
        }
    }
}

function Probability()
{
    if (!PlayerSelected())
    {
        return;
    }

    /*var ColorL = "#FF8080";
    var ColorD = "#FFFF80";
    var ColorW = "#80FF80";

    var Obj = document.getElementById("ProbScreen");
    Obj.style.display = "block";
    ProbArray = [];
    var Stats = [];
    var Counts = [];
    var CountsExists;
    GamePlayer_[GamePlayer_N].MoveSectorBets(true);

    var I;
    var Stat1 = WheelNumCount;
    var Stat0 = WheelNumCount - 1;
    if (GameType == 2)
    {
        Stat0 = 100;
    }
    var NumTableN = (GameType == 2) ? "100" : "";
    for (I = 0; I < WheelNumCount; I++)
    {
        var NumVal = GamePlayer_[GamePlayer_N].Account(I, true);
        Stats[I] = parseInt(NumVal);
        ProbArray[I] = Stats[I];
        Obj = document.getElementById("Prob" + NumTableN + "N" + I);
        Obj.innerHTML = PlusMinus(NumVal);

        if (NumVal < 0)
        {
            Obj.style["background-color"] = ColorL;
        }
        if (NumVal == 0)
        {
            Obj.style["background-color"] = ColorD;
        }
        if (NumVal > 0)
        {
            Obj.style["background-color"] = ColorW;
        }

        CountsExists = false;
        for (var II = 0; II < Counts.length; II++)
        {
            if (Counts[II][0] == NumVal)
            {
                CountsExists = true;
                Counts[II][1]++;
                if ((I != 0) && (I <= 100))
                {
                    Counts[II][2]++;
                }
            }
        }
        if (!CountsExists)
        {
            Counts.push([NumVal, 1, I == 0 ? 0 : 1]);
        }
    }

    GamePlayer_[GamePlayer_N].RemoveSectorBets();

    for (I = 0; I < Counts.length; I++)
    {
        for (var II = 0; II < Counts.length; II++)
        {
            if (Counts[I][0] > Counts[II][0])
            {
                NumVal = Counts[I];
                Counts[I] = Counts[II];
                Counts[II] = NumVal;
            }
        }
    }

    */
    
    ProbMode = true;
    StateSave();
    ProbCalc();
    ProbRepaint();
}

function ProbOpen()
{
    var ColorL = "#FF8080";
    var ColorD = "#FFFF80";
    var ColorW = "#80FF80";
    var Stat1 = WheelNumCount;
    var Stat0 = WheelNumCount - 1;
    if (GameType == 2)
    {
        Stat0 = 100;
    }


    var NumTableN = (GameType == 2) ? "100" : "";
    for (var I = 0; I < WheelNumCount; I++)
    {
        var NumVal = ProbArray[I];
        Obj = document.getElementById("Prob" + NumTableN + "N" + I);
        Obj.innerHTML = PlusMinus(NumVal);
        if (NumVal < 0)
        {
            Obj.style["background-color"] = ColorL;
        }
        if (NumVal == 0)
        {
            Obj.style["background-color"] = ColorD;
        }
        if (NumVal > 0)
        {
            Obj.style["background-color"] = ColorW;
        }
    }

    var TabRow;
    for (I = 0; I < ProbCounts.length; I++)
    {
        TabRow = document.getElementById("ProbP" + I);
        TabRow.style["display"] = "";
        TabRow.cells[0].innerHTML = PlusMinus(ProbCounts[I][0]);
        TabRow.cells[1].innerHTML = ProbCounts[I][1] + "/" + Stat1;
        TabRow.cells[2].innerHTML = Math.round(ProbCounts[I][1] * 100 / Stat1) + "%";
        TabRow.cells[3].innerHTML = ProbCounts[I][2] + "/" + Stat0;
        TabRow.cells[4].innerHTML = Math.round(ProbCounts[I][2] * 100 / Stat0) + "%";
        if (ProbCounts[I][0]  < 0)
        {
            TabRow.cells[0].style["background-color"] = ColorL;
            TabRow.cells[1].style["background-color"] = ColorL;
            TabRow.cells[2].style["background-color"] = ColorL;
            TabRow.cells[3].style["background-color"] = ColorL;
            TabRow.cells[4].style["background-color"] = ColorL;
        }
        if (ProbCounts[I][0] == 0)
        {
            TabRow.cells[0].style["background-color"] = ColorD;
            TabRow.cells[1].style["background-color"] = ColorD;
            TabRow.cells[2].style["background-color"] = ColorD;
            TabRow.cells[3].style["background-color"] = ColorD;
            TabRow.cells[4].style["background-color"] = ColorD;
        }
        if (ProbCounts[I][0]  > 0)
        {
            TabRow.cells[0].style["background-color"] = ColorW;
            TabRow.cells[1].style["background-color"] = ColorW;
            TabRow.cells[2].style["background-color"] = ColorW;
            TabRow.cells[3].style["background-color"] = ColorW;
            TabRow.cells[4].style["background-color"] = ColorW;
        }
    }

    for (I = ProbCounts.length; I < 110; I++)
    {
        TabRow = document.getElementById("ProbP" + I);
        TabRow.style["display"] = "none";
    }

    var Obj = document.getElementById("ProbScreen");
    Obj.style.display = "block";
}

function ProbClose()
{
    var Obj = document.getElementById("ProbScreen");
    Obj.style.display = "none";
}

function ProbRepaint()
{
    if (ProbMode)
    {
        PaintPlayerList();
        PaintCurrentPlayer();
        PaintTable();
        PaintWheel();
    }
}

function ProbRepaint0()
{
    PaintPlayerList();
    PaintCurrentPlayer();
    PaintTable();
    PaintWheel();
}

