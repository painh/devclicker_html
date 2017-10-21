var Work = function (proto) {
    this.id = ++Work.id;
    this.name = proto.name + " #" + this.id;
    this.workAmount = proto.workAmount;

    this.tagList = proto.tagList.slice(0);
};

Work.prototype.AddChar = function (charObj) {
    AddCharFaceToWork(this.id, charObj);
};

Work.id = 0;

var WorkList = {
    list: []
};

WorkList.Add = function (newObj) {
    WorkList[newObj.id] = newObj;
    AddWork(newObj.id, newObj.name, newObj.workAmount, newObj.tagList);
};

WorkList.GetById = function (id) {
    return WorkList[id];
};

WorkList.GenerateRandomWork = function (lv) {
    WorkList.Add(new Work({
            name: '일상적인 업무',
            workAmount: lv * 1000 + randomRange(1, lv * 1000),
            tagList: [{name: 'client', lv: 5}]
        }
    ));
};

WorkList.Update = function () {
};