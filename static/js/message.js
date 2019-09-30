
$(document).ready(function () {
    $('.liu').click(function () {
        $('#catfish').html('1');
        $('.btn-primary_1').click(function () {
            var cnt = 1;
        var content = $('#edit').val();
        if (content === ''){
            alert('输入框不能为空');
            return
        }
        if (cnt > 1){
            return
        }
        console.log(content);
        var uname = $('#username').html();
            $.ajax({
            type: 'get',
            contentType: 'application/json; charset = UTF-8',
            dataType: 'json',
            url: '/commit_message',
            data: {'user_name':uname,'content': content},
            success:function (data) {
                if (data.err === 0) {
                    // $('#catfishliuyan_2')[0].reset();
                    $('#edit').val('');
                    window.location.reload();
                }
                else {
                    alert('提交失败!');
                }
                }
            });
        cnt = cnt+1;
        console.log(cnt, 'cnt')
        })
    })
});

$(document).ready(function () {
    $('.row a').click(function (){
        $('#catfish').html('2');
        var mid = $(this).prop('class');
        console.log(mid);
        var join = '#'+ mid + ' ' + '#' + 'catfishtijiaoliuyan';
        console.log(join+ ' join');
        $(join).click(function () {
            var edit = '#' + mid + ' ' + '.form-control';
        var content = $(edit).val();
        console.log(content, 'content');
        var uname = $('#username').html();
        var choice = $('#catfish').html();
        console.log(mid+'mid');
        var form = '#' + mid + ' ' + '.catfishliuyan_2';
        if (choice === '1'){
            $.ajax({
            type: 'get',
            contentType: 'application/json; charset = UTF-8',
            dataType: 'json',
            url: '/commit_message',
            data: {'user_name':uname,'content': content},
            success:function (data) {
                if (data.err === 0) {
                    $(form)[0].reset();

                }
                else {
                    alert('提交失败!');
                }
                }
            })
        }

        else{

            $.ajax({
            type: 'get',
            contentType: 'application/json; charset = UTF-8',
            dataType: 'json',
            url: '/person_commit_message',
            data: {'user_name':uname,'content': content, 'mid':mid},
            success:function (data) {
                if (data.err === 0) {
                    $(form)[0].reset();
                    window.location.reload();
                }
                else {
                    alert('提交失败!');
                }
                }
            })
        }
    });
    });
});


$(document).ready(function () {
    $('.btn-default').click(function () {
        window.location.reload();
    })

});
