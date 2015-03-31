# Hydrargyrum-Defaulter

Incredibly fast function defaulter.

`defaults(fn, __defaults)`

Return a new new function which will call fn, but which will provide a default value/vall to any values/functions passed ordinally into defaulter.

# Example - Single Parameter

Wrapper defaulted function will fill in arguments if they are not provided.

```
function identity(a){ return a }
// use the default value
defaults(identity)() // => undefined
defualts(identity,1)() // => 1
defaults(identity,function(){return 2})() // => 2
// has a real valuue
defaults(identity)(3) // => 3
defaults(identity,1)(3) // => 3
defaults(identity,function(){return 2})(3) // => 3
```

# Example - Deeper Parameters

When making wrapper defaulted function, an arbitrarily number of defaults can be provided.

```
function sum(a, b){ return a+b }
defaults(sum, 1, 1)() // => 2
defaults(sum, 1, 1)(2) // => 3
defaults(sum, 1, 1)(undefined, 3) // => 4
defaults(sum, function(){ return 2 }, 3)() // => 5
defaults(sum, 1)('ok') // => 'okundefined'
defaults(sum, undefined, 1)(5) // => 6
```

# Wrapping Varidacs

Please note that this wrapper function is not varidac safe. It reflects on the argument length of the function it's wrapping and the number of defaults passed to it to determine how many arguments the wrapper will faithfully handle.

As a workaround, invoke `defaults` with a `__defaults` of the desired maximum length.

```
var __defaults = new Array(65)
__defaults[0] = function sumList(){ var n= arguments[0]; for(var i= 1; i< arguments.length; ++i) n += arguments[i]; return n}
__defaults[2] = 42
defaults.apply(null, __defaults)(-4, undefined, 1, 1, 1, 1) // => 42
```

By passing a long array of undefineds in, the resultant wrapped function will pass through length-1 arguments (argument[0] is the fn itself).
