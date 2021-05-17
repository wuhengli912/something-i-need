import axios from '@/utils/utils'

// export const api_goodsAddCate = params => axios.post('/goods/addcate', params)

export const api_orderList = params => axios.get('/order/list', { params })

export const api_orderDetail = params => axios.get('/order/detail', { params })

export const api_orderEdit = params => axios.post('/order/edit', params)