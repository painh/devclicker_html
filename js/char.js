var skillTagList = ['client', 'server', 'illust', 'qa', 'Scenario', '3d'];

var Char = function (proto, skillTagCnt) {
    this.id = Char.id++;
    this.name = proto.name;
    this.pay = proto.pay;
    this.mentalMax = proto.mentalMax;
    this.imgSrc = 'assets/mon/mon_' + FormatNumberLength(proto.imgNumber, 3) + '.png';
    this.tagList = [];

    for (var i = 0; i < skillTagCnt; ++i) {
        var name = randomPick(skillTagList);
        if (this.tagList.hasOwnProperty(name))
            this.tagList[name].lv++;
        else
            this.tagList[name] = {name: name, lv: 1};
    }
};

Char.id = 0;

Char.prototype.GetPay = function () {
    return this.pay;
};

Char.prototype.GetImg = function () {
    return this.imgSrc;
};

var CharList = {
    list: []
};

CharList.Add = function (newCharObj) {
    CharList[newCharObj.id] = newCharObj;
    AddChar(newCharObj.id, newCharObj.name, newCharObj.GetPay(), newCharObj.GetImg(), newCharObj.tagList);
};

CharList.GetById = function (id) {
    return CharList[id];
};