import request from '@/utils/request'

// 获取验证码图片
export const getCodeImg = () => {
  return request.get('/captchaImage')
}

// 登录
export const login = (username: any, password: any, code: any, uuid: any) => {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request.post('/login', data)
}
