import React, { Component } from "react";
import {
    Image,
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    NativeModules
} from "react-native";

export default class Notice extends Component {
    constructor(props) {
        super(props);
        this.request = this.request.bind(this);
        this.request2 = this.request2.bind(this);
        this.request3 = this.request3.bind(this);
    }
    request = () => {
        console.log(NativeModules);
        console.log(NativeModules.PrintExtension);
        NativeModules.PrintExtension.print(
            "10.36.244.105",
            9999,
            "wbbbbb11eqwewqeeqeqweqq11"
        )
            .then(c => {
                console.log(c);
            })
            .catch(err => {
                console.log(err.PrintError);
            });
    };

    request2 = () => {
        console.log(NativeModules.PrintExtension);
        NativeModules.PrintExtension.printerReachable("10.36.244.107", 5000)
            .then(c => {
                console.log(c);
                if (c === "success") {
                    Alert.alert("success");
                } else {
                    Alert.alert(c);
                }
            })
            .catch(err => {
                Alert.alert(err.code);
            });
    };

    request3 = () => {
        NativeModules.PrintExtension.printCmdByIp(
            '^XA^FO100,75^BY3^B3N,N,100,Y,N^FD123ABC^XZ',
            "10.36.244.107",
            9100,
            5000
        )
            .then(c => {
                if (c === "success") {
                    Alert.alert("success");
                } else {
                    Alert.alert(c);
                }
            })
            .catch(err => {
                Alert.alert(err.code);
            });
    };

    render() {
        return (
            <View>
                <Button onPress={this.request} title="发送请求" />
                <Button onPress={this.request2} title="打印机连接测试" />
                <Button onPress={this.request3} title="打印机发送指令打印" />
            </View>
        );
    }
}
