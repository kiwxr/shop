import {request} from "./request";

export function merchantLogin(adminID, adminPW) {
  return request({
    url: 'admin/login',
    method: 'post',
    headers:{'Content-type': 'application/json'},
    data: {
      adminID,
      adminPW
    }
  })

}

export function merchantRegister(adminName,adminID,adminPW) {
  return request({
    url: 'admin/register',
    method: 'post',
    headers:{'Content-type': 'application/json'},
    data: {
      adminName,
      adminID,
      adminPW
    }
  })
}

export function upload(data) {
  console.log(data)
  return request({
    url: '/upload',
    method: 'post',
    headers:{'Content-type': 'multipart/form-data'},
    data: data
  })
}
//添加商品
export function addGood(goodMessage) {
  return request({
    url: 'admin/new',
    method: 'post',
    headers:{'Content-type': 'application/json'},
    data: {
      "adminID":goodMessage.adminID,
      "productName":goodMessage.productName,
      "productInfo":goodMessage.productInfo,
      "price":goodMessage.price
    }

  })
}
//删除商品
export  function deleteGood(adminID,productID) {
  return request({
    url: '/admin/deleteProduct',
    method: 'post',
    headers:{'Content-type': 'application/json'},
    data: {
      adminID,
      productID
    }
  })
}


export function merchantGetOrder() {

}
export function merchantGetGoods() {

}

