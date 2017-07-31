var config = require('./config')
var express = require('express')
var path = require('path')
var fs = require('fs')
var bodyParser = require('body-parser')
var http = require('http')
var app = express()
var cors = require('cors')
var cluster = require('cluster')
var URL = require('url');
/****qiniu sdk***/
var qiniu = require("qiniu");
var uuid = require("uuid");
qiniu.conf.ACCESS_KEY = config.qn_access.ACCESS_KEY
qiniu.conf.SECRET_KEY = config.qn_access.SECRET_KEY


app.get('/uptoken', function (req, res) {
    let mac = new qiniu.auth.digest.Mac(qiniu.conf.ACCESS_KEY, qiniu.conf.SECRET_KEY);
    let qiniuOptions = {
        scope: options.bucket,
        deadline: 86400
    };
    let putPolicy = new qiniu.rs.PutPolicy(qiniuOptions);
    let token = putPolicy.uploadToken(mac);
    res.json({
        uptoken: token
    })
})

app.get('/now', function (req, res) {
    res.json(new Date());
})


const options = {
    bucket: 'eventdove',
    accessKey: qiniu.conf.ACCESS_KEY,
    secretKey: qiniu.conf.SECRET_KEY,
    originUrl: 'http://okxpbi18m.bkt.clouddn.com/',
    wechatUrl: 'mp.weixin.qq.com'
};
/**
 *
 * @param url    微信url
 * @param options  参数选项
 * @returns {Promise.<{content,imageArray}>}
 */
