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
import Style from "../CSS/style";

export default class PickingOrderGetAwayTaskHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const item = this.props.item;
        const group = this.props.group;
        let urgent = null;
        if (item === null) {
            urgent = <View></View>;
            return <View style={Style.header}></View>;
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
                <View style={Style.header}>
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
                        <Text style={{ marginLeft: 60, fontSize: 16 }}>
                            {" "}
                            {item.deliveryDate}
                        </Text>
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                            {" "}
                            {item.shift}
                        </Text>
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                            {" "}
                            {item.deliveryArea}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            flexWrap: "wrap"
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>
                            工单数：
                            {item.completedWorkOrderCnt}/{item.alldWorkOrderCnt}
                        </Text>
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 18,
                                textAlign: "center"
                            }}
                        >
                            拣料区组:
                            {group}
                        </Text>
                    </View>
                </View>
            );
        }
    }
}
