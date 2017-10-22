var projectList = [
    {
        name: '국가 산업 수주',
        timeMin: 1000 * 60 * 4,
        timeMax: 1000 * 60 * 10,
        orderCostMin: 0,
        orderCostMax: 0,
        profitMin: 60,
        profitMax: 100,
        workList: [
            {
                name: '공문서 작성',
                workAmountMin: 300,
                workAmountMax: 500,
                tagList: [],
            },
            {
                name: '개발 환경 설정',
                workAmountMin: 300,
                workAmountMax: 400,
                tagList: [{name: 'client', minLv: 1, maxLv: 2}, {name: 'server', minLv: 1, maxLv: 2}],
            },
            {
                name: '디자인',
                workAmountMin: 400,
                workAmountMax: 500,
                tagList: [{name: 'illust', minLv: 1, maxLv: 2}, {name: 'modeling', minLv: 1, maxLv: 2}],
            },
            {
                name: '프로그래밍',
                workAmountMin: 400,
                workAmountMax: 500,
                tagList: [{name: 'client', minLv: 1, maxLv: 2}, {name: 'server', minLv: 1, maxLv: 2}],
            },
            {
                name: '공무원 실사 대응',
                workAmountMin: 100,
                workAmountMax: 200,
                tagList: [],
            },
            {
                name: 'QA',
                workAmountMin: 100,
                workAmountMax: 200,
                tagList: [{name: 'qa', minLv: 1, maxLv: 2}],
            },

        ]
    },
    {
        name: '모바일 앱 외주',
        timeMin: 1000 * 60 * 4,
        timeMax: 1000 * 60 * 10,
        orderCostMin: 0,
        orderCostMax: 0,
        profitMin: 60,
        profitMax: 100,
        workList: [
            {
                name: '개발 환경 설정',
                workAmountMin: 500,
                workAmountMax: 900,
                tagList: [{name: 'infra', minLv: 1, maxLv: 2}],
            },
            {
                name: '디자인',
                workAmountMin: 500,
                workAmountMax: 900,
                tagList: [{name: 'illust', minLv: 1, maxLv: 2}, {name: 'modeling', minLv: 1, maxLv: 2}],
            },
            {
                name: '프로그래밍',
                workAmountMin: 500,
                workAmountMax: 900,
                tagList: [{name: 'client', minLv: 1, maxLv: 2}, {name: 'server', minLv: 1, maxLv: 2}],
            },
            {
                name: 'QA',
                workAmountMin: 500,
                workAmountMax: 900,
                tagList: [{name: 'qa', minLv: 1, maxLv: 2}],
            },
            {
                name: '앱 등록과 심사',
                workAmountMin: 500,
                workAmountMax: 900,
                tagList: [],
            },
        ]
    },
    {
        name: '동인 게임 개발',
        timeMin: 1000 * 60 * 4,
        timeMax: 1000 * 60 * 10,
        orderCostMin: 10,
        orderCostMax: 20,
        profitMin: 60,
        profitMax: 100,
        workList: [
            {
                name: '원작 읽기',
                workAmountMin: 300,
                workAmountMax: 500,
                tagList: [],
            },
            {
                name: '개발 환경 설정',
                workAmountMin: 500,
                workAmountMax: 900,
                tagList: [{name: 'client', minLv: 1, maxLv: 2}, {name: 'server', minLv: 1, maxLv: 2}],
            },
            {
                name: '디자인',
                workAmountMin: 500,
                workAmountMax: 900,
                tagList: [{name: 'illust', minLv: 1, maxLv: 2}, {name: 'modeling', minLv: 1, maxLv: 2}],
            },
            {
                name: '프로그래밍',
                workAmountMin: 500,
                workAmountMax: 900,
                tagList: [{name: 'client', minLv: 1, maxLv: 2}, {name: 'server', minLv: 1, maxLv: 2}],
            },
            {
                name: 'QA',
                workAmountMin: 500,
                workAmountMax: 900,
                tagList: [{name: 'qa', minLv: 1, maxLv: 2}],
            },
            {
                name: '행사장 업무 처리',
                workAmountMin: 300,
                workAmountMax: 500,
                tagList: [],
            }
        ]
    },
];

