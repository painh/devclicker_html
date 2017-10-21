var Char = function (proto, skillTagCnt) {
    this.id = Char.id++;
    this.name = proto.name;
    this.pay = proto.pay;
    this.mentalMax = proto.mentalMax;
    this.mental = this.mentalMax;
    this.imgSrc = 'assets/mon/mon_' + FormatNumberLength(proto.imgNumber, 3) + '.png';
    this.tagList = [];
    this.allowedWorkId = -1;

    for (var i = 0; i < skillTagCnt; ++i) {
        var name = randomPick(skillTagList);
        if (this.tagList.hasOwnProperty(name))
            this.tagList[name].lv++;
        else
            this.tagList[name] = {name: name, lv: 1};
    }
};

Char.id = 0;

Char.prototype.ChangeMental = function (d) {
    this.mental = Math.min(this.mental + d, this.mentalMax);
    ChangeMentalFloatingText(this.id, d, this.mental, this.mentalMax);
};

Char.prototype.Update = function () {
    if (this.allowedWorkId == -1) {
        this.ChangeMental(+1);
        return;
    }

    var workObj = WorkList.GetById(this.allowedWorkId);
    var i,j;
    for(i in workObj.tagList)


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

var CharList = {
    list: {}
};

CharList.Add = function (newCharObj) {
    CharList.list[newCharObj.id] = newCharObj;
    AddChar(newCharObj.id, newCharObj.name, newCharObj.GetPay(), newCharObj.GetImg(), newCharObj.tagList);
};

CharList.GenerateRandomChar = function (lv) {
    var skillCnt = lv;

    var name = g_nameTable[Math.floor(Math.random() * g_nameTable.length)];
    var obj = new Char({
        name: name.name,
        pay: 10, mentalMax: 100,
        imgNumber: 5 + Math.floor(Math.random() * 4,)
    }, skillCnt);
    CharList.Add(obj);

    return obj;
};

CharList.GetById = function (id) {
    return CharList.list[id];
};

CharList.Fire = function (id) {
    console.log(CharList.list);
    delete CharList.list[id];
    console.log(CharList.list);
    RemoveChar(id);
};

CharList.Msg = function (id, text) {

};

CharList.Update = function () {
    var i;
    for (i in CharList.list) {
        var char = CharList.list[i];
        char.Update();
    }
};