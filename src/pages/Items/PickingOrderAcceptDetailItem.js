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



export default class PickingOrderAcceptDetailItem extends Component {
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
                    borderColor: "#000",
                    borderWidth: 1,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft:10
                }}
            >
                <View style={{ flexDirection: "row" , flexWrap:"wrap"}}>
                    <Text style={{ fontSize: 12, marginRight: 5 }}>
                        {" "}
                        物料描述:{item.matDesc}
                    </Text>
                </View>

                <View style={{ flexDirection: "row" ,flexWrap:"wrap" }}>
                    <Text>料号:{item.matNo}</Text>
                    <Text style={{
                            color: "orange",
                            marginRight: 5,
                            fontWeight: "bold",
                            paddingTop: 5,
                            fontSize:20,
                        }}>x{item.matQty}{item.unit}</Text>
                </View>
                <View style={{ flexDirection: "row",flexWrap:"wrap" }}>
                    <Text>工单:{item.woNo}</Text>
                    <Text>TO：{item.toNo} / {item.toItem}</Text>
                    {item.confirmed? <Text>确认</Text>:<Text>未确认</Text>}
                   
                </View>
            </View>
        );
    }
}
