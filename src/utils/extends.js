Function.prototype.before = function(fn){
    let _this = this
    return function(){
    	let result = fn.apply(this,arguments)
    	return _this.apply(_this,arguments)
    }
}
/**eg..**/
// function submit(){
// 	console.log('submit ing')
// }

// mysubmit = submit.before(function(){
// 	  console.log(' i am run before submit')
// })

// mysubmit()


