var projectList = [
    {
        name: '동인 게임 개발',
        timeMin: 1000,
        timeMax: 2000,
        orderCostMin: 100,
        orderCostMax: 200,
        profitMin: 150,
        profitMax: 300,
        workList: [
            {
                name: '원작 읽기',
                workAmountMin: 500,
                workAmountMax: 2000,
                tagList: [],
            },
            {
                name: '개발 환경 설정',
                workAmountMin: 2000,
                workAmountMax: 3000,
                tagList: [{name: 'client', minLv: 1, maxLv: 2}, {name: 'server', minLv: 1, maxLv: 2}],
            }
        ]
    },
];

var Project = function (proto) {
    this.id = ++Project.id;
    this.name = proto.name + " #" + this.id;

    this.orderCost = proto.orderCost;
    this.profit = proto.profit;

    this.workAmount = 0;
    this.workAmountMax = 0;
    this.workList = proto.workList.slice(0);

    var i;
    for(i in proto.workList)
        this.workAmountMax += proto.workList[i].workAmount;
};

Project.id = 0;


var ProjectList = {
    list: {}
};

ProjectList.ProtoToSeed = function (protoId) {
    var proto = projectList[protoId];
    var workList = [], tagList = [];
    var tag;
    var i, j;
    for (i in proto.workList) {
        var work = proto.workList[i];
        tagList = [];
        for (j in work.tagList) {
            tag = work.tagList[j];
            tagList.push({name: work.name, lv: randomRange(tag.minLv, tag.maxLv)});
        }

        workList.push({
            name: work.name,
            workAmount: randomRange(work.workAmountMin, work.workAmountMax),
            tagList: tagList
        });
    }

    return {
        name: proto.name,
        time: randomRange(proto.timeMin, proto.timeMax),
        orderCost: randomRange(proto.orderCostMin, proto.orderCostMax),
        profit: randomRange(proto.profitMin, proto.profitMax),
        workList: workList,
    };
};

ProjectList.Add = function (newObj) {
    ProjectList.list[newObj.id] = newObj;
    AddProject(newObj.id, newObj.name, newObj.workAmountMax, newObj.orderCost, newObj.profit);
};

ProjectList.GetById = function (id) {
    return ProjectList.list[id];
};

ProjectList.GenerateRandomProject = function () {
    var seed = ProjectList.ProtoToSeed(randomRange(0, projectList.length));

    ProjectList.Add(new Project(seed));
};

ProjectList.Update = function () {
};

ProjectList.Remove = function (id) {
    delete ProjectList.list[id];
};