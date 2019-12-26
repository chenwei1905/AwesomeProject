/**
 *PO收货页面
 */
import React, { Component } from "react";
import {
    FlatList,
    View,
    TextInput,
    Text,
    Alert,
    ScrollView,
    ToastAndroid,
    Button,
    StyleSheet
} from "react-native";
import ButtonPlus from "../../components/UI/ButtonPlus"

export default class About extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ScrollView>
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 30,
                        justifyContent: "center",
                       
                    }}
                >
                    <ButtonPlus
                        source={require("../../resources/images/menu.png")}
                        onPress={() => {
                            this.props.navigation.openDrawer();
                        }}
                        style={{ height: 30, width: 30, }}
                    />
                    <Text
                        style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            fontSize: 20,
                            fontWeight: ("bold", "700"),
                            marginRight:40,
                            marginLeft:40
                        }}
                    >
                        关于我们
                    </Text>
                    <ButtonPlus
                        source={require("../../resources/images/home.png")}
                        onPress={() => {
                            this.props.navigation.navigate("Main");
                        }}
                        style={{ height: 30, width: 30,  }}
                    />
                </View>
                <View
                    style={{
                        backgroundColor: "lightgray",
                        height: 2,
                        marginTop: 20
                    }}
                ></View>
            </ScrollView>
        );
    }
}
