import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:5000'

//获取年月日
export const getYYYYMMDD = (params, symbol) => {
    let obj = new Date(params)
    return obj.getFullYear() + symbol + padZero((obj.getMonth() + 1)) + symbol + padZero(obj.getDate())
}

//获取时分秒
export const getHHMMSS = (params, symbol) => {
    let obj = new Date(params)
    return padZero(obj.getHours()) + symbol + padZero((obj.getMinutes())) + symbol + padZero(obj.getSeconds())
}

//获取完整时间 格式    "2020-06-04 00:00:00",
export const getfulltime = (params) => {
    let obj = new Date(params)
    return obj.getFullYear() + '-' + padZero((obj.getMonth() + 1)) + '-' + padZero(obj.getDate()) + ' ' + padZero(obj.getHours()) + ':' + padZero((obj.getMinutes())) + ':' + padZero(obj.getSeconds())
}

//补零
export const padZero = (params) => {
    return params < 10 ? '0' + params : params
}

export default axios