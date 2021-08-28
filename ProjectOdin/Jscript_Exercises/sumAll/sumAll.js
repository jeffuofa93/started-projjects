const sumAll = function(num1,num2) {
    if (num1>num2){
        let temp = num1;
        num1 = num2;
        num2 = temp;
    }
    if ((!Number.isInteger(num1)|| !Number.isInteger(num2))|| (num1<0 || num2<0) ){
        return "ERROR";

    }
    let retSum = 0;
    while(num1<=num2){
        retSum+=num1
        num1++;

    }
    return retSum

};
console.log(sumAll(10, "90"));
module.exports = sumAll;
