var crypto = require("crypto");
function decrypt(value) {
  try {
    var mykey = crypto.createDecipher("aes-128-cbc", "bank@app");
    var mystr = mykey.update(value, "hex", "utf8");
    mystr += mykey.final("utf8");
    return mystr;
  } catch {
    return "";
  }
}

export default decrypt;
