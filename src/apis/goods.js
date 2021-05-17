import axios from '@/utils/utils'

export const api_goodsAddCate = params => axios.post('/goods/addcate', params)

export const api_goodsCateList = params => axios.get('/goods/catelist', { params })

export const api_goodsDelCate = params => axios.get('/goods/delcate', { params })

export const api_goodsEditCate = params => axios.post('/goods/editcate', params)

export const api_goodsList = params => axios.get('/goods/list', { params })

export const api_goodsCategories = params => axios.get('/goods/categories', { params })

export const api_goodsAdd = params => axios.post('/goods/add', params)

export const api_goodsDel = params => axios.get('/goods/del', { params })

export const api_goodsEdit = params => axios.post('/goods/edit', params)