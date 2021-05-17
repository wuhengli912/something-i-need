import axios from '@/utils/utils'


export const api_indexEcharts = () => axios.get('/order/totaldata')
export const api_orderEcharts = params => axios.get('/order/ordertotal', { params })