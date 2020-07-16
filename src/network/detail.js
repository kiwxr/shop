import {request} from "./request";

export function getDetail(productID) {
  return request({
    url: 'product/detail',
    method: 'post',
    headers:{'Content-type': 'application/json'},
    data: {
      productID
    }
  })

}