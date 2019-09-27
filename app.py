from flask import Flask, jsonify, redirect, render_template, request, session
import os
import function

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
        print(user_name, pass_wrod, 11)
        if user_name == 'chenge':
            if pass_wrod == '123456':
                session['uname'] = user_name
                reg['err'] = 0       #验证成功
            else:
                reg['err'] = 1   #密码错误
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

    # if not (user_name and pass_wrod and email and phone and random):
        # abort(500)

    if phone and random and random == session.get(phone):
        reg['err'] = 0
        pass #数据校验成功即写入数据库
    else:
        reg['err'] = 1

    return jsonify(reg)


@app.route('/forget', methods=['get', 'post'])
def forget():
    if request.method == 'POST':
        reg = {}
        phone = request.form.get('phone')
        rand = request.form.get('random')
        print(phone, rand, 1112)
        if phone and rand and rand == session[phone]:
            reg['err'] = 0    #重置成功
            pass       #写入数据库跟新密码
        else:
            reg['err'] = 1   #发送失败
        return jsonify(reg)


@app.route('/regist_rand')
    #响应注册的验证码
def regist_rand():
    reg = {}
    phone = request.args.get('phone')
    taatic = function.rand()
    taatic = str(taatic)
    session[phone] = taatic
    print(phone, taatic, 'asdsa')
    reg['err'] = function.send(phone, taatic)
    return jsonify(reg)

@app.route('/check_user_name')
def check_uname():
    uname = request.args.get('user_name')
    reg = {}
    if uname == 'chenge':
        reg['err'] = 0
    else:
        reg['err'] = 1
    return jsonify(reg)

@app.route('/home')
def home():
    return render_template('home.html')




if __name__ == '__main__':
    app.run(port=80, debug=True)