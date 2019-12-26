
/**
 * 余料回库ITEM
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
import FinalRadioButton from "../../components/UI/FinalRadioButton";

export default class PickingOrderBackUpItem extends Component {
    constructor(props) {
        super(props);
    }
    // change(item,index) {
    //     this.props.change(item,index);
    // }
    render() {
        const item = this.props.item;
        // let matNo = fun.numberFilter(item.matNo);
        return (
            <View
                style={{
                    flexDirection: "column",
                    backgroundColor: "#FFF",
                    paddingTop: 10,
                    paddingBottom: 10
                }}
            >
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <Text
                        style={{
                            fontSize: 16,
                            marginRight: 5,
                            fontWeight: "bold",
                            marginLeft: 10
                        }}
                    >
                        {" "}
                        {item.matDesc}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <Text
                        style={{
                            fontSize: 16,
                            marginRight: 5,
                            paddingTop: 5,
                            marginLeft: 10
                        }}
                    >
                        料号:{item.matNo}
                    </Text>
                    <Text
                        style={{
                            color: "orange",
                            marginLeft: 20,                         
                            fontWeight: "bold",
                            paddingTop: 0,
                            fontSize: 20
                        }}
                    >
                        X 
                    </Text>
                    <Text
                        style={{
                            color: "orange",
                            marginLeft: 10,
                            fontWeight: "bold",
                            paddingTop: 0,
                            fontSize: 20
                        }}
                    >
                        {item.matQty}
                    </Text>
                    <Text
                        style={{
                            color: "orange",
                            marginLeft: 3,
                            fontWeight: "bold",
                            paddingTop: 0,
                            fontSize: 20
                        }}
                    >
                        {item.unit}
                    </Text>
                   
                   
                    {/* <FinalRadioButton
                        key = {item.key}
                        selected={item.selected}
                        disabled={item.disabled}
                        selectedImg={require("../../resources/images/check-circle1.png")}
                        unSelectedImg={require("../../resources/images/check-circle2.png")}
                        imgSize={30}
                        textSize={12}
                        text={""}
                        drawablePadding={0}
                        selectedChanged={() => {
                            this.change(item, item.key);
                        }}
                        style={{ marginLeft: 10 }}
                    /> */}
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text
                        style={{ fontSize: 16, marginRight: 5, marginLeft: 10 }}
                    >
                        工单:{item.woNo}
                    </Text>
                    <Text style={{ fontSize: 16, marginRight: 5 }}>
                        TO：{item.toNo} / {item.toItem}
                    </Text>
                </View>
            </View>
        );
    }
}
