var TableDispSvg = document.getElementById("TableDispSvg");
var TableDispSvgScr = document.getElementById("TableDispSvgScr");

var TableW = 500;
var TableH = 500;

var ViewMargin = 50;

var ViewModeI = 0;
var ViewModeIMax = 6;


var TableVisible = true;
var TableCellW = 1;
var TableCellH = 1;
var TableOffsetX = 0;
var TableOffsetY = 0;
var TableFontNum = "";
var TableFontSign = "";
var TableFontChip1 = "";
var TableFontChip2 = "";
var TableFontChip3 = "";
var TableFontChip4 = "";

var ColorRed = ["rgb(192, 0, 0)", "rgb(255, 64, 64)"];
var ColorBlack = ["rgb(0, 0, 0)", "rgb(128, 128, 128)"];
var ColorGreen = ["rgb(0, 192, 0)", "rgb(64, 255, 64)"];

var ColorChip1 = "rgb(255, 255, 255)";
var ColorChip2 = "rgb(0, 0, 0)";
var ColorChip3 = "rgb(192, 192, 192)";
var ColorChipS = "rgb(0, 128, 255)";

var ColorBackground1 = "rgb(0, 128, 0)";
var ColorBackground2 = "rgb(0, 192, 0)";
var ColorForeground = "rgb(255, 255, 255)";

var WheelVisible = false;
var WheelX = 0;
var WheelY = 0;
var WheelD = 100;


var WheelD0 = 105;
var WheelD1 = 100;
var WheelD2 =  90;
var WheelD3 =  80;
var WheelD4 =  60;
var WheelD5 =  30;
var WheelD6 = 110;
var WheelFont = "";
var WheelFont2 = "";
var WheelFont3 = "";
var WheelBall = 0;

var WheelChipSize = 20;
var WheelFontChip1 = 10;
var WheelFontChip2 = 10;
var WheelFontChip3 = 10;
var WheelFontChip4 = 10;

var WheelHistoryMode = 1;
var WheelHistoryX = 1;
var WheelHistoryY = 1;
var WheelHistoryW = 1;
var WheelHistoryH = 1;
var WheelHistoryBoxS = 1;
var WheelHistoryBoxM = 1;


var PaintCurrentX1 = 0;
var PaintCurrentX2 = 0;
var PaintCurrentX3 = 0;
var PlayerCurrentFont = "";

var PlayersVisible = true;
var PlayersFont = "";
var PlayersLine = 0;
var PlayersX = 0;
var PlayersY = 0;
var PlayersW = 0;
var PlayersH = 0;

var TableChipSensors = true;

function SetViewFont(FontSize)
{
    return parseInt(Math.round(FontSize)) + "px";
}

