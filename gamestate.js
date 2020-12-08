
var StateRefreshCounter = DataGetIDefault("Roulette_StateRefreshCounter", 0);


// Reset the refresh counter
function StateRefresh()
{
    StateRefreshCounter = 0;
    DataSetI("Roulette_StateRefreshCounter", StateRefreshCounter);
    DataDelete("Roulette_GameType");
    var C = DataGetIDefault("Roulette_Player_C", 0);
    for (var I = 0; I < C; I++)
    {
        DataDelete("Roulette_Player_" + I + "_Name");
        DataDelete("Roulette_Player_" + I + "_Amount");
        DataDelete("Roulette_Player_" + I + "_AmountT");
        DataDelete("Roulette_Player_" + I + "_AmountLast");
        DataDelete("Roulette_Player_" + I + "_BetNominalI");
        DataDelete("Roulette_Player_" + I + "_BetNominalSign");
        DataDelete("Roulette_Player_" + I + "_BetFactor");
        DataDelete("Roulette_Player_" + I + "_BetFactorVal");
        DataDelete("Roulette_Player_" + I + "_WheelNeigh");
        DataDelete("Roulette_Player_" + I + "_WheelNeighLastS");
        DataDelete("Roulette_Player_" + I + "_WheelNeighLastN");
        DataDelete("Roulette_Player_" + I + "_BetList");
        DataDelete("Roulette_Player_" + I + "_BetList0");
    }
    DataDelete("Roulette_SpinMode");
    DataDelete("Roulette_Player_C");
    DataDelete("Roulette_Player_N");
    DataDelete("Roulette_TableChipSensors");
    DataDelete("Roulette_ViewModeI");
    DataDelete("Roulette_WheelPos");
    DataDelete("Roulette_WheelPosT");
    DataDelete("Roulette_WheelSplitPos");
    DataDelete("AngleOffsetI");
    DataDelete("Roulette_SpinHist");
    DataDelete("Roulette_ProbMode");
}

function StateRefreshReset()
{
    StateRefreshCounter = 0;
    DataSetI("Roulette_StateRefreshCounter", StateRefreshCounter);
}

function StateLoad()
{
    StateRefreshCounter = StateRefreshCounter + 1;
    DataSetI("Roulette_StateRefreshCounter", StateRefreshCounter);

    // After refreshing several times, clear the game state
    if (StateRefreshCounter >= 3)
    {
        StateRefresh();
        return;
    }

    GameType = DataGetIDefault("Roulette_GameType", GameType);
    SpinMode = DataGetIDefault("Roulette_SpinMode", SpinMode);
    TableChipSensors = DataGetBDefault("Roulette_TableChipSensors", true);
    ViewModeI = DataGetIDefault("Roulette_ViewModeI", 0);
    WheelPos = DataGetIDefault("Roulette_WheelPos", 0);
    WheelPosT = DataGetIDefault("Roulette_WheelPosT", 0);
    WheelSplitPos = DataGetIDefault("Roulette_WheelSplitPos", 88);
    AngleOffsetI = DataGetIDefault("AngleOffsetI", 0);
    SpinHist = Str2Obj(DataGetDefault("Roulette_SpinHist", Obj2Str(SpinHist)));
    ProbMode = DataGetBDefault("Roulette_ProbMode", ProbMode);
}

function StateSave()
{
    StateRefreshReset();
    DataSetI("Roulette_SpinMode", SpinMode);
    DataSetI("Roulette_Player_N", GamePlayer_N);
    DataSetB("Roulette_TableChipSensors", TableChipSensors);
    DataSetI("Roulette_ViewModeI", ViewModeI);
    DataSetI("Roulette_WheelPos", WheelPos);
    DataSetI("Roulette_WheelPosT", WheelPosT);
    DataSetI("Roulette_WheelSplitPos", WheelSplitPos);
    DataSetI("AngleOffsetI", AngleOffsetI);
    DataSetI("Roulette_SpinHist", Obj2Str(SpinHist));
    DataSetB("Roulette_ProbMode", ProbMode);
}

function StateSaveGame()
{
    DataSetI("Roulette_GameType", GameType);
}

