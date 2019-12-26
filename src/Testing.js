import { Button, View, Alert } from "react-native";
import React, { Component } from "react";
import ToastExample from "./ToastExample"
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import { Checkbox, List, WhiteSpace } from '@ant-design/react-native';


export default class Testing extends Component {
    constructor(props) {
        super(props);
        this.onPressLearnMore = this.onPressLearnMore.bind(this);
    }
    onPressLearnMore() {
        // Alert.alert("Hello world")
        ToastExample.show("Awesomesss", ToastExample.SHORT);
    }

    render() {
        return (
            <View>
                <Button
                onPress={this.onPressLearnMore}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Icon name={'angle-right'} size={24} color={'#999'} />
            <IconFill name="account-book" />
            <IconOutline name="account-book" />
            <Checkbox>Checkbox</Checkbox>
            </View>
            
        );
    }
}
