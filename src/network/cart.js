import {request} from "./request";

export function addCart(userID,productID) {
  return request({
    url: '/cart/add',
    method: 'post',
    headers:{'Content-type': 'application/json'},
    data: {
      userID,
      productID
    }
  })

}

export function deleteCart(userID,productID) {
  return request({
    url: '/cart/delete',
    method: 'post',
    headers:{'Content-type': 'application/json'},
    data: {
      userID,
      productID
    }
  })
}

