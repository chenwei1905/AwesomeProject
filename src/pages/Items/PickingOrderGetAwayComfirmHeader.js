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

export default class PickingOrderGetAwayComfirmHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;
        const binCode = this.props.binCode;
        let urgent = null;
        if (item === null) {
            urgent = <View></View>;
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
                        paddingBottom: 10,
                        marginBottom: 10
                    }}
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
                        paddingBottom: 10,
                        marginBottom: 10
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
                        <Text style={{ marginLeft: 40, fontSize: 16 }}>
                            {" "}
                            {item.shift}
                        </Text>
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                            {" "}
                            {item.deliveryDate}
                        </Text>
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>
                            {" "}
                            库位:{binCode}
                        </Text>
                    </View>
                </View>
            );
        }
    }
}
