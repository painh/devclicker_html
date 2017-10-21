var Game = {};
var GACHA_TIMER_MAX = 5 * 1000 * 60;

Game.Create = function () {
    var now = new Date();
    Game.prevTimer = now;
    Game.gachaTimer = now;

    Game.Gacha(1);
    WorkList.GenerateRandomWork(5);
    for (var i = 0; i < 5; ++i) {
        ProjectList.GenerateRandomProject();
    }

    Game.gold = 0;
    Game.ChangeGold(2000);
};

Game.Update = function () {
    var now = new Date();
    var dt = now - Game.prevTimer;
    CharList.Update(dt);
    WorkList.Update(dt);

    Game.prevTimer = now;
    RefreshGachaBtn(Game.gachaTimer);
};


Game.Gacha = function (lv) {
    Notify('가챠를 뽑았습니다', NOTIFY_SUCCESS);
    Game.gachaTimer = new Date();
    var obj = CharList.GenerateRandomChar(lv);
    return obj;
};

Game.GetGold = function () {
    return Game.gold;
};

Game.ChangeGold = function (d) {
    ChangeGoldFloatingText(Game.gold, d);
    Game.gold += d;
};