function PutChip(N, N1, N2, N3, N4, N5, N6, Btn)
{
    TableChipSensors = false;
    StateSave();
    if (PlayerSelected())
    {
        var N1_S = 10;
        var N1_Min = N1;
        var N1_Max = N1;
        if ((N == 1) && (GamePlayer_[GamePlayer_N].WheelNeigh >= (WheelNeighMax + 1)))
        {
            if (GameType == 0)
            {
                N1_Min -= 30;
                while (N1_Min <  0) { N1_Min += 10; }
                N1_Max += 30;
                while (N1_Max > 36) { N1_Max -= 10; }
            }
            if (GameType == 2)
            {
                if ((N1 > 0) && (N1 <= 100))
                {
                    if (GamePlayer_[GamePlayer_N].WheelNeigh == (WheelNeighMax + 1))
                    {
                        N1_Min -= 100;
                        while (N1_Min <   1) { N1_Min += 10; }
                        N1_Max += 100;
                        while (N1_Max > 100) { N1_Max -= 10; }
                    }
                    if (GamePlayer_[GamePlayer_N].WheelNeigh == (WheelNeighMax + 2))
                    {
                        N1_Min = N1 - ((N1 - 1) % 10);
                        N1_Max = N1_Min + 9;
                        N1_S = 1;
                    }
                }
                else
                {
                    if (Btn == 1)
                    {
                        GamePlayer_[GamePlayer_N].PutChip(N, 0, N2, N3, N4, N5, N6,  1);
                    }
                    if (Btn == 2)
                    {
                        GamePlayer_[GamePlayer_N].PutChip(N, 0, N2, N3, N4, N5, N6, -1);
                    }
                    N1_Min = 101;
                    N1_Max = 104;
                    N1_S = 1;
                }
            }
        }
        for (var N1_ = N1_Min; N1_ <= N1_Max; N1_ += N1_S)
        {
            if (Btn == 1)
            {
                GamePlayer_[GamePlayer_N].PutChip(N, N1_, N2, N3, N4, N5, N6,  1);
            }
            if (Btn == 2)
            {
                GamePlayer_[GamePlayer_N].PutChip(N, N1_, N2, N3, N4, N5, N6, -1);
            }
        }
    }
    StatePlayerSave(false);
}

function PutChipW(N, N1, Btn)
{
    TableChipSensors = false;
    StateSave();
    if (PlayerSelected())
    {
        if (Btn == 1)
        {
            GamePlayer_[GamePlayer_N].PutChipW(N, N1,  1);
        }
        if (Btn == 2)
        {
            GamePlayer_[GamePlayer_N].PutChipW(N, N1, -1);
        }
    }
    StatePlayerSave(false);
}

function ChangeWheelNeigh(Btn)
{
    if (PlayerSelected())
    {
        if (Btn == 1)
        {
            GamePlayer_[GamePlayer_N].WheelNeighChange(1);
        }
        if (Btn == 2)
        {
            GamePlayer_[GamePlayer_N].WheelNeighChange(-1);
        }
    }
    StatePlayerSave(false);
}

