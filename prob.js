function Probability()
{
    if (!PlayerSelected())
    {
        return;
    }

    var ColorL = "#FF8080";
    var ColorD = "#FFFF80";
    var ColorW = "#80FF80";

    var Obj = document.getElementById("ProbScreen");
    Obj.style.display = "block";
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

    var TabRow;
    for (I = 0; I < Counts.length; I++)
    {
        TabRow = document.getElementById("ProbP" + I);
        TabRow.style["display"] = "";
        TabRow.cells[0].innerHTML = PlusMinus(Counts[I][0]);
        TabRow.cells[1].innerHTML = Counts[I][1] + "/" + Stat1;
        TabRow.cells[2].innerHTML = Math.round(Counts[I][1] * 100 / Stat1) + "%";
        TabRow.cells[3].innerHTML = Counts[I][2] + "/" + Stat0;
        TabRow.cells[4].innerHTML = Math.round(Counts[I][2] * 100 / Stat0) + "%";
        if (Counts[I][0]  < 0)
        {
            TabRow.cells[0].style["background-color"] = ColorL;
            TabRow.cells[1].style["background-color"] = ColorL;
            TabRow.cells[2].style["background-color"] = ColorL;
            TabRow.cells[3].style["background-color"] = ColorL;
            TabRow.cells[4].style["background-color"] = ColorL;
        }
        if (Counts[I][0] == 0)
        {
            TabRow.cells[0].style["background-color"] = ColorD;
            TabRow.cells[1].style["background-color"] = ColorD;
            TabRow.cells[2].style["background-color"] = ColorD;
            TabRow.cells[3].style["background-color"] = ColorD;
            TabRow.cells[4].style["background-color"] = ColorD;
        }
        if (Counts[I][0]  > 0)
        {
            TabRow.cells[0].style["background-color"] = ColorW;
            TabRow.cells[1].style["background-color"] = ColorW;
            TabRow.cells[2].style["background-color"] = ColorW;
            TabRow.cells[3].style["background-color"] = ColorW;
            TabRow.cells[4].style["background-color"] = ColorW;
        }
    }

    for (I = Counts.length; I < 110; I++)
    {
        TabRow = document.getElementById("ProbP" + I);
        TabRow.style["display"] = "none";
    }
}


function CloseProb()
{
    var Obj = document.getElementById("ProbScreen");
    Obj.style.display = "none";
}
