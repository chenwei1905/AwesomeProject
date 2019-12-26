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
export default class PickingOrderSortingHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const item = this.props.item;
        const container = this.props.container;
        let urgent = null;
        if (item === null) {
            urgent = <View></View>;
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
                    style={Style.header}
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
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                            {" "}
                            {item.deliveryDate}
                        </Text>
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                            {" "}
                            {item.shift}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                            {" "}
                            容器:
                            {container}
                        </Text>
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                            {" "}
                            当前用途:拣料
                        </Text>
                    </View>
                </View>
            );
        }
    }
}