function StatePlayerSave_(I)
{
    DataSet("Roulette_Player_" + I + "_Name", GamePlayer_[I].Name);
    DataSetI("Roulette_Player_" + I + "_Amount", GamePlayer_[I].Amount);
    DataSetI("Roulette_Player_" + I + "_AmountT", GamePlayer_[I].AmountT);
    DataSetI("Roulette_Player_" + I + "_AmountLast", GamePlayer_[I].AmountLast);
    DataSetI("Roulette_Player_" + I + "_BetNominalI", GamePlayer_[I].BetNominalI);
    DataSetI("Roulette_Player_" + I + "_BetNominalSign", GamePlayer_[I].BetNominalSign);
    DataSetI("Roulette_Player_" + I + "_BetFactor", GamePlayer_[I].BetFactor);
    DataSetI("Roulette_Player_" + I + "_BetFactorVal", GamePlayer_[I].BetFactorVal);
    DataSetI("Roulette_Player_" + I + "_WheelNeigh", GamePlayer_[I].WheelNeigh);
    DataSetI("Roulette_Player_" + I + "_WheelNeighLastS", GamePlayer_[I].WheelNeighLastS);
    DataSetI("Roulette_Player_" + I + "_WheelNeighLastN", GamePlayer_[I].WheelNeighLastN);
    DataSet("Roulette_Player_" + I + "_BetList", Obj2Str(GamePlayer_[I].BetList));
    DataSet("Roulette_Player_" + I + "_BetList0", Obj2Str(GamePlayer_[I].BetList0));
}

function StatePlayerLoad_(I)
{
    GamePlayer_[I].Name = DataGet("Roulette_Player_" + I + "_Name");
    GamePlayer_[I].Amount = DataGetI("Roulette_Player_" + I + "_Amount");
    GamePlayer_[I].AmountT = DataGetI("Roulette_Player_" + I + "_AmountT");
    GamePlayer_[I].AmountLast = DataGetI("Roulette_Player_" + I + "_AmountLast");
    GamePlayer_[I].BetNominalI = DataGetI("Roulette_Player_" + I + "_BetNominalI");
    GamePlayer_[I].BetNominalSign = DataGetI("Roulette_Player_" + I + "_BetNominalSign");
    GamePlayer_[I].BetFactor = DataGetI("Roulette_Player_" + I + "_BetFactor");
    GamePlayer_[I].BetFactorVal = DataGetI("Roulette_Player_" + I + "_BetFactorVal");
    GamePlayer_[I].WheelNeigh = DataGetI("Roulette_Player_" + I + "_WheelNeigh");
    GamePlayer_[I].WheelNeighLastS = DataGetI("Roulette_Player_" + I + "_WheelNeighLastS");
    GamePlayer_[I].WheelNeighLastN = DataGetI("Roulette_Player_" + I + "_WheelNeighLastN");
    GamePlayer_[I].BetList = Str2Obj(DataGet("Roulette_Player_" + I + "_BetList"));
    GamePlayer_[I].BetList0 = Str2Obj(DataGet("Roulette_Player_" + I + "_BetList0"));
}

function StatePlayerSave(All)
{
    StateRefreshReset();
    if (All)
    {
        DataSetI("Roulette_Player_N", GamePlayer_N);
        DataSetI("Roulette_Player_C", GamePlayer_C);
        for (var I = 0; I < GamePlayer_C; I++)
        {
            StatePlayerSave_(I);
        }
    }
    else
    {
        StatePlayerSave_(GamePlayer_N);
    }
}

function StatePlayerLoad(All)
{
    if (All)
    {
        GamePlayer_C = DataGetIDefault("Roulette_Player_C", 0);
        for (var I = 0; I < GamePlayer_C; I++)
        {
            GamePlayer_[I] = new GamePlayer();
            StatePlayerLoad_(I);
        }
        GamePlayer_N = DataGetIDefault("Roulette_Player_N", 0);
    }
    else
    {
        StatePlayerLoad_(N);
    }
}


function Obj2Str(val)
{
    return JSON.stringify(val);
}

function Str2Obj(val)
{
    return (JSON.parse(val));
}
