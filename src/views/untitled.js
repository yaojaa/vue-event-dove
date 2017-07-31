
Function.prototype.before = function(fn) {
console.log(this.arguments)
   if(fn.call()){
   	   this.call()

   }
}

function mysubmit(r){
	console.log(r)
	 console.log('提交到服务')
}

mysubmit.call(null,'1').before(function(){
	console.log('i am before')
	return false
})

