import random
import json
import requests
from urllib import parse
from urllib import request




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


def regist_sql():
    '''
    注册信息写入数据库
    :return:
    '''
    pass
