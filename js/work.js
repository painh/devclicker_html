var Work = function (proto) {
    this.id = ++Work.id;
    this.name = proto.name + " #" + this.id;
    this.workAmount = 0;
    this.workAmountMax = proto.workAmount;
    this.parentProjectId = proto.parentProjectId;

    this.tagList = proto.tagList.slice(0);
};

Work.id = 0;

Work.prototype.AddChar = function (charObj) {
    AddCharFaceToWork(this.id, charObj);
};

Work.prototype.HaveWorkDone = function () {
    return (this.workAmount >= this.workAmountMax);
};

Work.prototype.Work = function (d) {
    if (this.HaveWorkDone())
        return;

    this.workAmount = Math.min(this.workAmount + d, this.workAmountMax);
    ChangeWorkFloatingText(this.id, d, this.workAmount, this.workAmountMax);
    if (this.workAmount >= this.workAmountMax)
        EnableWorkDone(this.id);
};

var WorkManager = {
    list: {}
};

WorkManager.Add = function (newObj) {
    WorkManager.list[newObj.id] = newObj;
    AddWork(newObj.id, newObj.name, newObj.workAmount, newObj.tagList);
};

WorkManager.GetById = function (id) {
    return WorkManager.list[id];
};

WorkManager.GenerateRandomWork = function (lv) {
    WorkManager.Add(new Work({
            name: '일상적인 업무',
            workAmount: lv * 1000 + randomRange(1, lv * 1000),
            tagList: [{name: 'client', lv: 5}]
        }
    ));
};

WorkManager.Update = function () {
};

WorkManager.Remove = function (id) {
    delete WorkManager.list[id];
};

WorkManager.ProjectStart = function (projectObj) {
    var i;
    for (i in projectObj.workList) {
        var work = projectObj.workList[i];
        WorkManager.Add(new Work({
            name: work.name,
            parentProjectId: projectObj.id,
            workAmount: work.workAmount,
            tagList: work.tagList
        }));
    }
};