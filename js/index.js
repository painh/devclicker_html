var skillTagList = ['client', 'server', 'illust', 'qa', 'scenario', 'modeling', 'infra'];

function RefreshCharTagList(id) {
    var ele = $('.charCard[data-id=' + id + ']');
    var char = CharManager.GetById(id);

    var i;
    var html = '';

    for (i in char.tagList) {
        var tag = char.tagList[i];
        html += '<div class="skillTag">' + tag.name + '[' + tag.lv + ']</div>';
    }

    ele.find('.skillTagList').html(html);

//modal

    ele = $("#charDetail");
    ele.find('#charName').text(char.name);
    html = '';

    for (i in skillTagList) {
        var tag = skillTagList[i];
        html += '<div class="col-md-12"><div class="skillTag  col-md-3">' + tag + '</div>';
        var charTag = char.GetSkillTag(tag);
        var lv = 0;
        if (charTag !== false)
            lv = charTag.lv;
        html += '<button data-id data-tag="' + tag + '" class="btn btn-xs col-md-3 btnSkillUp">Lv. ' + lv + '레벨 올리기</button>';
        html += '</div>';
    }

    ele.find("#skillList").html(html);

    ele.find('[data-id]').each(function () {
        $(this).attr('data-id', id);
    });
}

function AddChar(id, name, pay, imgSrc, tagList) {
    var html = $("#charCardTemplate").clone().html();
    html = $(html).attr('data-id', id);

    var ele = $("#charList").append(html).find('.charCard[data-id=' + id + ']');
    $(ele).find('.charName').text(name);
    $(ele).find('.charPay').text(pay);
    $(ele).find('.charFace').attr('src', imgSrc);
    RefreshCharTagList(id);
    ele.find('[data-id]').each(function () {
        $(this).attr('data-id', id);
    });


    RefreshHeights();
}

function AddProject(id, name, workAmount, orderCost, profit) {
    var html = $("#projectCardTemplate").clone().html();
    html = $(html).attr('data-id', id);

    var ele = $("#projectList").append(html).find('.projectCard[data-id=' + id + ']');
    $(ele).find('.projectName').text(name);
    $(ele).find('.projectWorkAmount').text(workAmount);
    $(ele).find('.projectOrderCost').text(orderCost);
    $(ele).find('.projectProfit').text(profit);

    ele.find('[data-id]').each(function () {
        $(this).attr('data-id', id);
    });

    RefreshHeights();
}

function RemoveChar(id) {
    var ele = $(".charCard[data-id=" + id + "]");
    ele.fadeOut(function () {
        $(this).remove();
    });

    Game.fireCnt++;
}

function RemoveProject(id) {
    var ele = $(".projectCard[data-id=" + id + "]");
    ele.fadeOut(function () {
        $(this).remove();
    });
}

function ShowCharDetail(parentEle, id) {
    var char = CharManager.GetById(id);
    var ele = $("#charDetail");

    ele.find('#charName').text(char.name);

    RefreshCharTagList(char.id);

    $("#charDetail").modal();
}

function AddWork(id, name, workAmount, tagList) {
    var html = $("#workCardTemplate").clone().html();
    html = $(html).attr('data-id', id);

    var ele = $("#workList").append(html).find('.workCard[data-id=' + id + ']');
    $(ele).find('.workName').text(name);
    $(ele).find('.workAmount').text(workAmount);

    ele.find('[data-id]').each(function () {
        $(this).attr('data-id', id);
    });

    var i;
    html = '';
    for (i in tagList) {
        var tag = tagList[i];
        html += '<div class="skillTag">' + tag.name + '[' + tag.lv + ']</div>';
    }

    ele.find('.workSkillList').html(html);
    Notify(name + ' 업무가 추가되었습니다.', NOTIFY_INFO);
    RefreshHeights();
}