var Project = function (proto) {
    this.id = ++Project.id;
    this.name = proto.name + " #" + this.id;

    this.orderCost = proto.orderCost;
    this.profit = proto.profit;

    this.time = proto.time;
    this.createAt = new Date();

    this.workAmount = 0;
    this.workAmountMax = 0;
    this.workList = proto.workList.slice(0);

    var i;
    for (i in proto.workList)
        this.workAmountMax += proto.workList[i].workAmount;
};

Project.id = 0;

Project.prototype.Update = function () {
    var now = new Date();
    var max = new Date(this.time + this.createAt.getTime());
    var percent = (max.getTime() - now.getTime()) / this.time * 100;

    var leftDate = new Date(max.getTime() - now.getTime());
    var leftStr = '';

    if (leftDate.getTime() / 1000 > 60)
        leftStr = leftDate.getMinutes() + '분 남음';
    else
        leftStr = leftDate.getSeconds() + '초 남음';


    RefreshProjectCard(this, Math.round(percent), leftStr);

    if (percent <= 0)
        this.isDead = true;
};

Project.prototype.ProcessWorkAmount = function (amount) {
    this.workAmount += amount;

    if (this.workAmount >= this.workAmountMax)
        ProjectDone(this.id);
};

Project.prototype.ChangeGoldAndNotify = function (gold, msg, notify) {
    Notify(msg + '$' + gold + '(을)를 얻었습니다. 예상 수익은 $' + this.profit + ' 이었습니다.', notify);
    Game.ChangeGold(gold);
};

Project.prototype.Done = function () {
    var now = new Date();
    var max = new Date(this.time + this.createAt.getTime());
    var percent = (max.getTime() - now.getTime()) / this.time * 100;
    var result = randomRange(0, 100) + (percent / 10);

    if (result < 30) {
        this.ChangeGoldAndNotify(this.profit * 0.3, '게임이 완전히 망해버렸습니다...', NOTIFY_DANGER);
    } else if (result < 50) {
        this.ChangeGoldAndNotify(this.profit * 0.5, '게임이 망해버렸습니다...', NOTIFY_DANGER);
    } else if (result < 80) {
        this.ChangeGoldAndNotify(this.profit, '게임이 예상한 만큼 팔렸네요!', NOTIFY_INFO);
    } else if (result < 90) {
        this.ChangeGoldAndNotify(this.profit * 1.3, '게임이 생각보다 잘 팔렸습니다!', NOTIFY_SUCCESS);
    } else {
        this.ChangeGoldAndNotify(this.profit * 1.5, '게임이 생각보다 훨씬 잘 팔렸습니다!', NOTIFY_SUCCESS);
    }
};

var ProjectManager = {
    list: {}
};

ProjectManager.ProtoToSeed = function (protoId) {
    var proto = projectList[protoId];
    var workList = [];
    var tag;
    var i, j;
    for (i in proto.workList) {
        var work = proto.workList[i];
        var tagList = [];
        for (j in work.tagList) {
            tag = work.tagList[j];
            tagList.push({name: tag.name, lv: randomRange(tag.minLv, tag.maxLv)});
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

ProjectManager.Add = function (newObj) {
    ProjectManager.list[newObj.id] = newObj;
    AddProject(newObj.id, newObj.name, newObj.workAmountMax, newObj.orderCost, newObj.profit);
};

ProjectManager.GetById = function (id) {
    return ProjectManager.list[id];
};

ProjectManager.GenerateRandomProject = function () {
    var seed = ProjectManager.ProtoToSeed(randomRange(0, projectList.length));

    ProjectManager.Add(new Project(seed));
};

ProjectManager.Update = function (dt) {
    var i;
    var deadList = {};
    var cnt = 0;

    for (i in ProjectManager.list) {
        var project = ProjectManager.list[i];
        project.Update(dt);
        if (project.isDead)
            deadList[project.id] = project;

        cnt++;
    }

    for (i in deadList) {
        var project = deadList[i];
        Notify(project.name + '(은)는 시간이 지나 만료되었습니다.', NOTIFY_DANGER);
        RemoveProject(project.id);
        WorkManager.ProjectTimeout(project.id);
        delete ProjectManager.list[i];
    }

    if (cnt < 5)
        ProjectManager.GenerateRandomProject();
};

ProjectManager.Remove = function (id) {
    delete ProjectManager.list[id];
};

ProjectManager.WorkDone = function (workObj) {
    var projectObj = ProjectManager.GetById(workObj.parentProjectId);
    projectObj.ProcessWorkAmount(workObj.workAmount);
};