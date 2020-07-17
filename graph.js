var SvgBack = null;
var SvgBack0 = null;
var SvgTable = null;
var SvgWheel = null;
var SvgPlayer = null;
var SvgPlayerList = null;



var SvgLineWidth = "1";
var SvgTextAlign = "middle";
var SvgTextSize = "10px";

function SvgAddRect(Group, X, Y, W, H, StrokeColor, FillColor)
{
    var Temp = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    Temp.setAttribute("x", X);
    Temp.setAttribute("y", Y);
    Temp.setAttribute("width", W);
    Temp.setAttribute("height", H);
    Temp.setAttribute("shape-rendering", "crispEdges");
    if (StrokeColor)
    {
        Temp.setAttribute("stroke", StrokeColor);
        Temp.setAttribute("stroke-width", SvgLineWidth);
    }
    if (FillColor)
    {
        Temp.setAttribute("fill", FillColor);
    }
    else
    {
        Temp.setAttribute("fill", "none");
    }
    Group.appendChild(Temp);
}

function SvgAddCircle(Group, X, Y, R, StrokeColor, FillColor)
{
    var Temp = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    Temp.setAttribute("cx", X);
    Temp.setAttribute("cy", Y);
    Temp.setAttribute("r", R);
    if (StrokeColor)
    {
        Temp.setAttribute("stroke", StrokeColor);
        Temp.setAttribute("stroke-width", SvgLineWidth);
    }
    if (FillColor)
    {
        Temp.setAttribute("fill", FillColor);
    }
    Group.appendChild(Temp);
}

function SvgAddText(Group, X, Y, T, TextColor)
{
    var Temp = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    Temp.setAttribute("x", X);
    Temp.setAttribute("y", Y);
    Temp.setAttribute("text-anchor", SvgTextAlign);
    Temp.setAttribute("dominant-baseline", "central");
//    Temp.setAttribute("alignment-baseline", "middle");
    Temp.setAttribute("font-size", SvgTextSize);
    Temp.setAttribute("font-family", "Arial, Helvetica, Verdana, sans-serif");
/// Verdana, Helvetica, Arial, sans-serif

    var Temp_ = document.createTextNode(T);
    Temp.appendChild(Temp_);
    Temp.setAttribute("fill", TextColor);
    Group.appendChild(Temp);
}

function SvgAddLine(Group, X1, Y1, X2, Y2, StrokeColor)
{
    var Temp = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    Temp.setAttribute("x1", X1);
    Temp.setAttribute("y1", Y1);
    Temp.setAttribute("x2", X2);
    Temp.setAttribute("y2", Y2);
    Temp.setAttribute("stroke", StrokeColor);
    Temp.setAttribute("stroke-width", SvgLineWidth);
    Group.appendChild(Temp);
}

function SvgAddPolygon(Group, PointList, StrokeColor, FillColor)
{
    var Temp = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
    Temp.setAttribute("points", PointList);
    if (StrokeColor)
    {
        Temp.style.stroke = StrokeColor;
        Temp.style.strokeWidth = SvgLineWidth;
    }
    if (FillColor)
    {
        Temp.style.fill = FillColor;
    }
    Group.appendChild(Temp);
}

function SvgCreate()
{
    var Group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    return Group;
}

function SvgAdd(Group)
{
    TableDispSvg.appendChild(Group);
    TableDispSvg.appendChild(SvgBack);
    if (SvgPlayer)
    {
        TableDispSvg.appendChild(SvgPlayer);
    }
    TableDispSvg.appendChild(TableDispSvgTxt);
    TableDispSvg.appendChild(TableDispSvgScr);
}

function SvgRemove(Group)
{
    if (Group)
    {
        Group.remove();
    }
}
