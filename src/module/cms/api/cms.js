import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

export const page_list = (page,size,params)=>{
  //将params中的 pageAliase和siteId取出
  let url = querystring.stringify(params);
  debugger
  return http.requestQuickGet(apiUrl + "/cms/page/list/" + page +"/" + size + '?' + url);
}

export const page_add = params =>{
  //采用post请求 调用服务端接口
  return http.requestPost(apiUrl + "/cms/page/add", params)
}

export const page_get = pageId =>{
  return http.requestQuickGet(apiUrl + "/cms/page/get/" + pageId )
}

export const page_edit = (pageId, params)=>{
  return http.requestPut(apiUrl+"/cms/page/edit/" + pageId, params);
}

export const page_del = (pageId)=>{
  return http.requestDelete(apiUrl+"/cms/page/del/" + pageId);
}

export const page_postPage= pageId => {
  return http.requestPost(apiUrl+'/cms/page/postPage/'+pageId)
}

