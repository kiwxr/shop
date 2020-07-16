import {request} from "./request";

export function register(username,password) {
  return request({
    url: '/user/register',
    method: 'POST',
    // params: {
    //   username,
    //   password
    // },
    headers:{'Content-type': 'application/json'},
    data: {
      "userID": username,
      password

    }
  })
}