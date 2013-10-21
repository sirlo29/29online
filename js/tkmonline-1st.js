﻿var ctrlr, view, Tkm = function() { }, unitePlayer = function() { };

Tkm.wsurl = 'ws://210.152.156.23:7911';
Tkm.ws = null;
Tkm.instanceIdx = null;
Tkm.userList = [];
Tkm.manifest = [
    { src: '../mp3/chat.mp3', id: 'chat' }
    , { src: '../mp3/build.mp3', id: 'build' }
    , { src: '../mp3/dice.mp3', id: 'dice' }
    , { src: '../mp3/robber.mp3', id: 'robber' }
    , { src: '../mp3/get.mp3', id: 'get' }
    , { src: '../mp3/end.mp3', id: 'end' }
    , { src: '../mp3/finish.mp3', id: 'finish' }
];

Tkm.sound = function (id) {
    createjs.Sound.play(id);
}

Tkm.send = function (msg) {
    Tkm.ws.send(String.fromCharCode(Tkm.instanceIdx) + msg);
}

Tkm.splitForSyntax1 = function(src) {
    return src.substring(1);
 }

Tkm.splitForSyntax2 = function(src) {
    var result = /^([^ ]*) ?(.*)$/.exec(src.substring(1));
    result.shift();
    return result;
}

Tkm.splitForSyntax3 = function (src) {
    return (src.substring(1)).split(' ');
}

Tkm.updateUserList = function () {
    var i, foo, bar;

    document.getElementById('user-list').innerHTML = '';

    for (i = 0; i < Tkm.userList.length; i++) {
        foo = Tkm.userList[i].split('%');
        switch (foo[0]) {
            case view.uid:
                
                if (foo[0] === view.cid) {
                    bar = '☆○'
                } else {
                    bar = '○';    
                }
                break;
            case view.cid:
                bar = '☆';
                break
            default:
                bar = '　';
                break;
        }
        bar += foo[0];
        if (foo.length > 1) bar += '◆' + foo[1];

        document.getElementById('user-list').innerHTML += '<li>' + bar + '</li>';
    }
}