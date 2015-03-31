function defaults(fn){
	var funcList= ['fn']
	  body= ['function defaulted(']
	  invokeList= [],
	  n= arguments.length - 1
	if(fn.length > n){
		n= fn.length
	}
	var next
	for(var i= 0; i < n;){
		next= i+1
		funcList.push('def'+i)
		body.push('arg', i, ',')

		var def= arguments[next]
		if(def !== undefined){
			var close = typeof def === 'function' ? '())' : ')'
			invokeList.push('(arg',i,' !== undefined ? arg',i,' : def',i,close, ',')
		}else{
			invokeList.push('arg',i,',')
		}
		i= next
	}
	body[body.length-1] = '){return fn('
	body = body.concat(invokeList) // statically optimizable into loop
	body[body.length-1] = ')}\ndefaulted.displayName = "defaulted'

	var fnName = fn.displayName || fn.name
	body.push(fnName.charAt(2).toUpperCase(), fnName.slice(1), '"\nreturn defaulted')

	funcList.push(body.join(''))
	var defaults = Function.apply(Function, funcList)
	return defaults.apply(null, arguments)
}

/*
// mere mortal edition:
function defaults(fn, def0, def1, def2){
	function defaulted(arg0, arg1, arg2){
		return fn(
			arg1 !== undefined ? arg1 : def0(),
			arg2 !== undefined ? arg2 : def1(),
			arg3 !== undefined ? arg3 : def2()
		)
	}
	defaulted.displayName = 'defaulted' + fn.name.charAt(0) + fn.name.slice(1)
	return defaulted
}
*/

module.exports = defaults
