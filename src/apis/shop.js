import axios from '@/utils/utils'


export const api_shopInfo = params => axios.get('/shop/info', { params })

export const api_shopUpload = params => axios.post('/shop/upload', params)

export const api_shopEdit = params => axios.post('/shop/edit', params)