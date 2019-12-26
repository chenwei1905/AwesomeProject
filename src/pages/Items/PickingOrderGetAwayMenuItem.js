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

export default class PickingOrderGetAwayMenuItem extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(pickNo) {
        this.props.onClick(pickNo);
    }
    render() {
        const item = this.props.item;
        const urgent = item.urgent ? (
            <Image
                style={{
                    width: 30,
                    height: 30,
                    marginLeft: 5,
                    marginRight: 5
                }}
                source={require("../../resources/images/alert-fill.png")}
            />
        ) : (
            <Text></Text>
        );
        return (
            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: 'rgba(65,199,214,0.5)',
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
                <TouchableOpacity
                    onPress={() => {
                        this.onClick(item.id);
                    }}
                >
                    <View style={{ flexDirection: "row" , flexWrap:"wrap" , justifyContent:"space-between"}}>
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                                marginLeft: 5,
                                marginRight: 5
                            }}
                            source={require("../../resources/images/solution.png")}
                        />
                        <Text style={{ fontSize: 16, marginRight: 5 }}>
                            {" "}
                            {item.pickingOrderNo}
                        </Text>
                        
                        {urgent}
                    </View>
                    <View style={{ flexDirection: "row" , flexWrap:"wrap"}}>
                        <Text style={{ marginLeft: 40, fontSize: 16 }}>
                            {" "}
                            {item.deliveryDate}
                        </Text>
                        <Text style={{ marginLeft: 5, fontSize: 16 }}>
                            {" "}
                            {item.shift}
                        </Text>
                        <Text style={{ marginLeft: 5, fontSize: 16 }}>
                            {" "}
                            {item.deliveryArea}
                        </Text>
                        <Text style={{marginLeft: 5, fontSize: 16 }}>
                            工单数：
                            {item.completedWorkOrderCnt}/
                            {item.alldWorkOrderCnt}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
