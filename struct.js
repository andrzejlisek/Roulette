var WheelNeighMax = 5;

var GamePlayer = function()
{
    this.BetNominalI = 0;

    if (GameType != 1)
    {
        this.BetNominal = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
    }
    else
    {
        // For "Mini" version the bet must have even value
        this.BetNominal = [2, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
    }
    this.BetNominalSign = 1;
    this.BetFactor = 0;
    this.BetFactorVal = 1;

    this.AmountLast = 0;
    this.Amount = 0;
    this.AmountT = 0;
    this.BetList = [];
    this.BetList0 = [];
    this.BetListSector0 = [0, 0, 0, 0, 0, 0];
    this.Name = "";
    this.WheelNeigh = 2;


    this.WheelNeighLastN = 0;
    this.WheelNeighLastS = -1;

    this.WheelNeighLastReset = function()
    {
        this.WheelNeighLastS = -1;
    };


    this.WheelNeighLast = function(N)
    {
        if (this.WheelNeighLastS >= 0)
        {
            if (this.WheelNeighLastS < 105)
            {
                if (this.WheelNeighLastN <= WheelNeighMax)
                {
                    if (((N - WheelNumCount) >= (this.WheelNeighLastS - this.WheelNeighLastN)) && ((N - WheelNumCount) <= (this.WheelNeighLastS + this.WheelNeighLastN))) { return 1; }
                    if (((N +             0) >= (this.WheelNeighLastS - this.WheelNeighLastN)) && ((N +             0) <= (this.WheelNeighLastS + this.WheelNeighLastN))) { return 1; }
                    if (((N + WheelNumCount) >= (this.WheelNeighLastS - this.WheelNeighLastN)) && ((N + WheelNumCount) <= (this.WheelNeighLastS + this.WheelNeighLastN))) { return 1; }
                }
                else
                {
                    if (GameType == 0)
                    {
                        if (WheelNums[N] == (WheelNums[this.WheelNeighLastS] - 30)) { return 1; }
                        if (WheelNums[N] == (WheelNums[this.WheelNeighLastS] - 20)) { return 1; }
                        if (WheelNums[N] == (WheelNums[this.WheelNeighLastS] - 10)) { return 1; }
                        if (WheelNums[N] == (WheelNums[this.WheelNeighLastS] +  0)) { return 1; }
                        if (WheelNums[N] == (WheelNums[this.WheelNeighLastS] + 10)) { return 1; }
                        if (WheelNums[N] == (WheelNums[this.WheelNeighLastS] + 20)) { return 1; }
                        if (WheelNums[N] == (WheelNums[this.WheelNeighLastS] + 30)) { return 1; }
                    }

                    if (GameType == 2)
                    {
                        if ((WheelNums[this.WheelNeighLastS] > 0) && (WheelNums[this.WheelNeighLastS] <= 100))
                        {
                            if (this.WheelNeighLastN == (WheelNeighMax + 1))
                            {
                                if (((WheelNums[N] - 1) % 10) == ((WheelNums[this.WheelNeighLastS] - 1) % 10))
                                {
                                    return 1;
                                }
                            }
                            if (this.WheelNeighLastN == (WheelNeighMax + 2))
                            {
                                if (Math.floor((WheelNums[N] - 1) / 10) == Math.floor((WheelNums[this.WheelNeighLastS] - 1) / 10))
                                {
                                    return 1;
                                }
                            }
                        }
                        else
                        {
                            if (WheelNums[N] ==   0) { return 1; }
                            if (WheelNums[N] == 101) { return 1; }
                            if (WheelNums[N] == 102) { return 1; }
                            if (WheelNums[N] == 103) { return 1; }
                            if (WheelNums[N] == 104) { return 1; }
                        }
                    }
                }
            }
        }
        return 0;
    };

    this.WheelNeighChange = function(Sgn)
    {
        this.WheelNeighLastS = -1;
        this.WheelNeigh += (this.BetNominalSign * Sgn);
        if (GameType == 0)
        {
            if (this.WheelNeigh == -1)
            {
                this.WheelNeigh = (WheelNeighMax + 1);
            }
            if (this.WheelNeigh == (WheelNeighMax + 2))
            {
                this.WheelNeigh = 0;
            }
        }
        if (GameType == 1)
        {
            if (this.WheelNeigh == -1)
            {
                this.WheelNeigh = (WheelNeighMax);
            }
            if (this.WheelNeigh == (WheelNeighMax + 1))
            {
                this.WheelNeigh = 0;
            }
        }
        if (GameType == 2)
        {
            if (this.WheelNeigh == -1)
            {
                this.WheelNeigh = (WheelNeighMax + 2);
            }
            if (this.WheelNeigh == (WheelNeighMax + 3))
            {
                this.WheelNeigh = 0;
            }
        }
    };

    this.SetFactor = function(N)
    {
        if (N > 0)
        {
            if (this.BetFactor < 9)
            {
                this.BetFactor++;
            }
        }
        if (N < 0)
        {
            if (this.BetFactor > 0)
            {
                this.BetFactor--;
            }
        }
        this.BetFactorVal = parseInt(Math.pow(10, this.BetFactor));
    };

    this.PutChipW = function(N, N1, Sgn)
    {
        this.WheelNeighLastS = -1;
        if (N == 0)
        {
            if (this.WheelNeigh <= WheelNeighMax)
            {
                for (var I = (N1 - this.WheelNeigh); I <= (N1 + this.WheelNeigh); I++)
                {
                    var I_ = I;
                    while (I_ < 0)
                    {
                        I_ += WheelNumCount;
                    }
                    while (I_ >= WheelNumCount)
                    {
                        I_ -= WheelNumCount;
                    }
                    this.PutChip(11, WheelNums[I_], 0, 0, 0, 0, 0, Sgn);
                }
            }
            else
            {
                if (GameType == 0)
                {
                    for (var I = (WheelNums[N1] - 30); I <= (WheelNums[N1] + 30); I += 10)
                    {
                        if ((I >= 0) && (I <= 36))
                        {
                            this.PutChip(11, I, 0, 0, 0, 0, 0, Sgn);
                        }
                    }
                }

                if (GameType == 2)
                {
                    if ((WheelNums[N1] > 0) && (WheelNums[N1] <= 100))
                    {
                        if (this.WheelNeigh == (WheelNeighMax + 1))
                        {
                            for (var I = (WheelNums[N1] - 100); I <= (WheelNums[N1] + 100); I += 10)
                            {
                                if ((I >= 1) && (I <= 100))
                                {
                                    this.PutChip(11, I, 0, 0, 0, 0, 0, Sgn);
                                }
                            }
                        }
                        if (this.WheelNeigh == (WheelNeighMax + 2))
                        {
                            for (var I = (WheelNums[N1] - ((WheelNums[N1] - 1) % 10)); I <= (WheelNums[N1] - ((WheelNums[N1] - 1) % 10) + 9); I += 1)
                            {
                                if ((I >= 1) && (I <= 100))
                                {
                                    this.PutChip(11, I, 0, 0, 0, 0, 0, Sgn);
                                }
                            }
                        }
                    }
                    else
                    {
                        this.PutChip(11,   0, 0, 0, 0, 0, 0, Sgn);
                        this.PutChip(11, 101, 0, 0, 0, 0, 0, Sgn);
                        this.PutChip(11, 102, 0, 0, 0, 0, 0, Sgn);
                        this.PutChip(11, 103, 0, 0, 0, 0, 0, Sgn);
                        this.PutChip(11, 104, 0, 0, 0, 0, 0, Sgn);
                    }
                }
            }
            this.WheelNeighLastS = N1;
            this.WheelNeighLastN = this.WheelNeigh;
        }
        if (N == 1)
        {
            if ((N1 <= 2) || (N1 >= 33))
            {
                this.PutChip(12, 5,  0,  0,  0, 0, 0, Sgn * 4);
            }
            if ((N1 >= 3) && (N1 <= 7))
            {
                this.PutChip(12, 0,  0,  0,  0, 0, 0, Sgn * 9);
            }
            if ((N1 >= 28) && (N1 <= 32))
            {
                this.PutChip(12, 4,  0,  0,  0, 0, 0, Sgn * 9);
            }
            if ((N1 >= 8) && (N1 <= 10))
            {
                this.PutChip(12, 1,  0,  0,  0, 0, 0, Sgn * 5);
            }
            if ((N1 >= 23) && (N1 <= 27))
            {
                this.PutChip(12, 3,  0,  0,  0, 0, 0, Sgn * 5);
            }
            if ((N1 >= 11) && (N1 <= 22))
            {
                this.PutChip(12, 2,  0,  0,  0, 0, 0, Sgn * 6);
            }
        }
    };



    this.PutChip = function(N, N1, N2, N3, N4, N5, N6, Sgn)
    {
        this.PutChipT(N, N1, N2, N3, N4, N5, N6, Sgn, this.BetNominal[this.BetNominalI] * this.BetNominalSign * Sgn);
    };

    this.PutChipT = function(N, N1, N2, N3, N4, N5, N6, Sgn, Val_)
    {
        this.WheelNeighLastS = -1;
        var Found = false;
        var Val = parseInt(Val_);
        var MaxVal = 10000;
        MaxVal = Math.floor(MaxVal / Math.abs(Sgn));
        MaxVal = MaxVal * Math.abs(Sgn);
        for (var I = 0; I < this.BetList.length; I++)
        {
            if (this.BetList[I][0] == N)
            {
                if (this.BetList[I][1] == N1)
                {
                    if (this.BetList[I][2] == N2)
                    {
                        if (this.BetList[I][3] == N3)
                        {
                            if (this.BetList[I][4] == N4)
                            {
                                if (this.BetList[I][5] == N5)
                                {
                                    if (this.BetList[I][6] == N6)
                                    {
                                        if ((this.BetList[I][7] + Val) > MaxVal)
                                        {
                                            Val = MaxVal - this.BetList[I][7];
                                        }

                                        if ((this.BetList[I][7] + Val) < 0)
                                        {
                                            Val = 0 - this.BetList[I][7];
                                        }

                                        this.BetList[I][7] += Val;
                                        this.AmountT += Val;

                                        if (this.BetList[I][7] == 0)
                                        {
                                            this.BetList.splice(I, 1);
                                        }
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (Val > 0)
        {
            if (Val > MaxVal)
            {
                Val = MaxVal;
            }
            this.BetList.push([N, N1, N2, N3, N4, N5, N6, Val]);
            this.AmountT += Val;
        }
    };

    // Chip coordinates for classic and mini roulette
    this.GetBetXY_1 = function(I)
    {
        switch (this.BetList[I][0])
        {
            case 1:
                {
                    if (this.BetList[I][1] == 0)
                    {
                        return [3, 7, false];
                    }
                    else
                    {
                        return [parseInt((this.BetList[I][1] - 1) / 3) * 4 + 7, 11 - (((this.BetList[I][1] - 1) % 3) * 4), false];
                    }
                }
                break;
            case 2:
                {
                    if (this.BetList[I][1] == 0)
                    {
                        switch (this.BetList[I][2])
                        {
                            case 1: return [5, 11, false];
                            case 2: return [5,  7, false];
                            case 3: return [5,  3, false];
                        }
                    }
                    else
                    {
                        if ((this.BetList[I][2] - this.BetList[I][1]) == 1)
                        {
                            return [parseInt((this.BetList[I][1] - 1) / 3) * 4 + 7, 9 - (((this.BetList[I][1] - 1) % 3) * 4), false];
                        }
                        else
                        {
                            return [parseInt((this.BetList[I][1] - 1) / 3) * 4 + 9, 11 - (((this.BetList[I][1] - 1) % 3) * 4), false];
                        }
                    }
                }
                break;
            case 3:
                {
                    if (this.BetList[I][1] == 0)
                    {
                        return [5, 13 - this.BetList[I][2] * 4, false];
                    }
                    else
                    {
                        return [parseInt((this.BetList[I][1] - 1) / 3) * 4 + 7, 13 - (((this.BetList[I][1] - 1) % 3) * 4), false];
                    }
                }
                break;
            case 4:
                {
                    if ((GameType == 1) && (this.BetList[I][2] - this.BetList[I][1]) == 3)
                    {
                        return [23, 11 - (((this.BetList[I][1] - 1)) * 4), true];
                    }
                    if (this.BetList[I][1] == 0)
                    {
                        return [5, 13, false];
                    }
                    else
                    {
                        return [parseInt((this.BetList[I][1] - 1) / 3) * 4 + 9, 9 - (((this.BetList[I][1] - 1) % 3) * 4), false];
                    }
                }
                break;
            case 6:
                {
                    return [parseInt((this.BetList[I][1] - 1) / 3) * 4 + 9, 13 - (((this.BetList[I][1] - 1) % 3) * 4), false];
                }
                break;
            case 7:
            case 8:
                if (GameType == 0)
                {
                    switch (this.BetList[I][0] * 10 + this.BetList[I][1])
                    {
                        case 71: return [55, 11, true];
                        case 72: return [55,  7, true];
                        case 73: return [55,  3, true];
                        case 74: return [13, 15, true];
                        case 75: return [29, 15, true];
                        case 76: return [45, 15, true];
                        case 77: return [53, 13, true];
                        case 81: return [ 9, 19, true];
                        case 82: return [17, 19, true];
                        case 83: return [25, 19, true];
                        case 84: return [33, 19, true];
                        case 85: return [41, 19, true];
                        case 86: return [49, 19, true];
                    }
                }
                if (GameType == 1)
                {
                    switch (this.BetList[I][0] * 10 + this.BetList[I][1])
                    {
                        case 83: return [17, 15, true];
                        case 84: return [9, 15, true];
                    }
                }
                break;
        }
        return null;
    };

    // Chip coordinates for 100 number roulette
    this.GetBetXY_2 = function(I)
    {
        switch (this.BetList[I][0])
        {
            case 1:
                {
                    if ((this.BetList[I][1] == 0) || (this.BetList[I][1] > 100))
                    {
                        switch(this.BetList[I][1])
                        {
                            case   0: return [11,  5, false];
                            case 101: return [11, 13, false];
                            case 102: return [11, 21, false];
                            case 103: return [11, 29, false];
                            case 104: return [11, 37, false];
                        }
                    }
                    else
                    {
                        return [15 + (4 * Math.floor((this.BetList[I][1] - 1) / 10)), 3 + (4 * ((this.BetList[I][1] - 1) % 10)), false];
                    }
                }
                break;
            case 2:
                {
                    if ((this.BetList[I][1] == 0) || (this.BetList[I][1] > 100))
                    {
                        switch (this.BetList[I][2])
                        {
                            case 1:   return [13,  3, false];
                            case 2:   return [13,  7, false];
                            case 3:   return [13, 11, false];
                            case 4:   return [13, 15, false];
                            case 5:   return [13, 19, false];
                            case 6:   return [13, 23, false];
                            case 7:   return [13, 27, false];
                            case 8:   return [13, 31, false];
                            case 9:   return [13, 35, false];
                            case 10:  return [13, 39, false];

                            case 101: return [11,  9, false];
                            case 102: return [11, 17, false];
                            case 103: return [11, 25, false];
                            case 104: return [11, 33, false];
                        }
                    }
                    else
                    {
                        if ((this.BetList[I][2] - this.BetList[I][1]) == 10)
                        {
                            return [17 + (4 * Math.floor((this.BetList[I][1] - 1) / 10)), 3 + (4 * ((this.BetList[I][1] - 1) % 10)), false];
                        }
                        if ((this.BetList[I][2] - this.BetList[I][1]) == 1)
                        {
                            return [15 + (4 * Math.floor((this.BetList[I][1] - 1) / 10)), 5 + (4 * ((this.BetList[I][1] - 1) % 10)), false];
                        }
                    }
                }
                break;
            case 3:
                {
                    if ((this.BetList[I][1] == 0) || (this.BetList[I][1] > 100))
                    {
                        switch (this.BetList[I][2])
                        {
                            case 1:   return [13,  5, false];
                            case 3:   return [13, 13, false];
                            case 5:   return [13, 21, false];
                            case 7:   return [13, 29, false];
                            case 9:   return [13, 37, false];
                        }
                    }
                }
                break;
            case 4:
                {
                    if ((this.BetList[I][1] == 0) || (this.BetList[I][1] > 100))
                    {
                        switch (this.BetList[I][2])
                        {
                            case 101: return [13,  9, false];
                            case 102: return [13, 17, false];
                            case 103: return [13, 25, false];
                            case 104: return [13, 33, false];
                        }
                    }
                    else
                    {
                        return [17 + (4 * Math.floor((this.BetList[I][1] - 1) / 10)), 5 + (4 * ((this.BetList[I][1] - 1) % 10)), false];
                    }
                }
                break;
            case 6:
                {
                    if ((this.BetList[I][1] >= 1) && (this.BetList[I][1] <= 10))
                    {
                        return [55, 0 - 1 + (this.BetList[I][1] * 4), true];
                    }
                    if ((this.BetList[I][1] >= 11) && (this.BetList[I][1] <= 20))
                    {
                        return [(this.BetList[I][1] * 4) - 29, 41, false];
                    }
                }
                break;
            case 5:
                {
                    switch (this.BetList[I][1])
                    {
                        case 1: return [11, 41, false];
                        case 2: return [13, 41, false];
                    }
                }
                break;
            case 7:
                {
                    if ((this.BetList[I][1] >=  1) && (this.BetList[I][1] <=  9))
                    {
                        return [55, 1 + (this.BetList[I][1] * 4), true];
                    }
                    if ((this.BetList[I][1] >= 11) && (this.BetList[I][1] <= 19))
                    {
                        return [(this.BetList[I][1] * 4) - 27, 41, false];
                    }
                }
                break;
            case 8:
                switch (this.BetList[I][1])
                {
                    case 2: return [5, 9, true];
                    case 3: return [5, 17, true];
                    case 4: return [5, 25, true];
                    case 5: return [5, 33, true];
                }
                break;
        }
        return null;
    };


    this.GetBetXY = function(I)
    {
        if (GameType == 2)
        {
            return(this.GetBetXY_2(I));
        }
        else
        {
            return(this.GetBetXY_1(I));
        }
    };

    this.ClearBets = function()
    {
        this.WheelNeighLastS = -1;
        if (this.BetList.length == 0)
        {
            var ClrFactor = 1;
            if (this.BetList0.length > 0)
            {
                var ClrFactor1 = parseInt(prompt("Last bet numerator", "1"));
                var ClrFactor2 = parseInt(prompt("Last bet denominator", "1"));
                if ((ClrFactor1 == null) || isNaN(ClrFactor1))
                {
                    ClrFactor1 = 1;
                }
                if ((ClrFactor2 == null) || isNaN(ClrFactor2) || (ClrFactor2 == 0))
                {
                    ClrFactor2 = 1;
                }
                ClrFactor = ClrFactor1 / ClrFactor2;
                if (ClrFactor < 0)
                {
                    ClrFactor = 0 - ClrFactor;
                }
            }
            if (ClrFactor != 0)
            {
                for (var I = 0; I < this.BetList0.length; I++)
                {
                    var BetItem = this.BetList0[I];
                    var BetItem_0 = BetItem[0];
                    var BetItem_1 = BetItem[1];
                    var BetItem_2 = BetItem[2];
                    var BetItem_3 = BetItem[3];
                    var BetItem_4 = BetItem[4];
                    var BetItem_5 = BetItem[5];
                    var BetItem_6 = BetItem[6];
                    var BetItem_7 = BetItem[7];
                    BetItem_7 = BetItem_7 * ClrFactor;
                    var RoundFactor = 1;
                    if ((GameType == 0) && (BetItem_0 == 12))
                    {
                        switch (BetItem_1)
                        {
                            case 0: RoundFactor = 9; break;
                            case 1: RoundFactor = 5; break;
                            case 2: RoundFactor = 6; break;
                            case 3: RoundFactor = 5; break;
                            case 4: RoundFactor = 9; break;
                            case 5: RoundFactor = 4; break;
                        }
                    }
                    
                    if (GameType == 1)
                    {
                        RoundFactor = 2;
                    }
                    BetItem_7 = BetItem_7 / RoundFactor;
                    BetItem_7 = Math.round(BetItem_7);
                    BetItem_7 = parseInt(BetItem_7 * RoundFactor);
                    if (BetItem_7 > 10000)
                    {
                        BetItem_7 = 10000;
                    }
                    if (BetItem_7 > 0)
                    {
                        this.BetList.push([BetItem_0, BetItem_1, BetItem_2, BetItem_3, BetItem_4, BetItem_5, BetItem_6, BetItem_7]);
                        this.AmountT = this.AmountT + BetItem_7;
                    }
                }
            }
        }
        else
        {
            this.BetList = [];
            this.AmountT = 0;
        }
    };

    // Remove temporary bets created for probability calculation only
    this.RemoveSectorBets = function()
    {
        var SectorTemp = [];
        SectorTemp[0] = 0 - this.BetListSector0[0];
        SectorTemp[1] = 0 - this.BetListSector0[1];
        SectorTemp[2] = 0 - this.BetListSector0[2];
        SectorTemp[3] = 0 - this.BetListSector0[3];
        SectorTemp[4] = 0 - this.BetListSector0[4];
        SectorTemp[5] = 0 - this.BetListSector0[5];

        if (SectorTemp[0] < 0)
        {
            this.PutChipT(12, 0,  0,  0,  0, 0, 0, 1, 9 * (0 - SectorTemp[0]));
            this.PutChipT(3,  0,  2,  3,  0, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(3,  0,  2,  3,  0, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(2,  4,  7,  0,  0, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(2, 12, 15,  0,  0, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(2, 18, 21,  0,  0, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(2, 19, 22,  0,  0, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(4, 25, 26, 28, 29, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(4, 25, 26, 28, 29, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(2, 32, 35,  0,  0, 0, 0, 1, SectorTemp[0]);
        }
        if (SectorTemp[1] < 0)
        {
            this.PutChipT(12, 1,  0,  0,  0, 0, 0, 1, 5 * (0 - SectorTemp[1]));
            this.PutChipT(1,  1,  0,  0,  0, 0, 0, 1, SectorTemp[1]);
            this.PutChipT(2,  6,  9,  0,  0, 0, 0, 1, SectorTemp[1]);
            this.PutChipT(2, 14, 17,  0,  0, 0, 0, 1, SectorTemp[1]);
            this.PutChipT(2, 17, 20,  0,  0, 0, 0, 1, SectorTemp[1]);
            this.PutChipT(2, 31, 34,  0,  0, 0, 0, 1, SectorTemp[1]);
        }
        if (SectorTemp[2] < 0)
        {
            this.PutChipT(12, 2,  0,  0,  0, 0, 0, 1, 6 * (0 - SectorTemp[2]));
            this.PutChipT(2,  5,  8,  0,  0, 0, 0, 1, SectorTemp[2]);
            this.PutChipT(2, 10, 11,  0,  0, 0, 0, 1, SectorTemp[2]);
            this.PutChipT(2, 13, 16,  0,  0, 0, 0, 1, SectorTemp[2]);
            this.PutChipT(2, 23, 24,  0,  0, 0, 0, 1, SectorTemp[2]);
            this.PutChipT(2, 27, 30,  0,  0, 0, 0, 1, SectorTemp[2]);
            this.PutChipT(2, 33, 36,  0,  0, 0, 0, 1, SectorTemp[2]);
        }
        if (SectorTemp[3] < 0)
        {
            this.PutChipT(12, 3,  0,  0,  0, 0, 0, 1, 5 * (0 - SectorTemp[3]));
            this.PutChipT(1,  1,  0,  0,  0, 0, 0, 1, SectorTemp[3]);
            this.PutChipT(2,  6,  9,  0,  0, 0, 0, 1, SectorTemp[3]);
            this.PutChipT(2, 14, 17,  0,  0, 0, 0, 1, SectorTemp[3]);
            this.PutChipT(2, 17, 20,  0,  0, 0, 0, 1, SectorTemp[3]);
            this.PutChipT(2, 31, 34,  0,  0, 0, 0, 1, SectorTemp[3]);
        }
        if (SectorTemp[4] < 0)
        {
            this.PutChipT(12, 4,  0,  0,  0, 0, 0, 1, 9 * (0 - SectorTemp[4]));
            this.PutChipT(3,  0,  2,  3,  0, 0, 0, 1, SectorTemp[4]);
            this.PutChipT(3,  0,  2,  3,  0, 0, 0, 1, SectorTemp[4]);
            this.PutChipT(2,  4,  7,  0,  0, 0, 0, 1, SectorTemp[4]);
            this.PutChipT(2, 12, 15,  0,  0, 0, 0, 1, SectorTemp[4]);
            this.PutChipT(2, 18, 21,  0,  0, 0, 0, 1, SectorTemp[4]);
            this.PutChipT(2, 19, 22,  0,  0, 0, 0, 1, SectorTemp[4]);
            this.PutChipT(4, 25, 26, 28, 29, 0, 0, 1, SectorTemp[4]);
            this.PutChipT(4, 25, 26, 28, 29, 0, 0, 1, SectorTemp[4]);
            this.PutChipT(2, 32, 35,  0,  0, 0, 0, 1, SectorTemp[4]);
        }
        if (SectorTemp[5] < 0)
        {
            this.PutChipT(12, 5,  0,  0,  0, 0, 0, 1, 4 * (0 - SectorTemp[5]));
            this.PutChipT(2,  0,  3,  0,  0, 0, 0, 1, SectorTemp[5]);
            this.PutChipT(2, 12, 15,  0,  0, 0, 0, 1, SectorTemp[5]);
            this.PutChipT(2, 32, 35,  0,  0, 0, 0, 1, SectorTemp[5]);
            this.PutChipT(1, 26,  0,  0,  0, 0, 0, 1, SectorTemp[5]);
        }
    };
    

    // Move sector bets to table
    this.MoveSectorBets = function(Prob)
    {
        var SectorTemp = [0, 0, 0, 0, 0, 0];
        if (!Prob)
        {
            this.BetList0 = [];
        }
        for (var I = 0; I < this.BetList.length; I++)
        {
            var BetItem = this.BetList[I];
            if (!Prob)
            {
                this.BetList0.push([BetItem[0], BetItem[1], BetItem[2], BetItem[3], BetItem[4], BetItem[5], BetItem[6], BetItem[7]]);
            }

            if (BetItem[0] == 12)
            {
                SectorTemp[BetItem[1]] += BetItem[7];
                this.AmountT -= this.BetList[I][7];
                this.BetList.splice(I, 1);
                I--;
            }
        }

        SectorTemp[0] = SectorTemp[0] / 9;
        SectorTemp[1] = SectorTemp[1] / 5;
        SectorTemp[2] = SectorTemp[2] / 6;
        SectorTemp[3] = SectorTemp[3] / 5;
        SectorTemp[4] = SectorTemp[4] / 9;
        SectorTemp[5] = SectorTemp[5] / 4;

        this.BetListSector0[0] = SectorTemp[0];
        this.BetListSector0[1] = SectorTemp[1];
        this.BetListSector0[2] = SectorTemp[2];
        this.BetListSector0[3] = SectorTemp[3];
        this.BetListSector0[4] = SectorTemp[4];
        this.BetListSector0[5] = SectorTemp[5];

        SectorTemp[0] = SectorTemp[0] + SectorTemp[4];
        SectorTemp[1] = SectorTemp[1] + SectorTemp[3];

        if (SectorTemp[0] > 0)
        {
            this.PutChipT(3,  0,  2,  3,  0, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(3,  0,  2,  3,  0, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(2,  4,  7,  0,  0, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(2, 12, 15,  0,  0, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(2, 18, 21,  0,  0, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(2, 19, 22,  0,  0, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(4, 25, 26, 28, 29, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(4, 25, 26, 28, 29, 0, 0, 1, SectorTemp[0]);
            this.PutChipT(2, 32, 35,  0,  0, 0, 0, 1, SectorTemp[0]);
        }
        if (SectorTemp[1] > 0)
        {
            this.PutChipT(1,  1,  0,  0,  0, 0, 0, 1, SectorTemp[1]);
            this.PutChipT(2,  6,  9,  0,  0, 0, 0, 1, SectorTemp[1]);
            this.PutChipT(2, 14, 17,  0,  0, 0, 0, 1, SectorTemp[1]);
            this.PutChipT(2, 17, 20,  0,  0, 0, 0, 1, SectorTemp[1]);
            this.PutChipT(2, 31, 34,  0,  0, 0, 0, 1, SectorTemp[1]);
        }
        if (SectorTemp[2] > 0)
        {
            this.PutChipT(2,  5,  8,  0,  0, 0, 0, 1, SectorTemp[2]);
            this.PutChipT(2, 10, 11,  0,  0, 0, 0, 1, SectorTemp[2]);
            this.PutChipT(2, 13, 16,  0,  0, 0, 0, 1, SectorTemp[2]);
            this.PutChipT(2, 23, 24,  0,  0, 0, 0, 1, SectorTemp[2]);
            this.PutChipT(2, 27, 30,  0,  0, 0, 0, 1, SectorTemp[2]);
            this.PutChipT(2, 33, 36,  0,  0, 0, 0, 1, SectorTemp[2]);
        }
        if (SectorTemp[5] > 0)
        {
            this.PutChipT(2,  0,  3,  0,  0, 0, 0, 1, SectorTemp[5]);
            this.PutChipT(2, 12, 15,  0,  0, 0, 0, 1, SectorTemp[5]);
            this.PutChipT(2, 32, 35,  0,  0, 0, 0, 1, SectorTemp[5]);
            this.PutChipT(1, 26,  0,  0,  0, 0, 0, 1, SectorTemp[5]);
        }
    };


    // Calculate win and lose after spinning wheel
    this.Account = function(N, Prob)
    {
        this.WheelNeighLastS = -1;

        var AmountLast_ = this.AmountLast;
        this.AmountLast = 0;
        var Payout1 = [35, 11, 99];
        var Payout2 = [17,  5, 49];
        var Payout3 = [11,  3, 32];
        var Payout4 = [ 8,  2, 24];
        var Payout6 = [ 5,  1,  9];
        for (var I = 0; I < this.BetList.length; I++)
        {
            var BetItem = this.BetList[I];
            var BetItem_0 = BetItem[0];
            var BetItem_1 = BetItem[1];
            var BetItem_2 = BetItem[2];
            var BetItem_3 = BetItem[3];
            var BetItem_4 = BetItem[4];
            var BetItem_5 = BetItem[5];
            var BetItem_6 = BetItem[6];
            var BetItem_7 = BetItem[7];
            var ToRemove = true;
            var BetVal = BetItem[7];
            switch(BetItem[0])
            {
                case 1: // One number
                case 11: // One number
                    if (BetItem[1] == N)
                    {
                        ToRemove = false; this.AmountLast += parseInt(BetVal * Payout1[GameType]);
                    }
                    break;
                case 2: // Two numbers
                    if ((BetItem[1] == N) || (BetItem[2] == N))
                    {
                        ToRemove = false; this.AmountLast += parseInt(BetVal * Payout2[GameType]);
                    }
                    break;
                case 3: // Three numbers
                    if ((BetItem[1] == N) || (BetItem[2] == N) || (BetItem[3] == N))
                    {
                        ToRemove = false; this.AmountLast += parseInt(BetVal * Payout3[GameType]);
                    }
                    break;
                case 4: // Four numbers
                    if ((BetItem[1] == N) || (BetItem[2] == N) || (BetItem[3] == N) || (BetItem[4] == N))
                    {
                        ToRemove = false; this.AmountLast += parseInt(BetVal * Payout4[GameType]);
                    }
                    break;
                case 6: // Six numbers or ten numbers in 100 numbers game
                    if (GameType == 2)
                    {
                        if ((N > 0) && (N <= 100))
                        {
                            if ((BetItem[1] >= 1) && (BetItem[1] <= 10))
                            {
                                if ((N % 10) == (BetItem[1] % 10))
                                {
                                    ToRemove = false; this.AmountLast += parseInt(BetVal * Payout6[GameType]);
                                }
                            }
                            if ((BetItem[1] >= 11) && (BetItem[1] <= 20))
                            {
                                if (Math.floor((N + 9) / 10) == (BetItem[1] - 10))
                                {
                                    ToRemove = false; this.AmountLast += parseInt(BetVal * Payout6[GameType]);
                                }
                            }
                        }
                    }
                    else
                    {
                        if ((BetItem[1] == N) || (BetItem[2] == N) || (BetItem[3] == N) || (BetItem[4] == N) || (BetItem[5] == N) || (BetItem[6] == N))
                        {
                            ToRemove = false; this.AmountLast += parseInt(BetVal * Payout6[GameType]);
                        }
                    }
                    break;

                case 5: // Special bets
                    if (GameType == 2)
                    {
                        if (BetItem[1] == 1)
                        {
                            if ((N == 0) || (N == 101) || (N == 102) || (N == 103) || (N == 104))
                            {
                                ToRemove = false; this.AmountLast += parseInt(BetVal * 19);
                            }
                        }
                        if (BetItem[1] == 2)
                        {
                            if ((N == 0) || (N == 101) || (N == 102) || (N == 103) || (N == 104) || ((N >= 1) && (N <= 10)))
                            {
                                ToRemove = false; this.AmountLast += parseInt(BetVal * 5);
                            }
                        }
                    }
                    break;

                case 7: // 2:1 or twenty numbers in 100 numbers game
                    if ((N != 0) && (N <= 100))
                    {
                        if (GameType == 2)
                        {
                            if ((BetItem[1] >= 1) && (BetItem[1] <= 9))
                            {
                                if (((N % 10) == (BetItem[1] % 10)) || (((N - 1) % 10) == (BetItem[1] % 10)))
                                {
                                    ToRemove = false; this.AmountLast += parseInt(BetVal * 4);
                                }
                            }
                            if ((BetItem[1] >= 11) && (BetItem[1] <= 19))
                            {
                                if ((Math.floor((N + 9) / 10) == (BetItem[1] - 10)) || (Math.floor((N - 1) / 10) == (BetItem[1] - 10)))
                                {
                                    ToRemove = false; this.AmountLast += parseInt(BetVal * 4);
                                }
                            }
                        }
                        else
                        {
                            switch(BetItem[1])
                            {
                                case 1:
                                    if ((N % 3) == 1) { ToRemove = false; this.AmountLast += parseInt(BetVal * 2); }
                                    break;
                                case 2:
                                    if ((N % 3) == 2) { ToRemove = false; this.AmountLast += parseInt(BetVal * 2); }
                                    break;
                                case 3:
                                    if ((N % 3) == 0) { ToRemove = false; this.AmountLast += parseInt(BetVal * 2); }
                                    break;
                                case 4:
                                    if ((N >=  1) && (N <= 12)) { ToRemove = false; this.AmountLast += parseInt(BetVal * 2); }
                                    break;
                                case 5:
                                    if ((N >= 13) && (N <= 24)) { ToRemove = false; this.AmountLast += parseInt(BetVal * 2); }
                                    break;
                                case 6:
                                    if ((N >= 25) && (N <= 36)) { ToRemove = false; this.AmountLast += parseInt(BetVal * 2); }
                                    break;
                                case 7:
                                    if ((N ==  1) || (N ==  5) || (N ==  9) || (N == 12) || (N == 14) || (N == 16)) { ToRemove = false; this.AmountLast += parseInt(BetVal * 2); }
                                    if ((N == 19) || (N == 23) || (N == 27) || (N == 30) || (N == 32) || (N == 34)) { ToRemove = false; this.AmountLast += parseInt(BetVal * 2); }
                                    break;
                            }
                        }
                    }
                    break;
                case 8: // 1:1
                    if ((N != 0) && (N <= 100))
                    {
                        switch(BetItem[1])
                        {
                            case 1:
                                if (N <= 18) { ToRemove = false; this.AmountLast += parseInt(BetVal * 1); }
                                break;
                            case 6:
                                if (N >= 19) { ToRemove = false; this.AmountLast += parseInt(BetVal * 1); }
                                break;

                            case 2:
                                if ((N % 2) == 0) { ToRemove = false; this.AmountLast += parseInt(BetVal * 1); }
                                break;
                            case 5:
                                if ((N % 2) != 0) { ToRemove = false; this.AmountLast += parseInt(BetVal * 1); }
                                break;

                            case 3:
                                if (NumRed[N])  { ToRemove = false; this.AmountLast += parseInt(BetVal * 1); }
                                break;
                            case 4:
                                if (!NumRed[N]) { ToRemove = false; this.AmountLast += parseInt(BetVal * 1); }
                                break;
                        }
                    }
                    break;
                case 12:
                    if (Prob)
                    {
                        ToRemove = false;
                    }
                    break;
            }

            if (ToRemove)
            {
                // In "Mini" version, if "0" is hit, the player loses the half of each bet
                if ((N == 0) && (GameType == 1))
                {
                    this.AmountLast -= parseInt(BetVal / 2);
                }
                else
                {
                    this.AmountLast -= BetVal;
                }
                if (!Prob)
                {
                    this.AmountT -= BetVal;
                    this.BetList.splice(I, 1);
                    I--;
                }
            }
        }
        var AmountLastNoFactor = this.AmountLast;
        this.AmountLast = this.AmountLast * this.BetFactorVal;
        if (Prob)
        {
            this.AmountLast = AmountLast_;
            return parseInt(AmountLastNoFactor);
        }
        else
        {
            this.Amount = parseInt(this.Amount + this.AmountLast);
        }

    };
};


function PlayerSelected()
{
    if ((GamePlayer_N >= 0) && (GamePlayer_N < GamePlayer_C))
    {
        return true;
    }
    else
    {
        return false;
    }
}


var GamePlayer_ = [];
var GamePlayer_N = 0;
var GamePlayer_C = 0;
