function testPromise(a,b,callback){
	var prms=new Promise(function(resolve,reject){
		var c=a+b;
		resolve(c);
	})
	return prms;
}

var prmsOut=testPromise(20,30);
prmsOut.then(function(result){
    console.log(result)
}).catch(function(err){console.log(err)});