//IP地址配置

const service = {
    Host: "http://cntsn03158.ad001.siemens.net:8099",
    // Host: "http://10.36.244.105:8080",
    header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "",
        Connection: "keep-alive"
    },
    permissions: [
        // {
        //     code: "permission_iqcer_view",
        //     des:"来料质检员查看权限",
        //     check: false
        // },
        // {
        //     code: "permission_goods_receiver_view",
        //     des:"收货人员查看权限",
        //     check: false
        // },
        // {
        //     code: "permission_pda_basic",
        //     des:"pda用户基础权限",
        //     check: false
        // },
        // {
        //     code: "permission_put_awayer_view",
        //     des:"上架人员员查看权限",
        //     check: false
        // },
        // {
        //     code: "permission_goods_issuer_view",
        //     des:"发料人员查看权限",
        //     check: false
        // },
    ],
    Version: {
        appName:"LES",
        version: "1.0.0.1"
        
    },
    backLogin: "",
};
export default service;
