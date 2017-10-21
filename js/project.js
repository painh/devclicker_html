var project

var Project = function (proto) {
    this.id = ++Project.id;
    this.name = proto.name + " #" + this.id;
    this.workAmount = 0;
    this.workAmountMax = proto.workAmount;

    this.tagList = proto.tagList.slice(0);
};

Project.id = 0;

Project.prototype.AddChar = function (charObj) {
    AddCharFaceToWork(this.id, charObj);
};

Project.prototype.WorkDone = function () {
    return (this.workAmount >= this.workAmountMax);
};

Project.prototype.Project = function (d) {
    if (this.WorkDone())
        return;

    this.workAmount = Math.min(this.workAmount + d, this.workAmountMax);
    ChangeWorkFloatingText(this.id, d, this.workAmount, this.workAmountMax);
    if (this.workAmount >= this.workAmountMax)
        EnableWorkDone(this.id);
};


var ProjectList = {
    list: {}
};

ProjectList.Add = function (newObj) {
    ProjectList.list[newObj.id] = newObj;
    AddWork(newObj.id, newObj.name, newObj.workAmount, newObj.tagList);
};

ProjectList.GetById = function (id) {
    return ProjectList.list[id];
};

ProjectList.GenerateRandomWork = function (lv) {
    ProjectList.Add(new Project({
            name: '일상적인 업무',
            workAmount: lv * 1000 + randomRange(1, lv * 1000),
            tagList: [{name: 'client', lv: 5}]
        }
    ));
};

ProjectList.Update = function () {
};

ProjectList.Remove = function (id) {
    delete ProjectList.list[id];
};