const CryptoJS = require("crypto-js");

const encrypt=CryptoJS.AES.encrypt;
const decrypt=CryptoJS.AES.decrypt;
//设置cookie
var passKey = '4c05c54d952b11e691d76c0b843ea7f9';
const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encrypt(escape(cvalue), passKey) + "; " + expires;
};
//获取cookie
const getCookie = cname => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            var cnameValue = unescape(c.substring(name.length, c.length));
            return decrypt(cnameValue, passKey).toString(CryptoJS.enc.Utf8);
        }
    }
    return "";
}
//清除cookie  
const clearCookie = cname => {
    setCookie(cname, "", -1);
}

export { setCookie, clearCookie, getCookie }