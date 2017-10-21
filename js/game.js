var Game = {};
var GACHA_TIMER_MAX = 5 * 1000 * 60;

Game.Create = function () {
    var now = new Date();
    Game.prevTimer = now;
    Game.GachaTimer = now;

    Game.Gacha();
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


Game.Gacha = function () {
    Notify('가챠를 뽑았습니다', NOTIFY_SUCCESS);
    Game.GachaTimer = new Date();

    var name = g_nameTable[Math.floor(Math.random() * g_nameTable.length)];
    CharList.Add(new Char({
        name: name.name,
        pay: 10, mentalMax: 100,
        imgNumber: 5 + Math.floor(Math.random() * 4,)
    }, 7));
};
