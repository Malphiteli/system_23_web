import axios from 'axios'
/* import {
	Loading,
	Message
} from 'element-ui' */
import router from '../router/index.js'


const request = axios.create({
	baseURL: 'http://localhost:8080',
	timeout: 2000,
})


// 请求拦截
request.interceptors.request.use(
	(confing) => {
		//设置请求头
		if (localStorage.Authorization) { //判断本地缓存的token是否存在
			confing.headers.Authorization = localStorage.Authorization
		}

		return confing
	},
	(error) => { //token不存在，设置为网络报错
		return Promise.reject(error)
	}
)
//响应拦截
request.interceptors.response.use(
	(res) => { //响应处理
		console.log(res, 'wsssssss');
		if (res.status === 200) { //响应码200请求成功
			if (res.status == '200') { //接口请求成功
				return Promise.resolve(res.data)
			} else if (res.status == '10000' || res.status == '10001') {//token验证失败，根据自己实际的修改
				// Message.error(res.data.msg);
				// Message.error('请重新登录')
				//清除token
				localStorage.removeItem('Authorization')
				//跳转到登录页面
				router.push('/login')
			} else {
				// Message.error(res.data.msg);
			}
			return Promise.reject(res)
		} else {
			return Promise.reject(res)
		}
		// return res
	},
	(error) => {
		// Message.error('网络出错')
		// endLoading()

		// 获取状态码
		/*const {
			status
		} = error.response*/

		if (status === 401) {
			// Message.error('请重新登录')
			//清楚token
			localStorage.removeItem('Authorization')
			//跳转到登录页面
			router.push('/login')
		}
		return Promise.reject(error)
	}
)
export default request
