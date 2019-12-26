/**
 * 设置请求头
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
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.onPress = this.onPress.bind(this);
        this.onSubmitEditing = this.onSubmitEditing.bind(this);
        this.state = {
            editable: !props.urlRequesting,
            disabled: props.urlRequesting
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.urlRequesting !== nextProps.urlRequesting) {
            this.setState({
                editable: !nextProps.urlRequesting,
                disabled: nextProps.urlRequesting
            });
        }
    }
    handleFilterTextChange(text) {
        this.props.onFilterTextChange(text);
    }
    onPress() {
        this.setState({
            editable: !this.state.editable,
            disabled: !this.state.disabled
        });
        this.props.onPress();
    }
    onSubmitEditing() {
        this.setState({
            editable: !this.state.editable,
            disabled: !this.state.disabled
        });
        this.props.onSubmitEditing();
    }
    render() {
        const filterText = this.props.filterText;
        const placeholder = this.props.placeholder;
        const autoFocus = this.props.autoFocus;
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <Image
                        style={styles.icon}
                        source={require("../../resources/images/monitor.png")}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder={placeholder}
                        value={filterText}
                        onChangeText={this.handleFilterTextChange}
                        clearButtonMode="always"
                        onSubmitEditing={this.onSubmitEditing}
                        autoFocus={autoFocus}
                        editable={this.state.editable}
                    />
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={this.onPress}
                        style={styles.login_view}
                        disabled={this.state.disabled}
                    >
                        {this.state.disabled ? (
                            <ActivityIndicator
                                style={styles.login_text}
                                size="large"
                                color="#00ff00"
                            />
                        ) : (
                            <Text style={styles.login_text}>查询</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    search: {
        flex: 8,
        flexDirection: "row",
        justifyContent: "center",
        height: 40,
        borderRadius: 20,
        backgroundColor: "#fff",
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    button: {
        flex: 2
    },
    textInput: {
        flex: 1,
        textDecorationLine: "underline",
        borderColor: "red"
    },
    login_view: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        backgroundColor: "rgba(65,199,214,1)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    login_text: {
        fontSize: 14,
        color: "white",
        textAlign: "center"
    }
});
