import {request} from "./request";

export function login(username,password) {
  return request({
    url: '/user/login',
    method: 'post',
    headers:{'Content-type': 'application/json'},
    data: {
      "userID":username,
      password
    }
  })
}
//adminID
//adminPW
