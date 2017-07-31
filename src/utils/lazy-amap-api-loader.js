//异步加载高德地图  lazy-amap-api-loader.js
import { loadJs } from './index.js'
const DEFAULT_AMP_CONFIG = {
    key: 'f5e941923249570074270a3f5c26d2b9',
    v: 1.3,
    protocol: 'http',
    hostAndPath: 'webapi.amap.com/maps',
    plugin: [],
    callback: 'amapInitComponent'
}

export default class AMapAPILoader {

    /**
     * @param config required 初始化参数
     */
    constructor(config) {
        this._config = Object.assign({}, DEFAULT_AMP_CONFIG, config);
        this._document = document;
        this._window = window;
        this._queueEvents = [];
        this._dragPicker = null;
    }

    load() {

        return new Promise((resolve, reject) => {
            loadJs(this._getScriptSrc(), function() {
                let timer = setInterval(() => {
                    !!AMap && AMap.Map ? resolve() && clearInterval(timer) : ''
                }, 100)
            })
        })
    }
    addMarker(map, n) {
        var marker = new AMap.Marker({
            map: map,
            position: map.getCenter()
        });
        var infoWindow = new AMap.InfoWindow({
            content: n,
            offset: {
                x: 0,
                y: -30
            }
        });
        marker.on("mouseover", function(e) {
            infoWindow.open(map, marker.getPosition());
        });
    }
    dragMap(map, fn) {
        if (!this._dragPicker) {
            loadJs('http://webapi.amap.com/ui/1.0/main.js', () => {
                AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {

                    this._dragPicker = new PositionPicker({
                        mode: 'dragMarker',
                        map: map,
                        iconStyle: { //自定义外观
                            url: '/images/position-picker3.png',
                            ancher: [24, 40],
                            size: [48, 48]
                        }
                    });
                    this._dragPicker.on('success', function(positionResult) {
                        fn(positionResult)
                    });
                    this._dragPicker.on('fail', function(positionResult) {
                    });
                    this._dragPicker.start();
                })
            }).catch((err) => {
                console.error('地图ui组件加载失败')
            })
        } else {
            this._dragPicker.stop();
            this._dragPicker.start();
        }
    }
    _getScriptSrc() {
        return this._config.protocol + '://' + this._config.hostAndPath + '?v=' + this._config.v + '&key=' + this._config.key
    }
}
