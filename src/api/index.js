import request from "@/utils/request";

// 创建账户
export const createUser = (data) => request({
  url: '/v1/account/createUser',
  method: 'post',
  data
})

// 查询账户信息
export const queryUserInfo = (data) => request({
  url: '/v1/account/queryUserInfo',
  method: 'post',
  data
})

// 更新账户
export const updateUser = (data) => request({
  url: '/v1/account/updateUser',
  method: 'post',
  data
})

// 查询活动信息
export const queryByIdActivity = (data) => request({
  url: '/v1/activity/queryByIdActivity',
  method: 'post',
  data
})

// 创建订单
export const createOrder = (data) => request({
  url: '/v1/order/createOrder',
  method: 'post',
  data
})

// 查询指定人员订单信息
export const queryOrderInfo = (data) => request({
  url: '/v1/order/queryOrderInfo',
  method: 'post',
  data
})

// 查询指定人员订单信息
export const queryOrderList = (data) => request({
  url: '/v1/order/queryOrderList',
  method: 'post',
  data
})

// 注册发送短信验证码
export const sendMsg = (data) => request({
  url: '/v1/account/sendMsg',
  method: 'get',
  params: data
})

// 查询用户活跃信息
export const queryUserActivityInfo = (data) => request({
  url: '/v1/activity/queryUserActivityInfo',
  method: 'post',
  data
})

// 查询用户邀请记录信息
export const queryUserInvitationRecords = (data) => request({
  url: '/v1/activity/queryUserInvitationRecords',
  method: 'post',
  data
})

// 查询用户订单记录信息（我的优惠）
export const queryUserOrderRecords = (data) => request({
  url: `/v1/activity/queryUserOrderRecords`,
  method: 'get',
  params: data
})

// 邀请页注册
export const verificationCodeRegistration = (data) => request({
  url: '/v1/account/verificationCodeRegistration',
  method: 'post',
  data
})

// 生成小程序码
export const generatescheme = (data) => request({
  url: `/v1/coupon/generatescheme`,
  method: 'post',
  data
})

// 用户领取活跃奖励（H5活跃奖励金）
export const receiveActiveRewards = (data) => request({
  url: `/v1/coupon/receiveActiveRewards`,
  method: 'post',
  data
})

// 用户领取邀请新人奖励（H5邀请奖励金）
export const receiveRecommendationReward = (data) => request({
  url: `/v1/coupon/receiveRecommendationReward`,
  method: 'post',
  data
})

// 查询用户代金券统计信息
export const queryUserVoucherStatistics = (data) => request({
  url: `/v1/coupon/queryUserVoucherStatistics`,
  method: 'post',
  data
})

// 用户主动领取代金券（每次领取一张）
export const receiveVoucherReward = (data) => request({
  url: `/v1/coupon/receiveVoucherReward`,
  method: 'post',
  data
})

/**
 * 通过AuthorizationCode获取AccessToken
 */
export const getOAuthServer = (params) => request({
  url: `/v1/oath/getAccessToken`,
  method: 'get',
  params
})

// 抽奖接口
export const lottery = (data) => request({
  url: `/v1/order/lottery`,
  method: 'post',
  data
})

