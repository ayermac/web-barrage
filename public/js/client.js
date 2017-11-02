(function () {
    var socket = io('//127.0.0.1:3000');

    $(".send-barrage").click(function(){
        if ($("#content").val() !== '') {
            socket.emit("barrage", $("#content").val());
            $("#content").val('');
        }
    });

    document.onkeydown = function(e){
        var ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
            $(".send-barrage").click();
        }
    };

    socket.on('barrage', function(msg){

        var item = {
            'img':'/imgs/2.jpg',
            'info': msg,
            'close': false,
            'speed': 16
        }
        $('.barrage-body').barrager(item);
    });

    socket.on('update_online_count', function(count){
        $('#online_count').html('当前有 '+count+' 人在线');
    });
})();
