
function TableX(X)
{
    return TableOffsetX + TableCellW * X;
}

function TableY(Y)
{
    return TableOffsetY + TableCellH * Y;
}

function TableX_(X)
{
    return (X - TableOffsetX) / TableCellW;
}

function TableY_(Y)
{
    return (Y - TableOffsetY) / TableCellH;
}





function PaintTableLine(X1, Y1, X2, Y2, Color)
{
    SvgAddLine(SvgTable, TableOffsetX + TableCellW * X1, TableOffsetY + TableCellH * Y1, TableOffsetX + TableCellW * X2, TableOffsetY + TableCellH * Y2, Color);
}

function PaintTableRect(X1, Y1, X2, Y2, BColor, FColor)
{
    SvgAddRect(SvgTable, TableOffsetX + TableCellW * X1, TableOffsetY + TableCellH * Y1, TableCellW * X2, TableCellH * Y2, FColor, BColor);
}

function PaintTableText(X, Y, T, Color)
{
    SvgAddText(SvgTable, TableOffsetX + TableCellW * X, TableOffsetY + TableCellH * Y, T, Color);
}

function PaintTableSensor(X1, Y1, X2, Y2)
{
    PaintTableRect(X1 + 0.2, Y1 + 0.2, X2 - 0.4, Y2 - 0.4, null, ColorChipS);
}


