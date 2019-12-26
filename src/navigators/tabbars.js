import React, { Component } from "react";
import {
    createBottomTabNavigator,
    createAppContainer,
    StackNavigator
} from "react-navigation";
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
    TouchableOpacity,
    ToastAndroid
} from "react-native";
import Home from "../pages/home";
import Print from "../pages/print";
import Notice from "../pages/notice";
import Me from "../pages/me";
/**
 * 控件保持文档
 */
const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home
        },
        Print: {
            screen: Print
        },
        Notice: {
            screen: Notice
        },
        Me: {
            screen: Me
        }
    },
    {
        tabBarOptions: {
            activeTintColor: "#4BC1D2",
            inactiveTintColor: "#000",
            showIcon: true,
            showLabel: true,
            upperCaseLabel: false,
            pressColor: "#FFFFFF",
            pressOpacity: 0.8,
            style: {
                backgroundColor: "#FFF",
                paddingBottom: 1,
                borderTopWidth: 0.2,
                paddingTop: 1,
                borderTopColor: "#ccc"
            },
            labelStyle: {
                fontSize: 12
            },
            indicatorStyle: { height: 0 },
            tabBarPosition: "bottom",
            swipeEnabled: true,
            animationEnabled: false,
            lazy: true,
            backBehavior: "none"
        }
    }
);
// const TabNav = createAppContainer(TabNavigator);
// export default TabNav;
