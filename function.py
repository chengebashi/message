import random
import json
from urllib import parse
from urllib import request
import pymysql
import hashlib

server = json.load(open("./myconf.json"))

def rand():
    '''
    生成6位随机数
    :return: 6位随机数
    '''
    a = random.randint(100000, 999999)
    return str(a)


def send(phone, verify_code):
    '''
    发送验证码
    :return:0代表发送成功 1代表手机号错误 2代表内部错误
    '''

    try:
        url = "http://v.juhe.cn/sms/send"
        params = {
            "mobile": phone,  # 接受短信的用户手机号码
            "tpl_id": "162901",  # 您申请的短信模板ID，根据实际情况修改
            "tpl_value": "#code#=%s" % verify_code,  # 您设置的模板变量，根据实际情况修改
            "key": "ab75e2e54bf3044898459cb209b195e4",  # 应用APPKEY(应用详细页查询)
        }
        params = parse.urlencode(params).encode()
        f = request.urlopen(url, params)
        content = f.read()
        res = json.loads(content)

        if res and res['error_code'] == 0:
            return 0
        else:
            return 1
    except:
        return 2


def check_user_exits(user_name):
    '''验证用户名是否存在
    :return 0表示存在，1表示不存在'''
    db = pymysql.connect(host=server.get('server_ip'), user=server.get('server_user'),password=server.get('server_password'), database=server.get('server_dbname'), charset='utf8')
    cur = db.cursor()
    cur.execute('select uname from mb_user where uname = "{}"'.format(user_name))
    rows = cur.fetchone()
    db.close()
    if rows:
        return 0
    else:
        return 1

def check_password_ture(user_name, password, last_time):
    '''
    验证密码是否正确
    :param user_name password:
    :return: 0正确，1错误
    '''
    db = pymysql.connect(host=server.get('server_ip'), user=server.get('server_user'),password=server.get('server_password'), database=server.get('server_dbname'), charset='utf8')
    cur = db.cursor()
    cur.execute('select upass from mb_user where uname = "{}"'.format(user_name))
    rows = cur.fetchone()
    if rows[0] == add_md5(password):
        cur.execute('update mb_user set last_login_time = "{}"'.format(last_time))
        db.commit()
        db.close()
        return 0
    else:
        cur.close()
        return 1


def regist_info(info):
    '''
    注册信息写入数据库
    :return:
    '''
    db = pymysql.connect(host=server.get('server_ip'), user=server.get('server_user'),password=server.get('server_password'), database=server.get('server_dbname'), charset='utf8')
    cur = db.cursor()
    cur.execute('insert into mb_user values (DEFAULT , "{}", "{}", "{}", "{}", "{}", "{}", "{}", "{}",)'.format(info.get('user_name'), info.get('password'), info.get('phone'), info.get('email'), info.get('reg_time'), info.get('last_login_time'), info.get('priv'), info.get('state')))
    db.commit()
    db.close()

def reset_password(phone, rand):
    '''
    重置密码
    :param phone:
    :return:
    '''
    db = pymysql.connect(host=server.get('server_ip'), user=server.get('server_user'),password=server.get('server_password'), database=server.get('server_dbname'), charset='utf8')
    cur = db.cursor()
    cur.execute('update mb_user set upass = "{}" where phone = "{}"'.format(add_md5(rand), phone))
    db.commit()
    db.close()

def check_phone_exits(phone):
    '''
    检验手机号是否已经注册
    :param phone:
    :return: 0未注册，1已注册
    '''
    db = pymysql.connect(host=server.get('server_ip'), user=server.get('server_user'),password=server.get('server_password'), database=server.get('server_dbname'), charset='utf8')
    cur = db.cursor()
    cur.exeute('select phone from mb_user where phone = "{}"'.format(phone))
    rows = cur.fetchone()
    db.close()
    if rows:
        return 1
    else:
        return 0
def select_uid(user_name):
    '''
    根据用户名查询Uid
    :param user_name:
    :return:1查询失败
    '''
    db = pymysql.connect(host=server.get('server_ip'), user=server.get('server_user'),password=server.get('server_password'), database=server.get('server_dbname'), charset='utf8')
    cur = db.cursor()
    cur.execute('select uid from mb_user where uname="{}"'.format(user_name))
    rows = cur.fetchone()
    print(rows, 'rows')
    db.close()
    if rows:
        return rows[0]
    else:
        return 1

def set_message(reg_sql):
    '''
    留言写入数据库
    :param reg_sql:
    :return:
    '''
    try:
        db = pymysql.connect(host=server.get('server_ip'), user=server.get('server_user'),password=server.get('server_password'), database=server.get('server_dbname'),charset='utf8')
        cur = db.cursor()
        cur.execute('insert into mb_message values (DEFAULT ,"{}", "{}", "{}", "{}", "{}", "{}")'.format(reg_sql.get('uid'),reg_sql.get('content'),reg_sql.get('time'),reg_sql.get('cid'),reg_sql.get('from_ip'),reg_sql.get('state')))
        db.commit()
        db.close()
        return 0
    except Exception as f:
        print(f)
        return 1

def select_message():
    '''查询出留言'''
    db = pymysql.connect(host=server.get('server_ip'), user=server.get('server_user'),password=server.get('server_password'), database=server.get('server_dbname'), charset='utf8')
    cur = db.cursor()
    db.ping(reconnect=True)   #如果断开即重连
    cur.execute('select pub_time, mb_user.uname, content, mb_message.cid, mb_user.uid, mb_message.mid from mb_message, mb_user WHERE mb_message.uid = mb_user.uid ORDER BY pub_time desc')
    rows = cur.fetchall()
    db.close()
    rowd = []
    for i in rows:
        i = list(i)
        rowd.append(i)
    return rowd

# select_message()

def add_md5(text):
    m = hashlib.md5()
    text = text.encode()
    m.update(text)
    return m.hexdigest()