function TableClick(X, Y, Btn)
{
    // Click on the top bar
    if (Y < ViewMargin)
    {
        if ((X < (TableW / 3)) || (X > ((TableW * 2) / 3)))
        {
            if (X < (TableW / 3))
            {
                ViewModeI--;
                if ((GameType == 1) && (ViewModeI == 4))
                {
                    ViewModeI--;
                    ViewModeI--;
                    ViewModeI--;
                }
                if (ViewModeI < 0)
                {
                    ViewModeI = ViewModeIMax - 1;
                }
            }
            else
            {
                ViewModeI++;
                if ((GameType == 1) && (ViewModeI == 1))
                {
                    ViewModeI++;
                    ViewModeI++;
                    ViewModeI++;
                }
                if (ViewModeI >= ViewModeIMax)
                {
                    ViewModeI = 0;
                }
            }
            StateSave();
            SetView();
            PaintGame();
        }
        else
        {
            if (PlayerSelected())
            {
                Spin();
            }
            else
            {
                DisplayHelp();
            }
        }
        PaintGame();
        return;
    }

    // Click on the screen while no player selected
    if ((!PlayerSelected()) && (Y > ViewMargin) && (Y < (TableH - ViewMargin)))
    {
        DisplayHelp();
        return;
    }


    // Click on the button
    for (var I = 0; I < ButtonList.length; I++)
    {
        if ((X > ButtonList[I][1]) && (Y > ButtonList[I][2]) && (X < ButtonList[I][3]) && (Y < ButtonList[I][4]) && (!Spinning))
        {
            var Temp;
            switch (ButtonList[I][0])
            {
                case 11: // Add player
                    var PlayerN = 1;
                    for (var II = 0; II < GamePlayer_C; II++)
                    {
                        if (GamePlayer_[II].Name == ("Player " + PlayerN))
                        {
                            PlayerN++;
                            II = -1;
                        }
                    }
                    
                    Temp = prompt("Player name", "Player " + PlayerN);
                    if (Temp !== null)
                    {
                        if (Temp != "")
                        {
                            var Amount = prompt("Balance", "0");
                            if (Amount !== null)
                            {
                                if (isNaN(Amount)) { Amount = 0; }
                                Amount = parseInt(Amount);
                                GamePlayer_[GamePlayer_C] = new GamePlayer();
                                GamePlayer_[GamePlayer_C].Name = Temp;
                                GamePlayer_[GamePlayer_C].Amount = Amount;
                                GamePlayer_N = GamePlayer_C;
                                GamePlayer_C++;
                            }
                        }
                    }

                    StatePlayerSave(true);
                    SetView();
                    break;
                case 12: // Spin mode
                    SpinMode++;
                    if (SpinMode > 3)
                    {
                        SpinMode = 0;
                    }
                    StateSave();
                    break;
            }

            if ((!PlayerSelected()) && (ButtonList[I][0] <= 8))
            {
                DisplayHelp();
            }

            if (PlayerSelected())
            {
                switch (ButtonList[I][0])
                {
                    case 1:
                        GamePlayer_N--;
                        if (GamePlayer_N < 0)
                        {
                            GamePlayer_N += GamePlayer_C;
                        }
                        StateSave();
                        break;
                    case 2:
                        GamePlayer_N++;
                        if (GamePlayer_N >= GamePlayer_C)
                        {
                            GamePlayer_N -= GamePlayer_C;
                        }
                        StateSave();
                        break;
                    case 3:
                        if (GamePlayer_[GamePlayer_N].BetNominalI > 0)
                        {
                            GamePlayer_[GamePlayer_N].BetNominalI--;
                        }
                        else
                        {
                            TableChipSensors = true;
                            StateSave();
                        }
                        StatePlayerSave(false);
                        break;
                    case 4:
                        if (GamePlayer_[GamePlayer_N].BetNominalI < (GamePlayer_[GamePlayer_N].BetNominal.length - 1))
                        {
                            GamePlayer_[GamePlayer_N].BetNominalI++;
                        }
                        else
                        {
                            TableChipSensors = true;
                            StateSave();
                        }
                        StatePlayerSave(false);
                        break;
                    case 5:
                        GamePlayer_[GamePlayer_N].SetFactor(-1);
                        StatePlayerSave(false);
                        break;
                    case 6:
                        GamePlayer_[GamePlayer_N].SetFactor(+1);
                        StatePlayerSave(false);
                        break;
                    case 7:
                        GamePlayer_[GamePlayer_N].BetNominalSign = 0 - GamePlayer_[GamePlayer_N].BetNominalSign;
                        StatePlayerSave(false);
                        break;
                    case 8:
                        GamePlayer_[GamePlayer_N].ClearBets();
                        StatePlayerSave(false);
                        break;
                }
            }
            PaintGame();
            return;
        }
    }


    // Click on the table
    if (TableVisible && (!Spinning))
    {
        var XX = Math.floor(TableX_(X) / 2);
        var YY = Math.floor(TableY_(Y) / 2);
        if ((GameType == 0) && (XX >= 0) && (YY >= 0) && (XX <= 28) && (YY <= 10) && (PlayerSelected()))
        {
            var C = XX * 1000 + (10 - YY);
            switch (C)
            {
                // One number
                case 1005:
                case 1006:
                case 1007:
                case 1008:
                case 1009:  PutChip(1,  0,  0,  0,  0,  0,  0, Btn); break;
                case 3005:  PutChip(1,  1,  0,  0,  0,  0,  0, Btn); break;
                case 3007:  PutChip(1,  2,  0,  0,  0,  0,  0, Btn); break;
                case 3009:  PutChip(1,  3,  0,  0,  0,  0,  0, Btn); break;
                case 5005:  PutChip(1,  4,  0,  0,  0,  0,  0, Btn); break;
                case 5007:  PutChip(1,  5,  0,  0,  0,  0,  0, Btn); break;
                case 5009:  PutChip(1,  6,  0,  0,  0,  0,  0, Btn); break;
                case 7005:  PutChip(1,  7,  0,  0,  0,  0,  0, Btn); break;
                case 7007:  PutChip(1,  8,  0,  0,  0,  0,  0, Btn); break;
                case 7009:  PutChip(1,  9,  0,  0,  0,  0,  0, Btn); break;
                case 9005:  PutChip(1, 10,  0,  0,  0,  0,  0, Btn); break;
                case 9007:  PutChip(1, 11,  0,  0,  0,  0,  0, Btn); break;
                case 9009:  PutChip(1, 12,  0,  0,  0,  0,  0, Btn); break;
                case 11005: PutChip(1, 13,  0,  0,  0,  0,  0, Btn); break;
                case 11007: PutChip(1, 14,  0,  0,  0,  0,  0, Btn); break;
                case 11009: PutChip(1, 15,  0,  0,  0,  0,  0, Btn); break;
                case 13005: PutChip(1, 16,  0,  0,  0,  0,  0, Btn); break;
                case 13007: PutChip(1, 17,  0,  0,  0,  0,  0, Btn); break;
                case 13009: PutChip(1, 18,  0,  0,  0,  0,  0, Btn); break;
                case 15005: PutChip(1, 19,  0,  0,  0,  0,  0, Btn); break;
                case 15007: PutChip(1, 20,  0,  0,  0,  0,  0, Btn); break;
                case 15009: PutChip(1, 21,  0,  0,  0,  0,  0, Btn); break;
                case 17005: PutChip(1, 22,  0,  0,  0,  0,  0, Btn); break;
                case 17007: PutChip(1, 23,  0,  0,  0,  0,  0, Btn); break;
                case 17009: PutChip(1, 24,  0,  0,  0,  0,  0, Btn); break;
                case 19005: PutChip(1, 25,  0,  0,  0,  0,  0, Btn); break;
                case 19007: PutChip(1, 26,  0,  0,  0,  0,  0, Btn); break;
                case 19009: PutChip(1, 27,  0,  0,  0,  0,  0, Btn); break;
                case 21005: PutChip(1, 28,  0,  0,  0,  0,  0, Btn); break;
                case 21007: PutChip(1, 29,  0,  0,  0,  0,  0, Btn); break;
                case 21009: PutChip(1, 30,  0,  0,  0,  0,  0, Btn); break;
                case 23005: PutChip(1, 31,  0,  0,  0,  0,  0, Btn); break;
                case 23007: PutChip(1, 32,  0,  0,  0,  0,  0, Btn); break;
                case 23009: PutChip(1, 33,  0,  0,  0,  0,  0, Btn); break;
                case 25005: PutChip(1, 34,  0,  0,  0,  0,  0, Btn); break;
                case 25007: PutChip(1, 35,  0,  0,  0,  0,  0, Btn); break;
                case 25009: PutChip(1, 36,  0,  0,  0,  0,  0, Btn); break;

                // Two numbers along table
                case 2005:  PutChip(2,  0,  1,  0,  0,  0,  0, Btn); break;
                case 2007:  PutChip(2,  0,  2,  0,  0,  0,  0, Btn); break;
                case 2009:  PutChip(2,  0,  3,  0,  0,  0,  0, Btn); break;
                case 4005:  PutChip(2,  1,  4,  0,  0,  0,  0, Btn); break;
                case 4007:  PutChip(2,  2,  5,  0,  0,  0,  0, Btn); break;
                case 4009:  PutChip(2,  3,  6,  0,  0,  0,  0, Btn); break;
                case 6005:  PutChip(2,  4,  7,  0,  0,  0,  0, Btn); break;
                case 6007:  PutChip(2,  5,  8,  0,  0,  0,  0, Btn); break;
                case 6009:  PutChip(2,  6,  9,  0,  0,  0,  0, Btn); break;
                case 8005:  PutChip(2,  7, 10,  0,  0,  0,  0, Btn); break;
                case 8007:  PutChip(2,  8, 11,  0,  0,  0,  0, Btn); break;
                case 8009:  PutChip(2,  9, 12,  0,  0,  0,  0, Btn); break;
                case 10005: PutChip(2, 10, 13,  0,  0,  0,  0, Btn); break;
                case 10007: PutChip(2, 11, 14,  0,  0,  0,  0, Btn); break;
                case 10009: PutChip(2, 12, 15,  0,  0,  0,  0, Btn); break;
                case 12005: PutChip(2, 13, 16,  0,  0,  0,  0, Btn); break;
                case 12007: PutChip(2, 14, 17,  0,  0,  0,  0, Btn); break;
                case 12009: PutChip(2, 15, 18,  0,  0,  0,  0, Btn); break;
                case 14005: PutChip(2, 16, 19,  0,  0,  0,  0, Btn); break;
                case 14007: PutChip(2, 17, 20,  0,  0,  0,  0, Btn); break;
                case 14009: PutChip(2, 18, 21,  0,  0,  0,  0, Btn); break;
                case 16005: PutChip(2, 19, 22,  0,  0,  0,  0, Btn); break;
                case 16007: PutChip(2, 20, 23,  0,  0,  0,  0, Btn); break;
                case 16009: PutChip(2, 21, 24,  0,  0,  0,  0, Btn); break;
                case 18005: PutChip(2, 22, 25,  0,  0,  0,  0, Btn); break;
                case 18007: PutChip(2, 23, 26,  0,  0,  0,  0, Btn); break;
                case 18009: PutChip(2, 24, 27,  0,  0,  0,  0, Btn); break;
                case 20005: PutChip(2, 25, 28,  0,  0,  0,  0, Btn); break;
                case 20007: PutChip(2, 26, 29,  0,  0,  0,  0, Btn); break;
                case 20009: PutChip(2, 27, 30,  0,  0,  0,  0, Btn); break;
                case 22005: PutChip(2, 28, 31,  0,  0,  0,  0, Btn); break;
                case 22007: PutChip(2, 29, 32,  0,  0,  0,  0, Btn); break;
                case 22009: PutChip(2, 30, 33,  0,  0,  0,  0, Btn); break;
                case 24005: PutChip(2, 31, 34,  0,  0,  0,  0, Btn); break;
                case 24007: PutChip(2, 32, 35,  0,  0,  0,  0, Btn); break;
                case 24009: PutChip(2, 33, 36,  0,  0,  0,  0, Btn); break;

                // Two numbers across table
                case 3006:  PutChip(2,  1,  2,  0,  0,  0,  0, Btn); break;
                case 3008:  PutChip(2,  2,  3,  0,  0,  0,  0, Btn); break;
                case 5006:  PutChip(2,  4,  5,  0,  0,  0,  0, Btn); break;
                case 5008:  PutChip(2,  5,  6,  0,  0,  0,  0, Btn); break;
                case 7006:  PutChip(2,  7,  8,  0,  0,  0,  0, Btn); break;
                case 7008:  PutChip(2,  8,  9,  0,  0,  0,  0, Btn); break;
                case 9006:  PutChip(2, 10, 11,  0,  0,  0,  0, Btn); break;
                case 9008:  PutChip(2, 11, 12,  0,  0,  0,  0, Btn); break;
                case 11006: PutChip(2, 13, 14,  0,  0,  0,  0, Btn); break;
                case 11008: PutChip(2, 14, 15,  0,  0,  0,  0, Btn); break;
                case 13006: PutChip(2, 16, 17,  0,  0,  0,  0, Btn); break;
                case 13008: PutChip(2, 17, 18,  0,  0,  0,  0, Btn); break;
                case 15006: PutChip(2, 19, 20,  0,  0,  0,  0, Btn); break;
                case 15008: PutChip(2, 20, 21,  0,  0,  0,  0, Btn); break;
                case 17006: PutChip(2, 22, 23,  0,  0,  0,  0, Btn); break;
                case 17008: PutChip(2, 23, 24,  0,  0,  0,  0, Btn); break;
                case 19006: PutChip(2, 25, 26,  0,  0,  0,  0, Btn); break;
                case 19008: PutChip(2, 26, 27,  0,  0,  0,  0, Btn); break;
                case 21006: PutChip(2, 28, 29,  0,  0,  0,  0, Btn); break;
                case 21008: PutChip(2, 29, 30,  0,  0,  0,  0, Btn); break;
                case 23006: PutChip(2, 31, 32,  0,  0,  0,  0, Btn); break;
                case 23008: PutChip(2, 32, 33,  0,  0,  0,  0, Btn); break;
                case 25006: PutChip(2, 34, 35,  0,  0,  0,  0, Btn); break;
                case 25008: PutChip(2, 35, 36,  0,  0,  0,  0, Btn); break;

                // Three numbers
                case 2006:  PutChip(3,  0,  1,  2,  0,  0,  0, Btn); break;
                case 2008:  PutChip(3,  0,  2,  3,  0,  0,  0, Btn); break;
                case 3004:  PutChip(3,  1,  2,  3,  0,  0,  0, Btn); break;
                case 5004:  PutChip(3,  4,  5,  6,  0,  0,  0, Btn); break;
                case 7004:  PutChip(3,  7,  8,  9,  0,  0,  0, Btn); break;
                case 9004:  PutChip(3, 10, 11, 12,  0,  0,  0, Btn); break;
                case 11004: PutChip(3, 13, 14, 15,  0,  0,  0, Btn); break;
                case 13004: PutChip(3, 16, 17, 18,  0,  0,  0, Btn); break;
                case 15004: PutChip(3, 19, 20, 21,  0,  0,  0, Btn); break;
                case 17004: PutChip(3, 22, 23, 24,  0,  0,  0, Btn); break;
                case 19004: PutChip(3, 25, 26, 27,  0,  0,  0, Btn); break;
                case 21004: PutChip(3, 28, 29, 30,  0,  0,  0, Btn); break;
                case 23004: PutChip(3, 31, 32, 33,  0,  0,  0, Btn); break;
                case 25004: PutChip(3, 34, 35, 36,  0,  0,  0, Btn); break;

                // Four numbers
                case 2004:  PutChip(4,  0,  1,  2,  3,  0,  0, Btn); break;
                case 4006:  PutChip(4,  1,  2,  4,  5,  0,  0, Btn); break;
                case 4008:  PutChip(4,  2,  3,  5,  6,  0,  0, Btn); break;
                case 6006:  PutChip(4,  4,  5,  7,  8,  0,  0, Btn); break;
                case 6008:  PutChip(4,  5,  6,  8,  9,  0,  0, Btn); break;
                case 8006:  PutChip(4,  7,  8, 10, 11,  0,  0, Btn); break;
                case 8008:  PutChip(4,  8,  9, 11, 12,  0,  0, Btn); break;
                case 10006: PutChip(4, 10, 11, 13, 14,  0,  0, Btn); break;
                case 10008: PutChip(4, 11, 12, 14, 15,  0,  0, Btn); break;
                case 12006: PutChip(4, 13, 14, 16, 17,  0,  0, Btn); break;
                case 12008: PutChip(4, 14, 15, 17, 18,  0,  0, Btn); break;
                case 14006: PutChip(4, 16, 17, 19, 20,  0,  0, Btn); break;
                case 14008: PutChip(4, 17, 18, 20, 21,  0,  0, Btn); break;
                case 16006: PutChip(4, 19, 20, 22, 23,  0,  0, Btn); break;
                case 16008: PutChip(4, 20, 21, 23, 24,  0,  0, Btn); break;
                case 18006: PutChip(4, 22, 23, 25, 26,  0,  0, Btn); break;
                case 18008: PutChip(4, 23, 24, 26, 27,  0,  0, Btn); break;
                case 20006: PutChip(4, 25, 26, 28, 29,  0,  0, Btn); break;
                case 20008: PutChip(4, 26, 27, 29, 30,  0,  0, Btn); break;
                case 22006: PutChip(4, 28, 29, 31, 32,  0,  0, Btn); break;
                case 22008: PutChip(4, 29, 30, 32, 33,  0,  0, Btn); break;
                case 24006: PutChip(4, 31, 32, 34, 35,  0,  0, Btn); break;
                case 24008: PutChip(4, 32, 33, 35, 36,  0,  0, Btn); break;

                // Six numbers
                case 4004:  PutChip(6,  1,  2,  3,  4,  5,  6, Btn); break;
                case 6004:  PutChip(6,  4,  5,  6,  7,  8,  9, Btn); break;
                case 8004:  PutChip(6,  7,  8,  9, 10, 11, 12, Btn); break;
                case 10004: PutChip(6, 10, 11, 12, 13, 14, 15, Btn); break;
                case 12004: PutChip(6, 13, 14, 15, 16, 17, 18, Btn); break;
                case 14004: PutChip(6, 16, 17, 18, 19, 20, 21, Btn); break;
                case 16004: PutChip(6, 19, 20, 21, 22, 23, 24, Btn); break;
                case 18004: PutChip(6, 22, 23, 24, 25, 26, 27, Btn); break;
                case 20004: PutChip(6, 25, 26, 27, 28, 29, 30, Btn); break;
                case 22004: PutChip(6, 28, 29, 30, 31, 32, 33, Btn); break;
                case 24004: PutChip(6, 31, 32, 33, 34, 35, 36, Btn); break;

                // Columns, Dozens, Snake
                case 27005: PutChip(7,  1,  0,  0,  0,  0,  0, Btn); break;
                case 27007: PutChip(7,  2,  0,  0,  0,  0,  0, Btn); break;
                case 27009: PutChip(7,  3,  0,  0,  0,  0,  0, Btn); break;
                case 3003:
                case 4003:
                case 5003:
                case 6003:
                case 7003:
                case 8003:
                case 9003:  PutChip(7,  4,  0,  0,  0,  0,  0, Btn); break;
                case 11003:
                case 12003:
                case 13003:
                case 14003:
                case 15003:
                case 16003:
                case 17003: PutChip(7,  5,  0,  0,  0,  0,  0, Btn); break;
                case 19003:
                case 20003:
                case 21003:
                case 22003:
                case 23003:
                case 24003:
                case 25003: PutChip(7,  6,  0,  0,  0,  0,  0, Btn); break;
                case 26004: PutChip(7,  7,  0,  0,  0,  0,  0, Btn); break;

                // Low, Even, Red, Black, Odd, High
                case 3001:
                case 4001:
                case 5001:  PutChip(8,  1,  0,  0,  0,  0,  0, Btn); break;
                case 7001:
                case 8001:
                case 9001:  PutChip(8,  2,  0,  0,  0,  0,  0, Btn); break;
                case 11001:
                case 12001:
                case 13001: PutChip(8,  3,  0,  0,  0,  0,  0, Btn); break;
                case 15001:
                case 16001:
                case 17001: PutChip(8,  4,  0,  0,  0,  0,  0, Btn); break;
                case 19001:
                case 20001:
                case 21001: PutChip(8,  5,  0,  0,  0,  0,  0, Btn); break;
                case 23001:
                case 24001:
                case 25001: PutChip(8,  6,  0,  0,  0,  0,  0, Btn); break;
            }
        }
        if ((GameType == 1) && (XX >= 0) && (YY >= 0) && (XX <= 12) && (YY <= 8) && (PlayerSelected()))
        {
            var C = XX * 1000 + (10 - YY);
            switch (C)
            {
                // One number
                case 1005:
                case 1006:
                case 1007:
                case 1008:
                case 1009:  PutChip(1,  0,  0,  0,  0,  0,  0, Btn); break;
                case 3005:  PutChip(1,  1,  0,  0,  0,  0,  0, Btn); break;
                case 3007:  PutChip(1,  2,  0,  0,  0,  0,  0, Btn); break;
                case 3009:  PutChip(1,  3,  0,  0,  0,  0,  0, Btn); break;
                case 5005:  PutChip(1,  4,  0,  0,  0,  0,  0, Btn); break;
                case 5007:  PutChip(1,  5,  0,  0,  0,  0,  0, Btn); break;
                case 5009:  PutChip(1,  6,  0,  0,  0,  0,  0, Btn); break;
                case 7005:  PutChip(1,  7,  0,  0,  0,  0,  0, Btn); break;
                case 7007:  PutChip(1,  8,  0,  0,  0,  0,  0, Btn); break;
                case 7009:  PutChip(1,  9,  0,  0,  0,  0,  0, Btn); break;
                case 9005:  PutChip(1, 10,  0,  0,  0,  0,  0, Btn); break;
                case 9007:  PutChip(1, 11,  0,  0,  0,  0,  0, Btn); break;
                case 9009:  PutChip(1, 12,  0,  0,  0,  0,  0, Btn); break;

                // Two numbers along table
                case 2005:  PutChip(2,  0,  1,  0,  0,  0,  0, Btn); break;
                case 2007:  PutChip(2,  0,  2,  0,  0,  0,  0, Btn); break;
                case 2009:  PutChip(2,  0,  3,  0,  0,  0,  0, Btn); break;
                case 4005:  PutChip(2,  1,  4,  0,  0,  0,  0, Btn); break;
                case 4007:  PutChip(2,  2,  5,  0,  0,  0,  0, Btn); break;
                case 4009:  PutChip(2,  3,  6,  0,  0,  0,  0, Btn); break;
                case 6005:  PutChip(2,  4,  7,  0,  0,  0,  0, Btn); break;
                case 6007:  PutChip(2,  5,  8,  0,  0,  0,  0, Btn); break;
                case 6009:  PutChip(2,  6,  9,  0,  0,  0,  0, Btn); break;
                case 8005:  PutChip(2,  7, 10,  0,  0,  0,  0, Btn); break;
                case 8007:  PutChip(2,  8, 11,  0,  0,  0,  0, Btn); break;
                case 8009:  PutChip(2,  9, 12,  0,  0,  0,  0, Btn); break;

                // Two numbers across table
                case 3006:  PutChip(2,  1,  2,  0,  0,  0,  0, Btn); break;
                case 3008:  PutChip(2,  2,  3,  0,  0,  0,  0, Btn); break;
                case 5006:  PutChip(2,  4,  5,  0,  0,  0,  0, Btn); break;
                case 5008:  PutChip(2,  5,  6,  0,  0,  0,  0, Btn); break;
                case 7006:  PutChip(2,  7,  8,  0,  0,  0,  0, Btn); break;
                case 7008:  PutChip(2,  8,  9,  0,  0,  0,  0, Btn); break;
                case 9006:  PutChip(2, 10, 11,  0,  0,  0,  0, Btn); break;
                case 9008:  PutChip(2, 11, 12,  0,  0,  0,  0, Btn); break;

                // Three numbers
                case 2006:  PutChip(3,  0,  1,  2,  0,  0,  0, Btn); break;
                case 2008:  PutChip(3,  0,  2,  3,  0,  0,  0, Btn); break;
                case 3004:  PutChip(3,  1,  2,  3,  0,  0,  0, Btn); break;
                case 5004:  PutChip(3,  4,  5,  6,  0,  0,  0, Btn); break;
                case 7004:  PutChip(3,  7,  8,  9,  0,  0,  0, Btn); break;
                case 9004:  PutChip(3, 10, 11, 12,  0,  0,  0, Btn); break;

                // Four numbers
                case 2004:  PutChip(4,  0,  1,  2,  3,  0,  0, Btn); break;
                case 4006:  PutChip(4,  1,  2,  4,  5,  0,  0, Btn); break;
                case 4008:  PutChip(4,  2,  3,  5,  6,  0,  0, Btn); break;
                case 6006:  PutChip(4,  4,  5,  7,  8,  0,  0, Btn); break;
                case 6008:  PutChip(4,  5,  6,  8,  9,  0,  0, Btn); break;
                case 8006:  PutChip(4,  7,  8, 10, 11,  0,  0, Btn); break;
                case 8008:  PutChip(4,  8,  9, 11, 12,  0,  0, Btn); break;
                case 11009: PutChip(4,  3,  6,  9, 12,  0,  0, Btn); break;
                case 11007: PutChip(4,  2,  5,  8, 11,  0,  0, Btn); break;
                case 11005: PutChip(4,  1,  4,  7, 10,  0,  0, Btn); break;

                // Six numbers
                case 4004:  PutChip(6,  1,  2,  3,  4,  5,  6, Btn); break;
                case 6004:  PutChip(6,  4,  5,  6,  7,  8,  9, Btn); break;
                case 8004:  PutChip(6,  7,  8,  9, 10, 11, 12, Btn); break;

                // Black, Red
                case 3003:
                case 4003:
                case 5003:  PutChip(8,  4,  0,  0,  0,  0,  0, Btn); break;
                case 7003:
                case 8003:
                case 9003:  PutChip(8,  3,  0,  0,  0,  0,  0, Btn); break;
            }
        }
        if ((GameType == 2) && (XX >= 0) && (YY >= 0) && (XX <= 28) && (YY <= 20) && (PlayerSelected()))
        {
            var C = XX * 1000 + YY;
            switch (C)
            {
                // One number
                case 5001:
                case 5002:
                case 5003:  PutChip(1,  0,  0,  0, 0, 0, 0, Btn); break;
                case 5005:
                case 5006:
                case 5007:  PutChip(1,101,  0,  0, 0, 0, 0, Btn); break;
                case 5009:
                case 5010:
                case 5011:  PutChip(1,102,  0,  0, 0, 0, 0, Btn); break;
                case 5013:
                case 5014:
                case 5015:  PutChip(1,103,  0,  0, 0, 0, 0, Btn); break;
                case 5017:
                case 5018:
                case 5019:  PutChip(1,104,  0,  0, 0, 0, 0, Btn); break;

                // Two numbers
                case 5004:  PutChip(2,  0,101,  0, 0, 0, 0, Btn); break;
                case 5008:  PutChip(2,101,102,  0, 0, 0, 0, Btn); break;
                case 5012:  PutChip(2,102,103,  0, 0, 0, 0, Btn); break;
                case 5016:  PutChip(2,103,104,  0, 0, 0, 0, Btn); break;
                case 6001:  PutChip(2,  0,  1,  0, 0, 0, 0, Btn); break;
                case 6003:  PutChip(2,  0,  2,  0, 0, 0, 0, Btn); break;
                case 6005:  PutChip(2,101,  3,  0, 0, 0, 0, Btn); break;
                case 6007:  PutChip(2,101,  4,  0, 0, 0, 0, Btn); break;
                case 6009:  PutChip(2,102,  5,  0, 0, 0, 0, Btn); break;
                case 6011:  PutChip(2,102,  6,  0, 0, 0, 0, Btn); break;
                case 6013:  PutChip(2,103,  7,  0, 0, 0, 0, Btn); break;
                case 6015:  PutChip(2,103,  8,  0, 0, 0, 0, Btn); break;
                case 6017:  PutChip(2,104,  9,  0, 0, 0, 0, Btn); break;
                case 6019:  PutChip(2,104, 10,  0, 0, 0, 0, Btn); break;

                // Three numbers
                case 6002:  PutChip(3,  0,  1,  2, 0, 0, 0, Btn); break;
                case 6006:  PutChip(3,101,  3,  4, 0, 0, 0, Btn); break;
                case 6010:  PutChip(3,102,  5,  6, 0, 0, 0, Btn); break;
                case 6014:  PutChip(3,103,  7,  8, 0, 0, 0, Btn); break;
                case 6018:  PutChip(3,104,  9, 10, 0, 0, 0, Btn); break;

                // Four numbers
                case 6004:  PutChip(4,  0,101,  2, 3, 0, 0, Btn); break;
                case 6008:  PutChip(4,101,102,  4, 5, 0, 0, Btn); break;
                case 6012:  PutChip(4,102,103,  6, 7, 0, 0, Btn); break;
                case 6016:  PutChip(4,103,104,  8, 9, 0, 0, Btn); break;

                // Special bets
                case 5020:  PutChip(5,  1,  0,  0, 0, 0, 0, Btn); break;
                case 6020:  PutChip(5,  2,  0,  0, 0, 0, 0, Btn); break;

                // Ten numbers along table
                case 27001: PutChip(6,  1,  0,  0, 0, 0, 0, Btn); break;
                case 27003: PutChip(6,  2,  0,  0, 0, 0, 0, Btn); break;
                case 27005: PutChip(6,  3,  0,  0, 0, 0, 0, Btn); break;
                case 27007: PutChip(6,  4,  0,  0, 0, 0, 0, Btn); break;
                case 27009: PutChip(6,  5,  0,  0, 0, 0, 0, Btn); break;
                case 27011: PutChip(6,  6,  0,  0, 0, 0, 0, Btn); break;
                case 27013: PutChip(6,  7,  0,  0, 0, 0, 0, Btn); break;
                case 27015: PutChip(6,  8,  0,  0, 0, 0, 0, Btn); break;
                case 27017: PutChip(6,  9,  0,  0, 0, 0, 0, Btn); break;
                case 27019: PutChip(6, 10,  0,  0, 0, 0, 0, Btn); break;

                // Ten numbers across table
                case 7020:  PutChip(6, 11,  0,  0, 0, 0, 0, Btn); break;
                case 9020:  PutChip(6, 12,  0,  0, 0, 0, 0, Btn); break;
                case 11020: PutChip(6, 13,  0,  0, 0, 0, 0, Btn); break;
                case 13020: PutChip(6, 14,  0,  0, 0, 0, 0, Btn); break;
                case 15020: PutChip(6, 15,  0,  0, 0, 0, 0, Btn); break;
                case 17020: PutChip(6, 16,  0,  0, 0, 0, 0, Btn); break;
                case 19020: PutChip(6, 17,  0,  0, 0, 0, 0, Btn); break;
                case 21020: PutChip(6, 18,  0,  0, 0, 0, 0, Btn); break;
                case 23020: PutChip(6, 19,  0,  0, 0, 0, 0, Btn); break;
                case 25020: PutChip(6, 20,  0,  0, 0, 0, 0, Btn); break;

                // Twenty numbers along table
                case 27002: PutChip(7,  1,  0,  0, 0, 0, 0, Btn); break;
                case 27004: PutChip(7,  2,  0,  0, 0, 0, 0, Btn); break;
                case 27006: PutChip(7,  3,  0,  0, 0, 0, 0, Btn); break;
                case 27008: PutChip(7,  4,  0,  0, 0, 0, 0, Btn); break;
                case 27010: PutChip(7,  5,  0,  0, 0, 0, 0, Btn); break;
                case 27012: PutChip(7,  6,  0,  0, 0, 0, 0, Btn); break;
                case 27014: PutChip(7,  7,  0,  0, 0, 0, 0, Btn); break;
                case 27016: PutChip(7,  8,  0,  0, 0, 0, 0, Btn); break;
                case 27018: PutChip(7,  9,  0,  0, 0, 0, 0, Btn); break;

                // Twenty numbers across table
                case 8020:  PutChip(7, 11,  0,  0, 0, 0, 0, Btn); break;
                case 10020: PutChip(7, 12,  0,  0, 0, 0, 0, Btn); break;
                case 12020: PutChip(7, 13,  0,  0, 0, 0, 0, Btn); break;
                case 14020: PutChip(7, 14,  0,  0, 0, 0, 0, Btn); break;
                case 16020: PutChip(7, 15,  0,  0, 0, 0, 0, Btn); break;
                case 18020: PutChip(7, 16,  0,  0, 0, 0, 0, Btn); break;
                case 20020: PutChip(7, 17,  0,  0, 0, 0, 0, Btn); break;
                case 22020: PutChip(7, 18,  0,  0, 0, 0, 0, Btn); break;
                case 24020: PutChip(7, 19,  0,  0, 0, 0, 0, Btn); break;

                // Odd, Black, Red, Even
                case 1003:
                case 1004:
                case 1005:
                case 2003:
                case 2004:
                case 2005:
                case 3003:
                case 3004:
                case 3005:
                case 7021:
                case 8021:
                case 9021:
                case 10021: PutChip(8,  2,  0,  0, 0, 0, 0, Btn); break;
                case 1007:
                case 1008:
                case 1009:
                case 2007:
                case 2008:
                case 2009:
                case 3007:
                case 3008:
                case 3009:
                case 12021:
                case 13021:
                case 14021:
                case 15021: PutChip(8,  3,  0,  0, 0, 0, 0, Btn); break;
                case 1011:
                case 1012:
                case 1013:
                case 2011:
                case 2012:
                case 2013:
                case 3011:
                case 3012:
                case 3013:
                case 17021:
                case 18021:
                case 19021:
                case 20021: PutChip(8,  4,  0,  0, 0, 0, 0, Btn); break;
                case 1015:
                case 1016:
                case 1017:
                case 2015:
                case 2016:
                case 2017:
                case 3015:
                case 3016:
                case 3017:
                case 22021:
                case 23021:
                case 24021:
                case 25021: PutChip(8,  5,  0,  0, 0, 0, 0, Btn); break;
            }
            if ((XX >= 7) && (XX <= 25) && (YY >= 1) && (YY <= 19))
            {
                // One number
                if (((XX % 2) == 1) && ((YY % 2) == 1))
                {
                    var XXYY = ((1 + YY) / 2) + ((XX * 5) - 35);
                    PutChip(1, XXYY, 0, 0, 0, 0, 0, Btn);
                }

                // Two numbers along table
                if (((XX % 2) == 0) && ((YY % 2) == 1))
                {
                    var XXYY = ((1 + YY) / 2) + ((XX * 5) - 40);
                    PutChip(2, XXYY, XXYY + 10, 0, 0, 0, 0, Btn);
                }

                // Two numbers across table
                if (((XX % 2) == 1) && ((YY % 2) == 0))
                {
                    var XXYY = ((0 + YY) / 2) + ((XX * 5) - 35);
                    PutChip(2, XXYY, XXYY + 1, 0, 0, 0, 0, Btn);
                }

                // Four numbers
                if (((XX % 2) == 0) && ((YY % 2) == 0))
                {
                    var XXYY = ((0 + YY) / 2) + ((XX * 5) - 40);
                    PutChip(4, XXYY, XXYY + 1, XXYY + 10, XXYY + 11, 0, 0, Btn);
                }
            }
        }
    }


    // Click on the table to choose the number in SEL mode
    if (TableVisible && (Spinning) && (SpinMode == 2))
    {
        var XX = Math.floor(TableX_(X) / 2);
        var YY = Math.floor(TableY_(Y) / 2);
        if ((GameType == 0) && (XX >= 0) && (YY >= 0) && (XX <= 28) && (YY <= 10) && (PlayerSelected()))
        {
            var C = XX * 1000 + (10 - YY);
            switch (C)
            {
                case 1005:
                case 1006:
                case 1007:
                case 1008:
                case 1009:  WheelPos =  0; SpinState = SpinStop; break;
                case 3005:  WheelPos = 23; SpinState = SpinStop; break;
                case 3007:  WheelPos =  6; SpinState = SpinStop; break;
                case 3009:  WheelPos = 35; SpinState = SpinStop; break;
                case 5005:  WheelPos =  4; SpinState = SpinStop; break;
                case 5007:  WheelPos = 19; SpinState = SpinStop; break;
                case 5009:  WheelPos = 10; SpinState = SpinStop; break;
                case 7005:  WheelPos = 31; SpinState = SpinStop; break;
                case 7007:  WheelPos = 16; SpinState = SpinStop; break;
                case 7009:  WheelPos = 27; SpinState = SpinStop; break;
                case 9005:  WheelPos = 18; SpinState = SpinStop; break;
                case 9007:  WheelPos = 14; SpinState = SpinStop; break;
                case 9009:  WheelPos = 33; SpinState = SpinStop; break;
                case 11005: WheelPos = 12; SpinState = SpinStop; break;
                case 11007: WheelPos = 25; SpinState = SpinStop; break;
                case 11009: WheelPos =  2; SpinState = SpinStop; break;
                case 13005: WheelPos = 21; SpinState = SpinStop; break;
                case 13007: WheelPos =  8; SpinState = SpinStop; break;
                case 13009: WheelPos = 29; SpinState = SpinStop; break;
                case 15005: WheelPos =  3; SpinState = SpinStop; break;
                case 15007: WheelPos = 24; SpinState = SpinStop; break;
                case 15009: WheelPos =  5; SpinState = SpinStop; break;
                case 17005: WheelPos = 28; SpinState = SpinStop; break;
                case 17007: WheelPos = 17; SpinState = SpinStop; break;
                case 17009: WheelPos = 20; SpinState = SpinStop; break;
                case 19005: WheelPos =  7; SpinState = SpinStop; break;
                case 19007: WheelPos = 36; SpinState = SpinStop; break;
                case 19009: WheelPos = 11; SpinState = SpinStop; break;
                case 21005: WheelPos = 32; SpinState = SpinStop; break;
                case 21007: WheelPos = 30; SpinState = SpinStop; break;
                case 21009: WheelPos = 15; SpinState = SpinStop; break;
                case 23005: WheelPos = 26; SpinState = SpinStop; break;
                case 23007: WheelPos =  1; SpinState = SpinStop; break;
                case 23009: WheelPos = 22; SpinState = SpinStop; break;
                case 25005: WheelPos =  9; SpinState = SpinStop; break;
                case 25007: WheelPos = 34; SpinState = SpinStop; break;
                case 25009: WheelPos = 13; SpinState = SpinStop; break;
            }
        }
        if ((GameType == 1) && (XX >= 0) && (YY >= 0) && (XX <= 12) && (YY <= 10) && (PlayerSelected()))
        {
            var C = XX * 1000 + (10 - YY);
            switch (C)
            {
                case 1005:
                case 1006:
                case 1007:
                case 1008:
                case 1009: WheelPos =  0; SpinState = SpinStop; break;
                case 3005: WheelPos =  5; SpinState = SpinStop; break;
                case 3007: WheelPos =  8; SpinState = SpinStop; break;
                case 3009: WheelPos =  3; SpinState = SpinStop; break;
                case 5005: WheelPos = 12; SpinState = SpinStop; break;
                case 5007: WheelPos =  1; SpinState = SpinStop; break;
                case 5009: WheelPos = 10; SpinState = SpinStop; break;
                case 7005: WheelPos =  9; SpinState = SpinStop; break;
                case 7007: WheelPos =  6; SpinState = SpinStop; break;
                case 7009: WheelPos =  7; SpinState = SpinStop; break;
                case 9005: WheelPos =  4; SpinState = SpinStop; break;
                case 9007: WheelPos = 11; SpinState = SpinStop; break;
                case 9009: WheelPos =  2; SpinState = SpinStop; break;
            }
        }
        if ((GameType == 2) && (XX >= 0) && (YY >= 0) && (XX <= 28) && (YY <= 20) && (PlayerSelected()))
        {
            var C = XX * 1000 + YY;
            switch (C)
            {
                case 5001:
                case 5002:
                case 5003: WheelPos =  0; SpinState = SpinStop; break;
                case 5005:
                case 5006:
                case 5007: WheelPos = 84; SpinState = SpinStop; break;
                case 5009:
                case 5010:
                case 5011: WheelPos = 42; SpinState = SpinStop; break;
                case 5013:
                case 5014:
                case 5015: WheelPos = 63; SpinState = SpinStop; break;
                case 5017:
                case 5018:
                case 5019: WheelPos = 21; SpinState = SpinStop; break;
            }
            if ((XX >= 7) && (XX <= 25) && (YY >= 1) && (YY <= 19))
            {
                if (((XX % 2) == 1) && ((YY % 2) == 1))
                {
                    var XXYY = ((1 + YY) / 2) + ((XX * 5) - 35);
                    for (var I = 0; I < 105; I++)
                    {
                        if (WheelNums[I] == XXYY)
                        {
                            WheelPos = I; SpinState = SpinStop;
                        }
                    }
                }
            }
        }
    }


    // Click on the wheel
    if (WheelVisible)
    {
        var WheelDistX = X - WheelX;
        var WheelDistY = Y - WheelY;
        var WheelDist = Math.sqrt((WheelDistX * WheelDistX) + (WheelDistY * WheelDistY));
        if ((WheelDist) <= WheelD0)
        {
            var Angle = Math.atan2(WheelDistY, WheelDistX) - WheelCalcOffset();
            if (GameType != 2)
            {
                Angle = parseInt(Math.floor((WheelNumCount / 2) * Angle / Math.PI));
                while (Angle < 0)
                {
                    Angle = WheelNumCount + Angle;
                }
            }
            else
            {
                Angle = Math.atan2(WheelDistY, WheelDistX) - WheelCalcOffset2();
                Angle = parseInt(Math.floor((WheelNumCount / 6) * Angle / Math.PI));
                while (Angle < 0)
                {
                    Angle = 35 + Angle;
                }
                while (Angle < WheelSplitPos)
                {
                    Angle += 35;
                }
                if (Angle >= 105)
                {
                    Angle -= 105;
                }
                if ((WheelDist > WheelD5) && (!Spinning))
                {
                    SetWheelSplitPos(Angle);
                    StateSave();
                }
            }

            if (Spinning)
            {
                if ((SpinMode == 2) && (WheelDist >= WheelD3))
                {
                    WheelPos = Angle;
                    SpinState = SpinStop;
                }
            }
            else
            {
                if (WheelDist <= WheelD3)
                {
                    if (WheelDist <= WheelD5)
                    {
                        ChangeWheelNeigh(Btn);
                    }
                    else
                    {
                        if (GameType == 0)
                        {
                            PutChipW(1, Angle, Btn);
                        }
                        if (GameType == 2)
                        {
                            if (PlayerSelected())
                            {
                                GamePlayer_[GamePlayer_N].WheelNeighLastReset();
                            }
                            if (WheelDist < ((WheelD3 + WheelD5) / 2))
                            {
                                WheelSplitPos += 70;
                            }
                            else
                            {
                                WheelSplitPos += 35;
                            }
                            if (WheelSplitPos >= 105)
                            {
                                WheelSplitPos -= 105;
                            }
                            StateSave();
                        }
                    }
                }
                else
                {
                    PutChipW(0, Angle, Btn);
                }
            }
        }
    }

    // Click on the player list
    if ((!Spinning) && PlayersVisible && PlayerSelected() && (X > PlayersX) && (Y > PlayersY) && (X < (PlayersX + PlayersW)) && (Y < (PlayersY + PlayersH)))
    {
        if (ProbMode)
        {
            ProbOpen();
        }
        else
        {
            var TempName = GamePlayer_[GamePlayer_N].Name;
            var TempAmount = GamePlayer_[GamePlayer_N].Amount;
            TempName = prompt("Player name", TempName);
            if (TempName !== null)
            {
                if (TempName != "")
                {
                    TempAmount = prompt("Balance", TempAmount);
                    if (TempAmount !== null)
                    {
                        if (isNaN(TempAmount)) { TempAmount = 0; }
                        GamePlayer_[GamePlayer_N].Name = TempName;
                        GamePlayer_[GamePlayer_N].Amount = parseInt(TempAmount);
                        StatePlayerSave(false);
                    }
                }
                else
                {
                    if (confirm("Remove player " + GamePlayer_[GamePlayer_N].Name + "?"))
                    {
                        GamePlayer_.splice(GamePlayer_N, 1);
                        GamePlayer_C--;
                        if (GamePlayer_N >= GamePlayer_C)
                        {
                            GamePlayer_N = 0;
                        }
                        if (GamePlayer_C == 0) 
                        {
                            GamePlayer_N = -1;
                        }
                    }
                    StatePlayerSave(true);
                    SetView();
                }
            }
        }
    }

    PaintGame();
}
