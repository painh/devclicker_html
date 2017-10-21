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

    ele.find('.skillTagList').html(html);
}

function FloatingText(eleObj, text) {
    var obj = $('<p class="floatingText">' + text + '</p>').appendTo(eleObj);

    console.log('sdfsad');
    obj.animate({
            top: -10,
            opacity: 0
        }, 1000, "swing",
        function () {
            $(this).remove();
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
    });
}

$(document).ready(function () {
    $(document).on('click', '.btnCharDetail', function () {
        ShowCharDetail(this, $(this).attr('data-id'));
    });

    $(document).on('click', '.charCard', function () {
        $('.charCard').removeClass('charCardSelected');
        $(this).addClass('charCardSelected');
    });

    Game.Create();

    setInterval(function () {
        Game.Update()
    }, 1000 / 30);

    $("#btnGacha").click(function () {
            Game.Gacha();
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

    $(document).on('click', '.btnCharAddToWork', function () {
        var char = $('.charCard.charCardSelected');
        if (char.length == 0) {
            Notify('직원을 먼저 선택해주세요', NOTIFY_DANGER);
            return;
        }

    });

});