async function getWeChatArticleContent(url, options) {
    let content, reImageArry, successArry = [];
    const ERROR_STATUS = {
        INVALID_URL: '请输入正确的微信文章地址',
        TIMEOUT: '请求超时',
        RECOVER_FAILED: '恢复失败',
        MATCH_FAILED: '文章格式匹配失败',
        SERVER_ERROR: '转存服务错误'

    };
    try {
        //获得文章内容去除js脚本
        content = await getContent(url);
        //获得标签主体，旧sec地址
        let { srcArray, oldSrc } = getOriginImgArray(content);
        //上传获得新src组
        reImageArry = await uploadImgArray(srcArray, successArry);
        //替换旧的img标签主体及src地址
        replaceTags(oldSrc, srcArray, reImageArry);
        return { content, successArry };
    } catch (err) {
        if (successArry.length != 0) {
            let is_recover = await deleteBatchFiles(successArry);
            if (is_recover == true)
                throw { err, is_recover };
        }
        throw err;
    }


    function getContent(url) {
        let content;
        const myURL = URL.parse(url);
        const request_options = {
            hostname: myURL.host,
            port: 80,
            path: myURL.path,
            method: 'GET',
            headers: {
                'Content-Type': 'text/html'
            }
        }
        if (request_options.hostname != options.wechatUrl) {
            throw Error(ERROR_STATUS.INVALID_URL)
        }
        return new Promise((resolve, reject) => {
            let req = http.request(request_options, (res) => {
                if (res.statusMessage != 'OK' || res.statusCode != 200) {
                    reject(ERROR_STATUS.INVALID_URL);
                }
                let thunk;
                res.on('data', (data) => {
                    thunk += data;
                });
                res.on('end', () => {
                    let data = thunk;
                    let contentReg = new RegExp(/<div id="js_article"[\s\S]*>([\s\S]*)<\/div>/g);
                    try {
                        content = contentReg.exec(data)[0];
                        content = content.replace(/<script[\s\S]*>[\s\S]*<\/script>/g, "");
                    } catch (e) {
                        reject(ERROR_STATUS.MATCH_FAILED);
                    }
                    resolve(content);
                })
            });
            req.on('error', (err) => {
                reject(ERROR_STATUS.INVALID_URL);
            });
            req.end()
        })
    }

    function getOriginImgArray(content) {
        let imgReg = /<img[^<>]+>/gi;
        let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let arr = content.match(imgReg);
        let srcArray = [];
        let oldSrc = [];
        let index = -1;
        arr.map(img => {
            index++;
            //清除未匹配到src
            if (img.match(srcReg) == null) {
                return;
            }
            let src = new RegExp(srcReg).exec(img);
            //过滤空子串src
            if (src[1].trim() == "")
                return;
            //过滤非法和无需转存预期src
            if (URL.parse(src[1]).protocol == null)
                return;
            oldSrc.push(arr[index]);
            srcArray.push(src[1])
        })
        return { srcArray, oldSrc }
    }

    function uploadImgArray(originArry, successArry) {
        let pending =
            originArry.map(img => {
                return uploadImg(img, options, successArry)
            });
        let timeOut = new Promise((_, reject) => {
            setTimeout(reject, 5000, ERROR_STATUS.TIMEOUT);
        })
        let reImageArray = Promise.all(pending);
        return Promise.race([timeOut, reImageArray]);
    }

    /**
     *
     * @param oldSrc  原image标签主题
     * @param srcArray 旧src路径内容
     * @param reImageArry   上传新src地址
     */
    function replaceTags(reSrc, srcArray, reImageArry) {
        for (let i = 0; i < srcArray.length; i++) {
            content = content.replace(reSrc[i], `<img src="${srcArray[i]}">`);
            content = content.replace(srcArray[i], options.originUrl + reImageArry[i]);
        }
    }

    function uploadImg(origin, options, successArry) {
        const myURL = URL.parse(origin);
        const request_options = {
            hostname: myURL.host,
            port: 80,
            path: myURL.path,
            method: 'GET',
            headers: {
                'Content-Type': 'image/webp'
            }
        }

        return new Promise((resolve, reject) => {
            let req = http.request(request_options, (res) => {
                if (res.statusMessage != 'OK' || res.statusCode != 200) {
                    reject(ERROR_STATUS.INVALID_URL);
                }
                let accessKey = options.accessKey;
                let secretKey = options.secretKey;
                let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
                let qiniuOptions = {
                    scope: options.bucket
                };
                let putPolicy = new qiniu.rs.PutPolicy(qiniuOptions);
                let uploadToken = putPolicy.uploadToken(mac);
                let formUploader = new qiniu.form_up.FormUploader();
                let putExtra = new qiniu.form_up.PutExtra();
                formUploader.putStream(uploadToken, 'wx-' + uuid.v1(), res, putExtra, function (respErr, respBody, respInfo) {
                    if (respErr) {
                        reject(ERROR_STATUS.SERVER_ERROR)
                    }
                    if (respInfo.statusCode == 200) {
                        successArry.push(respBody.key);
                        return resolve(respBody.key);
                    } else {
                        reject(ERROR_STATUS.SERVER_ERROR)
                    }
                });
            });
            req.on('error', (err) => {
                reject(ERROR_STATUS.INVALID_URL)
            })
            req.end()
        })

    }
    //删除已经转图片
    function deleteBatchFiles(successArry) {
        return new Promise((resolve, reject) => {
            let deleteOperations = []
            let mac = new qiniu.auth.digest.Mac(options.accessKey, options.secretKey);
            let bucketManager = new qiniu.rs.BucketManager(mac);
            successArry.map((file) => {
                deleteOperations.push(qiniu.rs.deleteOp(options.bucket, file))
            })

            bucketManager.batch(deleteOperations, function (err, respBody, respInfo) {
                if (err) {
                    reject(ERROR_STATUS.SERVER_ERROR)
                } else {
                    // 200 is success, 298 is part success
                    if (parseInt(respInfo.statusCode / 100) == 2) {
                        respBody.forEach(function (item) {
                            if (item.code == 200) {
                            } else {
                                resolve(true)
                            }
                        });
                    } else {
                        reject(ERROR_STATUS.SERVER_ERROR)
                    }
                }
            });
        })
    }
}


