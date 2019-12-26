import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    FlatList,
    Alert,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SectionList,
    Image,
    ActivityIndicator
} from "react-native";
import request from "../../configs/http.config";
import PickingOrderAcceptDetailItem from "../Items/PickingOrderAcceptDetailItem";
import Styles from "../../pages/CSS/style";

export default class PickingOrderAcceptDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            woNo: "",
            items: [],
            urlRequesting: false //全局请求状态控制
        };
        this.extraUniqueKey = this.extraUniqueKey.bind(this);
        this.renderSectionHeader = this.renderSectionHeader.bind(this);
        this.confirmAccepted = this.confirmAccepted.bind(this);
    }
    confirmAccepted() {
        this.setState({
            urlRequesting: true
        });
        let url = "/api/pickingOrder/confirmAccepted/" + this.state.woNo;
        request(url, "")
            .then(res => {
                if (res.state === "successfully") {
                    this.props.navigation.navigate("PickingOrderAcceptMenu"); //返回到上一个页面
                    this.props.navigation.state.params.refresh();
                }
                if (res.state === "failed") {
                    
                    this.props.navigation.navigate("Login");
                }
            })
            .catch(err => {
                Alert.alert(err.message);
            })
            .done(() => {
                this.setState({
                    urlRequesting: false
                });
                console.log(this.state.urlRequesting);
            });
    }
    extraUniqueKey(item, index) {
        return index + item;
    }
    renderSectionHeader({ section }) {
        return (
            <View style={{ justifyContent: "center" }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#f1f2f3",
                        justifyContent: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: "#e8e8e8",
                        padding: 5
                    }}
                    onPress={() => {
                        this.show(section);
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center"
                        }}
                    >
                        <Text style={{ textAlign: "center", fontSize: 18 }}>
                            容器号:{section.palletNo}
                        </Text>
                        <Image
                            style={{ height: 25, width: 20 }}
                            source={
                                section.isShow == "off"
                                    ? require("../../resources/images/caret-right.png")
                                    : require("../../resources/images/caret-down.png")
                            }
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    show(data) {
        // Alert.alert(JSON.stringify(data.woNo)); //对应每一个工单号
        //Alert.alert(JSON.stringify(data.isShow));

        if (data.isShow === "off") {
            this.state.items[data.key]["isShow"] = "on";
            this.setState({
                items: this.state.items
            });
        } else {
            this.state.items[data.key]["isShow"] = "off";
            this.setState({
                items: this.state.items
            });
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        const woNo = navigation.getParam("woNo");
        let url = "/api/pickingOrder/qryAcceptableWoDetail/" + woNo;
        request(url, "").then(res => {
            if (res.state === "successfully") {
                res.content.map((item, index) => {
                    item.isShow = "off";
                    item.key = index;
                });
                this.setState({
                    woNo: woNo,
                    items: res.content
                });
            }
            if (res.state === "failed") {
                this.props.navigation.navigate("Login");
            }
        });
    }
    render() {
        return (
            <View style={Styles.main_back_color}>
                {/** 头部 */}
                <View style={{ justifyContent: "center", height: 40 }}>
                    <Text style={{ textAlign: "center", fontSize: 20 }}>
                        工单:{this.state.woNo}
                    </Text>
                </View>
                <SectionList
                    style={{ flex: 1 }}
                    renderItem={({ item, index, section: { isShow } }) =>
                        isShow === "on" ? (
                            <PickingOrderAcceptDetailItem item={item} />
                        ) : (
                            <View></View>
                        )
                    }
                    keyExtractor={this.extraUniqueKey}
                    renderSectionHeader={this.renderSectionHeader}
                    sections={this.state.items}
                />
                <View>
                    <TouchableOpacity
                        onPress={this.confirmAccepted}
                        style={{
                            marginTop: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            height: 40,
                            backgroundColor: "rgba(65,199,214,0.5)",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                            marginBottom: 20
                        }}
                    >
                        {this.state.urlRequesting ? (
                            <ActivityIndicator
                                style={{
                                    fontSize: 14,
                                    color: "white",
                                    textAlign: "center"
                                }}
                                size="large"
                                color="#00ff00"
                            />
                        ) : (
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: "white",
                                    textAlign: "center"
                                }}
                            >
                                确认接收
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
