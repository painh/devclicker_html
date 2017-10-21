var Game = {};
var GACHA_TIMER_MAX = 5 * 1000 * 60;

Game.Create = function () {
    var now = new Date();
    Game.prevTimer = now;
    Game.GachaTimer = now;

    Game.Gacha(1);
    WorkList.GenerateRandomWork(5);
    for (var i = 0; i < 5; ++i) {
        //      AddChar();
//        AddWork();
    }

};

Game.Update = function () {
    var now = new Date();
//    console.log(Game.prevTimer.getTime(), now.getTime(), now.getTime() - Game.prevTimer.getTime());
    Game.prevTimer = now;
    RefreshGachaBtn(Game.GachaTimer);

    CharList.Update();
    WorkList.Update();
};


Game.Gacha = function (lv) {
    Notify('가챠를 뽑았습니다', NOTIFY_SUCCESS);
    Game.GachaTimer = new Date();
    var obj = CharList.GenerateRandomChar(lv);
    return obj;
};
