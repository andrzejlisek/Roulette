var AngleOffsetI = 0;
var WheelSplitPos = 88;

function SetWheelSplitPos(WheelPos_)
{
    WheelSplitPos = WheelPos_ + 88;
    while (WheelSplitPos >= 105)
    {
        WheelSplitPos -= 105;
    }
    while (WheelSplitPos < 0)
    {
        WheelSplitPos += 105;
    }
}


function WheelCalcOffset()
{
    return Math.PI * AngleOffsetI / WheelNumCount;
}

function WheelCalcOffset2()
{
    return Math.PI * AngleOffsetI / 35;
}

function PaintWheelNumber(X, Y, Idx, Color, Circle)
{
    if (ProbMode)
    {
        var V = ProbValue(WheelNums[Idx]);
        var V_ = V > 0 ? V : 0 - V;
        var LineSplit = 0;
        
        var FontConst = 0.04;
        if (Circle != 0)
        {
            if (Circle == 1)
            {
                FontConst = 0.04 * 0.7;
            }
            else
            {
                FontConst = 0.04 * 0.4;
            }
        }
        if (V_ < 100)
        {
            SvgTextSize = SetViewFont(WheelD1 * 2 * FontConst);
        }
        else
        {
            if (V_ < 1000)
            {
                SvgTextSize = SetViewFont(WheelD1 * 1.5 * FontConst);
            }
            else
            {
                if (V_ < 10000)
                {
                    SvgTextSize = SetViewFont(WheelD1 * 1.2 * FontConst);
                }
                else
                {
                    if (V_ < 10000000)
                    {
                        LineSplit = WheelD1 * 0.03;
                        SvgTextSize = SetViewFont(WheelD1 * 1.5 * FontConst);
                    }
                    else
                    {
                        LineSplit = WheelD1 * 0.03;
                        SvgTextSize = SetViewFont(WheelD1 * 1.2 * FontConst);
                    }
                }
            }
        }        
        var T = PlusMinus(V);
        if (LineSplit > 0)
        {
            var L = T.length;
            var L_;
            if ((L % 2) == 0)
            {
                L_ = L / 2;
            }
            else
            {
                L_ = (L + 1) / 2;
            }
            var T1 = T.substr(0, L_);
            var T2 = T.substr(L_);
            SvgAddText(SvgWheel, X, Y - LineSplit, T1, Color);
            SvgAddText(SvgWheel, X, Y + LineSplit, T2, Color);
        }
        else
        {
            SvgAddText(SvgWheel, X, Y, T, Color);
        }
    }
    else
    {
        if (Circle == 0)
        {
            SvgTextSize = WheelFont;
        }
        else
        {
            if (Circle == 1)
            {
                SvgTextSize = WheelFont2;
            }
            else
            {
                SvgTextSize = WheelFont3;
            }
        }
        if ((GameType != 2) || ((WheelNums[Idx] < 101) && (WheelNums[Idx] > 0)))
        {
            SvgAddText(SvgWheel, X, Y, WheelNums[Idx], Color);
        }
        else
        {
            if (Idx == 0)
            {
                SvgAddText(SvgWheel, X, Y, WheelSign[WheelNums[0]], Color);
            }
            else
            {
                SvgAddText(SvgWheel, X, Y, WheelSign[WheelNums[Idx] - 100], Color);
            }
        }
    }
}

