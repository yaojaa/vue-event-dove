import { loadJs } from '../../utils'
const DEFAULT_IMG = {
    lockRotation: true,
    hasRotatingPoint: false,

}
const DEFAULT_TEXT = {

    editable: false,
    draggable: true,
    lockScalingX: true,
    lockScalingY: true,
    lockRotation: true,
    hasRotatingPoint: false,
    topped: true
}
function addEvent(fn){
	this.on('mouse:down',function(options){
		var element = options.target;
		if(element&&element.type==='i-text'){
			fn(true,element);
			return false;
		}
		fn(false);
	})
}
export default class Fabric {
    constructor(id,fn) {
        var this_ = this
        loadJs('http://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.7.17/fabric.min.js', () => {
            this_._canvas = new fabric.Canvas(id);
            addEvent.call(this_._canvas,fn);
            fn(this);
        });
    }
    setElement(option) {
        var this_ = this;

        function setObject(object) {
            if (option.index !== undefined&&option.index!==-1) {
                this_._canvas._objects.splice(option.index, 1,option.isShow?object:null);
            }
            if (option.isShow&&(option.index==-1||option.index == undefined)) {
                this_._canvas.add(object);
                option.index = this_._canvas._objects.length-1
            }

            this_._canvas.renderAll();
        }

        function loadImg(src) {
            return new Promise((resolve, reject) => {
                new fabric.Image.fromURL(src, function(img) {
                    var main = $.extend(true, {}, DEFAULT_IMG, option);
                    img.set(main);
                    setObject(img);
                    resolve();
                })
            })
        }
        if (option.src) {
            loadImg(option.src).then(() => {
                
            });
        }
        if (option.text) {
            var main = $.extend({}, DEFAULT_TEXT, option);
            var text = new fabric.IText('', main);

            setObject(text);
        }
        return this;
    }
}