/**开发环境测试接口***/
app.get('/tplList', function (req, res) {
    res.json([
        {
            id: 1,
            img: 'http://www.bagevent.com/resources/img/phone_weichat_in_img01.png'
        },
        {
            id: 2,
            img: 'http://www.bagevent.com/resources/img/phone_weichat_in_img02.png'
        },
        {
            id: 3,
            img: 'http://www.bagevent.com/resources/img/phone_weichat_in_img03.png'
        },
        {
            id: 4,
            img: 'http://www.bagevent.com/resources/img/phone_weichat_in_img04.png'
        }
    ]
    )
})
/**开发环境测试接口***/


/**转换微信图片***/
function convertWxImg(url, callback) {
    const myURL = URL.parse(url)
    const options = {
        hostname: myURL.host,
        port: 80,
        path: myURL.path,
        method: 'GET',
        headers: {
            'Content-Type': 'content-Type:image/webp; charset=utf-8'
        }
    }
    let dataArray = [];
    let contentType = ''
    let req = http.request(options, (res) => {
        // contentType = res.headers['content-type']
        res.on('data', (chunk) => {
            console.log('请求图片成功 +1')
            dataArray.push(chunk);
        });
        res.on('end', () => {

            callback('data:image/jpg;base64,' + Buffer.concat(dataArray).toString('base64'))
        });
    });

    req.on('error', (e) => {
        console.log(`请求遇到问题: ${e.message}`);
    })

    req.end()


}


/***导入微信文章接口 **/
app.get('/importAticleFromWX', async function (req, res) {

    /**采集微信主函数 返回content 已经上传文件名***/
    try {
        let { content, successArry } = await getWeChatArticleContent(req.query.url, options);
        res.json({ html: content })
    } catch (err) {
        let error = new Error(err);
        return res.json({ error: error.message.substr(6).trim() });
    }

})
/****qiniu sdk***/
app.use(express.static(path.join(__dirname, './src/assets')))
app.use(express.static(path.join(__dirname, './public')))
app.use(require('connect-history-api-fallback')({ disableDotRule: false }))

console.log(app.get('env'))
//生产环境
if (app.get('env') === 'production') {
    app.use(express.static(path.join(__dirname, './dist')))

    var indexHtml = fs.readFileSync(path.join(__dirname, '/dist/index.html'))
    //路由
    app.use(function (req, res, next) {
        if (req.url.indexOf('/static') === -1 && req.url.indexOf('/api') === -1) {
            res.setHeader('content-type', 'text-html')
            res.send(indexHtml)
        } else {
            next()
        }
    })
}



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

/***接收自定义表单 data **/
app.post('/formEditor', function (req, res) {
    console.log(typeof req.body.title)
    fs.writeFile('./public/js/formdata_test.json', JSON.stringify(req.body), function (err) {
        if (err) throw err
        console.log('It\'s saved!')
    })
    res.json({
        code: 0,
        data: req.body
    })
})
/***接收短信表单 data **/
app.post('/saveSenddetail', function (req, res) {
    console.log(typeof req.body.title)
    fs.writeFile('./public/js/senddetail.json', JSON.stringify(req.body), function (err) {
        if (err) throw err
        console.log('It\'s saved!')
    })
    res.json({
        code: 0,
        data: req.body
    })
})
/***接收我的订单表单 data **/
app.post('/myordertest', function (req, res) {
    fs.readFile('./public/js/aaa.json', function (err, data) {
        if (err) throw err
        res.json({
            code: 0,
            data: JSON.parse(data)
        })
    })
})



process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found')
//     err.status = 404
//     next(err)
// })

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500)
//         res.render('error', {
//             message: err.message,
//             error: err
//         })
//     })
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500)
//     res.render('error', {
//         message: err.message,
//         error: {}
//     })
// })

/********cluster***********/
if (cluster.isMaster && app.get('env') === 'production') {
    const numCPUs = require('os').cpus().length
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
} else {

    var server = app.listen(config.port, function () {
        var host = 'localhost'
        var port = server.address().port
        console.log('eventdove app listening at http://%s:%s', host, port)

    })

}
/********cluster***********/

module.exports = app