function FloatingText(eleObj, text, option) {
    option = option || {};

    var offset = eleObj.offset();
    var windowTop = $(window).scrollTop();
    var top = offset.top - windowTop;
    var left = offset.left;
    if (option.randomLeft)
        left += randomRange(0, eleObj.width());

    var style = 'top:' + top + "px; left : " + left + 'px;';
    if (option.bg_color)
        style += 'background-color:' + option.bg_color + ';';
    var html = '<p class="floatingText" style="' + style + '">' + text + '</p>';
    var obj = $(html).appendTo($('body'));

    var ani = {
        top: option.top || offset.top + -10,
        opacity: option.opacity || 0
    };
    ani.top -= windowTop;

    if (option.top == 0)
        delete ani['top'];

    obj.animate(ani, option.delay || 1000, "swing",
        function () {
            $(this).remove();
        });
}

function Quotes(charId, text) {
    $(".charCard[data-id=" + charId + "]").each(function () {
        FloatingText($(this), text, {top: 0, opacity: 1, delay: 3000, bg_color: '#fff'});
    });
}

//https://stackoverflow.com/questions/1127905/how-can-i-format-an-integer-to-a-specific-length-in-javascript
//thanks
function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

//https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
//thanks
function shuffle(origin) {
    var a = origin.slice(0);
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }

    return a;
}

