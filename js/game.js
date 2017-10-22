var Game = {};
var GACHA_TIMER_MAX = 5 * 1000 * 60;

Game.Create = function () {
    var now = new Date();
    Game.prevTimer = now;
    Game.gachaTimer = now;

    for (var i = 0; i < 1; ++i) {
        ProjectManager.GenerateRandomProject();
    }

    Game.gold = 0;
    Game.ChangeGold(200);
    Game.days = 0;
    Game.daysTimer = now;


//    Game.Gacha(1);
//    WorkManager.GenerateRandomWork(5);
};

Game.Update = function () {
    var now = new Date();
    var dt = now - Game.prevTimer;
    CharManager.Update(dt);
    WorkManager.Update(dt);
    ProjectManager.Update(dt);

    Game.prevTimer = now;
    RefreshGachaBtn(Game.gachaTimer);

    if (now - Game.daysTimer > 5000) {
        Game.days++;
        Game.daysTimer = now;
        RefreshDays(Game.days, 1);
    }
};

Game.Gacha = function (lv) {
    Notify('가챠를 뽑았습니다', NOTIFY_SUCCESS);
    Game.gachaTimer = new Date();
    var obj = CharManager.GenerateRandomChar(lv);
    return obj;
};

Game.GetGold = function () {
    return Game.gold;
};

Game.ChangeGold = function (d) {
    ChangeGoldFloatingText(Game.gold, d);
    Game.gold += d;
};