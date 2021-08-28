var removeFromArray = function (arr) {
    let indexRem;
    let args = Array.from(arguments);
    for (i=1;i<arguments.length;i++){
        //console.log(arguments[i]);
        indexRem = arr.indexOf(arguments[i]);
        //console.log(indexRem);
        if (indexRem > -1) {
        arr.splice(indexRem,1);

        }
        //console.log(arr);
        //console.log(arr.length)
        //console.log("\n");
    }
    return arr
}
module.exports = removeFromArray;

console.log(removeFromArray([1,2,3,4],3));
