/**
 *PO收货页面
 */
import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    FlatList,
    Alert,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

export default class PickingOrderGetAwayComfirmBottom extends Component {
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
                disabled: nextProps.urlRequesting,
            });
        }
    }
    handleFilterTextChange(text) {
        this.props.onFilterTextChange(text);
    }
    onPress() {
       
       this.props.onPress();
       
      
    }
    onSubmitEditing() {
        
        this.props.onSubmitEditing();
       
    }
    render() {
        const label = this.props.label;
        const placeholder = this.props.placeholder;
        const filterText = this.props.filterText;
        const buttonText = this.props.buttonText;
        const hiddenButton = this.props.hiddenButton;
        const style = this.props.style;
        const autoFocus= this.props.autoFocus;
       
        return (
            <View
                style={[style, {
                    flexDirection: "row",
                    justifyContent: "center",
                    height: 40,
                    marginTop: 10
                }]}
                
            >
                <Text
                    style={{
                        width: Dimensions.get("window").width / 8,
                        textAlignVertical: "center",
                        fontSize: 16,
                        marginLeft: 20
                    }}
                >
                    {label}
                </Text>

                <TextInput
                    style={{
                        width: Dimensions.get("window").width / 4 + 90,
                        textAlignVertical: "center",
                        textAlign: "center",
                        backgroundColor: "#FFF",
                        marginRight: 10,
                        borderRadius: 3
                    }}
                    placeholder={placeholder}
                    value={filterText}
                    onChangeText={this.handleFilterTextChange}
                    clearButtonMode="always"
                    onSubmitEditing={this.onSubmitEditing}
                    editable={this.state.editable}
                    autoFocus = {autoFocus}
                />
                {hiddenButton ? (
                    <Text
                        style={{
                            width: Dimensions.get("window").width / 4 + 10,
                          
                        }}
                    ></Text>
                ) : (
                    <TouchableOpacity
                        onPress={this.onPress}
                        style={{
                            backgroundColor: "rgba(65,199,214,1)",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10
                        }}
                        disabled={this.state.disabled}
                    >
                        {this.state.disabled ? (
                            <ActivityIndicator
                                style={{
                                    width:
                                        Dimensions.get("window").width / 4 + 10,
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                    color: "#FFF"
                                }}
                                size="large"
                                color="#00ff00"
                            />
                        ) : (
                            <Text
                                style={{
                                    width:
                                        Dimensions.get("window").width / 4 + 10,
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                    color: "#FFF"
                                }}
                            >
                                {buttonText}
                            </Text>
                        )}
                    </TouchableOpacity>
                )}
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
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
        textAlignVertical: "center"
    },
    text: {
        flex: 2,
        textAlignVertical: "center"
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
        backgroundColor: "#27b5ee",
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