function SetView()
{
    ViewMargin = Math.round(Math.min(TableH * 0.08, TableW / 10));
    
    var TableX_ = 0;
    var TableY_ = ViewMargin;
    var TableW_ = TableW;
    var TableH_ = TableH - (ViewMargin * 2);
    var TableW__ = 1;
    var TableH__ = 1;
    if (GameType == 0)
    {
        TableW__ = (14 * 4) + 2;
        TableH__ = (5  * 4) + 2;
    }
    if (GameType == 1)
    {
        TableW__ = (6  * 4) + 2;
        TableH__ = (4  * 4) + 2;
    }
    if (GameType == 2)
    {
        TableW__ = (14 * 4) + 2;
        TableH__ = (10 * 4) + 2;
    }

    if ((TableW_ <= 0) || (TableH_ <= 0))
    {
        TableVisible = false;
        WheelVisible = false;
        PlayersVisible = false;
        return;
    }

    PaintCurrentX1 = Math.round(TableW_ * 0.01);
    PaintCurrentX2 = Math.round(TableW_ / 3) + PaintCurrentX1;
    PaintCurrentX3 = Math.round(TableW_ * 2 / 3) + PaintCurrentX1;

    var TableProp = 100000;
    if (TableH_ > 0)
    {
        if (ViewModeI != 0) { TableProp = TableW_ / TableH_; }
        if (ViewModeI == 0) { TableProp = TableW_ / (TableH_ / 2); }
    }

    switch(ViewModeI)
    {
        case 0:
            TableVisible = true;
            WheelVisible = true;
            PlayersVisible = true;
            TableCellW = Math.floor(TableW_ / TableW__);
            TableCellH = Math.floor((TableH_ / 2) / TableH__);
            if (TableCellW > TableCellH)
            {
                TableCellW = TableCellH;
            }
            else
            {
                TableCellH = TableCellW;
            }
            TableOffsetX = TableX_ + Math.floor((TableW_ - (TableCellW * TableW__)) / 2);
            TableOffsetY = TableY_;

            if (TableW_ > TableH_)
            {
                WheelHistoryBoxM = TableH_ * 0.004;

                WheelD = (TableH_ / 4) * 0.83;
                WheelX = Math.floor(TableW_ * 3 / 4) + TableX_;
                WheelY = Math.floor(TableH_ * 3 / 4) + TableY_;

                WheelHistoryMode = 2;
                WheelHistoryH = WheelD * 2;
                WheelHistoryW = (WheelHistoryH / SpinHistN) + WheelHistoryBoxM;
                WheelHistoryX = WheelX + (TableH_ / 4) - WheelHistoryW;
                WheelHistoryY = WheelY - WheelD;

                WheelX = WheelX - Math.ceil(WheelHistoryW / 2);
                WheelHistoryBoxS = WheelHistoryW - WheelHistoryBoxM - WheelHistoryBoxM;
            }
            else
            {
                WheelHistoryBoxM = TableW_ * 0.004;

                WheelD = (TableW_ / 4) * 0.83;
                WheelX = Math.floor(TableW_ * 3 / 4) + TableX_;
                WheelY = Math.floor(TableH_ * 3 / 4) + TableY_;

                WheelHistoryMode = 1;
                WheelHistoryW = WheelD * 2;
                WheelHistoryH = (WheelHistoryW / SpinHistN) + WheelHistoryBoxM;
                WheelHistoryX = WheelX - WheelD;
                WheelHistoryY = WheelY + (TableW_ / 4) - WheelHistoryH;

                WheelY = WheelY - Math.ceil(WheelHistoryH / 2);
                WheelHistoryBoxS = WheelHistoryH - WheelHistoryBoxM - WheelHistoryBoxM;
            }

            PlayersX = TableX_ + 0;
            PlayersY = TableY_ + Math.floor(TableH_ / 2);
            PlayersW = Math.floor(TableW_ / 2);
            PlayersH = Math.floor(TableH_ / 2);

            break;
        case 1:
        case 2:
        case 3:
        case 4:
            TableVisible = true;
            WheelVisible = false;
            PlayersVisible = false;

            if ((GameType != 1) && (ViewModeI != 1))
            {
                if (TableProp < (TableW__ / TableH__))
                {
                    TableCellH = Math.floor(TableH_ / TableH__);
                    TableCellW = Math.floor(TableW_ / 26);
                }
                else
                {
                    if (GameType == 0)
                    {
                        TableCellH = Math.floor(TableH_ / 22);
                    }
                    else
                    {
                        TableCellH = Math.floor(TableH_ / 26);
                    }
                    TableCellW = Math.floor(TableW_ / TableW__);
                }
            }
            else
            {
                TableCellH = Math.floor(TableH_ / TableH__);
                TableCellW = Math.floor(TableW_ / TableW__);
            }

            if (TableCellW > TableCellH)
            {
                TableCellW = TableCellH;
            }
            else
            {
                TableCellH = TableCellW;
            }

            TableOffsetX = TableX_ + Math.floor((TableW_ - (TableCellW * TableW__)) / 2);
            TableOffsetY = TableY_ + Math.floor((TableH_ - (TableCellH * TableH__)) / 2);
            if (GameType != 1)
            {
                if (TableW_ < (TableCellW * TableW__))
                {
                    if (TableOffsetX < TableX_)
                    {
                        if (ViewModeI == 2) { TableOffsetX = TableX_; }
                        if (ViewModeI == 4) { TableOffsetX = TableX_ + TableW_ - (TableCellW * TableW__); }
                    }
                }
                else
                {
                    if (TableOffsetY < TableY_)
                    {
                        if (ViewModeI == 2) { TableOffsetY = TableY_; }
                        if (ViewModeI == 4) { TableOffsetY = TableY_ + TableH_ - (TableCellH * TableH__); }
                    }
                }
            }
            break;
        case 5:
            TableVisible = false;
            WheelVisible = true;
            PlayersVisible = false;

            if (TableW_ > TableH_)
            {
                WheelHistoryBoxM = TableH_ * 0.008;

                WheelD = (TableH_ / 2) * 0.83;
                WheelX = Math.floor(TableW_ / 2) + TableX_;
                WheelY = Math.floor(TableH_ / 2) + TableY_;

                WheelHistoryMode = 2;
                WheelHistoryH = WheelD * 2;
                WheelHistoryW = (WheelHistoryH / SpinHistN) + WheelHistoryBoxM;
                WheelHistoryX = WheelX + (TableH_ / 2) - WheelHistoryW;
                WheelHistoryY = WheelY - WheelD;

                WheelX = WheelX - Math.ceil(WheelHistoryW / 2);
                WheelHistoryBoxS = WheelHistoryW - WheelHistoryBoxM - WheelHistoryBoxM;
            }
            else
            {
                WheelHistoryBoxM = TableW_ * 0.008;

                WheelD = (TableW_ / 2) * 0.83;
                WheelX = Math.floor(TableW_ / 2) + TableX_;
                WheelY = Math.floor(TableH_ / 2) + TableY_;

                WheelHistoryMode = 1;
                WheelHistoryW = WheelD * 2;
                WheelHistoryH = (WheelHistoryW / SpinHistN) + WheelHistoryBoxM;
                WheelHistoryX = WheelX - WheelD;
                WheelHistoryY = WheelY + (TableW_ / 2) - WheelHistoryH;

                WheelY = WheelY - Math.ceil(WheelHistoryH / 2);
                WheelHistoryBoxS = WheelHistoryH - WheelHistoryBoxM - WheelHistoryBoxM;
            }


            break;
    }
    TableFontNum = SetViewFont(TableCellW * 3);
    TableFontSign = SetViewFont(TableCellW * 2);
    TableFontChip1 = SetViewFont(TableCellW * 1.9);
    TableFontChip2 = SetViewFont(TableCellW * 1.8);
    TableFontChip3 = SetViewFont(TableCellW * 1.1);
    TableFontChip4 = SetViewFont(TableCellW * 0.8);


    WheelD0 = Math.round(WheelD + 3);
    WheelD1 = Math.round(WheelD);
    WheelD2 = Math.round(WheelD * 0.9);
    if (GameType == 1)
    {
        WheelD2 = Math.round(WheelD * 0.88);
    }
    WheelD3 = Math.round(WheelD * 0.8);
    WheelD4 = Math.round(WheelD * 0.6);
    WheelD5 = Math.round(WheelD * 0.25);
    WheelD6 = Math.round(WheelD * 1.04);
    WheelFont = SetViewFont(WheelD1 * 0.1);
    WheelFont2 = SetViewFont(WheelD1 * 0.1 * 0.7);
    WheelFont3 = SetViewFont(WheelD1 * 0.1 * 0.4);
    WheelBall = Math.round(WheelD * 0.07);


    WheelChipSize = Math.round(WheelD * 0.06);
    WheelFontChip1 = SetViewFont(WheelChipSize * 1.9);
    WheelFontChip2 = SetViewFont(WheelChipSize * 1.8);
    WheelFontChip3 = SetViewFont(WheelChipSize * 1.1);
    WheelFontChip4 = SetViewFont(WheelChipSize * 0.8);


    PlayerCurrentFont = SetViewFont(Math.min(ViewMargin * 2 / 5, TableW_ / 35));

    PlayersLine = Math.min(PlayersW * 0.07, PlayersH / (GamePlayer_C + 1));
    PlayersFont = SetViewFont(PlayersLine * 0.9);
}




