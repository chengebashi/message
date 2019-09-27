DROP TABLE mb_message;
DROP TABLE mb_user;


CREATE TABLE mb_user (
    uid int unsigned AUTO_INCREMENT, --用户ID
    uname varchar(20) NOT NULL UNIQUE,  --用户名
    upass char(32) NOT NULL,  -- md5加密
    phone char(11) NOT NULL,   --手机号
    email varchar(320),       --邮箱
    reg_time datetime NOT NULL,    --注册时间
    last_login_time datetime NOT NULL, --最后一次登录时间
    priv enum ('1', '2') NOT NULL DEFAULT '1',  -- 1表示为普通用户，2表示为后台管理员
    state enum ('0', '1', '2', '3') NOT NULL DEFAULT '1',  -- 0表示已删除，1表示正常，2表示冻结，3表示异常
    PRIMARY KEY (uid)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;

-- 内置管理员账户
INSERT INTO mb_user values (DEFAULT, 'root', md5('rootabc123'), '18512341234', 'dj@itmojun.com', now(), now(), 2, 1);


CREATE TABLE mb_message (
    mid int unsigned AUTO_INCREMENT,  --留言ID
    uid int unsigned,   -- 用户ID
    content varchar(200) NOT NULL,  --留言内容
    pub_time datetime NOT NULL,   --留言时间
    cid int unsigned,   --评论留言ID
    from_ip char(15) NOT NULL,   --来源IP
    state enum ('0', '1', '2') NOT NULL DEFAULT '1',  -- 0表示已删除，1表示未审核，2表示已审核
    PRIMARY KEY (mid),
    FOREIGN KEY (uid) REFERENCES mb_user (uid),
    FOREIGN KEY (cid) REFERENCES mb_message (mid)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;
