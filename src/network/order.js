import {request} from "./request";

export function createOrder(userID,productID,total,address) {
  return request({
    url: '/buy',
    method: 'post',
    headers:{'Content-type': 'application/json'},
    data: {
      userID,
      productID,
      total,
      address
    }
  })
}

export function changOrder(userID,orderID,state,total) {
  return request({
    url: '/admin/stateChange',
    method: 'post',
    headers:{'Content-type': 'application/json'},
    data: {
      userID,
      orderID,
      state,
      total
    }
  })

}