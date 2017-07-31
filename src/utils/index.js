	import moment from 'moment'
	/***throttle**/
	export function throttle(fn, delay) {
	    var timeout_id,
	        last_exec = 0;

	    function wrapper() {
	        var that = this,
	            elapsed = +new Date - last_exec,
	            args = arguments;

	        function exec() {
	            last_exec = +new Date
	            fn.apply(that, args)
	        }

	        if (elapsed > delay) {
	            exec()
	        } else {
	            clearTimeout(timeout_id)
	            timeout_id = setTimeout(exec, delay)
	        }
	    }
	    return wrapper
	}
	var isload = false
	export function getUptoken() {
	    let uptoken = JSON.parse(window.sessionStorage.getItem('uptoken'));
	    if (uptoken && uptoken.uptoken && (uptoken.addTime > new Date().getTime() - 60 * 60 * 1000)) return uptoken.uptoken;
	    if (!isload) {
	        isload = true;
	        $.ajax({
	            url: '/uptoken',
	            async: false,
	            success: (res) => {
	                res.addTime = new Date().getTime();
	                window.sessionStorage.setItem('uptoken', JSON.stringify(res));
	                uptoken = res.uptoken
	            }
	        })
	    }
	    return uptoken;
	}
	/***debounce**/
	export function debounce(fn, delay) {
	    var timeout_id

	    function wrapper() {
	        var that = this,
	            args = arguments;

	        function exec() {
	            fn.apply(that, args)
	        }
	        if (timeout_id) {
	            clearTimeout(timeout_id);
	            timeout_id = null;
	        }
	        timeout_id = setTimeout(exec, delay)
	    }
	    return wrapper
	}
	export function loadImg(src, fn) {
	    try {
	        let img = new Image()
	        img.onload = fn;
	        img.onerror = fn;
	        img.src = src;
	    } catch (err) {
	        console.error(err)
	    }
	}
	/****异步加载JS***/
	/***loadJs('/url',{'data-id':93939},fn)***/
	export function loadJs(src, attr, cb) {
	    return new Promise(
	        (resolve, reject) => {
	            const script = document.createElement('script')
	            script.type = 'text/javascript'
	            if (typeof attr == 'function') {
	                cb = attr
	            } else {
	                for (let k in attr) {
	                    script.setAttribute(k, attr[k])
	                }
	            }
	        	let loaded = false;
	            Array.prototype.slice.call(document.getElementsByTagName('script'),0).forEach((el) => {
	            	if(el.src.indexOf(src)>-1) loaded = true;
	            	return false;
	            });
	            if(loaded){
	                cb && cb()
	                resolve()
	                return
	            }
	                // script.async = true
	                // script.defer = true
	            script.src = src
	            script.onload = function(success) {
	                cb && cb.call(script)
	                resolve(success)
	            }
	            script.onerror = error => reject(error)
	            document.head.appendChild(script)
	        }

	    )
	}


	/****过滤数据中的null***/
	/*传入obj 返回过滤null后的对象*/
	function isObject(o) {
	    return Object.prototype.toString.call(o).indexOf('Object') > -1
	}

	function isArray(o) {
	    return Object.prototype.toString.call(o).indexOf('Array') > -1
	}

	export function dataFilter(obj) {
	    if (isObject(obj) || isArray(obj)) {
	        var newObj = isObject(obj) ? {} : []
	        for (var name in obj) {
	            if (obj.hasOwnProperty(name)) {
	                if (obj[name] !== null && obj[name] !== undefined) {
	                    newObj[name] = obj[name]
	                }
	                if (isObject(obj[name]) || isArray(obj[name])) {
	                    newObj[name] = dataFilter(obj[name])
	                }
	            }
	        }
	        return newObj
	    }
	}

	/****转换时间***/

	/*传入obj 返回过滤null后的对象*/

	export function formatTime(obj, format) {
	    format = format ? format : 'YYYY-MM-DD HH:mm'
	    if (isObject(obj) || isArray(obj)) {
	        for (var name in obj) {
	            if (typeof obj[name] === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(obj[name])) {
	                obj[name] = moment(obj[name]).format(format)
	            }
	            if (isObject(obj[name]) || isArray(obj[name])) {
	                obj[name] = formatTime(obj[name], format)
	            }
	        }

	        return obj

	    }
	}


	/*获取URL里的参数*/
	export function getJsonFromUrl(hashBased) {
	    var query;
	    if (hashBased) {
	        // var pos = location.href.indexOf("?");
	        // if (pos == -1) return [];
	        // query = location.href.substr(pos + 1);
	        query = window.location.search.substring(1) || window.location.hash.substring(1);
	    } else {
	        query = location.search.substr(1);
	    }

	    if (query.indexOf('*****') > 0) {
	    	query = query.split('*****')[0];
	    }
	    var result = {};
	    query.split("&").forEach(function(part) {
	        if (!part) return;
	        part = part.split("+").join(" "); // replace every + with space, regexp-free version
	        var eq = part.indexOf("=");
	        var key = eq > -1 ? part.substr(0, eq) : part;
	        var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
	        var from = key.indexOf("[");
	        if (from == -1) result[decodeURIComponent(key)] = val;
	        else {
	            var to = key.indexOf("]", from);
	            var index = decodeURIComponent(key.substring(from + 1, to));
	            key = decodeURIComponent(key.substring(0, from));
	            if (!result[key]) result[key] = [];
	            if (!index) result[key].push(val);
	            else result[key][index] = val;
	        }
	    });
	    return result;
	}

	/**
	 * [过滤账号中间数字]
	 * @param  {[type]} val [需要过滤的账号]
	 * @param  {[type]} n   [中间保留的*位数]
	 * @param  {[type]} m   [前后需要保留的数字位数]
	 * @return {[type]}     [过滤完成的账号]
	 */
	export function filterAccount(val, n, m) {
	    let str = val.substring(0, m);
	    for (let i = 0; i < n; i++) {
	        str += '*';
	    }
	    str += val.slice(-m);
	    return str;
	}

	// 动画及图片懒加载
	export function pulseAnimate(el) {
	    $(el).transition({
	        animation: 'pulse',
	        duration: 800,
	        interval: 200
	    });
	}

	export function imgLazyload(el) {
	    $(el).visibility({
	        type: 'image',
	        transition: 'fade in',
	        duration: 1000
	    });
	}
