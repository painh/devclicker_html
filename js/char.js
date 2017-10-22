var Char = function (proto, skillTagCnt) {
    this.id = Char.id++;
    this.name = proto.name;
    this.pay = proto.pay;
    this.mentalMax = proto.mentalMax;
    this.workPower = proto.workPower;
    this.mental = this.mentalMax;
    this.imgSrc = 'assets/mon/mon_' + FormatNumberLength(proto.imgNumber, 3) + '.png';
    this.tagList = [];
    this.allowedWorkId = -1;
    this.isDead = false;

    for (var i = 0; i < skillTagCnt; ++i) {
        var name = randomPick(skillTagList);
        if (this.tagList.hasOwnProperty(name))
            this.tagList[name].lv++;
        else
            this.tagList[name] = {name: name, lv: 1};
    }
    //this.tagList['client'] = {name: 'client', lv: randomRange(1, 10)};
};

Char.id = 0;

Char.prototype.ChangeMental = function (d) {
    var prev = this.mental;
    this.mental = Math.min(this.mental + d, this.mentalMax);
    if (this.mental <= 0)
        this.isDead = true;

    if (prev != this.mental)
        ChangeMentalFloatingText(this.id, d, this.mental, this.mentalMax);
};

Char.prototype.Update = function (dt) {
    if (this.allowedWorkId == -1) {
        this.ChangeMental(+1);
        return;
    }

    var workPower = this.workPower;
    var workObj = WorkManager.GetById(this.allowedWorkId);
    if (workObj.HaveWorkDone())
        return;

    workObj.Work(workPower);
    this.ChangeMental(-1);

    var i, j;
    for (i in workObj.tagList) {
        var workTag = workObj.tagList[i];
        for (j in this.tagList) {
            var charTag = this.tagList[j];
            if (workTag.name == charTag.name) {
                workObj.Work(workPower + Math.max(Math.round(workPower * ((charTag.lv - workTag.lv) / workTag.lv))), 0);
            }
        }
    }

    RefreshCharCard(this);
};

Char.prototype.GetPay = function () {
    return this.pay;
};

Char.prototype.GetImg = function () {
    return this.imgSrc;
};

Char.prototype.CanAllowWork = function () {
    if (this.allowedWorkId == -1)
        return true;

    return false;
};

Char.prototype.AllowWork = function (id) {
    this.allowedWorkId = id;
};


Char.prototype.PayDay = function () {
    Quotes(this.id, EventManager.GetText('payday'));
    Game.ChangeGold(-this.pay);

    return this.pay;
};


var CharManager = {
    list: {}
};

CharManager.Add = function (newCharObj) {
    CharManager.list[newCharObj.id] = newCharObj;
    AddChar(newCharObj.id, newCharObj.name, newCharObj.GetPay(), newCharObj.GetImg(), newCharObj.tagList);
    ChangeMentalFloatingText(newCharObj.id, 0, newCharObj.mental, newCharObj.mentalMax);

};

CharManager.GenerateRandomChar = function (lv) {
    var skillCnt = lv;

    var name = g_nameTable[Math.floor(Math.random() * g_nameTable.length)];
    var obj = new Char({
        name: name.name,
        pay: 10,
        mentalMax: 100,
        imgNumber: randomRange(1, 90),
        workPower: randomRange(8, 12)
    }, skillCnt);
    CharManager.Add(obj);

    return obj;
};

CharManager.GetById = function (id) {
    return CharManager.list[id];
};

CharManager.Fire = function (id) {
    delete CharManager.list[id];
    RemoveChar(id);
};

CharManager.Msg = function (id, text) {

};

CharManager.Update = function (dt) {
    var i;
    var deadList = {};

    for (i in CharManager.list) {
        var char = CharManager.list[i];
        char.Update(dt);
        if (char.isDead)
            deadList[char.id] = char;
    }

    for (i in deadList) {
        var char = deadList[i];
        Notify(char.name + '(은)는 멘탈이 터져서 퇴사했습니다.', NOTIFY_DANGER);
        RemoveChar(char.id);
        delete CharManager.list[i];
    }
};

CharManager.Release = function (id) {
    var charObj = CharManager.GetById(id);
    charObj.allowedWorkId = -1;
    RefreshCharCard(charObj);
};

CharManager.WorkRemoved = function (id) {
    var i;
    for (i in CharManager.list) {
        var charObj = CharManager.list[i];
        if (charObj.allowedWorkId == id) {
            CharManager.Release(charObj.id);
        }
    }
};

CharManager.PayDay = function () {
    var i;
    var pay = 0;
    for (i in CharManager.list) {
        var charObj = CharManager.list[i];
        pay += charObj.PayDay();
    }

    return pay;
};