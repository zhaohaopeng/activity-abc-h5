import {
  createRouter,
  createWebHistory
} from 'vue-router'

import {
  isAbc
} from '@/utils'


import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({
  showSpinner: false
})

import store from "../store";

import {
  getQueryVariable
} from "@/utils/index";
import {
  getOAuthServer
} from "@/api";
import {
  Notify
} from "vant";

const routes = [
  // {
  //   path: '/',
  //   name: 'login',
  //   component: () => import('@/view/login/login'),
  //   meta: {
  //     title: '深圳_出行有礼_乘车码权益授权页'
  //   }
  // },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/view/home/home'),
    meta: {
      title: '深圳_出行有礼_乘车码权益'
    }
  },
  {
    path: '/acceptinvitation',
    name: 'Acceptinvitation',
    component: () => import('@/view/acceptinvitation/acceptinvitation'),
    meta: {
      title: '低碳出行领好礼'
    }
  },
  {
    path: '/otherProblem',
    name: 'OtherProblem',
    component: () => import('@/view/otherProblem/otherProblem'),
    meta: {
      title: '深圳_出行有礼_乘车码其它问题'
    }
  },
  {
    path: '/callApp',
    name: 'CallApp',
    component: () => import('@/view/callApp/callApp'),
    meta: {
      title: '低碳出行领好礼'
    }
  },
  {
    path: '/ride',
    name: 'Ride',
    component: () => import('@/view/ride/ride'),
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('@/view/error/error'),
    meta: {
      title: '非法访问'
    }
  },
]

const router = createRouter({
  scrollBehavior: () => ({
    y: 0
  }),
  history: createWebHistory('/ccq/'),
  routes,
})

const flag = false;

router.beforeEach(async (to, from, next) => {

  NProgress.start();
  const {
    title
  } = to.meta;
  if (title) {
    document.title = title;
  }

  if (to.path == '/acceptinvitation' || to.path == '/callApp' || to.path == '/error') {
    next();
  } else {
    if (isAbc() || flag) {
      const openid = store.state.openid;
      if (openid) {
        if (to.meta.title) {
          sensors.quick("autoTrackSinglePage", {
            "$title": to.meta.title
          });
        } else {
          sensors.quick("autoTrackSinglePage"); //当页面未自定义title时默认采用document.title
        }
        next();
      } else {
        const code = getQueryVariable("code");
        const state = getQueryVariable("state");
        if (!code && !state) {
          const urlStr =
            'https://www.abchina.com/luascript/oauthLogin/{"closeCurrentH5":"YES","client_id":"cc94d423-9a3a-451e-b9fb-66f5a7e96f65","redirect_uri":"https://m.szduopin.com/ccq","state":"123456","scope":"openid,custinfo,mreginfo","response_type":"code"}';
          window.top.location.href = urlStr;
        } else {
          try {
            const {
              StatusMsg,
              OpenID,
              RegBranch,
              CustID,
              role,
              uid
            } = await getOAuthServer({
              code,
            });
            if (StatusMsg == "success") {
              store.commit("setopenid", OpenID);
              store.commit("setRegBranch", RegBranch);
              store.commit("setCustID", CustID);
              store.commit("setToken", role);
              store.commit("setUid", uid);
              if (to.meta.title) {
                sensors.quick("autoTrackSinglePage", {
                  "$title": to.meta.title
                });
              } else {
                sensors.quick("autoTrackSinglePage"); //当页面未自定义title时默认采用document.title
              }
              next();
            } else {
              Notify({
                type: "warning",
                message: "获取opneid错误",
              });
            }
          } catch (err) {
            Notify({
              type: "warning",
              message: `${err} ---code=${code} --- ${state} `,
            });
          }
        }
      }
    } else {
      next({
        name: 'Error'
      });
    }
  }

})

router.afterEach(() => {
  NProgress.done()
})

export default router;