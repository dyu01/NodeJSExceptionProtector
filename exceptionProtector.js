module.exports = (function () {

    var toSafeCallback = function(func){
        if (Object.prototype.toString.call(func) != "[object Function]"){
            console.log('Not A function!');
            return func;
        }

        return function (){
            var tempArgs = arguments;
            Object.keys(tempArgs).forEach(function(idx){
                //console.log(Object.prototype.toString.call(tempArgs[idx]));
                if (Object.prototype.toString.call(tempArgs[idx]) === "[object Function]"){
                    var tmpFunc = tempArgs[idx];
                    tempArgs[idx] = function(){
                        try {
                            tmpFunc.apply(this, arguments);
                        } catch (error) {
                            console.log("Critical Exception Captured!");
                            console.log(error.stack);
                        }
                    }
                }
            });

            func.apply(this, tempArgs);
        }
    };

    return {
        toSafeCallback:toSafeCallback,
    }
}());

