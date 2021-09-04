const {
    randomInt,
  } = require('crypto');
  
exports.getRamdomIntNumber =  function getRamdomIntNumber(min, max) {
  return randomInt(min, max);
}