function PaintClear()
{
    SvgLineWidth = Math.ceil(Math.min(TableW * 0.003, TableH * 0.003));
    SvgTextAlign = "middle";

    var SvgBack_ = SvgBack;
    var SvgBack0_ = SvgBack0;
    SvgBack = SvgCreate();
    SvgBack0 = SvgCreate();
    SvgAddRect(SvgBack0, 0, 0, TableW, TableH, "", ColorBackground1);
    SvgAddRect(SvgBack, 0, 0, TableW, ViewMargin, "", ColorBackground2);
    SvgAddRect(SvgBack, 0, TableH - ViewMargin, TableW, ViewMargin, "", ColorBackground1);


    // Buttons
    SvgTextAlign = "middle";
    SvgTextSize = PlayerCurrentFont;

    ButtonList = [];

    var BtnCount = 10;
    var BtnSize = (TableW * 0.94 / BtnCount);
    var BtnOffset = (TableW * 0.03 / BtnCount);

    DrawButton(1, (TableW  *  0 / BtnCount) + BtnOffset, BtnSize, 1, "<<");
    DrawButton(2, (TableW  *  1 / BtnCount) + BtnOffset, BtnSize, 1, ">>");

    DrawButton(3, (TableW  *  2 / BtnCount) + BtnOffset, BtnSize, 1, "C-");
    DrawButton(4, (TableW  *  3 / BtnCount) + BtnOffset, BtnSize, 1, "C+");

    DrawButton(7, (TableW  *  4 / BtnCount) + BtnOffset, BtnSize, 1, "+/-");
    DrawButton(8, (TableW  *  5 / BtnCount) + BtnOffset, BtnSize, 1, "CLR");

    DrawButton(5, (TableW  *  6 / BtnCount) + BtnOffset, BtnSize, 1, "F-");
    DrawButton(6, (TableW  *  7 / BtnCount) + BtnOffset, BtnSize, 1, "F+");

    DrawButton(11, (TableW *  8 / BtnCount) + BtnOffset, BtnSize, 1, "PLA");

    switch (SpinMode)
    {
        case 0:
            DrawButton(12, (TableW * 9 / BtnCount) + BtnOffset, BtnSize, 1, "STD");
            break;
        case 1:
            DrawButton(12, (TableW * 9 / BtnCount) + BtnOffset, BtnSize, 1, "NO-0");
            break;
        case 2:
            DrawButton(12, (TableW * 9 / BtnCount) + BtnOffset, BtnSize, 1, "SEL");
            break;
        case 3:
            DrawButton(12, (TableW * 9 / BtnCount) + BtnOffset, BtnSize, 1, "PROB");
            break;
    }

    SvgRemove(SvgBack0_);
    SvgAdd(SvgBack0);
    SvgRemove(SvgBack_);
    SvgAdd(SvgBack);
}


var ButtonList = [];

function DrawButton(BtnId, BtnX, BtnW, BtnY, BtnT)
{
    var ButtonSize = ViewMargin;
    var X_ = BtnX;
    var Y_ = TableH - (ButtonSize * BtnY);
    var W_ = BtnW;
    var H_ = ButtonSize;
    ButtonList.push([BtnId, X_, Y_, X_ + W_, Y_ + H_]);

    SvgAddRect(SvgBack, X_, Y_, W_, H_, "", ColorBackground2);
    SvgAddText(SvgBack, X_ + (W_ / 2), Y_ + (H_ / 2), BtnT, ColorForeground);

}


function PaintGame()
{
    ProbCalc();
    PaintClear();
    PaintPlayerList();
    PaintCurrentPlayer();
    PaintTable();
    PaintWheel();
}
