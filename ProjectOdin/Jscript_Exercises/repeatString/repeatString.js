const repeatString = function(str,num) {
    if (num<0){
        return "ERROR"
    }
    let retString="";
    for (i=0; i<num; i++){
        retString+=str;

    }
    return retString

}

module.exports = repeatString
