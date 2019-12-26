/**
 *PO收货页面
 */
import React, { Component } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    ToastAndroid,
    Dimensions,
} from "react-native";
import ButtonPlus from "../../components/UI/ButtonPlus";
import Local from "../../configs/storage.config";
import request from "../../configs/http.config";

import { List, Picker, Provider } from "@ant-design/react-native";

export default class Printer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            printers: [], //存储打印机列表
            printer: [], //存储打印机
            worker: "" //存储用户
        };
        this.savePrinter = this.savePrinter.bind(this);
        this.onPress = () => {
            console.log("hhh");
        };
        this.onChange = value => {
            this.setState({ printer: value });
        };
    }

    savePrinter() {
       
        console.log(this.state.printer);
        if (this.state.printer.length === 0) {
            Alert.alert("请先选择打印机!");
        } else {
            this.setState({
                printer: this.state.printer
            });
            Local.set({
                key: "printer",
                data: this.state.printer
            });
            // this.props.navigation.goBack(); 
            Alert.alert("打印机设置成功");
        }
       
        
    }
    componentDidMount() {
        let url = "/api/printer/allPrinter";
        request(url, "").then(res => {
            if (res.state === "successfully") {
                let row = []
                res.content.forEach(item =>
                    row.push({
                        value: item,
                        label: item
                    })
                );
                this.setState({
                    printers: row
                });
            } 
        });
    }

    render() {
       
        const workerName = Local.get({ key: "worker" }).data;
        return (
            <Provider>
            <View style={{ flex: 1 }}>
                {/*表头设置*/}
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
                        打印机绑定
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
                {/** 基本功能设置 */}
                <ScrollView
                    style={{
                        backgroundColor: "rgba(171, 190, 215, 0.56)",
                        height: Dimensions.get("window").height,
                        flex: 1
                    }}
                >
                    <Text style={{ textAlign: "center", fontSize: 20 }}>
                        工号: {workerName}
                    </Text>
                    <Text style={{ textAlign: "center", fontSize: 20 }}>
                        姓名:{workerName}
                    </Text>
                  
                    <View>
                        <List>
                            <Picker
                                data={this.state.printers}
                                cols={1}
                                value={this.state.printer}
                                onChange={this.onChange}
                            >
                                <List.Item onPress={this.onPress}>
                                    请先选择打印机
                                </List.Item>
                            </Picker>
                        </List>
                    </View>
                    <View>
                        <List>
                            <Picker
                                data={data}
                                cols={2}
                                value={this.state.printer}
                                onChange={this.onChange}
                            >
                                <List.Item onPress={this.onPress}>
                                    请先选择打印机2
                                </List.Item>
                            </Picker>
                        </List>
                    </View>
                    <TouchableOpacity
                        onPress={this.savePrinter}
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
                            保存
                        </Text>
                    </TouchableOpacity>

                    <Text>{this.state.printer}</Text>
                </ScrollView>
            </View>
            </Provider>
        );
    }
}

const data = [
    {label:"北京市", value:"11", children: [{label:"东城区", value:"110101"}, {label:"西城区", value:"110102"}]},
    {label:"天津市", value:"12", children: [{label:"哈哈区", value:"110103"}, {label:"嘻嘻区", value:"110104"}]}
]
