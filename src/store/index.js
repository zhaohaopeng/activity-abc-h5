import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    onActionTips: true,
    // token: "M6eJJ0RqaboZ13gKZKDEEA==",
    // openid: "78b327a53b3fbdbc60fd69788f2ddc8f172d5faca7d444d4a8b97a1e77c6e8",
    // RegBranch: "161291",
    // custId: "1641536982711758",
    // uid: "73",
    token: null,
    openid: null,
    RegBranch: null,
    custId: null,
    uid: null,
  },
  getters: {
    getOpenid(state) {
      return state.openid;
    },
  },
  mutations: {
    setUid(state, val) {
      state.uid = val;
    },
    setToken(state, val) {
      state.token = val;
    },
    setOnActionTips(state, val) {
      state.onActionTips = val;
    },
    setopenid(state, openid) {
      state.openid = openid;
    },
    setRegBranch(state, RegBranch) {
      state.RegBranch = RegBranch;
    },
    setCustID(state, CustID) {
      state.custId = CustID;
    }
  },
  actions: {},
  modules: {}
})