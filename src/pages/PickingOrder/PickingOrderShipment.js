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
    ActivityIndicator
} from "react-native";

import SearchBar from "../../components/widgets/SearchBar";
import PickingOrderShipmentHeader from "../Items/PickingOrderShipmentHeader";
import PickingOrderShipmentItem from "../Items/PickingOrderShipmentItem";
import request from "../../configs/http.config";
import Local from "../../configs/storage.config";
import Styles from "../../pages/CSS/style";

export default class PickingOrderShipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContainer: "", //输入容器号
            container: "", //保存的容器号
            pickingOrderInfo: {}, //保存拣料的基本信息
            woNo: "", //工单号
            deliveryPickingOrderTaskDetailApiInfos: [], //发运基本信息
            urlRequesting: false //全局请求状态控制
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.getPickingPalletInfo = this.getPickingPalletInfo.bind(this);
        this.extraUniqueKey = this.extraUniqueKey.bind(this);
        this.deliveryPallet = this.deliveryPallet.bind(this);
        this.printPickingLabel = this.printPickingLabel.bind(this);
    }
    /**
     * 确认发料
     */
    printPickingLabel() {
        // Alert.alert("hello world");

        console.log(this.state.container);
        console.log(this.state);
        if (this.state.container === "" || this.state.container === undefined) {
            Alert.alert("请先输入容器号检索!");
            return;
        }
        this.setState({
            urlRequesting: true
        });

        let url =
            "/api/pickingOrder/printPickingLabel/" +
            this.state.container +
            "/" +
            Local.get({ key: "printer" }).data[0];
        request(url, "")
            .then(res => {
                if (res.state === "successfully") {
                    console.log(res);
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
    componentDidMount() {
        if (Local.get({ key: "printer" }).data === undefined) {
            Alert.alert("请先绑定打印机");
            this.props.navigation.navigate("Printer");
            return;
        }
    }
    deliveryPallet() {
        console.log(this.state.container);
        console.log(this.state);
        if (this.state.container === "" || this.state.container === undefined) {
            Alert.alert("请先输入容器号检索!");
            return;
        }
        this.setState({
            urlRequesting: true
        });
        let url = "/api/pickingOrder/deliveryPallet/" + this.state.container;
        request(url, "")
            .then(res => {
                if (res.state === "successfully") {
                    Alert.alert(res.content);
                    this.setState({
                        searchContainer: "",
                        deliveryPickingOrderTaskDetailApiInfos: []
                    });
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
    handleFilterTextChange(value) {
        this.setState({
            searchContainer: value
        });
    }
    /**
     * 获取容器号
     */
    getPickingPalletInfo() {
        this.setState({
            urlRequesting: true
        });
        let url = "/api/pickingOrder/qryPickingPalletInfo";
        request(url, { palletNo: this.state.searchContainer, usage: "D" })
            .then(res => {
                if (res.state === "successfully") {
                    this.setState({
                        container: res.content.palletNo,
                        pickingOrderInfo: res.content.pickingOrderInfo,
                        woNo: res.content.woNo,
                        deliveryPickingOrderTaskDetailApiInfos:
                            res.content.deliveryPickingOrderTaskDetailApiInfos,
                        pickingPalletStatus: res.content.pickingPalletStatus
                    });
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
    render() {
        return (
            <View style={Styles.main_back_color}>
                <SearchBar
                    filterText={this.state.searchContainer}
                    onFilterTextChange={this.handleFilterTextChange}
                    onPress={this.getPickingPalletInfo}
                    onSubmitEditing={this.getPickingPalletInfo}
                    placeholder="扫描或输入容器编号...."
                    urlRequesting={this.state.urlRequesting}
                />
                <PickingOrderShipmentHeader
                    item={this.state.pickingOrderInfo}
                    container={this.state.container}
                    woNo={this.state.woNo}
                    pickingPalletStatus={this.state.pickingPalletStatus}
                />
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.deliveryPickingOrderTaskDetailApiInfos}
                    renderItem={({ item }) => (
                        <PickingOrderShipmentItem item={item} />
                    )}
                    extraData={this.state} //注意点
                    keyExtractor={this.extraUniqueKey}
                />
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={this.deliveryPallet}
                        style={{
                            marginTop: 10,
                            marginLeft: 15,
                            marginRight: 10,
                            height: 40,
                            backgroundColor: "rgba(65,199,214,1)",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                            marginBottom: 20,
                            width: Dimensions.get("window").width / 2 - 30
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
                                确认发运
                            </Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.printPickingLabel}
                        style={{
                            marginTop: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            height: 40,
                            backgroundColor: "rgba(65,199,214,1)",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                            marginBottom: 20,
                            width: Dimensions.get("window").width / 2 - 30
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
                                补打标签
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
