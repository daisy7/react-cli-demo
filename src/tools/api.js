import Server from './server'
import {getUrlConcat} from '../tools/commons'
import store from '@/store';
import sign from './url_sign'

class API extends Server{
    async test(data){
        try{
            let url="/test";
            let result = await this.axios('get', url+ getUrlConcat(data+"&sign="+sign(url,store.getState().userInfo.token)))
            if (result.status === 1 && (result instanceof Object)) {
              return result || []
            } else {
              let err = {
                tip: '请求失败',
                response: result,
              }
              throw err
            }
          } catch(err){
            throw err
          }
    }   

  /**
   *  用途：获取验证码
   *  @url http://cangdu.org:8001/v1/captchas
   *  返回status为1表示成功
   *  @method get
   *  @return {promise}
   */
  async getCaptchaCode() {
    try{
      let result = await this.axios('post', '/v1/captchas', {})
      if (result.status === 1 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '获取验证码失败',
          response: result,
        }
        throw err
      }
    } catch(err){
      throw err
    }
  }
    /**
   *  用途：账号密码登录
   *  @url http://cangdu.org:8001/v2/login
   *  @method post
   *  @return {promise}
   */
  async accountLogin (data) {
    try {
      let result = await this.axios('post', '/v2/login', data)
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '登录失败',
          response: result,
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

   /**
   * 获取用户消息
   * @param {*} get的拼接参数
   */
  async getUser (data) {
    try {
      let result = await this.axios('get', '/v1/user' + getUrlConcat(data) )
      if (result.status !== 0 && (result instanceof Object)) {
        return result || []
      } else {
        let err = {
          tip: '获取用户信息失败',
          response: result,
        }
        throw err
      }
    } catch (err) {
      throw err
    }
  }

   /**
   *  用途：上传图片
   *  @url https://elm.cangdu.org/v1/addimg/shop
   *  返回status为1表示成功
   *  @method post
   *  @return {promise}
   */
  async uploadImg(data){
    try{
      let result = await this.axios('post', '//elm.cangdu.org/v1/addimg/shop', data); 
      if(result && result.status === 1){
        return result;
      }else{
        let err = {
          tip: '上传图片失败',
          response: result,
          url: '//elm.cangdu.org/v1/addimg/shop',
        }
        throw err;
      }
    }catch(err){
      throw err;
    }
  }
}

export default new API()