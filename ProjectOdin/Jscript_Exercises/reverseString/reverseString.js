const reverseString = function(word) {
    let wordArr = word.split("");
    let revArr = wordArr.reverse();
    let retStrin = revArr.join("");
    return retStrin;

}

module.exports = reverseString