function PaintTable()
{
    if (!TableVisible)
    {
        SvgRemove(SvgTable);
        return;
    }
    var SvgTable_ = SvgTable;
    SvgTable = SvgCreate();

    SvgTextAlign = "middle";

    var I, II, I_, II_;

    if (GameType == 0)
    {
        // Number backgrounds
        PaintTableRect( 1,  1,  4, 12, ColorGreen[WheelNums[WheelPosT] ==  0 ? 1 : 0], ColorForeground);

        PaintTableRect( 5,  5,  4,  4, ColorBlack[WheelNums[WheelPosT] ==  2 ? 1 : 0], ColorForeground);
        PaintTableRect( 9,  9,  4,  4, ColorBlack[WheelNums[WheelPosT] ==  4 ? 1 : 0], ColorForeground);
        PaintTableRect( 9,  1,  4,  4, ColorBlack[WheelNums[WheelPosT] ==  6 ? 1 : 0], ColorForeground);
        PaintTableRect(13,  5,  4,  4, ColorBlack[WheelNums[WheelPosT] ==  8 ? 1 : 0], ColorForeground);
        PaintTableRect(17,  9,  4,  4, ColorBlack[WheelNums[WheelPosT] == 10 ? 1 : 0], ColorForeground);
        PaintTableRect(17,  5,  4,  4, ColorBlack[WheelNums[WheelPosT] == 11 ? 1 : 0], ColorForeground);
        PaintTableRect(21,  9,  4,  4, ColorBlack[WheelNums[WheelPosT] == 13 ? 1 : 0], ColorForeground);
        PaintTableRect(21,  1,  4,  4, ColorBlack[WheelNums[WheelPosT] == 15 ? 1 : 0], ColorForeground);
        PaintTableRect(25,  5,  4,  4, ColorBlack[WheelNums[WheelPosT] == 17 ? 1 : 0], ColorForeground);
        PaintTableRect(29,  5,  4,  4, ColorBlack[WheelNums[WheelPosT] == 20 ? 1 : 0], ColorForeground);
        PaintTableRect(33,  9,  4,  4, ColorBlack[WheelNums[WheelPosT] == 22 ? 1 : 0], ColorForeground);
        PaintTableRect(33,  1,  4,  4, ColorBlack[WheelNums[WheelPosT] == 24 ? 1 : 0], ColorForeground);
        PaintTableRect(37,  5,  4,  4, ColorBlack[WheelNums[WheelPosT] == 26 ? 1 : 0], ColorForeground);
        PaintTableRect(41,  9,  4,  4, ColorBlack[WheelNums[WheelPosT] == 28 ? 1 : 0], ColorForeground);
        PaintTableRect(41,  5,  4,  4, ColorBlack[WheelNums[WheelPosT] == 29 ? 1 : 0], ColorForeground);
        PaintTableRect(45,  9,  4,  4, ColorBlack[WheelNums[WheelPosT] == 31 ? 1 : 0], ColorForeground);
        PaintTableRect(45,  1,  4,  4, ColorBlack[WheelNums[WheelPosT] == 33 ? 1 : 0], ColorForeground);
        PaintTableRect(49,  5,  4,  4, ColorBlack[WheelNums[WheelPosT] == 35 ? 1 : 0], ColorForeground);

        PaintTableRect( 5,  9,  4,  4, ColorRed[WheelNums[WheelPosT] ==  1 ? 1 : 0], ColorForeground);
        PaintTableRect( 5,  1,  4,  4, ColorRed[WheelNums[WheelPosT] ==  3 ? 1 : 0], ColorForeground);
        PaintTableRect( 9,  5,  4,  4, ColorRed[WheelNums[WheelPosT] ==  5 ? 1 : 0], ColorForeground);
        PaintTableRect(13,  9,  4,  4, ColorRed[WheelNums[WheelPosT] ==  7 ? 1 : 0], ColorForeground);
        PaintTableRect(13,  1,  4,  4, ColorRed[WheelNums[WheelPosT] ==  9 ? 1 : 0], ColorForeground);
        PaintTableRect(17,  1,  4,  4, ColorRed[WheelNums[WheelPosT] == 12 ? 1 : 0], ColorForeground);
        PaintTableRect(21,  5,  4,  4, ColorRed[WheelNums[WheelPosT] == 14 ? 1 : 0], ColorForeground);
        PaintTableRect(25,  9,  4,  4, ColorRed[WheelNums[WheelPosT] == 16 ? 1 : 0], ColorForeground);
        PaintTableRect(25,  1,  4,  4, ColorRed[WheelNums[WheelPosT] == 18 ? 1 : 0], ColorForeground);
        PaintTableRect(29,  9,  4,  4, ColorRed[WheelNums[WheelPosT] == 19 ? 1 : 0], ColorForeground);
        PaintTableRect(29,  1,  4,  4, ColorRed[WheelNums[WheelPosT] == 21 ? 1 : 0], ColorForeground);
        PaintTableRect(33,  5,  4,  4, ColorRed[WheelNums[WheelPosT] == 23 ? 1 : 0], ColorForeground);
        PaintTableRect(37,  9,  4,  4, ColorRed[WheelNums[WheelPosT] == 25 ? 1 : 0], ColorForeground);
        PaintTableRect(37,  1,  4,  4, ColorRed[WheelNums[WheelPosT] == 27 ? 1 : 0], ColorForeground);
        PaintTableRect(41,  1,  4,  4, ColorRed[WheelNums[WheelPosT] == 30 ? 1 : 0], ColorForeground);
        PaintTableRect(45,  5,  4,  4, ColorRed[WheelNums[WheelPosT] == 32 ? 1 : 0], ColorForeground);
        PaintTableRect(49,  9,  4,  4, ColorRed[WheelNums[WheelPosT] == 34 ? 1 : 0], ColorForeground);
        PaintTableRect(49,  1,  4,  4, ColorRed[WheelNums[WheelPosT] == 36 ? 1 : 0], ColorForeground);

        // Table lines
        PaintTableRect(53,  1,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect(53,  5,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect(53,  9,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect( 5, 13, 16,  4, ColorBackground1, ColorForeground);
        PaintTableRect(21, 13, 16,  4, ColorBackground1, ColorForeground);
        PaintTableRect(37, 13, 16,  4, ColorBackground1, ColorForeground);
        PaintTableRect( 5, 17,  8,  4, ColorBackground1, ColorForeground);
        PaintTableRect(13, 17,  8,  4, ColorBackground1, ColorForeground);
        PaintTableRect(21, 17,  8,  4, ColorBackground1, ColorForeground);
        PaintTableRect(29, 17,  8,  4, ColorBackground1, ColorForeground);
        PaintTableRect(37, 17,  8,  4, ColorBackground1, ColorForeground);
        PaintTableRect(45, 17,  8,  4, ColorBackground1, ColorForeground);

        // Table numbers
        SvgTextSize = TableFontNum;
        PaintTableText( 3,  7,  "0", ColorForeground);
        PaintTableText( 7, 11,  "1", ColorForeground);
        PaintTableText( 7,  7,  "2", ColorForeground);
        PaintTableText( 7,  3,  "3", ColorForeground);
        PaintTableText(11, 11,  "4", ColorForeground);
        PaintTableText(11,  7,  "5", ColorForeground);
        PaintTableText(11,  3,  "6", ColorForeground);
        PaintTableText(15, 11,  "7", ColorForeground);
        PaintTableText(15,  7,  "8", ColorForeground);
        PaintTableText(15,  3,  "9", ColorForeground);
        PaintTableText(19, 11, "10", ColorForeground);
        PaintTableText(19,  7, "11", ColorForeground);
        PaintTableText(19,  3, "12", ColorForeground);
        PaintTableText(23, 11, "13", ColorForeground);
        PaintTableText(23,  7, "14", ColorForeground);
        PaintTableText(23,  3, "15", ColorForeground);
        PaintTableText(27, 11, "16", ColorForeground);
        PaintTableText(27,  7, "17", ColorForeground);
        PaintTableText(27,  3, "18", ColorForeground);
        PaintTableText(31, 11, "19", ColorForeground);
        PaintTableText(31,  7, "20", ColorForeground);
        PaintTableText(31,  3, "21", ColorForeground);
        PaintTableText(35, 11, "22", ColorForeground);
        PaintTableText(35,  7, "23", ColorForeground);
        PaintTableText(35,  3, "24", ColorForeground);
        PaintTableText(39, 11, "25", ColorForeground);
        PaintTableText(39,  7, "26", ColorForeground);
        PaintTableText(39,  3, "27", ColorForeground);
        PaintTableText(43, 11, "28", ColorForeground);
        PaintTableText(43,  7, "29", ColorForeground);
        PaintTableText(43,  3, "30", ColorForeground);
        PaintTableText(47, 11, "31", ColorForeground);
        PaintTableText(47,  7, "32", ColorForeground);
        PaintTableText(47,  3, "33", ColorForeground);
        PaintTableText(51, 11, "34", ColorForeground);
        PaintTableText(51,  7, "35", ColorForeground);
        PaintTableText(51,  3, "36", ColorForeground);

        // Other text signs
        SvgTextSize = TableFontSign;
        PaintTableText(55, 11, "1st", ColorForeground);
        PaintTableText(55,  7, "2nd", ColorForeground);
        PaintTableText(55,  3, "3rd", ColorForeground);
        PaintTableText(13, 15, "1st 12", ColorForeground);
        PaintTableText(29, 15, "2nd 12", ColorForeground);
        PaintTableText(45, 15, "3rd 12", ColorForeground);
        PaintTableText( 9, 19, "LOW", ColorForeground);
        PaintTableText(17, 19, "EVEN", ColorForeground);
        PaintTableText(41, 19, "ODD", ColorForeground);
        PaintTableText(49, 19, "HIGH", ColorForeground);

        // Red sign
        SvgAddPolygon(SvgTable, TableX(22) + "," + TableY(19) + " " + TableX(25) + "," + TableY(18) + " " + TableX(28) + "," + TableY(19) + " " + TableX(25) + "," + TableY(20), "", ColorRed[0]);

        // Black sign
        SvgAddPolygon(SvgTable, TableX(30) + "," + TableY(19) + " " + TableX(33) + "," + TableY(18) + " " + TableX(36) + "," + TableY(19) + " " + TableX(33) + "," + TableY(20), "", ColorBlack[0]);
    }
    if (GameType == 1)
    {
        // Number backgrounds
        PaintTableRect( 1,  1,  4, 12, ColorGreen[WheelNums[WheelPosT] == 0 ? 1 : 0], ColorForeground);

        PaintTableRect( 5,  5,  4,  4, ColorBlack[WheelNums[WheelPosT] ==  2 ? 1 : 0], ColorForeground);
        PaintTableRect( 9,  9,  4,  4, ColorBlack[WheelNums[WheelPosT] ==  4 ? 1 : 0], ColorForeground);
        PaintTableRect( 9,  1,  4,  4, ColorBlack[WheelNums[WheelPosT] ==  6 ? 1 : 0], ColorForeground);
        PaintTableRect(13,  5,  4,  4, ColorBlack[WheelNums[WheelPosT] ==  8 ? 1 : 0], ColorForeground);
        PaintTableRect(17,  9,  4,  4, ColorBlack[WheelNums[WheelPosT] == 10 ? 1 : 0], ColorForeground);
        PaintTableRect(17,  1,  4,  4, ColorBlack[WheelNums[WheelPosT] == 12 ? 1 : 0], ColorForeground);

        PaintTableRect( 5,  9,  4,  4, ColorRed[WheelNums[WheelPosT] ==  1 ? 1 : 0], ColorForeground);
        PaintTableRect( 5,  1,  4,  4, ColorRed[WheelNums[WheelPosT] ==  3 ? 1 : 0], ColorForeground);
        PaintTableRect( 9,  5,  4,  4, ColorRed[WheelNums[WheelPosT] ==  5 ? 1 : 0], ColorForeground);
        PaintTableRect(13,  9,  4,  4, ColorRed[WheelNums[WheelPosT] ==  7 ? 1 : 0], ColorForeground);
        PaintTableRect(13,  1,  4,  4, ColorRed[WheelNums[WheelPosT] ==  9 ? 1 : 0], ColorForeground);
        PaintTableRect(17,  5,  4,  4, ColorRed[WheelNums[WheelPosT] == 11 ? 1 : 0], ColorForeground);

        // Table lines
        PaintTableRect(21,  1,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect(21,  5,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect(21,  9,  4,  4, ColorBackground1, ColorForeground);

        PaintTableRect( 5, 13,  8,  4, ColorBackground1, ColorForeground);
        PaintTableRect(13, 13,  8,  4, ColorBackground1, ColorForeground);

        // Table numbers
        SvgTextSize = TableFontNum;
        PaintTableText( 3,  7,  "0", ColorForeground);
        PaintTableText( 7, 11,  "1", ColorForeground);
        PaintTableText( 7,  7,  "2", ColorForeground);
        PaintTableText( 7,  3,  "3", ColorForeground);
        PaintTableText(11, 11,  "4", ColorForeground);
        PaintTableText(11,  7,  "5", ColorForeground);
        PaintTableText(11,  3,  "6", ColorForeground);
        PaintTableText(15, 11,  "7", ColorForeground);
        PaintTableText(15,  7,  "8", ColorForeground);
        PaintTableText(15,  3,  "9", ColorForeground);
        PaintTableText(19, 11, "10", ColorForeground);
        PaintTableText(19,  7, "11", ColorForeground);
        PaintTableText(19,  3, "12", ColorForeground);

        SvgTextSize = TableFontSign;
        PaintTableText(23, 11, "1st", ColorForeground);
        PaintTableText(23,  7, "2nd", ColorForeground);
        PaintTableText(23,  3, "3rd", ColorForeground);

        // Red sign
        SvgAddPolygon(SvgTable, TableX(14) + "," + TableY(15) + " " + TableX(17) + "," + TableY(14) + " " + TableX(20) + "," + TableY(15) + " " + TableX(17) + "," + TableY(16), "", ColorRed[0]);

        // Black sign
        SvgAddPolygon(SvgTable, TableX(6)  + "," + TableY(15) + " " + TableX(9)  + "," + TableY(14) + " " + TableX(12) + "," + TableY(15) + " " + TableX(9)  + "," + TableY(16), "", ColorBlack[0]);
    }
    if (GameType == 2)
    {
        // Number backgrounds
        PaintTableRect(9,  1,  4,  8, ColorGreen[WheelNums[WheelPosT] == 104 ? 1 : 0], ColorForeground);
        PaintTableRect(9,  9,  4,  8, ColorGreen[WheelNums[WheelPosT] == 103 ? 1 : 0], ColorForeground);
        PaintTableRect(9, 17,  4,  8, ColorGreen[WheelNums[WheelPosT] == 102 ? 1 : 0], ColorForeground);
        PaintTableRect(9, 25,  4,  8, ColorGreen[WheelNums[WheelPosT] == 101 ? 1 : 0], ColorForeground);
        PaintTableRect(9, 33,  4,  8, ColorGreen[WheelNums[WheelPosT] ==   0 ? 1 : 0], ColorForeground);

        SvgTextSize = TableFontNum;
        for (var NumI = 0; NumI < 5; NumI++)
        {
            for (var NumII = 0; NumII < 5; NumII++)
            {
                var NumT = (NumII * 20) + (NumI * 2) + 1;
                PaintTableRect(13 + NumII * 8, 37 - NumI * 8,  4,  4, ColorRed[WheelNums[WheelPosT] == NumT ? 1 : 0], ColorForeground);
                PaintTableText(15 + NumII * 8, 39 - NumI * 8,  "" + NumT, ColorForeground);

                NumT++;
                PaintTableRect(13 + NumII * 8, 33 - NumI * 8,  4,  4, ColorBlack[WheelNums[WheelPosT] == NumT ? 1 : 0], ColorForeground);
                PaintTableText(15 + NumII * 8, 35 - NumI * 8,  "" + NumT, ColorForeground);

                NumT += 9;
                PaintTableRect(17 + NumII * 8, 37 - NumI * 8,  4,  4, ColorBlack[WheelNums[WheelPosT] == NumT ? 1 : 0], ColorForeground);
                PaintTableText(19 + NumII * 8, 39 - NumI * 8,  "" + NumT, ColorForeground);

                NumT++;
                if (NumT == 100)
                {
                    SvgTextSize = TableFontSign;
                }
                PaintTableRect(17 + NumII * 8, 33 - NumI * 8,  4,  4, ColorRed[WheelNums[WheelPosT] == NumT ? 1 : 0], ColorForeground);
                PaintTableText(19 + NumII * 8, 35 - NumI * 8,  "" + NumT, ColorForeground);
            }
        }


        // Table lines
        PaintTableRect( 1,  5,  8,  8, ColorBackground1, ColorForeground);
        PaintTableRect( 1, 13,  8,  8, ColorBackground1, ColorForeground);
        PaintTableRect( 1, 21,  8,  8, ColorBackground1, ColorForeground);
        PaintTableRect( 1, 29,  8,  8, ColorBackground1, ColorForeground);

        PaintTableRect(53,  1,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect(53,  5,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect(53,  9,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect(53, 13,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect(53, 17,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect(53, 21,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect(53, 25,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect(53, 29,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect(53, 33,  4,  4, ColorBackground1, ColorForeground);
        PaintTableRect(53, 37,  4,  4, ColorBackground1, ColorForeground);

        // Table numbers and signs
        SvgTextSize = TableFontNum;
        PaintTableText(11,  5,  WheelSign[3], ColorForeground);
        PaintTableText(11, 13,  WheelSign[2], ColorForeground);
        PaintTableText(11, 21,  WheelSign[1], ColorForeground);
        PaintTableText(11, 29,  WheelSign[0], ColorForeground);
        PaintTableText(11, 37,           "0", ColorForeground);

        SvgTextSize = TableFontSign;
        PaintTableText(55,  3, "10th", ColorForeground);
        PaintTableText(55,  7,  "9th", ColorForeground);
        PaintTableText(55, 11,  "8th", ColorForeground);
        PaintTableText(55, 15,  "7th", ColorForeground);
        PaintTableText(55, 19,  "6th", ColorForeground);
        PaintTableText(55, 23,  "5th", ColorForeground);
        PaintTableText(55, 27,  "4th", ColorForeground);
        PaintTableText(55, 31,  "3rd", ColorForeground);
        PaintTableText(55, 35,  "2nd", ColorForeground);
        PaintTableText(55, 39,  "1st", ColorForeground);

        PaintTableText( 5,  9,  "ODD", ColorForeground);
        PaintTableText( 5, 33, "EVEN", ColorForeground);

        // Red sign
        SvgAddPolygon(SvgTable, TableX(2)  + "," + TableY(25) + " " + TableX(5)  + "," + TableY(24) + " " + TableX(8)  + "," + TableY(25) + " " + TableX(5)  + "," + TableY(26), "", ColorRed[0]);

        // Black sign
        SvgAddPolygon(SvgTable, TableX(2)  + "," + TableY(17) + " " + TableX(5)  + "," + TableY(16) + " " + TableX(8)  + "," + TableY(17) + " " + TableX(5)  + "," + TableY(18), "", ColorBlack[0]);
    }

    // Chip sensors
    if (TableChipSensors)
    {
        if (GameType == 0)
        {
            // Zero
            PaintTableSensor( 2,  2,  2, 10);

            // Columns
            PaintTableSensor(54,  2,  2,  2);
            PaintTableSensor(54,  6,  2,  2);
            PaintTableSensor(54, 10,  2,  2);

            // Dozens
            PaintTableSensor( 6, 14, 14,  2);
            PaintTableSensor(22, 14, 14,  2);
            PaintTableSensor(38, 14, 14,  2);

            // Snake
            PaintTableSensor(52, 12,  2,  2);

            // Low, Even, Red, Black, Odd, High
            PaintTableSensor( 6, 18,  6,  2);
            PaintTableSensor(14, 18,  6,  2);
            PaintTableSensor(22, 18,  6,  2);
            PaintTableSensor(30, 18,  6,  2);
            PaintTableSensor(38, 18,  6,  2);
            PaintTableSensor(46, 18,  6,  2);

            // Numbers
            for (II = 2; II < 14; II += 2)
            {
                for (I = 4; I < 52; I += 2)
                {
                    PaintTableSensor(I, II,  2,  2);
                }
            }
        }
        if (GameType == 1)
        {
            // Zero
            PaintTableSensor( 2,  2,  2, 10);

            // Columns
            PaintTableSensor(22,  2,  2,  2);
            PaintTableSensor(22,  6,  2,  2);
            PaintTableSensor(22, 10,  2,  2);

            // Black, Red
            PaintTableSensor( 6, 14,  6,  2);
            PaintTableSensor(14, 14,  6,  2);

            // Numbers
            for (II = 2; II < 14; II += 2)
            {
                for (I = 4; I < 20; I += 2)
                {
                    PaintTableSensor(I, II,  2,  2);
                }
            }
        }
        if (GameType == 2)
        {
            // Zero
            PaintTableSensor(10,  2,  2,  6);
            PaintTableSensor(10,  8,  2,  2);
            PaintTableSensor(10, 10,  2,  6);
            PaintTableSensor(10, 16,  2,  2);
            PaintTableSensor(10, 18,  2,  6);
            PaintTableSensor(10, 24,  2,  2);
            PaintTableSensor(10, 26,  2,  6);
            PaintTableSensor(10, 32,  2,  2);
            PaintTableSensor(10, 34,  2,  6);
            PaintTableSensor(10, 40,  2,  2);

            // Odd, Black, Red, Even
            PaintTableSensor( 2,  6,  6,  6);
            PaintTableSensor( 2, 14,  6,  6);
            PaintTableSensor( 2, 22,  6,  6);
            PaintTableSensor( 2, 30,  6,  6);

            // Columns
            for (II = 2; II < 40; II += 2)
            {
                PaintTableSensor(54,  II,  2,  2);
            }

            // Numbers
            for (II = 2; II < 42; II += 2)
            {
                for (I = 12; I < 52; I += 2)
                {
                    PaintTableSensor(I, II,  2,  2);
                }
            }

        }
    }

    // Chips
    var GamePlayer_C_ = ((GamePlayer_N >= 0) && (GamePlayer_N < GamePlayer_C)) ? GamePlayer_C : (GamePlayer_C - 1);
    for (II = 0; II <= GamePlayer_C_; II++)
    {
        if (II != GamePlayer_N)
        {
            II_ = II;
            if (II_ == GamePlayer_C) { II_ = GamePlayer_N; }
            var BetListLen = GamePlayer_[II_].BetList.length;
            for (I = 0; I < BetListLen; I++)
            {
                var XY = GamePlayer_[II_].GetBetXY(I);
                if (XY)
                {
                    if (II_ == GamePlayer_N)
                    {
                        PaintTableRect(XY[0] - 1,  XY[1] - 1,  2,  2, ColorChip1, ColorChip2);

                        XY[2] = "" + GamePlayer_[II_].BetList[I][7] + "";

                        if (XY[2] <= 9999)
                        {
                            if (XY[2] <= 9999) { SvgTextSize = TableFontChip4; }
                            if (XY[2] <= 999)  { SvgTextSize = TableFontChip3; }
                            if (XY[2] <= 99)   { SvgTextSize = TableFontChip2; }
                            if (XY[2] <= 9)    { SvgTextSize = TableFontChip1; }
                            PaintTableText(XY[0], XY[1], XY[2], ColorChip2);
                        }
                        if (XY[2] == 10000)
                        {
                            SvgTextSize = TableFontChip4;
                            PaintTableText(XY[0], XY[1], "10K", ColorChip2);
                        }
                    }
                    else
                    {
                        PaintTableRect(XY[0] - 1,  XY[1] - 1,  2,  2, ColorChip3, ColorChip2);
                    }
                }
            }
        }
    }

    SvgRemove(SvgTable_);
    SvgAdd(SvgTable);
}
