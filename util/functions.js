var crypto = require('crypto');

global.decrypt=function(value)
{
var mykey = crypto.createDecipher('aes-128-cbc', 'bank@app');
var mystr = mykey.update(value, 'hex', 'utf8')
mystr += mykey.final('utf8');
return mystr;
}

global.encrypt=function(value){
var mykey = crypto.createCipher('aes-128-cbc', 'bank@app');
var mystr = mykey.update(value, 'utf8', 'hex')
mystr += mykey.final('hex');
return mystr;
}