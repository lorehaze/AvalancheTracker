const countFees = (array) => {
    let strArray = [];  //initialize string array
    for (var i = 0 in array) {
        strArray[i] = array[i].burnedFees;
    }
    let valArray = strArray.map(Number);
    let total = 0;
    for (var j in valArray) {
        total = total + valArray[j];
    }
    return total;

}

module.exports = {
    countFees
}