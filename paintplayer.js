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

    SvgTextSize = PlayersFont;

    I_ = PlayersY + PlayersLine;
    var PlayersLine2 = (PlayersLine / 2);
    var PlayersLine4 = (PlayersLine / 4);

    for (II = 0; II < GamePlayer_C; II++)
    {
        II_ = II + GamePlayer_N;
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
        SvgAddText(SvgPlayerList, PlayersLine2, I_, PlayerName, ColorForeground);

        SvgTextAlign = "end";
        SvgAddText(SvgPlayerList, PlayersW - (PlayersLine2), I_, PlayerAmount, ColorForeground);

        I_ += PlayersLine;
    }

    SvgRemove(SvgPlayerList_);
    SvgAdd(SvgPlayerList);
}