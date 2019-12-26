import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    AsyncStorage,
    Image,
    Dimensions
} from "react-native";
import Style from "../CSS/style"

export default class PickingOrderBackUpHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const item = this.props.item;
        const container = this.props.container;
        const srcBinCode = this.props.srcBinCode;
        let urgent = null;
        if (item === null) {
            urgent = <Text></Text>;
            return (
                <View
                    style={Style.header}
                ></View>
            );
        } else {
            urgent = item.urgent ? (
                <Image
                    style={{
                        width: 30,
                        height: 30,
                        marginLeft: 10,
                        marginRight: 10
                    }}
                    source={require("../../resources/images/alert-fill.png")}
                />
            ) : (
                <Text></Text>
            );
            return (
                <View
                    style={{
                        flexDirection: "column",
                        backgroundColor: "rgba(65,199,214,0.5)",
                        marginTop: 10,
                        marginRight: 10,
                        marginLeft: 10,
                        borderRadius: 10,
                        borderColor: "#000",
                        borderWidth: 1,
                        paddingTop: 10,
                        paddingBottom: 10
                    }}
                >
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                                marginLeft: 10,
                                marginRight: 10
                            }}
                            source={require("../../resources/images/solution.png")}
                        />
                        <Text style={{ fontSize: 16, marginRight: 10 }}>
                            {" "}
                            {item.pickingOrderNo}
                        </Text>

                        {urgent}
                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <Text style={{ marginLeft: 30, fontSize: 16 }}>
                            {" "}
                            {item.deliveryDate}
                        </Text>
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                            {" "}
                            {item.shift}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <Text style={{ marginLeft: 30, fontSize: 16 }}>
                            {" "}
                            容器:
                            {container}
                        </Text>
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                            {" "}
                            当前用途:回库
                        </Text>
                    </View>
                </View>
            );
        }
    }
}
