import axios from '@/utils/utils'


export const api_login = params => axios.post('/users/checkLogin', params)

export const api_accountlist = params => axios.get('/users/list', { params })

export const api_accountRemove = params => axios.get('/users/del', { params })

export const api_accountAdd = params => axios.post('/users/add', params)

export const api_accountBatchDel = params => axios.get('/users/batchdel', { params })

export const api_accountCheckOldPwd = params => axios.get('/users/checkoldpwd', { params })

export const api_accountEditPwd = params => axios.post('/users/editpwd', params)

export const api_accountEdit = params => axios.post('/users/edit', params)

export const api_accountInfo = params => axios.get('/users/accountinfo', { params })

export const api_checkToken = params => axios.get('/users/checktoken', { params })

