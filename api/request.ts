
interface RequestParams {
  url: string;
  method?: "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT";
  data?: { [k: string]: any }
}

// 定义接口返回值类型
interface UniRespone<T> extends UniApp.RequestSuccessCallbackResult {
  data: T
}

export const request = <T>({
  url,
  method = 'GET',
  data = {}
}: RequestParams): Promise<UniRespone<T>> => {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      data,
      success: (res) => {
        resolve(res as UniRespone<T>)
      },
      fail: (e) => {
        reject(e)
      }
    })
  })
}