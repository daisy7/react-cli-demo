const MD5 = require('md5.js')

const sign = (url, token) => {
    let timestamp = Date.parse(new Date());
    return new MD5().update(url + timestamp + token).digest('hex');
}

export default sign;