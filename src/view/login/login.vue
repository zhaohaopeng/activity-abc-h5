<script>
import store from "../../store";
import { useRouter } from "vue-router";
import { getQueryVariable } from "@/utils/index";
import { getOAuthServer } from "@/api";
import { Notify } from "vant";
export default {
  setup() {
    async function init() {
      const openid = store.state.openid;
      const router = useRouter();
      if (openid) {
        router.push({
          name: "Home",
        });
      } else {
        const code = getQueryVariable("code");
        const state = getQueryVariable("state");
        if (!code && !state) {
          const urlStr =
            'https://www.abchina.com/luascript/oauthLogin/{"closeCurrentH5":"YES","client_id":"cc94d423-9a3a-451e-b9fb-66f5a7e96f65","redirect_uri":"https://m.szduopin.com/ccq","state":"123456","scope":"openid,custinfo,mreginfo","response_type":"code"}';
          window.top.location.href = urlStr;
        } else {
          try {
            const { StatusMsg, OpenID, RegBranch, CustID } =
              await getOAuthServer({
                code,
              });
            if (StatusMsg == "success") {
              store.commit("setopenid", OpenID);
              store.commit("setRegBranch", RegBranch);
              store.commit("setCustID", CustID);
              router.push({
                name: "Home",
              });
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
    }
    init();
  },
};
</script>