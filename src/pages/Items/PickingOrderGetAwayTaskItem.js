/**
 * 拣料任务
 */

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

export default class PickingOrderGetAwayTaskItem extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(pickNo) {
        this.props.onClick(pickNo);
    }
    render() {
        // let matNo = fun.numberFilter(item.matNo);
        const item = this.props.item;
        // let matNo = fun.numberFilter(item.matNo);
        return (
            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: "#FFF",
                    marginTop: 10,
                    marginRight: 10,
                    marginLeft: 10,
                    borderRadius: 10,
                    borderColor: "#000",
                    borderWidth: 1,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginBottom: 10,
                    justifyContent: "space-between"
                }}
            >
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <Text
                        style={{ marginTop: 5, fontSize: 18, marginRight: 5 }}
                    >
                        {" "}
                        {item.binCode}
                    </Text>
                    <Text
                        style={{ marginTop: 5, fontSize: 18, marginRight: 5 }}
                    >
                        {" "}
                        {item.taskCnt}个任务
                    </Text>
                    <Text
                        style={{ marginTop: 5, fontSize: 18, marginRight: 5 }}
                    >
                        {" "}
                        物料: {item.matQty}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        this.onClick(item.binCode);
                    }}
                >
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            marginLeft: 5,
                            marginRight: 5
                        }}
                        source={require("../../resources/images/right.png")}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
