import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

export default class AlertMes extends Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }
    onPress(text) {
        this.props.onPress(text);
    }
    render() {
        const style = this.props.style;
        return (
            <TouchableOpacity onPress={this.onPress}>
                <Image
                    style={[style]}
                    source={require("../../resources/images/error.png")}
                />
            </TouchableOpacity>
        );
    }
}
