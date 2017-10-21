var Game = {};

Game.prevTimer = new Date();

Game.Create = function () {
    Game.Gacha();
    for (var i = 0; i < 5; ++i) {
        //      AddChar();
//        AddWork();
    }

};

Game.Update = function () {
    var now = new Date();
//    console.log(Game.prevTimer.getTime(), now.getTime(), now.getTime() - Game.prevTimer.getTime());
    Game.prevTimer = now;
};


Game.Gacha = function () {
    Notify('가챠를 뽑았습니다',NOTIFY_SUCCESS);

    var name = g_nameTable[Math.floor(Math.random() * g_nameTable.length)];
    CharList.Add(new Char({
        name: name.name,
        pay: 10, mentalMax: 100,
        imgNumber: 5 + Math.floor(Math.random() * 4,)
    }, 7));
};
