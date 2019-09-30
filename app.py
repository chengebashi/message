from flask import Flask, jsonify, redirect, render_template, request, session, abort, Response
import os
import function
import re, datetime

app = Flask(__name__)

app.secret_key = os.urandom(24)

@app.route('/', methods=['GET', 'POST'])
def index():
    #首页加登录
    if request.method == 'GET':
        login = session.get("uname")
        if login:
            rsp = '/home'
            return redirect(rsp)
        else:
            return render_template('index.html')

    elif request.method == 'POST':
        reg = {}
        user_name = request.form.get('user_name_1')
        #将user_name传入数据库
        pass_wrod = request.form.get('pass_word_1')
        if not (user_name or pass_wrod):
            reg['err'] = 3          #用户名或者密码为空
        else:
            reponse_user_name = function.check_user_exits(user_name)
            if reponse_user_name == 0:
                now_time = str(datetime.datetime.now())
                reponse_password = function.check_password_ture(user_name, pass_wrod, now_time[:19])
                if reponse_password == 0:
                    reg['err'] = 0
                    session['uname'] = user_name
                else:
                    reg['err'] = 1  #密码错误
            else:
                reg['err'] = 2   #用户名不存在

        print(reg, 'reg')
        return jsonify(reg)

@app.route('/regist', methods=['get', 'post'])
def regist():
    reg = {}
    user_name = request.form.get('user_name')
    pass_wrod = request.form.get('pass_word')
    email = request.form.get('email')
    phone = request.form.get('phone')
    random = request.form.get('random')
    print(user_name, pass_wrod, email, phone, random)

    if not re.fullmatch('[a-zA-Z0-9_]{6,15}', user_name):
        abort(Response('用户名不合法！'))   #用户名不合法
    if not re.fullmatch('[a-zA-Z0-9]{6,15}', pass_wrod):
        abort(Response('密码不合法！'))  #密码不合法
    if not re.match(r"^1[356789]\d{9}$", phone):
        abort(Response('手机号不合法！'))  #手机号不合法
    if not random:
        abort(Response('验证码不能为空！'))  #验证码不能为空
    if random != session.get(phone):
        reg['err'] = 1
    if random == session.get(phone):
        reg['err'] = 0
        now_time = str(datetime.datetime.now())
        info = {
            'user_name':user_name,
            'password':pass_wrod,
            'phone':phone,
            'email':email,
            'reg_time':now_time[:19],
            'last_login_time':'',
            'priv':'1',
            'state':'1'
        }
        function.regist_info(info)                    #数据校验成功即写入数据库
    return jsonify(reg)


@app.route('/forget', methods=['get', 'post'])
def forget():
    if request.method == 'POST':
        reg = {}
        phone = request.form.get('phone')
        rand = request.form.get('random')
        if not re.match(r"^1[356789]\d{9}$", phone):
            abort(Response('手机号不合法！'))  # 手机号不合法
        if not rand:
            abort(Response('验证码不能为空！'))  # 验证码不能为空
        print(phone, rand, '手机号，验证码')
        if rand !=session[phone]:
            reg['err'] = 1
        if rand == session[phone]:
            reg['err'] = 0    #重置成功
            function.reset_password(phone, rand)
        return jsonify(reg)


@app.route('/regist_rand')
    #响应注册的验证码
def regist_rand():
    reg = {}
    phone = request.args.get('phone')
    if not re.match(r"^1[356789]\d{9}$", phone):
        reg['err'] = 1 #手机号不合法
    else:
        reponse_phone = function.check_phone_exits(phone)
        if reponse_phone == 0:
            taatic = function.rand()
            taatic = str(taatic)
            session[phone] = taatic
            print(phone, taatic, 'asdsa')
            reg['err'] = function.send(phone, taatic)
        else:
            reg['err'] = 2   #手机号已注册
    return jsonify(reg)

@app.route('/check_user_name')
def check_uname():
    uname = request.args.get('user_name')
    reg = {}
    reponse_user_name = function.check_user_exits(uname)
    if reponse_user_name == 0:
        reg['err'] = 0
    else:
        reg['err'] = 1
    return jsonify(reg)


@app.route('/home')
def home():
    login = session.get('uname')
    if login:
        messages = function.select_message()
        return render_template('home.html', user_name=login, messages=messages)
    else:
        rsp = redirect('/')

    return rsp

@app.route('/login_out')
def login_out():
    if session.get('uname'):
        session.pop('uname')
        rsp = redirect('/')
        return rsp

@app.route('/commit_message')
def commit_message():
    reg = {}
    # user_name = session.get('uname')
    user_name = request.args.get('user_name')
    content = request.args.get('content')
    uid = function.select_uid(user_name)
    # print(user_name, content, uid, '留言过来了')
    if uid == 1:
        reg['err'] = 1
    else:
        now_time = str(datetime.datetime.now())
        from_ip = request.remote_addr
        reg_sql = {'uid':uid, 'content':content, 'time':now_time[:19], 'cid':'0', 'from_ip':from_ip, 'state':'1'}
        response_message = function.set_message(reg_sql)
        if response_message == 1:
            reg['err'] = 1
        else:
            reg['err'] = 0

    return jsonify(reg)

@app.route('/person_commit_message')
def person_commit_message():
    reg = {}
    user_name = request.args.get('user_name')
    content = request.args.get('content')
    mid = request.args.get('mid')
    uid = function.select_uid(user_name)
    # print(user_name, content, mid, '留言过来了_2')
    if uid == 1:
        reg['err'] = 1
    else:
        now_time = str(datetime.datetime.now())
        from_ip = request.remote_addr
        reg_sql = {'uid':uid, 'content':content, 'time':now_time[:19], 'cid':int(mid), 'from_ip':from_ip, 'state':'1'}
        response_message = function.set_message(reg_sql)
        if response_message == 1:
            reg['err'] = 1
        else:
            reg['err'] = 0

    return jsonify(reg)


if __name__ == '__main__':
    app.run(port=80, debug=True)