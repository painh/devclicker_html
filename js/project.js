var projectList = [
    {
        name: '동인 게임 개발',
        timeMin : 1000,
        timeMax : 2000,
        cost : 100,
        workList: [
            {
                'name': '원작 읽기',
                workAmountMin: 1000,
                workAmountMax: 1000
            }
        ]
    },

];

var Project = function (proto) {
    this.id = ++Project.id;
    this.name = proto.name + " #" + this.id;
    this.workAmount = 0;
    this.workAmountMax = proto.workAmount;

    this.tagList = proto.tagList.slice(0);
};

Project.id = 0;


var ProjectList = {
    list: {}
};

ProjectList.ProtoToSeed = function(protoId)
{
    var proto = projectList[protoId];
};

ProjectList.Add = function (newObj) {
    ProjectList.list[newObj.id] = newObj;
    AddWork(newObj.id, newObj.name, newObj.workAmount, newObj.tagList);
};

ProjectList.GetById = function (id) {
    return ProjectList.list[id];
};

ProjectList.GenerateRandomProject = function (lv) {
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