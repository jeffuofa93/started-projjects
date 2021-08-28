const ftoc = function(tempF) {
  // F-32 .. * 5/9
  let conversion = (tempF-32)* (5/9);
  conversion = conversion.toFixed(1);
  return Number(conversion);

}

const ctof = function(tempC) {
  let conversion = tempC * (9/5) + 32;
  conversion = conversion.toFixed(1);
  return Number(conversion);

  

}

module.exports = {
  ftoc,
  ctof
}
