/**
 * config
 */

var path = require('path');

var config = {
    // debug 为 true 时，用于本地调试
    debug: false,

    get mini_assets() {
        return !this.debug;
    }, // 是否启用静态文件的合并压缩，详见视图中的Loader
    name: '会鸽', // 社区名字
    description: '专业会议社区', // 社区的描述
    keywords: '',
    // 添加到 html head 中的信息
    site_headers: [
        '<meta name="author" content="EDP@TAOBAO" />'
    ],
    // cdn host，如 http://cnodejs.qiniudn.com
    site_static_host: '', // 静态文件存储域名
    // 社区的域名
    host: 'localhost',
    // 默认的Google tracker ID，自有站点请修改，申请地址：http://www.google.com/analytics/
    google_tracker_id: '',
    // 默认的cnzz tracker ID，自有站点请修改
    cnzz_tracker_id: '',

    // mongodb 配置
    // db: 'mongodb://123.56.230.118:27017/photocms',
    auth_cookie_name: 'manyingapp',
    // 程序运行的端口
    port: 8889,
    // admin 可删除话题，编辑标签，设某人为达人
    admins: {'yaojaa@vip.qq.com': true},
    avatar: 'http://7xrf0p.com1.z0.glb.clouddn.com/avatar.png', //默认头像地址
    baseImageURL: 'http://7xobdo.com1.z0.glb.clouddn.com/', //头像地址
    // github 登陆的配置
    GITHUB_OAUTH: {
        clientID: 'your GITHUB_CLIENT_ID',
        clientSecret: 'your GITHUB_CLIENT_SECRET',
        callbackURL: 'http://cnodejs.org/auth/github/callback'
    },
    // 是否允许直接注册（否则只能走 github 的方式）
    allow_sign_up: true,

    // oneapm 是个用来监控网站性能的服务

    // 7牛的access信息，用于文件上传
    qn_access: {
        'uploadURL': 'http://upload.qiniu.com',
        'ACCESS_KEY': 'o-JFl4T8wh525DaNX8zaPtZ6Cpc-EKpJBnUI0JpF',
        'SECRET_KEY': '_5ayhfvc2uRQ7MM_b5DBRxJ_k1qP4T__USz83ZNh',
        'Bucket_Name': 'eventdove',
        'Uptoken_Url': '/uptoken',
        'Domain': ''
    },








    // 极光推送
    jpush: {
        appKey: 'YourAccessKeyyyyyyyyyyyy',
        masterSecret: 'YourSecretKeyyyyyyyyyyyyy',
        isDebug: false,
    },




    weibo: {
        appid: '4167160283',
        secret: 'e554402f753bd32b1c165d65dcb8dc31',
        redirect_uri: 'http://www.fengimage.com/weibo/callback',
        scope: 'all',
        getUserInfoURL: 'https://api.weibo.com/2/users/show.json',
        accessTokenURL: 'https://api.weibo.com/oauth2/access_token',
        qrconnectURL: 'https://api.weibo.com/oauth2/authorize'
        },
    qq: {
        appid: '101294710',
        appkey: 'c732cfbb3813d9473c32522e6243b7eb',
        redirect_uri: 'http://www.fengimage.com/qq/callback',
        scope: 'get_user_info',
        getUserInfoURL: 'https://graph.qq.com/user/get_user_info',
        accessTokenURL: 'https://graph.qq.com/oauth2.0/token',
        authorizeURL: 'https://graph.qq.com/oauth2.0/authorize',
        getOpenIDURL: 'https://graph.qq.com/oauth2.0/me'
    },
    wx: {
        appid: 'wxfaca66b0a27a3ab2',
        secret: '6fc3ee057a59ee751ba5987e06925e68',
        redirect_uri: 'http://www.fengimage.com/wechat/callback',
        scope: 'snsapi_login',
        getUserInfoURL: 'https://api.weixin.qq.com/sns/userinfo',
        accessTokenURL: 'https://api.weixin.qq.com/sns/oauth2/access_token',
        qrconnectURL: 'https://open.weixin.qq.com/connect/qrconnect'
    },
    wxpay: {
        appid: 'wxf849f8f6fce31880',
        mch_id: '1320356201',
        api_secret: '1f13b03bb6e4445b3fe100a121cc4656',
        qrcode_url: 'weixin://wxpay/bizpayurl',
        unifiedorder_url: 'https://api.mch.weixin.qq.com/pay/unifiedorder'
    },
    alipay: {}
};

module.exports = config;
