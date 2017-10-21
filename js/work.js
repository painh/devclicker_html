var Work = function (proto) {
    this.id = Work.id++;
    this.name = proto.name;
    this.workAmount = proto.workAmount;

    this.tagList = [];
    for (var i = 0; i < proto.tagList; ++i) {
        var name = randomPick(skillTagList);
        if (this.tagList.hasOwnProperty(name))
            this.tagList[name].lv++;
        else
            this.tagList[name] = {name: name, lv: 1};
    }
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