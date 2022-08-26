
import httpService from '@/utils/axios'

// 测试模块
const url: string = ''

class TestService {

  // 测试登录接口
  login(data: object = {}) {
    return httpService({
      url: `/authentication/admin/login`,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: data
    })
  }
}

const testApi = new TestService()

export default testApi

