import {request} from "./request";

export function editUserMessage(edit) {
  return request({
    url:'/user/infoChange',
    method: 'post',
    headers:{'Content-type': 'application/json'},
    data: {
      "userID":edit.userID,
      "oldPassword": edit.oldPassword,
      "newPassword": edit.newPassword,
      "nickName": edit.nickName,
      "userInfo": edit.userInfo,
      "address": edit.address
    }

  })
}

export function addMoney(userID,money) {
  return request({
    url:'/recharge',
    method: 'post',
    headers:{'Content-type': 'application/json'},
    data: {
      userID,
      money
    }
  })
}

