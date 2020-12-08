function PaintCurrentPlayer()
{
    var SvgPlayer_ = SvgPlayer;
    SvgPlayer = SvgCreate();

    if ((GamePlayer_N >= 0) && (GamePlayer_N < GamePlayer_C))
    {
        SvgTextSize = PlayerCurrentFont;

        SvgTextAlign = "start";

        var PlayerObj = GamePlayer_[GamePlayer_N];

        var Msg1 = (GamePlayer_N + 1) + ". " + PlayerObj.Name;
        var Msg2 = (PlayerObj.Amount);
        SvgAddText(SvgPlayer, PaintCurrentX1, ViewMargin * 1 / 4, Msg1, ColorForeground);
        SvgAddText(SvgPlayer, PaintCurrentX1, ViewMargin * 3 / 4, Msg2, ColorForeground);

        Msg1 = "Chip: " + PlusMinus((PlayerObj.BetNominal[PlayerObj.BetNominalI]) * PlayerObj.BetNominalSign);
        Msg2 = "Last: " + PlusMinus(PlayerObj.AmountLast);
        SvgAddText(SvgPlayer, PaintCurrentX2, ViewMargin * 1 / 4, Msg1, ColorForeground);
        SvgAddText(SvgPlayer, PaintCurrentX2, ViewMargin * 3 / 4, Msg2, ColorForeground);

        Msg1 = "Factor: " + PlayerObj.BetFactorVal;
        Msg2 = "Bet: " + (PlayerObj.AmountT * PlayerObj.BetFactorVal);
        SvgAddText(SvgPlayer, PaintCurrentX3, ViewMargin * 1 / 4, Msg1, ColorForeground);
        SvgAddText(SvgPlayer, PaintCurrentX3, ViewMargin * 3 / 4, Msg2, ColorForeground);
    }

    SvgRemove(SvgPlayer_);
    SvgAdd(SvgPlayer);
}




function PaintPlayerList()
{
    if (!PlayersVisible)
    {
        SvgRemove(SvgPlayerList);
        return;
    }
    var SvgPlayerList_ = SvgPlayerList;
    SvgPlayerList = SvgCreate();

    if (ProbMode)
    {
        ProbN1 = WheelNumCount;
        ProbN2 = WheelNumCount - 1;
        if (GameType == 2)
        {
            ProbN2 = 100;
        }
    
        var ListLength = ProbCounts.length;
        if (ListLength > 0)
        {
            var ListColumns = 10;
            var ListLength_ = Math.ceil(ListLength / ListColumns);
            var LineS = PlayersH / (ListLength_ + 2);
            var LineW = PlayersW / ListColumns;
            var PropValue = 15;
            while ((ListColumns > 1) && ((LineW / LineS) < PropValue))
            {
                ListColumns--;
                ListLength_ = Math.ceil(ListLength / ListColumns);
                LineS = PlayersH / (ListLength_ + 2);
                LineW = PlayersW / ListColumns;
            }
            if ((LineW / LineS) < PropValue)
            {
                LineS = LineW / PropValue;
            }
            
            var LineS2 = LineS / 2;
            var LineS4 = LineS / 4;
            SvgTextSize = SetViewFont(LineS * 0.8);
            var LineMargin = LineS * 0.05;
            var Val;
            var Val_;

            var I_ = PlayersY + LineS;
            var I_mod = 0;
            var LinePos = 0;

            for (var I = 0; I < ListLength; I++)
            {
                if (I_mod == 0)
                {
                    SvgAddRect(SvgPlayerList, PlayersX + LinePos + LineS4, I_ - LineS + LineS2 + LineMargin, LineW - LineS2, LineS - LineMargin - LineMargin, "", ColorChip1);

                    SvgTextAlign = "end";
                    SvgAddText(SvgPlayerList, PlayersX + LinePos + (LineW * 0.26) - LineS2, I_, "Value", ColorChip2);

                    SvgTextAlign = "end";
                    Val_ = "STD";
                    SvgAddText(SvgPlayerList, PlayersX + LinePos + (LineW * 0.63) - LineS2, I_, Val_, ColorChip2);

                    SvgTextAlign = "end";
                    Val_ = "NO-0";
                    SvgAddText(SvgPlayerList, PlayersX + LinePos + (LineW * 1.00) - LineS2, I_, Val_, ColorChip2);

                    I_ += LineS;
                    I_mod++;
                }

                SvgAddRect(SvgPlayerList, PlayersX + LinePos + LineS4, I_ - LineS + LineS2 + LineMargin, LineW - LineS2, LineS - LineMargin - LineMargin, "", ProbColorStat(ProbCounts[I][0]));
                
                SvgTextAlign = "end";
                SvgAddText(SvgPlayerList, PlayersX + LinePos + (LineW * 0.26) - LineS2, I_, PlusMinus(ProbCounts[I][0]), ColorForeground);

                SvgTextAlign = "end";
                Val = ProbCounts[I][1];
                Val_ = "" + Val + "/" + ProbN1;
                SvgAddText(SvgPlayerList, PlayersX + LinePos + (LineW * 0.49) - LineS2, I_, Val_, ColorForeground);
                Val_ = "" + Math.round(Val * 100 / ProbN1) + "%";
                SvgAddText(SvgPlayerList, PlayersX + LinePos + (LineW * 0.63) - LineS2, I_, Val_, ColorForeground);

                SvgTextAlign = "end";
                Val = ProbCounts[I][2];
                Val_ = "" + Val + "/" + ProbN2;
                SvgAddText(SvgPlayerList, PlayersX + LinePos + (LineW * 0.86) - LineS2, I_, Val_, ColorForeground);
                Val_ = "" + Math.round(Val * 100 / ProbN2) + "%";
                SvgAddText(SvgPlayerList, PlayersX + LinePos + (LineW * 1.00) - LineS2, I_, Val_, ColorForeground);

                I_ += LineS;
                I_mod++;
                if (I_mod > ListLength_)
                {
                    I_ = PlayersY + LineS;
                    I_mod = 0;
                    LinePos += LineW;
                }
            }
        }
    }
    else
    {
        SvgTextSize = PlayersFont;
        var I_ = PlayersY + PlayersLine;
        var PlayersLine2 = (PlayersLine / 2);
        var PlayersLine4 = (PlayersLine / 4);

        for (var II = 0; II < GamePlayer_C; II++)
        {
            var II_ = II + GamePlayer_N;
            if (II_ >= GamePlayer_C)
            {
                II_ -= GamePlayer_C;
            }

            var PlayerName = (II_ + 1) + ". " + GamePlayer_[II_].Name;
            var PlayerAmount = GamePlayer_[II_].Amount;

            if ((II % 2) == 0)
            {
                SvgAddRect(SvgPlayerList, PlayersX + PlayersLine4, I_ - PlayersLine + PlayersLine2, PlayersW - PlayersLine2, PlayersLine, "", ColorBackground2);
            }

            SvgTextAlign = "start";
            SvgAddText(SvgPlayerList, PlayersX + PlayersLine2, I_, PlayerName, ColorForeground);

            SvgTextAlign = "end";
            SvgAddText(SvgPlayerList, PlayersX + PlayersW - (PlayersLine2), I_, PlayerAmount, ColorForeground);

            I_ += PlayersLine;
        }
    }

    SvgRemove(SvgPlayerList_);
    SvgAdd(SvgPlayerList);
}
