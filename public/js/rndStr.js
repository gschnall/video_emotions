var random = {
  stringDate12: function(){
    var length = 12;
    var chars = '0123456789abcdefghipqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    // get current date for greater uniqueness
    var now = new Date();
    var da = String(now).split(" ");
    var date = da[1] + da[2] + da[3] + da[4];

    for(var i=length; i > 0; i--){
      result += chars[Math.round(Math.random() * (chars.length - 1))]
    }
    return result + date.replace(/:/g, "");
  }
}

module.exports = random

