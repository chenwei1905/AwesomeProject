import React, { Component } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    Image,
    Dimensions,
    ActivityIndicator
} from "react-native";

import request from "../configs/http.config";
import RadioGroup from "../components/UI/RadioGroup";
import service from "../configs/service.config";
import Local from "../configs/storage.config";


export default class Login extends Component {
    //定义构造函数
    constructor(props) {
        super(props); //获取参数+***********
        this.state = {
            username: "", //登陆名
            password: "", //登陆密码
            dataSource: null, //获取服务端的参数
            xxx: false, //第一个焦点确认，
            urlRequesting: false
        };
    }
    login1 = () => {
        
        let url = "/jwt/login";
        this.setState({
            urlRequesting: true
        });
        request(
            url,
            {
                username: this.state.username,
                password: this.state.password,
                rememberMe: 0
            },
            20000
        )
            .then(res => {
                console.log("********登陆验证************");
                console.log(res);
                if (res.state === "successfully") {
                    service.header.Authorization = res.message;
                    // 删除打印机缓存,暂时删除打印机缓存
                    if (Local.get({ key: "printer" }).data !== undefined) {
                        console.log("******打印机状态***********")
                        console.log(Local.get({ key: "printer" }).data);
                        Local.remove({ key: "printer" });
                    }
                    Local.set({
                        key: "user",
                        data: res
                    });
                    Local.set({
                        key: "worker",
                        data: this.state.username
                    });
                    console.log(
                        Local.get({
                            key: "user"
                        })
                    );
                    console.log(
                        Local.get({
                            key: "worker"
                        })
                    );  
                }               
            })
            .then (
                //版本信息校验
                (res1) => {   
                        console.log("********版本信息**********");
                        console.log(res1);           
                        let url = "/appController/getBarCode";
                        request(url, "")
                        .then(res=> {                                               
                            if (res.state === "successfully") {
                                let result = res.content.filter(item => item.versionNoTwo == service.Version.appName)
                                console.log(result);
                                if (result.length > 0) {
                                    if (result[0].name !== service.Version.version) {
                                        Alert.alert("请更新版本")
                                    }
                                } else {
                                    throw new Error("没有版本信息");
                                }
                            }
                        })
                        .catch(err => {
                            Alert.alert(err.message);
                        })
                }              
            )
           
            .then(
                () => {
                    let url = "/security/login/success";
                    request(url,"")
                    .then(res=> {
                        // console.log(res);
                        //service.permissions = res.content.roles;
                        let permissions = [];
                        res.content.roles.forEach(item=> {
                            permissions = permissions.concat(item.permissions);
                            // permissions = [permissions,...item.permissions];
                        });
                        service.permissions = permissions; 
                        // console.log(service.permissions);
                        this.props.navigation.navigate("Home");
                     
                    })
                    .catch(err => {
                        Alert.alert(err.message);
                    })
                    .done(() => {
                        this.setState({
                            urlRequesting: false
                        });
                    });

                }
                //写权限请求代码
            )
    
            .catch(err => {
                Alert.alert(err.message);
            })
            .done(() => {
                this.setState({
                    urlRequesting: false
                });
            });
    };
   
    onChoice = index => {
        {
            // 某一个item被选中时的事件监听，会返回当前选中的item的索引位置
            if (index === 0) {
                service.Host ="http://cntsn03158.ad001.siemens.net:8099";
                // service.Host ="http://10.36.244.105:8080";
                ToastAndroid.show("" + service.Host, ToastAndroid.SHORT);
            }
            if (index === 1) {
                // service.Host = "http://192.168.43.76:8080";
                service.Host = "http://10.36.244.100:8080";
                ToastAndroid.show("" + service.Host, ToastAndroid.SHORT);
            }
        }
    };
    //渲染之前需要进行的动作

    //导航栏样式设计
    render() {
        return (
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: "center"
                }}
            >
                {/*标题*/}

                <Text
                    style={{
                        textAlign: "center",
                        textAlignVertical: "center",
                        fontSize: 30,
                        paddingBottom: 20,
                        paddingTop: 40,
                        fontWeight: ("bold", "700")
                    }}
                >
                    物流执行系统
                </Text>

                <Image
                    style={{
                        marginLeft: 15,
                        width: Dimensions.get("window").width - 30,
                        height: 200,
                        borderRadius: 20
                    }}
                    source={require("../resources/images/login.png")}
                />

                <TextInput
                    onChangeText={
                        username => {
                            this.setState({ username: username });
                        } //绑定文本变化的回调函数
                    }
                    style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "lightgray",
                        width: Dimensions.get("window").width - 70,
                        marginLeft: 35,
                        height: 40,
                        marginTop: 20
                    }}
                    placeholder="登陆名"
                    numberOfLines={1}
                    autoFocus={true}
                    value={this.state.username}
                    onSubmitEditing={event => {
                        this.refs.LastName.focus();
                    }}
                    editable={!this.state.urlRequesting}
                />
                <TextInput
                    ref="LastName"
                    onChangeText={password =>
                        this.setState({ password: password })
                    } //绑定文本变化的回调函数
                    style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "lightgray",
                        width: Dimensions.get("window").width - 70,
                        marginLeft: 35,
                        height: 40,
                        marginTop: 20
                    }}
                    placeholder="密码"
                    numberOfLines={1}
                    secureTextEntry={true}
                    onSubmitEditing={this.login1} //回车事件
                    autoFocus={this.state.xxx}
                    editable={!this.state.urlRequesting}
                />
                <TouchableOpacity
                    onPress={this.login1}
                    disabled={this.state.urlRequesting}
                >
                    {this.state.urlRequesting ? (
                        <ActivityIndicator
                            style={styles.login_text}
                            size="large"
                            color="#00ff00"
                        />
                    ) : (
                        <Text style={styles.login_text}>登陆</Text>
                    )}
                </TouchableOpacity>

                <RadioGroup
                    style={{
                        marginLeft: 20,
                        marginTop: 0,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    oritation="row"
                    margin={15}
                    data={[
                        { text: "内库", selected: true },
                        { text: "外库", selected: false }
                        //{ text: "外库1", selected: false },
                    ]}
                    selectedImg={require("../resources/images/check-circle1.png")}
                    unSelectedImg={require("../resources/images/check-circle2.png")}
                    imgSize={40}
                    text="单位" // 文字
                    textSize={12}
                    drawablePadding={8}
                    itemChange={this.onChoice}
                />
                <View
                    style={{
                        backgroundColor: "lightgray",
                        height: 2,
                        marginTop: 20
                    }}
                ></View>
                <Text
                    style={{
                        textAlign: "center",
                        textAlignVertical: "center",
                        paddingBottom: 20,
                        paddingTop: 40
                    }}
                >
                    ©CopyRight 德曦数企咨询有限公司 版权所有
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    login_text: {
        fontSize: 20,
        color: "#FFF",
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "#27b5ee",
        width: Dimensions.get("window").width - 80,
        height: 40,
        borderRadius: 20,
        marginTop: 10,
        marginLeft: 40
    }
});