function PaintWheel()
{
    if (!WheelVisible)
    {
        SvgRemove(SvgWheel);
        return;
    }
    var SvgWheel_ = SvgWheel;
    SvgWheel = SvgCreate();

    SvgTextSize = WheelFont;
    SvgTextAlign = "middle";

    var AngleOffset = WheelCalcOffset();

    var Coords = "";

    if (GameType == 0)
    {
        // 15-19
        var AngleRT1 = (((3 + 0.0) * 2.0 * Math.PI) / 37) + AngleOffset;

        // 25-17
        var AngleRT2 = (((8 + 0.0) * 2.0 * Math.PI) / 37) + AngleOffset;

        // 6-27
        var AngleRT3 = (((11 + 0.0) * 2.0 * Math.PI) / 37) + AngleOffset;

        // 33-1
        var AngleRT4 = (((23 + 0.0) * 2.0 * Math.PI) / 37) + AngleOffset;

        // 9-22
        var AngleRT5 = (((28 + 0.0) * 2.0 * Math.PI) / 37) + AngleOffset;

        // 28-12
        var AngleRT6 = (((33 + 0.0) * 2.0 * Math.PI) / 37) + AngleOffset;

        // 15-19
        var AngleRT7 = (((40 + 0.0) * 2.0 * Math.PI) / 37) + AngleOffset;

        SvgAddLine(SvgWheel, WheelX, WheelY, WheelX + (Math.cos(AngleRT1) * WheelD1), WheelY + (Math.sin(AngleRT1) * WheelD1), ColorForeground);

        SvgAddLine(SvgWheel, WheelX, WheelY, WheelX + (Math.cos(AngleRT2) * WheelD1), WheelY + (Math.sin(AngleRT2) * WheelD1), ColorForeground);

        SvgAddLine(SvgWheel, WheelX, WheelY, WheelX + (Math.cos(AngleRT3) * WheelD1), WheelY + (Math.sin(AngleRT3) * WheelD1), ColorForeground);

        SvgAddLine(SvgWheel, WheelX, WheelY, WheelX + (Math.cos(AngleRT4) * WheelD1), WheelY + (Math.sin(AngleRT4) * WheelD1), ColorForeground);

        SvgAddLine(SvgWheel, WheelX, WheelY, WheelX + (Math.cos(AngleRT5) * WheelD1), WheelY + (Math.sin(AngleRT5) * WheelD1), ColorForeground);

        SvgAddLine(SvgWheel, WheelX, WheelY, WheelX + (Math.cos(AngleRT6) * WheelD1), WheelY + (Math.sin(AngleRT6) * WheelD1), ColorForeground);

        // Sector names and chips
        var TempX = 0;
        var TempY = 0;
        var TempA = [];
        TempA.push((AngleRT1 + AngleRT2) / 2.0);
        TempA.push((AngleRT2 + AngleRT3) / 2.0);
        TempA.push((AngleRT3 + AngleRT4) / 2.0);
        TempA.push((AngleRT4 + AngleRT5) / 2.0);
        TempA.push((AngleRT5 + AngleRT6) / 2.0);
        TempA.push((AngleRT6 + AngleRT7) / 2.0);
        var SectorName = ["S. 0/2/3", "ORP.", "S. 5/8", "ORP.", "S. 0/2/3", "0-GAME"];
        for (var I = 0; I < 6; I++)
        {
            // Name
            SvgTextSize = WheelFont;
            TempX = WheelX + (Math.cos(TempA[I]) * WheelD4);
            TempY = WheelY + (Math.sin(TempA[I]) * WheelD4);
            SvgAddText(SvgWheel, TempX, TempY, SectorName[I], ColorForeground);

            // Chips
            TempX = WheelX + (Math.cos(TempA[I]) * WheelD4);
            TempY = WheelY + (Math.sin(TempA[I]) * WheelD4);
            var GamePlayer_C_ = ((GamePlayer_N >= 0) && (GamePlayer_N < GamePlayer_C)) ? GamePlayer_C : (GamePlayer_C - 1);
            for (II = 0; II <= GamePlayer_C_; II++)
            {
                if (II != GamePlayer_N)
                {
                    II_ = II;
                    if (II_ == GamePlayer_C) { II_ = GamePlayer_N; }
                    var BetListLen = GamePlayer_[II_].BetList.length;
                    for (III = 0; III < BetListLen; III++)
                    {
                        var BetObj = GamePlayer_[II_].BetList[III];
                        if ((BetObj[0] == 12) && (BetObj[1] == I))
                        {
                            PaintWheelChip(TempX, TempY, BetObj[7], II_ == GamePlayer_N);
                        }
                    }
                }
            }
        }
    }

    if (GameType == 2)
    {
        var DrawTab0 = [0, 1, 2];
        var DrawTab1 = [1, 2, 0];
        var DrawTab2 = [2, 0, 1];
        var I_N;

        var WheelD1_1 = WheelD1 - ((WheelD3 - WheelD5) / 2);
        var WheelD3_1 = WheelD3 - ((WheelD3 - WheelD5) / 2);
        var WheelD1_2 = WheelD1_1 - ((WheelD3 - WheelD5) / 2);
        var WheelD3_2 = WheelD3_1 - ((WheelD3 - WheelD5) / 2);
        for (I = 0; I < 35; I++)
        {
            var Angle = (((I) * 2.0 * Math.PI) / 35) + (AngleOffset * 3);
            
            var X1 = (WheelX + (Math.cos(Angle) * WheelD1));
            var Y1 = (WheelY + (Math.sin(Angle) * WheelD1));
            var X2 = (WheelX + (Math.cos(Angle) * WheelD3));
            var Y2 = (WheelY + (Math.sin(Angle) * WheelD3));
            SvgAddLine(SvgWheel, X1, Y1, X2, Y2, ColorForeground);

            X1 = (WheelX + (Math.cos(Angle) * WheelD1_1));
            Y1 = (WheelY + (Math.sin(Angle) * WheelD1_1));
            X2 = (WheelX + (Math.cos(Angle) * WheelD3_1));
            Y2 = (WheelY + (Math.sin(Angle) * WheelD3_1));
            SvgAddLine(SvgWheel, X1, Y1, X2, Y2, ColorForeground);

            X1 = (WheelX + (Math.cos(Angle) * WheelD1_2));
            Y1 = (WheelY + (Math.sin(Angle) * WheelD1_2));
            X2 = (WheelX + (Math.cos(Angle) * WheelD3_2));
            Y2 = (WheelY + (Math.sin(Angle) * WheelD3_2));
            SvgAddLine(SvgWheel, X1, Y1, X2, Y2, ColorForeground);
        }
        
        for (I_ = 0; I_ < 3; I_++)
        {
            for (I = 0; I < 35; I++)
            {
                if (WheelSplitPos < 35)
                {
                    if (WheelSplitPos > I)
                    {
                        I_N = (DrawTab1[I_] * 35) + I;
                    }
                    else
                    {
                        I_N = (DrawTab0[I_] * 35) + I;
                    }
                }
                else
                {
                    if (WheelSplitPos < 70)
                    {
                        if (WheelSplitPos > (I + 35))
                        {
                            I_N = (DrawTab2[I_] * 35) + I;
                        }
                        else
                        {
                            I_N = (DrawTab1[I_] * 35) + I;
                        }
                    }
                    else
                    {
                        if (WheelSplitPos > (I + 70))
                        {
                            I_N = (DrawTab0[I_] * 35) + I;
                        }
                        else
                        {
                            I_N = (DrawTab2[I_] * 35) + I;
                        }
                    }
                }

                var Angle1 = (((I + 0.0) * 2.0 * Math.PI) / 35) + (AngleOffset * 3);
                var Angle2 = (((I + 1.0) * 2.0 * Math.PI) / 35) + (AngleOffset * 3);
                var Angle0 = (((I + 0.5) * 2.0 * Math.PI) / 35) + (AngleOffset * 3);

                var NumColorIdx = 0;
                if (PlayerSelected())
                {
                    NumColorIdx = GamePlayer_[GamePlayer_N].WheelNeighLast(I_N);
                }
                var SectorColor = null;
                if (ProbMode)
                {
                    SectorColor = ProbColor(WheelNums[I_N]);
                }
                else
                {
                    if ((I_N == 0) || (I_N == 21) || (I_N == 42) || (I_N == 63) || (I_N == 84))
                    {
                        SectorColor = ColorGreen[NumColorIdx];
                    }
                    else
                    {
                        if (((I_N > 21) && (I_N < 42)) || ((I_N > 63) && (I_N < 84)))
                        {
                            if ((I_N % 2) == 1)
                            {
                                SectorColor = ColorBlack[NumColorIdx];
                            }
                            else
                            {
                                SectorColor = ColorRed[NumColorIdx];
                            }
                        }
                        else
                        {
                            if ((I_N % 2) == 0)
                            {
                                SectorColor = ColorBlack[NumColorIdx];
                            }
                            else
                            {
                                SectorColor = ColorRed[NumColorIdx];
                            }
                        }
                    }
                }

                var WheelD1_ = WheelD1;
                var WheelD2_ = WheelD2;
                var WheelD3_ = WheelD3;
                var WheelD6_ = WheelD6;
                var WheelDFactor = 1;
                SvgTextSize = WheelFont;
                if (I_ == 1)
                {
                    WheelD1_ = WheelD1_ - ((WheelD3 - WheelD5) / 2);
                    WheelD2_ = WheelD2_ - ((WheelD3 - WheelD5) / 2);
                    WheelD3_ = WheelD3_ - ((WheelD3 - WheelD5) / 2);
                    WheelD6_ = WheelD6_ - ((WheelD3 - WheelD5) / 2);
                    WheelDFactor = 0.7;
                    SvgTextSize = WheelFont2;
                }
                if (I_ == 2)
                {
                    WheelD1_ = WheelD1_ - (WheelD3 - WheelD5);
                    WheelD2_ = WheelD2_ - (WheelD3 - WheelD5);
                    WheelD3_ = WheelD3_ - (WheelD3 - WheelD5);
                    WheelD6_ = WheelD6_ - (WheelD3 - WheelD5);
                    WheelDFactor = 0.4;
                    SvgTextSize = WheelFont3;
                }

                // Pocket
                Coords = "";
                Coords = Coords +       (WheelX + (Math.cos(Angle1) * WheelD1_)) + "," + (WheelY + (Math.sin(Angle1) * WheelD1_));
                Coords = Coords + " " + (WheelX + (Math.cos(Angle1) * WheelD3_)) + "," + (WheelY + (Math.sin(Angle1) * WheelD3_));
                Coords = Coords + " " + (WheelX + (Math.cos(Angle2) * WheelD3_)) + "," + (WheelY + (Math.sin(Angle2) * WheelD3_));
                Coords = Coords + " " + (WheelX + (Math.cos(Angle2) * WheelD1_)) + "," + (WheelY + (Math.sin(Angle2) * WheelD1_));
                SvgAddPolygon(SvgWheel, Coords, null, SectorColor);

                // Number and ball
                Angle1 = WheelX + (Math.cos(Angle0) * WheelD2_);
                Angle2 = WheelY + (Math.sin(Angle0) * WheelD2_);
                if (WheelPos == I_N)
                {
                    SvgAddCircle(SvgWheel, Angle1, Angle2, WheelBall * WheelDFactor, null, ColorChip1);
                    PaintWheelNumber(Angle1, Angle2, I_N, ColorChip2, I_);
                }
                else
                {
                    PaintWheelNumber(Angle1, Angle2, I_N, ColorForeground, I_);
                }

                // Chips on numbers
                Angle1 = WheelX + (Math.cos(Angle0) * WheelD6_);
                Angle2 = WheelY + (Math.sin(Angle0) * WheelD6_);
                var GamePlayer_C_ = ((GamePlayer_N >= 0) && (GamePlayer_N < GamePlayer_C)) ? GamePlayer_C : (GamePlayer_C - 1);
                for (II = 0; II <= GamePlayer_C_; II++)
                {
                    if (II != GamePlayer_N)
                    {
                        II_ = II;
                        if (II_ == GamePlayer_C) { II_ = GamePlayer_N; }
                        var BetListLen = GamePlayer_[II_].BetList.length;
                        for (III = 0; III < BetListLen; III++)
                        {
                            var BetObj = GamePlayer_[II_].BetList[III];
                            if ((BetObj[0] == 11) && (BetObj[1] == WheelNums[I_N]))
                            {
                                PaintWheelChip(Angle1, Angle2, BetObj[7], II_ == GamePlayer_N);
                            }
                        }
                    }
                }
            }
        }

        // Wheel splitting line
        var AngleRT1 = (((WheelSplitPos + 0.0) * 2.0 * Math.PI) / 35) + (AngleOffset * 3);
        SvgAddLine(SvgWheel, WheelX, WheelY, WheelX + (Math.cos(AngleRT1) * WheelD1), WheelY + (Math.sin(AngleRT1) * WheelD1), ColorForeground);
    }
    else
    {
        for (I = 0; I < WheelNumCount; I++)
        {
            var Angle = (((I) * 2.0 * Math.PI) / WheelNumCount) + AngleOffset;
            
            var X1 = (WheelX + (Math.cos(Angle) * WheelD1));
            var Y1 = (WheelY + (Math.sin(Angle) * WheelD1));
            var X2 = (WheelX + (Math.cos(Angle) * WheelD3));
            var Y2 = (WheelY + (Math.sin(Angle) * WheelD3));

            SvgAddLine(SvgWheel, X1, Y1, X2, Y2, ColorForeground);
        }

        for (I = 0; I < WheelNumCount; I++)
        {
            var Angle1 = (((I + 0.0) * 2.0 * Math.PI) / WheelNumCount) + AngleOffset;
            var Angle2 = (((I + 1.0) * 2.0 * Math.PI) / WheelNumCount) + AngleOffset;
            var Angle0 = (((I + 0.5) * 2.0 * Math.PI) / WheelNumCount) + AngleOffset;

            var NumColorIdx = 0;
            if (PlayerSelected())
            {
                NumColorIdx = GamePlayer_[GamePlayer_N].WheelNeighLast(I);
            }
            var SectorColor = null;
            if (ProbMode)
            {
                SectorColor = ProbColor(WheelNums[I]);
            }
            else
            {
                if (I == 0)
                {
                    SectorColor = ColorGreen[NumColorIdx];
                }
                else
                {
                    if ((I % 2) == 0)
                    {
                        SectorColor = ColorBlack[NumColorIdx];
                    }
                    else
                    {
                        SectorColor = ColorRed[NumColorIdx];
                    }
                }
            }

            // Pocket
            Coords = "";
            Coords = Coords +       (WheelX + (Math.cos(Angle1) * WheelD1)) + "," + (WheelY + (Math.sin(Angle1) * WheelD1));
            Coords = Coords + " " + (WheelX + (Math.cos(Angle1) * WheelD3)) + "," + (WheelY + (Math.sin(Angle1) * WheelD3));
            Coords = Coords + " " + (WheelX + (Math.cos(Angle2) * WheelD3)) + "," + (WheelY + (Math.sin(Angle2) * WheelD3));
            Coords = Coords + " " + (WheelX + (Math.cos(Angle2) * WheelD1)) + "," + (WheelY + (Math.sin(Angle2) * WheelD1));
            SvgAddPolygon(SvgWheel, Coords, null, SectorColor);

            // Number and ball
            Angle1 = WheelX + (Math.cos(Angle0) * WheelD2);
            Angle2 = WheelY + (Math.sin(Angle0) * WheelD2);
            if (WheelPos == I)
            {
                SvgAddCircle(SvgWheel, Angle1, Angle2, WheelBall, null, ColorChip1);
                PaintWheelNumber(Angle1, Angle2, I, ColorChip2, 0);
            }
            else
            {
                PaintWheelNumber(Angle1, Angle2, I, ColorForeground, 0);
            }


            // Chips on numbers
            Angle1 = WheelX + (Math.cos(Angle0) * WheelD6);
            Angle2 = WheelY + (Math.sin(Angle0) * WheelD6);
            var GamePlayer_C_ = ((GamePlayer_N >= 0) && (GamePlayer_N < GamePlayer_C)) ? GamePlayer_C : (GamePlayer_C - 1);
            for (II = 0; II <= GamePlayer_C_; II++)
            {
                if (II != GamePlayer_N)
                {
                    II_ = II;
                    if (II_ == GamePlayer_C) { II_ = GamePlayer_N; }
                    var BetListLen = GamePlayer_[II_].BetList.length;
                    for (III = 0; III < BetListLen; III++)
                    {
                        var BetObj = GamePlayer_[II_].BetList[III];
                        if ((BetObj[0] == 11) && (BetObj[1] == WheelNums[I]))
                        {
                            PaintWheelChip(Angle1, Angle2, BetObj[7], II_ == GamePlayer_N);
                        }
                    }
                }
            }
        }
    }

    // Circle inside wheel
    SvgAddCircle(SvgWheel, WheelX, WheelY, WheelD5, ColorForeground, ColorBackground1);
    if (PlayerSelected())
    {
        SvgTextSize = WheelFont;
        if (GamePlayer_[GamePlayer_N].WheelNeigh <= WheelNeighMax)
        {
            SvgAddText(SvgWheel, WheelX, WheelY, "Neigh.: " + GamePlayer_[GamePlayer_N].WheelNeigh, ColorForeground);
        }
        if (GamePlayer_[GamePlayer_N].WheelNeigh == (WheelNeighMax + 1))
        {
            SvgAddText(SvgWheel, WheelX, WheelY, "Final bets", ColorForeground);
        }
        if (GamePlayer_[GamePlayer_N].WheelNeigh == (WheelNeighMax + 2))
        {
            SvgAddText(SvgWheel, WheelX, WheelY, "Dec. bets", ColorForeground);
        }
    }

    // Number history
    SvgAddRect(SvgWheel, WheelHistoryX, WheelHistoryY, WheelHistoryW, WheelHistoryH, null, ColorBackground2);
    for (I = 0; I < SpinHistN; I++)
    {
        if (WheelHistoryMode == 1)
        {
            TempX = WheelHistoryX + WheelHistoryBoxM + (I / SpinHistN) * (WheelHistoryW - WheelHistoryBoxM);
            TempY = WheelHistoryY + WheelHistoryBoxM;
        }
        if (WheelHistoryMode == 2)
        {
            TempX = WheelHistoryX + WheelHistoryBoxM;
            TempY = WheelHistoryY + WheelHistoryBoxM + (I / SpinHistN) * (WheelHistoryH - WheelHistoryBoxM);
        }

        if ((SpinHist[I] > 0) && (SpinHist[I] <= 100))
        {
            if (NumRed[SpinHist[I]])
            {
                SvgAddRect(SvgWheel, TempX, TempY, WheelHistoryBoxS, WheelHistoryBoxS, null, ColorRed[I == 0 ? 1 : 0]);
            }
            else
            {
                SvgAddRect(SvgWheel, TempX, TempY, WheelHistoryBoxS, WheelHistoryBoxS, null, ColorBlack[I == 0 ? 1 : 0]);
            }
            SvgAddText(SvgWheel, TempX + (WheelHistoryBoxS / 2), TempY + (WheelHistoryBoxS / 2), SpinHist[I], ColorForeground);
        }
        else
        {
            if (SpinHist[I] == 0)
            {
                SvgAddRect(SvgWheel, TempX, TempY, WheelHistoryBoxS, WheelHistoryBoxS, null, ColorGreen[I == 0 ? 1 : 0]);
                SvgAddText(SvgWheel, TempX + (WheelHistoryBoxS / 2), TempY + (WheelHistoryBoxS / 2), SpinHist[I], ColorForeground);
            }
            else
            {
                if (SpinHist[I] > 100)
                {
                    SvgAddRect(SvgWheel, TempX, TempY, WheelHistoryBoxS, WheelHistoryBoxS, null, ColorGreen[I == 0 ? 1 : 0]);
                    SvgAddText(SvgWheel, TempX + (WheelHistoryBoxS / 2), TempY + (WheelHistoryBoxS / 2), WheelSign[SpinHist[I] - 100], ColorForeground);
                }
                else
                {
                    SvgAddRect(SvgWheel, TempX, TempY, WheelHistoryBoxS, WheelHistoryBoxS, null, ColorBackground1);
                }
            }
        }
    }

    SvgRemove(SvgWheel_);
    SvgAdd(SvgWheel);
}

function PaintWheelChip(X, Y, Val, Current)
{
    if (Current)
    {
        SvgAddRect(SvgWheel, X - WheelChipSize, Y - WheelChipSize, WheelChipSize + WheelChipSize, WheelChipSize + WheelChipSize, ColorChip2, ColorChip1);
        if (Val <= 9999)
        {
            if (Val <= 9999) { SvgTextSize = WheelFontChip4; }
            if (Val <= 999)  { SvgTextSize = WheelFontChip3; }
            if (Val <= 99)   { SvgTextSize = WheelFontChip2; }
            if (Val <= 9)    { SvgTextSize = WheelFontChip1; }
            SvgAddText(SvgWheel, X, Y, "" + Val + "", ColorChip2);
        }
        if (Val == 10000)
        {
            SvgTextSize = WheelFontChip4;
            SvgAddText(SvgWheel, X, Y, "10K", ColorChip2);
        }
    }
    else
    {
        SvgAddRect(SvgWheel, X - WheelChipSize, Y - WheelChipSize, WheelChipSize + WheelChipSize, WheelChipSize + WheelChipSize, ColorChip2, ColorChip3);
    }
}
