// 0 - STD
// 1 - NO-0
// 2 - SEL
// 3 - PROB
var SpinMode = 0;

var SpinState;
var Spinning = false;
var SpinRnd = 0;
var SpinStop = 1000000;
var SpinEnd = 58;

var SpinDir = 1;

var SpinHistN = 12;
var SpinHist = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

var SpinDebug = false;

function Spin()
{
    if (GameType == 0)
    {
        SpinEnd = 58;
    }
    if (GameType == 1)
    {
        SpinEnd = 53;
    }
    if (GameType == 2)
    {
        SpinEnd = 55;
    }

    if (SpinMode == 3)
    {
        if (ProbMode)
        {
            ProbMode = false;
        }
        else
        {
            ProbMode = true;
        }
        StateSave();
        ProbCalc();
        ProbRepaint0();
        return;
    }

    if (Spinning)
    {
        return;
    }

    for (var I = 0; I < GamePlayer_C; I++)
    {
        GamePlayer_[I].MoveSectorBets(false);
    }

    if (PlayerSelected())
    {
        GamePlayer_[GamePlayer_N].WheelNeighLastS = -1;
    }

    var ZeroField = -10000;

    if (SpinMode == 1)
    {
        if (SpinDir > 0)
        {
            ZeroField = WheelPos;
        }
        if (SpinDir < 0)
        {
            ZeroField = WheelNumCount - WheelPos;
            if (ZeroField == WheelNumCount)
            {
                ZeroField = 0;
            }
        }
    }

    Spinning = true;
    SpinState = 0;
    if (SpinMode != 2)
    {
        SpinRnd = ZeroField;
        if (GameType != 2)
        {
            while (SpinRnd == ZeroField)
            {
                SpinRnd = GetRandom(0, WheelNumCount - 1);
            }
        }
        else
        {
            var SpinWorkRnd = true;
            while (SpinWorkRnd)
            {
                SpinRnd = GetRandom(0, WheelNumCount - 1);
                SpinWorkRnd = (SpinRnd == ZeroField);
                SpinWorkRnd = SpinWorkRnd || (SpinRnd == (ZeroField + 21)) || (SpinRnd == (ZeroField + 42));
                SpinWorkRnd = SpinWorkRnd || (SpinRnd == (ZeroField + 63)) || (SpinRnd == (ZeroField + 84));
                SpinWorkRnd = SpinWorkRnd || (SpinRnd == (ZeroField - 21)) || (SpinRnd == (ZeroField - 42));
                SpinWorkRnd = SpinWorkRnd || (SpinRnd == (ZeroField - 63)) || (SpinRnd == (ZeroField - 84));
            }
        }
    }
    if (SpinDebug)
    {
        SpinT();
    }
    else
    {
        setTimeout(function(){ SpinT() }, 100);
    }
}

function GetRandom(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function SpinT()
{
    if (SpinMode == 2)
    {
        if (SpinState < SpinStop)
        {
            WheelPos -= SpinDir;
        }
        else
        {
            WheelPosT = WheelPos;
            SpinHistory();
        }
    }
    else
    {
        AngleOffsetI += SpinDir;
        if (AngleOffsetI >= (WheelNumCount * 2))
        {
            AngleOffsetI = 0;
        }
        if (AngleOffsetI < 0)
        {
            AngleOffsetI = (WheelNumCount * 2) - 1;
        }

        if (GameType != 2)
        {
            if ((SpinState >= 10) && (SpinState < 20))
            {
                WheelPos -= (5 * SpinDir);
            }
            if ((SpinState >= 20) && (SpinState < 30))
            {
                WheelPos -= (4 * SpinDir);
            }
            if ((SpinState >= 30) && (SpinState < 40))
            {
                WheelPos -= (3 * SpinDir);
            }
            if ((SpinState >= 40) && (SpinState < 50))
            {
                WheelPos -= (2 * SpinDir);
            }
            if ((SpinState >= 50) && (SpinState < (SpinEnd + SpinRnd)))
            {
                WheelPos -= (1 * SpinDir);
            }
        }
        if (GameType == 2)
        {
            if ((SpinState >= 10) && (SpinState < 20))
            {
                WheelPos -= (4 * SpinDir);
            }
            if ((SpinState >= 20) && (SpinState < 30))
            {
                WheelPos -= (3 * SpinDir);
            }
            if ((SpinState >= 30) && (SpinState < 40))
            {
                WheelPos -= (2 * SpinDir);
            }
            if ((SpinState >= 40) && (SpinState < (SpinEnd + SpinRnd)))
            {
                WheelPos -= (1 * SpinDir);
            }
        }
        SpinState++;
    }

    while (WheelPos < 0)
    {
        WheelPos += WheelNumCount;
    }
    while (WheelPos >= WheelNumCount)
    {
        WheelPos -= WheelNumCount;
    }
    SetWheelSplitPos(WheelPos);
    if ((SpinState == (SpinEnd + SpinRnd)))
    {
        WheelPosT = WheelPos;
        SpinHistory();
        PaintTable();
    }
    if (!SpinDebug)
    {
        PaintWheel();
    }

    if ((SpinState <= (SpinEnd + 10 + SpinRnd)))
    {
        if (SpinDebug)
        {
            SpinT();
        }
        else
        {
            setTimeout(function(){ SpinT() }, 100);
        }
    }
    else
    {
        if (SpinDebug)
        {
            console.log(WheelNums[WheelPosT]);
        }
        for (var I = 0; I < GamePlayer_C; I++)
        {
            GamePlayer_[I].Account(WheelNums[WheelPosT], false);
            StatePlayerSave_(I);
        }
        StateSave();
        Spinning = false;
        ProbCalc();
        PaintPlayerList();
        PaintCurrentPlayer();
        PaintTable();
        PaintWheel();
    }
}

function SpinHistory()
{
    for (var I = SpinHistN - 2; I >= 0; I--)
    {
        SpinHist[I + 1] = SpinHist[I];
    }
    SpinHist[0] = WheelNums[WheelPosT];
}
