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

export default class PickingOrderAcceptMenuItem extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(pickNo) {
        this.props.onClick(pickNo);
    }
    render() {
        const item = this.props.item;
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
                        {item.woNo}
                    </Text>
                    <Text
                        style={{ marginTop: 5, fontSize: 18, marginRight: 5 }}
                    >
                        {" "}
                        容器数:{item.containerQty}
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            this.onClick(item.woNo);
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
            </View>
        );
    }
}
