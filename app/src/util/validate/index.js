export const validator = {
    /***
     * 算术
     * [正负号标识] 整数 [小数]
     * 
     * 喝了这么多奶茶，还时有点咸
     */

    'mathModelReg':function(rule, value, callback){
        const reg = /^(\+|\-)?([0-9]|[1-9]\d+)(\.\d+)?$/;
        if(value && reg.test(value)){
            callback()
        }else if(value && !reg.test(value)){
            callback(new Error('请输入数字'))
        }else{
            if(rule.required){
                callback(new Error('此项必填'))
            }else{
                callback()
            }
        }
    }
}