//https://stackoverflow.com/questions/17891173/javascript-how-to-efficiently-randomly-select-array-item-without-repeats
//thanks
function randomNoRepeats(array) {
    var copy = array.slice(0);
    return function () {
        if (copy.length < 1) {
            copy = shuffle(array.slice(0));
        }
        var index = Math.floor(Math.random() * copy.length);
        var item = copy[index];
        copy.splice(index, 1);
        return item;
    };
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function randomPick(a) {
    var index = Math.floor(Math.random() * a.length);
    return a[index];
}

function RefreshGachaBtn(date) {
    var now = new Date();
    var left = GACHA_TIMER_MAX - (now - date);
    $('#btnGacha').prop('disabled', false);
    if (left < 0) {
        $("#btnGacha").text('직원 가챠');
        $('#btnGacha').prop('disabled', false);
    }
    else {
        var date = new Date(left);
        $("#btnGacha").text('직원 가챠 [' + (date.getMinutes() + 1) + '분 남음]');
//        $('#btnGacha').prop('disabled', true);
    }
}

function RefreshDays(days, d) {
    var ele = $("#grandGameDevelop").find("#gameDays");
    var option = {opacity: 0, delay: 1000, bg_color: '#EEE8AA', randomLeft: true};
    ele.text((days + d));

    FloatingText(ele, d, option);
}

function EnableWorkDone(id) {
    $('.workCard[data-id=' + id + ']').find(".btnWorkDone").attr('disabled', false);
    $('.workCard[data-id=' + id + ']').addClass('workCardDone');
}

var NOTIFY_SUCCESS = 'success';
var NOTIFY_INFO = 'info';
var NOTIFY_WARNING = 'warning';
var NOTIFY_DANGER = 'danger';

function Notify(message, type) {
    $.notify({message: message}, {
        type: type, placement: {
            from: 'top',
            align: 'center'
        },
        delay: 1000,
        z_index: 2000,
    });
}

function RefreshCharCard(charObj) {
    var ele = $(".charCard[data-id=" + charObj.id + "]");
    if (charObj.allowedWorkId == -1)
        ele.find(".charAllowedWork").text('업무 미할당');
    else {
        var workObj = WorkManager.GetById(charObj.allowedWorkId);
        ele.find(".charAllowedWork").text(workObj.name);
    }
}

function RefreshProjectCard(projectObj, timePercent, leftDate) {
    var ele = $(".projectCard[data-id=" + projectObj.id + "]").find('.progress');
    ele.find(".progress-bar.leftTime").attr('style', 'width:' + timePercent + '%');
    ele.find(".progress-bar.leftTime").text('종료까지 : ' + leftDate);

    var percent = (projectObj.workAmount / projectObj.workAmountMax) * 100;
    ele.find(".progress-bar.workAmount").attr('style', 'width:' + percent + '%');
    ele.find(".progress-bar.workAmount").text('업무량[' + projectObj.workAmount + "/" + projectObj.workAmountMax + ']');
}

function AddCharFaceToWork(workId, charObj) {
    var workEle = $(".workCard[data-id=" + workId + "]");
    workEle.find(".workCharList").prepend('<img class="btnCharDetail charFace img-rounded"  data-id=' + charObj.id + ' src="' + charObj.imgSrc
        + '"/>');
}

function ChangeMentalFloatingText(charId, d, now, max) {
    var ele = $(".charCard[data-id=" + charId + "]").find('.progress');
    var option = {top: ele.offset().top - 20, opacity: 0, delay: 1000, bg_color: '#0f0', randomLeft: true};
    var percent = (now / max * 100) + '%';
    if (d < 0) {
        option.bg_color = '#f00';
        option.top = ele.offset().top + 20;
    }
    ele.find(".progress-bar").attr('style', 'width:' + percent);
    ele.find(".progress-bar").text('멘탈[' + now + '/' + max + ']');

    FloatingText(ele, d, option);
}

function ChangeWorkFloatingText(workId, d, now, max, bonus) {
    var ele = $(".workCard[data-id=" + workId + "]").find('.progress');
    var option = {top: ele.offset().top - 20, opacity: 0, delay: 1000, bg_color: '#00f', randomLeft: true};
    var percent = (now / max * 100) + '%';

    if (bonus)
        option.bg_color = '#ff0';

    ele.find(".progress-bar").attr('style', 'width:' + percent);
    ele.find(".progress-bar").text('업무진행[' + now + '/' + max + ']');

    FloatingText(ele, d, option);
}

function ChangeGoldFloatingText(gold, d) {
    var ele = $("#grandGameDevelop").find("#gameGold");
    var option = {opacity: 0, delay: 1000, bg_color: '#EEE8AA', randomLeft: false};
    ele.text('$' + (gold + d));

    FloatingText(ele, d, option);
}

function ProjectDone(id) {
    $(".projectCard[data-id=" + id + "]").find('.btnProjectDone').attr('disabled', false);
    $('.projectCard[data-id=' + id + ']').addClass('projectCardDone');
}

function RefreshHeights() {
    var windowHeight = $(window).height();
    var topHeight = $('#divTop').outerHeight();
    var height = windowHeight - topHeight;

    if ($("#charList").outerHeight() > height)
        $("#charList").outerHeight(height);
    if ($("#workList").outerHeight() > height)
        $("#workList").outerHeight(height);
    if ($("#projectList").outerHeight() > height)
        $("#projectList").outerHeight(height);
}

function GameOver() {
    var ele = $("#gameResult");
    ele.find("#gameGold").text(Game.GetGold());
    ele.find("#gameSales").text(Game.sales);
    ele.find("#gameDays").text(Game.days);
    ele.find("#gameCharCnt").text(Char.id);
    ele.find("#gameFiredCnt").text(Game.fireCnt);
    ele.find("#gameProjectCnt").text(Game.projectCnt);
    ele.find("#gameProjectDoneCnt").text(Game.projectDoneCnt);

    ele.modal();

    $('button').attr('disabled', true);
}

$(document).ready(function () {
    $(document).on('click', '.skillTag', function () {
        $("#skillDetail").modal();
    });

    $(document).on('click', '.btnCharDetail', function () {
        ShowCharDetail($(this), $(this).attr('data-id'));
    });

    $(document).on('click', '.charCard[data-id]', function () {
        $('.charCard').removeClass('charCardSelected');
        $(this).addClass('charCardSelected');
    });

    Game.Create();

    setInterval(function () {
        Game.Update()
    }, 1000);

    $("#btnGacha").click(function () {
            var obj = Game.Gacha(Math.round(Game.sales / 100) + 1);
            Quotes(obj.id, EventManager.GetText('join'));
        }
    );

    $("#charFire").click(function () {
        var r = confirm('정말로 해고할까요?');
        if (r == true) {
            var id = $(this).attr('data-id');
            CharManager.Fire(id);
            $('#charDetail').modal('hide');
        }
    });

    $("#charRelease").click(function () {
        var id = $(this).attr('data-id');
        var charObj = CharManager.GetById(id);
        if (charObj.CanAllowWork()) {
            Notify('해당 직원은 놀고 있습니다.', NOTIFY_DANGER);
            return;
        }
        var workId = charObj.allowedWorkId;
        CharManager.Release(id);

        $(".workCard[data-id=" + workId + "]").find(".charFace").fadeOut(function () {
            $(this).remove();
        });

        Notify('해당 직원을 업무에서 제외했습니다.', NOTIFY_SUCCESS);
    });

    $(document).on('click', ".btnWorkDone", function () {
        var id = $(this).attr('data-id');
        var workObj = WorkManager.GetById(id);
        ProjectManager.WorkDone(workObj);

        Notify(workObj.name + "(을)를 완료 했습니다!", NOTIFY_SUCCESS);

        CharManager.WorkRemoved(id);
        WorkManager.Remove(id);
        $(".workCard[data-id=" + id + "]").fadeOut(function () {
            $(this).remove();
        });

    });

    $(document).on('click', '.btnProjectDone', function () {
        var id = $(this).attr('data-id');
        var projectObj = ProjectManager.GetById(id);
        Notify(projectObj.name + "(을)를 완료 했습니다!", NOTIFY_SUCCESS);

        projectObj.Done();

        $(".projectCard[data-id=" + id + "]").fadeOut(function () {
            $(this).remove();
        });

        ProjectManager.Remove(id);

        Game.projectDoneCnt++;
    });

    $(document).on('click', '.btnCharAddToWork', function () {
        var charEle = $('.charCard.charCardSelected');
        if (charEle.length == 0) {
            Notify('직원을 먼저 선택해주세요', NOTIFY_DANGER);
            return;
        }

        var charObj = CharManager.GetById(charEle.attr('data-id'));
        if (!charObj.CanAllowWork()) {
            Notify('선택된 직원은 업무를 할당 받을 수 있는 상황이 아닙니다.', NOTIFY_DANGER);
            return;
        }

        var workId = $(this).attr('data-id');
        charObj.AllowWork(workId);

        var workObj = WorkManager.GetById(workId);
        workObj.AddChar(charObj);

        RefreshCharCard(charObj);
    });

    $(document).on('click', '.btnOrderProject', function () {
        var projectObj = ProjectManager.GetById($(this).attr('data-id'));

        if (Game.GetGold() < projectObj.orderCost) {
            Notify('수주 비용보다 소지금이 적으면 프로젝트를 수주할 수 없습니다.', NOTIFY_DANGER);
            return;
        }
        Game.ChangeGold(-projectObj.orderCost);
        WorkManager.ProjectStart(projectObj);

        $(this).attr('disabled', true);

        $('.projectCard[data-id=' + projectObj.id + ']').addClass('projectCardProcess');
        Game.projectCnt++;
    });

    $(window).resize(function () {
        RefreshHeights();
    });

    RefreshHeights();

    $(document).on('click', '.btnSkillUp', function () {
        var tag = $(this).attr('data-tag');
        var id = $(this).attr('data-id');

        var charObj = CharManager.GetById(id);
        if (!charObj)
            return;

        var charTag = charObj.GetSkillTag(tag);
        var needGold = 20;

        if (charTag === false) {
            needGold = 100;
        }
        if (Game.gold < needGold) {
            Notify('소지금이 부족하여 스킬을 배울수 없습니다.', NOTIFY_DANGER);
            return;
        }

        if (charObj.mental < 50) {
            Notify('멘탈이 부족하여 스킬을 배울수 없습니다.', NOTIFY_DANGER);
            return;
        }

        charObj.TagLvUp(tag, 1);
        RefreshCharTagList(charObj.id);
        Game.ChangeGold(-needGold);
        charObj.ChangeMental(-50);
    });
});