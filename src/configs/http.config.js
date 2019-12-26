import { Alert } from "react-native";
import service from "../configs/service.config";

function fetch_request(url, params = "") {
    //设置请求头

    let promise = null;
    if (params == null || params == "") {
        promise = new Promise((resolve, reject) => {
            fetch(service.Host + url, {
                method: "GET",
                headers: service.header
            })
                .then(res => {
                    /**
                     * 返回判断状态码
                     */
                    if (res.status === 530) {
                        reject(new Error("系统异常,请联系管理员"));
                    }
                    if (res.status === 404) {
                        reject(new Error("404 not found"));
                    }
                    console.log("*****************res****************");
                    console.log(res);
                    return res; //不用reject处理的原因是因为还要接着往下面走
                })
                .then(response => {
                    return response.json();
                })
                .then(responseData => {
                    //请求返回数据处理,遇到错误就弹出来
                    console.log("***********responseData**********");
                    console.log(responseData);
                    if (responseData.state === "successfully") {
                        // var _this = this;
                        // console.log(
                        //     "***********测试login跳转*****************"
                        // );
                        // console.log(_this);
                        // props.navigation.navigate("PickingOrderBackUp").bind(this);
                        resolve(responseData);
                    } else if (responseData.state === "failed") {
                        if (
                            responseData.content.code === "101" ||
                            responseData.content.code === "102" ||
                            responseData.content.code === "103" ||
                            responseData.content.code === "104" ||
                            responseData.content.code === "105"
                        ) {
                            resolve(responseData);
                        } else {
                            reject(
                                new Error(responseData.content.defaultMessage)
                            );
                        }
                        this.props.navigation.navigate("Login");
                    } else if (responseData.state === "exception") {
                        reject(new Error(responseData.message));
                    } else {
                        reject(new Error(responseData.content.defaultMessage));
                    }
                })
                .catch(err => reject(err));
        });
    } else {
        promise = new Promise((resolve, reject) => {
            fetch(service.Host + url, {
                method: "POST",
                headers: service.header,
                body: JSON.stringify(params)
            })
                .then(res => {
                    if (res.status === 530) {
                        reject(new Error("系统异常,请联系管理员"));
                    }
                    if (res.status === 404) {
                        reject(new Error("404 not found"));
                    }
                    console.log("*****************res****************");
                    console.log(res);
                    return res;
                })
                .then(response => {
                    // console.log("***********response**********");
                    // console.log(response);
                    return response.json();
                })
                .then(responseData => {
                    console.log("***********responseData**********");
                    console.log(responseData);
                    if (responseData.state === "successfully") {
                        resolve(responseData);
                    } else if (responseData.state === "failed") {
                        if (
                            responseData.content.code === "101" ||
                            responseData.content.code === "102" ||
                            responseData.content.code === "103" ||
                            responseData.content.code === "104" ||
                            responseData.content.code === "105"
                        ) {
                            resolve(responseData);
                        } else {
                            reject(
                                new Error(responseData.content.defaultMessage)
                            );
                        }
                    } else if (responseData.state === "exception") {
                        reject(new Error(responseData.message));
                    } else {
                        reject(new Error(responseData.content.defaultMessage));
                    }
                })
                .catch(err => reject(err));
        });
    }
    return promise;
}

const request = (url, params = "", timeout = 4000000) => {
    let timeout_fn = null;
    let abort = null;
    let timeout_promise = new Promise(function(resolve, reject) {
        timeout_fn = function() {
            const err = new Error("请求超时");
            reject(err);
        };
    });
    let abort_promise = new Promise(function(resolve, reject) {
        abort = function() {
            const err = new Error("timeout");
            reject(err);
        };
    });

    let abortable_promise = Promise.race([
        //请求竞争
        fetch_request(url, params),
        timeout_promise
        //abort_promise
    ]);
    setTimeout(timeout_fn, timeout);
    //abortable_promise.abort = abort;
    return abortable_promise;
};

export default request;
