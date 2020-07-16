import {request} from "./request";

export function getHomeGoods() {
  return request({
    url: '/home/data'
  })
}



