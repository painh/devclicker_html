var eventTable = {
    join: [
        {text: ''}
    ],
    idle: [{text: '오늘 하루도 힘내자오!', mental: 10},
        {text: '전부 거짓말입니다. 전 매일 자살하고 싶습니다.', mental: -10}],

    player_idle: [{text: '복권에 당첨되었습니다.', gold: 10},
        {text: '복권에 당첨되었습니다.', gold: 10},
    ],
    payday: [{text: '와이~ 대표님 아리가또~'},
        {text: '오늘은 치긴이닭'},
        {text: '월급을 받았습니다'},
    ]

};

var EventManager = {};

EventManager.GetText = function (id) {
    var arr = eventTable[id];
    return arr[randomRange(0, arr.length)].text;
};