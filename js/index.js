var skillTagList = ['client', 'server', 'illust', 'qa', 'scenario', '3d'];

function AddChar(id, name, pay, imgSrc, tagList) {
    var html = $("#charCardTemplate").clone().html();
    html = $(html).attr('data-id', id);

    var ele = $("#charList").append(html).find('.charCard[data-id=' + id + ']');
    $(ele).find('.charName').text(name);
    $(ele).find('.charPay').text(pay);
    $(ele).find('.charFace').attr('src', imgSrc);

    ele.find('[data-id]').each(function () {
        $(this).attr('data-id', id);
    });

    var i;
    html = '';
    for (i in tagList) {
        var tag = tagList[i];
        html += '<div class="skillTag">' + tag.name + '[' + tag.lv + ']</div>';
    }

    ele.find('.skillTagList').html(html);
    RefreshHeights();
}

function RemoveChar(id) {
    var ele = $(".charCard[data-id=" + id + "]");
    ele.fadeOut(function () {
        $(this).remove();
    });
}

function ShowCharDetail(parentEle, id) {
    var char = CharList.GetById(id);
    FloatingText(parentEle, 'hello world!');

    $("#charDetail").find('#charName').text(char.name);

    $("#charDetail").find('[data-id]').each(function () {
        $(this).attr('data-id', id);
    });

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
    RefreshHeights();
}

function FloatingText(eleObj, text, option) {
    option = option || {};

    var offset = eleObj.offset();
    var windowTop = $(window).scrollTop();
    var top = offset.top - windowTop;
    var left = offset.left + randomRange(0, eleObj.width());
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
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
        $("#btnGacha").text('가챠');
        $('#btnGacha').prop('disabled', false);
    }
    else {
        var date = new Date(left);
        $("#btnGacha").text('가챠 [' + (date.getMinutes() + 1) + '분 남음]');
//        $('#btnGacha').prop('disabled', true);
    }
}

function EnableWorkDone(id) {
    $('.workCard[data-id=' + id + ']').find(".btnWorkDone").attr('disabled', false);
}

var NOTIFY_SUCCESS = 'success';
// var NOTIFY_INFO = 'info';
// var NOTIFY_WARNING = 'warning';
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
        var workObj = WorkList.GetById(charObj.allowedWorkId);
        ele.find(".charAllowedWork").text(workObj.name);
    }
}

function AddCharFaceToWork(workId, charObj) {
    var workEle = $(".workCard[data-id=" + workId + "]");
    workEle.find(".workCharList").prepend('<img class="btnCharDetail charFace img-rounded"  data-id=' + charObj.id + ' src="' + charObj.imgSrc
        + '"/>');
}

function ChangeMentalFloatingText(charId, d, now, max) {
    var ele = $(".charCard[data-id=" + charId + "]").find('.progress');
    var option = {top: ele.offset().top - 20, opacity: 0, delay: 1000, bg_color: '#0f0'};
    var percent = (now / max * 100) + '%';
    if (d < 0) {
        option.bg_color = '#f00';
        option.top = ele.offset().top + 20;
    }
    ele.find(".progress-bar").attr('style', 'width:' + percent);
    ele.find(".progress-bar").text('멘탈[' + now + '/' + max + ']');

    FloatingText(ele, d, option);
}

function ChangeWorkFloatingText(workId, d, now, max) {
    var ele = $(".workCard[data-id=" + workId + "]").find('.progress');
    var option = {top: ele.offset().top - 20, opacity: 0, delay: 1000, bg_color: '#00f'};
    var percent = (now / max * 100) + '%';

    ele.find(".progress-bar").attr('style', 'width:' + percent);
    ele.find(".progress-bar").text('업무진행[' + now + '/' + max + ']');

    FloatingText(ele, d, option);
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

$(document).ready(function () {
    $(document).on('click', '.skillTag', function () {
        $("#skillDetail").modal();
    });

    $(document).on('click', '.btnCharDetail', function () {
        ShowCharDetail($(this), $(this).attr('data-id'));
    });

    $(document).on('click', '.charCard', function () {
        $('.charCard').removeClass('charCardSelected');
        $(this).addClass('charCardSelected');
    });

    Game.Create();

    setInterval(function () {
        Game.Update()
    }, 1000);

    $("#btnGacha").click(function () {
            var lv = 1;
            var obj = Game.Gacha(lv);
            Quotes(obj.id, "대사 테스트 가나다라");
        }
    );

    $("#charFire").click(function () {
        var r = confirm('정말로 해고할까요?');
        if (r == true) {
            var id = $(this).attr('data-id');
            CharList.Fire(id);
            $('#charDetail').modal('hide');
        }
    });

    $("#charRelease").click(function () {
        var id = $(this).attr('data-id');
        var charObj = CharList.GetById(id);
        if (charObj.CanAllowWork()) {
            Notify('해당 직원은 놀고 있습니다.', NOTIFY_DANGER);
            return;
        }
        var workId = charObj.allowedWorkId;
        CharList.Release(id);

        $(".workCard[data-id=" + workId + "]").find(".charFace").fadeOut(function () {
            $(this).remove();
        });

        Notify('해당 직원을 업무에서 제외했습니다.', NOTIFY_SUCCESS);
    });

    $(".btnWorkDone").click(function () {
        var id = $(this).attr('data-id');
        var workObj = WorkList.GetById(id);
        Notify(workObj.name + "(을)를 완료 했습니다!", NOTIFY_SUCCESS);


        console.log(WorkList.list);
        CharList.WorkRemoved(id);
        WorkList.Remove(id);
        $(".workCard[data-id=" + id + "]").fadeOut(function () {
            $(this).remove();
        });

        console.log(WorkList.list);
    });

    $(document).on('click', '.btnCharAddToWork', function () {
        var charEle = $('.charCard.charCardSelected');
        if (charEle.length == 0) {
            Notify('직원을 먼저 선택해주세요', NOTIFY_DANGER);
            return;
        }

        var charObj = CharList.GetById(charEle.attr('data-id'));
        if (!charObj.CanAllowWork()) {
            Notify('선택된 직원은 업무를 할당 받을 수 있는 상황이 아닙니다.', NOTIFY_DANGER);
            return;
        }

        var workId = $(this).attr('data-id');
        charObj.AllowWork(workId);

        var workObj = WorkList.GetById(workId);
        workObj.AddChar(charObj);

        RefreshCharCard(charObj);
    });

    $(window).resize(function () {
        RefreshHeights();
    });

    RefreshHeights();
});