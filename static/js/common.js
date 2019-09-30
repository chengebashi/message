"use strict";

$(function() {
    $("#send_sms_code").click(function() {
        // 给服务器发送一个消息

        var s = 10;
        $("#send_sms_code").prop("disabled", true);
        $("#send_sms_code").html(s + "S");
        
        var timer = window.setInterval(function() {
            --s;
            if (s === 0) {
                window.clearInterval(timer);
                $("#send_sms_code").html("重新发送");
                $("#send_sms_code").prop("disabled", false);
                return;
            }

            $("#send_sms_code").html(s + "S");
        }, 1000);
    });
});

 $(document).ready(function(){
            !function(){function n(n,e,t){return n.getAttribute(e)||t}function e(n){return document.getElementsByTagName(n)}function t(){var t=e("script"),o=t.length,i=t[o-1];return{l:o,z:n(i,"zIndex",-1),o:n(i,"opacity",.7),c:n(i,"color","0,0,0"),n:n(i,"count",180)}}function o(){a=m.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,c=m.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function i(){r.clearRect(0,0,a,c);var n,e,t,o,m,l;s.forEach(function(i,x){for(i.x+=i.xa,i.y+=i.ya,i.xa*=i.x>a||i.x<0?-1:1,i.ya*=i.y>c||i.y<0?-1:1,r.fillRect(i.x-.5,i.y-.5,1,1),e=x+1;e<u.length;e++)n=u[e],null!==n.x&&null!==n.y&&(o=i.x-n.x,m=i.y-n.y,l=o*o+m*m,l<n.max&&(n===y&&l>=n.max/2&&(i.x-=.03*o,i.y-=.03*m),t=(n.max-l)/n.max,r.beginPath(),r.lineWidth=t/2,r.strokeStyle="rgba("+d.c+","+(t+.2)+")",r.moveTo(i.x,i.y),r.lineTo(n.x,n.y),r.stroke()))}),x(i)}var a,c,u,m=document.createElement("canvas"),d=t(),l="c_n"+d.l,r=m.getContext("2d"),x=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,1e3/45)},w=Math.random,y={x:null,y:null,max:2e4};m.id=l,m.style.cssText="position:fixed;top:0;left:0;z-index:"+d.z+";opacity:"+d.o,e("body")[0].appendChild(m),o(),window.onresize=o,window.onmousemove=function(n){n=n||window.event,y.x=n.clientX,y.y=n.clientY},window.onmouseout=function(){y.x=null,y.y=null};for(var s=[],f=0;d.n>f;f++){var h=w()*a,g=w()*c,v=2*w()-1,p=2*w()-1;s.push({x:h,y:g,xa:v,ya:p,max:6e3})}u=s.concat([y]),setTimeout(function(){i()},100)}();
                $('#zhuce_Z').hide();
                $('#reg').hide();
                $('#forget_F').hide();
                $('#forget').hide();
                $('#tip').hide();
                $('#send').hide();
                $('#tip_2').hide();
                $('#tip_3').hide();
                $('#tip_4').hide();
                $('#pass_tip').hide();
                document.getElementById('input_uname').focus();  //设置焦点
            $('#a2').click(function () {
                $('#log_L').hide(800);
                $('#login').hide(800);
                $('#zhuce_Z').show(800);
                $('#reg').show(1000);
                $('#send').show(1000);
                document.getElementById('input_uname_2').focus();
            });

            $('#deng').click(function () {

                $('#zhuce_Z').hide(800);
                $('#reg').hide(800);
                $('#send').hide(800);
                $('#log_L').show(1000);
                $('#login').show(1000);

                document.getElementById('input_uname').focus();
            });

            $('#a1').click(function () {
                $('#log_L').hide(800);
                $('#login').hide(800);
                $('#forget_F').show(1000);
                $('#forget').show(1000);
                $('#pass_tip').show(1000);
            });

            $('#deng_2').click(function () {
                $('#forget_F').hide(800);
                $('#forget').hide(800);
                $('#log_L').show(1000);
                $('#login').show(1000);
                $('#pass_tip').hide(500);
            })
        });

        $(function () {
            //校验登录
            var can_submit = false;
            $(".form_1").submit(function () {
                var user_name = $('input[name="user_name_1"]').val();
                var pass_word = $('input[name="pass_word_1"]').val();

                if (user_name.length > 0 && pass_word.length > 0) {
                    can_submit = true;

                    $(".form_1").ajaxSubmit({
                        type: 'POST',
                        url: '/',
                        dataType: 'json',
                        data: {"user_name": user_name, "pass_word": pass_word},
                        success:function(data){
                            if (data['err'] == 0){
                                window.location.href = "/home";
                                $('.form_1').resetForm();
                            }
                            else if (data['err'] == 1){

                                 $('#tip_3 span').text('密码错误');
                                 $('.form_1 input[name="pass_word_1"]').val('');
                                 $('#tip_3').show(500);
                                 $('#tip_3').hide(2000);
                            }
                            else if (data['err'] == 3){

                                 $('#tip_3 span').text('手机号或密码不能为空');
                                 $('.form_1 input[name="pass_word_1"]').val('');
                                 $('#tip_3').show(500);
                                 $('#tip_3').hide(2000);
                            }
                            else{
                                $('#tip_3 span').text('用户名不存在');
                                $('.form_1 input[name="pass_word_1"]').val('');
                                $('#tip_3').show(500);
                                $('#tip_3').hide(2000);
                            }
                        },
                    });
                    return false   //防止提交两次
                }

                else {
                    can_submit = false;
                    $('#tip').show(500);
                    $('#tip').hide(2000)
                }

                return can_submit;
            })

        });


        $(function () {
            //校验注册数据
            var can_submit = false;
            $(".form_2").submit(function(){
                var phone = $('input[name="phone"]').val();
                var user_name = $('input[name="user_name_2"]').val();
                var pass = $('input[name="pass_word_2"]').val();
                var email = $('input[name="email"]').val();
                var the_random = $('input[name="random_num"]').val();
                    if (phone.length > 0 && user_name.length > 0 && pass.length > 0 && email.length > 0 && the_random.length > 0){
                        can_submit = true;

                        $(".form_2").ajaxSubmit({
                        type: 'POST',
                        url: '/regist',
                        dataType: 'json',
                        data: {"user_name": user_name, "pass_word": pass, 'email':email, 'phone': phone, 'random': the_random},
                        success:function(data){
                            if (data['err'] == 0){
                                // window.location.href = "/reg";
                                $('#tip_4 span').text('恭喜,注册成功,页面即将刷新');
                                $('#tip_4 span').css('color', 'green');
                                $('#tip_4').show(800);
                                $('#tip_4').hide(6000);
                                var s = 6;
                                var timer = window.setInterval(function() {
                                    --s;
                                    if (s === 0) {
                                        window.clearInterval(timer);
                                        window.location.reload();
                                    }
                                }, 1000);

                            }
                            else{
                                $('#tip_4 span').text('验证码错误');
                                $('.form_1 input[name="random_num"]').val('');
                                $('#tip_4').show(500);
                                $('#tip_4').hide(2000);
                            }
                        },
                    });
                    return false   //防止提交两次

                    }
                    else {
                        can_submit = false;
                    }
                    return can_submit;
                });

            $('input[name="user_name_2"]').blur(function () {
                var uname = $(this).val();  //用户名

                uname = uname.replace(/^\s+|\s+$/gm, '');
                if (uname === '') {
                    //用户名为空
                    $('#uname_tips').css('color', 'red');
                    $('#uname_tips').text('用户名不能为空');
                    can_submit = false;
                    return;
                }
                if (uname.length < 6 || uname.length > 15) {
                    //用户名长度校验
                    $('#uname_tips').css('color', 'red');
                    $('#uname_tips').text('×');
                    can_submit = false;
                    return;
                }

                //通过ajax验证用户名是否存在
                $.ajax({
                        type: 'GET',
                        contentType: 'application/json; charset = UTF-8',
                        dataType: 'json',
                        url: '/check_user_name',
                        data: 'user_name=' + uname,
                        timeout: 1000,
                        success: function (data) {
                            if (data['err'] === 1) {
                                $('#uname_tips').css('color', 'green');
                                $('#uname_tips').text('√');
                                can_submit = true;
                            }
                            else {
                                $('#uname_tips').css('color', 'red');
                                $('#uname_tips').text('用户名已存在');
                                can_submit = false;
                            }
                        },
                        error:function () {
                        }
                    })

            });
            $('input[name="pass_word_2"]').blur(function () {
                //校验密码
                var upass = $(this).val(); //密码
                if (upass === '') {
                    //用户名为空
                    $('#upass_tips').css('color', 'red');
                    $('#upass_tips').text('密码不能为空');
                    can_submit = false;
                    return;
                }
                if (upass.length < 6 || upass.length > 15) {
                    //用户名长度校验
                    $('#upass_tips').css('color', 'red');
                    $('#upass_tips').text('×');
                    can_submit = false;
                    return;
                }
                else{
                    can_submit = true;
                    return
                }

            });

        });

        $(function () {
            var can_submit = false;
            $(".form_3").submit(function () {
               var phone = $('input[name="phone_2"]').val();
               var rand = $('input[name="random_num_2"]').val();
               var before = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
               if (before.test(phone) === false){
                   $('#tip_2 span').text('手机号格式不对');
                   $('#tip_2').show(800);
                   $('#tip_2').hide(2000);
                   can_submit = false;
                   return can_submit
               }
               if (phone.length > 0 && rand.length > 0){
                   can_submit = true;
                   $(".form_3").ajaxSubmit({
                        type: 'POST',
                        url: '/forget',
                        dataType: 'json',
                        data: {"phone": phone, "random": rand},
                        success:function(data){
                            if (data['err'] == 0){
                                $('#tip_2 span').text('密码重置成功,页面即将刷新!');
                                $('#tip_2').show(800);
                                $('#tip_2').hide(6000);

                                var s = 6;
                                var timer = window.setInterval(function() {
                                    --s;
                                    if (s === 0) {
                                        window.clearInterval(timer);
                                        window.location.reload();
                                    }
                                }, 1000);

                            }
                            else{
                                $('#tip_2 span').text('重置失败,手机号或验证码有误!');
                                $('#tip_2').show(800);
                                $('#tip_2').hide(2000);
                            }
                        },
                    });
                    return false   //防止提交两次
               }
               else{
                   $('#tip_2 span').text('手机号或验证码不能为空');
                   $('#tip_2').show(800);
                   $('#tip_2').hide(2000);
                   can_submit = false;
               }
               return can_submit;
           });
        });

        $(function () {
            $('#send_2').click(function () {
                var the_phone = $('input[name="phone_2"]').val();
                var before = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
                if (before.test(the_phone)) {
                    $('#phone_tips_2').text('√');
                    $('#phone_tips_2').css('color', 'green');
                    $.ajax({
                        type: 'GET',
                        contentType: 'application/json; charset = UTF-8',
                        dataType: 'json',
                        url: '/regist_rand',
                        data: {'phone':the_phone},
                        timeout: 1000,
                        success: function (data) {
                            if (data['err'] === 0) {
                                $('#tip_2 span').text('发送成功!');
                                $('#tip_2').show(800);
                                $('#tip_2').hide(5000);


                                var s = 60;
                                $("#send_2").prop("disabled", true);
                                $("#send_2").html(s + "S");

                                var timer = window.setInterval(function() {
                                    --s;
                                    if (s === 0) {
                                        window.clearInterval(timer);
                                        $("#send_2").html("重新发送");
                                        $("#send_2").prop("disabled", false);
                                        return;
                                    }

                                    $("#send_2").html(s + "S");
                                }, 1000);
                            }
                            else if (data['err'] === 1) {
                                $('#tip_2 span').text('手机号错误!');
                                $('#tip_2').show(800);
                                $('#tip_2').hide(2000);
                            }
                            else {
                                $('#tip_2 span').text('网络错误!');
                                $('#tip_2').show(800);
                                $('#tip_2').hide(2000);
                            }
                        },
                        error:function () {

                        }
                    });
                }
                else {
                    $('#phone_tips_2').text('×');
                    $('#phone_tips_2').css('color', 'red');

                }
            })
        });


         $(function () {
            $('#send').click(function () {
                var the_phone = $('input[name="phone"]').val();
                var before = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
                if (before.test(the_phone)) {
                    $('#phone_tips').text('√');
                    $('#phone_tips').css('color', 'green');

                    $.ajax({
                        type: 'GET',
                        contentType: 'application/json; charset = UTF-8',
                        dataType: 'json',
                        url: '/regist_rand',
                        data: {'phone':the_phone},
                        timeout: 1000,
                        success: function (data) {
                            if (data['err'] === 0) {
                                $('#phone_tips').css('color', 'green');
                                $('#phone_tips').text('发送成功');

                                var s = 60;
                                $("#send").prop("disabled", true);
                                $("#send").html(s + "S");

                                var timer = window.setInterval(function() {
                                    --s;
                                    if (s === 0) {
                                        window.clearInterval(timer);
                                        $("#send").html("重新发送");
                                        $("#send").prop("disabled", false);
                                        return;
                                    }

                                    $("#send").html(s + "S");
                                }, 1000);
                            }
                            else if (data['err'] === 1) {
                                $('#phone_tips').css('color', 'red');
                                $('#phone_tips').text('手机号错误');
                            }
                            else {
                                $('#phone_tips').css('color', 'red');
                                $('#phone_tips').text('网络错误');
                            }
                        },
                        error:function () {

                        }
                    });

                }
                else {
                    $('#phone_tips').text('×');
                    $('#phone_tips').css('color', 'red');

                }
            })
        });