var crypto = require("crypto");
var encrypt = (value) => {
  try {
    var mykey = crypto.createCipher("aes-128-cbc", "bank@app");
    var mystr = mykey.update(value, "utf8", "hex");
    mystr += mykey.final("hex");
    return mystr;
  } catch {
    return "";
  }
};
// 48d0cb66d332157922c6ca1c3c65defd
export default encrypt;
