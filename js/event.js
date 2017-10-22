var eventTable = {
    join: [
        {text: '잘 부탁드립니다!'},
        {text: '오래간 만의 직장생활인걸. 잘 해봐야지!'},
        {text: '여기도 다른 곳과 똑같겠지...'},
        {text: '드디어 취업했어!'},
    ],
    idle: [{text: '오늘 하루도 힘내자오!', mental: 10},
        {text: '전부 거짓말입니다. 전 매일 자살하고 싶습니다.', mental: -10}],

    player_idle: [{text: '복권에 당첨되었습니다.', gold: 10},
        {text: '복권에 당첨되었습니다.', gold: 10},
    ],
    payday: [{text: '와이~ 대표님 아리가또~'},
        {text: '오늘은 치긴이닭'},
        {text: '월급을 받았습니다'},
    ],
    partyMentalOut: [
        {text: '사람이 저지경이 될때까지 뭘 한거야?'},
        {text: '나도 힘들다구'},
    ],
    partyFired: [
        {text: '사람을 저렇게 마구 잘라도 괜찮은거야?'},
        {text: '성실한 사람이었는데... 너무해!'},
        {text: '잘려도 싼 사람이었어'},
        {text: '어디 좋은 곳으로 가려나?'},
    ],
    projectDone: [
        {text: '어쨌든 이력서에 한 줄 추가되었는걸'},
        {text: '지옥같은 프로젝트였어... 하지만 끝났다!'},
        {text: '한 층 더 성장한 기분이야'},
        {text: '끝났으니 이젠 쉬고 싶어'},
   ],

};

var EventManager = {};

EventManager.GetText = function (id) {
    var arr = eventTable[id];
    return arr[randomRange(0, arr.length)].text;
};