import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

export default class ButtonPlus extends Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }
    onPress() {
        this.props.onPress();
    }
    render() {
        const style = this.props.style;
        const source = this.props.source
        return (
            <TouchableOpacity onPress={this.onPress}>
                <Image
                    style={[style]}
                    source={source}
                />
            </TouchableOpacity>
        );
    }
}
