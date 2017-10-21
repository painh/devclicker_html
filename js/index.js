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

function ShowCharDetail(parentEle, id) {
    console.log(id);
    var char = CharList.GetById(id);
    FloatingText(parentEle, 'hello world!');

    $("#charDetail").find('#charName').text(char.name);
    $("#charDetail").modal();
}

function AddWork() {
    var html = $("#workCardTemplate").html();
    $("#workList").append(html);
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

function randomPick(a)
{
    var index = Math.floor(Math.random() * a.length);
    return a[index];
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

});