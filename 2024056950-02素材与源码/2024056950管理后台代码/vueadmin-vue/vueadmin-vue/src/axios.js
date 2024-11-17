import axios from 'axios'
import router from "@/router";
import Element from 'element-ui'

// axios.defaults.baseURL = 'http://124.223.28.171:8888'
axios.defaults.baseURL = 'http://127.0.0.1:9999'

//设置axios请求数据格式
const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})
//axios请求前置拦截
request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem('token')
    return config
})
//axios请求后置拦截
request.interceptors.response.use(response => {
    console.log("response的数据->"+response.data.message)
    let res = response.data

    if(res.code === 200) {
        return response
    }else {
        Element.Message.error(res.message?res.message:'系统异常',{duration: 3000})
        return Promise.reject(response.data.message)
    }
},error => {
    console.log("请求后置错误信息",error)
    if(error.response.data) {
        error.message = error.response.data.message
    }

    if(error.response.status === 401) {
        router.push('/login')
    }
    Element.Message.error(error.message,{duration: 3000})
    return Promise.reject(error)
})

export default request
