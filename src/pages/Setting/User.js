/**
 *PO收货页面
 */
import React, { Component } from "react";
import {
    FlatList,
    View,
    TextInput,
    Text,
    Alert,
    ScrollView,
    ToastAndroid,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from "react-native";
import ButtonPlus from "../../components/UI/ButtonPlus";
import request from "../../configs/http.config";

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            newPassword: ""
        };
        this.saveUser = this.saveUser.bind(this);
    }
    saveUser() {
        // let url = "/api/pickingOrder/returnToBin";
        // request(url,"")
        // .then(res => {

        // })
        Alert.alert("hello world")
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 30,
                        justifyContent: "center"
                    }}
                >
                    <ButtonPlus
                        source={require("../../resources/images/menu.png")}
                        onPress={() => {
                            this.props.navigation.openDrawer();
                        }}
                        style={{ height: 30, width: 30 }}
                    />
                    <Text
                        style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            fontSize: 20,
                            fontWeight: ("bold", "700"),
                            marginRight: 40,
                            marginLeft: 40
                        }}
                    >
                        个人设置
                    </Text>
                    <ButtonPlus
                        source={require("../../resources/images/home.png")}
                        onPress={() => {
                            this.props.navigation.navigate("Main");
                        }}
                        style={{ height: 30, width: 30 }}
                    />
                </View>
                <View
                    style={{
                        backgroundColor: "lightgray",
                        height: 2,
                        marginTop: 20
                    }}
                ></View>

                <ScrollView
                    style={{
                        backgroundColor: "rgba(171, 190, 215, 0.56)",
                        height: Dimensions.get("window").height,
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: 10
                        }}
                    >
                        <Text
                            style={{
                                width: Dimensions.get("window").width / 2 - 80,
                                textAlignVertical: "center",
                                fontSize: 20
                            }}
                        >
                            用户名
                        </Text>

                        <TextInput
                            style={{
                                width: Dimensions.get("window").width / 2 + 50,
                                textAlignVertical: "center",
                                textAlign: "center",
                                backgroundColor: "#FFF",
                                marginRight: 10,
                                borderRadius: 10
                            }}
                            placeholder="请输入用户名..."
                            value={this.state.username}
                            onChangeText={value => {
                                this.setState({
                                    username: value
                                });
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: 10
                        }}
                    >
                        <Text
                            style={{
                                width: Dimensions.get("window").width / 2 - 80,
                                textAlignVertical: "center",
                                fontSize: 20
                            }}
                        >
                            密码
                        </Text>

                        <TextInput
                            style={{
                                width: Dimensions.get("window").width / 2 + 50,
                                textAlignVertical: "center",
                                textAlign: "center",
                                backgroundColor: "#FFF",
                                marginRight: 10,
                                borderRadius: 10
                            }}
                            secureTextEntry={true}
                            placeholder="请输入密码..."
                            value={this.state.password}
                            onChangeText={value => {
                                this.setState({
                                    password: value
                                });
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: 10
                        }}
                    >
                        <Text
                            style={{
                                width: Dimensions.get("window").width / 2 - 80,
                                textAlignVertical: "center",
                                fontSize: 20
                            }}
                        >
                            确认密码
                        </Text>

                        <TextInput
                            style={{
                                width: Dimensions.get("window").width / 2 + 50,
                                textAlignVertical: "center",
                                textAlign: "center",
                                backgroundColor: "#FFF",
                                marginRight: 10,
                                borderRadius: 10
                            }}
                            placeholder="请输入密码..."
                            secureTextEntry={true}
                            value={this.state.newPassword}
                            onChangeText={value => {
                                this.setState({
                                    newPassword: value
                                });
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.saveUser}
                        style={{
                            marginTop: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            height: 40,
                            backgroundColor: "#27b5ee",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                            marginBottom: 20
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                color: "white",
                                textAlign: "center"
                            }}
                        >
                            确认修改
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}
