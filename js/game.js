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
    Game.ChangeGold(100);
    Game.days = 0;
    Game.daysTimer = now;
    Game.isOver = false;

    Game.sales = 0;
    Game.fireCnt = 0;
    Game.projectCnt = 0;
    3
    Game.projectDoneCnt = 0;

//    Game.Gacha(1);
//    WorkManager.GenerateRandomWork(5);
};

Game.Update = function () {
    if (Game.isOver)
        return;

    var now = new Date();
    var dt = now - Game.prevTimer;
    CharManager.Update(dt);
    WorkManager.Update(dt);
    ProjectManager.Update(dt);

    Game.prevTimer = now;
    RefreshGachaBtn(Game.gachaTimer);

    if (now - Game.daysTimer > 1000) {
        Game.days++;
        Game.daysTimer = now;
        RefreshDays(Game.days, 1);

        if ((Game.days % 30) == 0) {
            var payCost = CharManager.PayDay();
            if (payCost > 0)
                Game.ChangeGold(-payCost);
                Notify('월급 날이네요! $' + payCost + '만큼의 금액을 직원에게 제공하였습니다.', NOTIFY_DANGER);
        }
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

    if (Game.gold < 0) {
        Game.isOver = true;
        GameOver();
    }

    if (d > 0)
        Game.sales += d;
};