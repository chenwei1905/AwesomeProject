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
    ActivityIndicator,
    Image,
    Modal,
    TouchableHighlight
} from "react-native";

import SearchBar from "../../components/widgets/SearchBar";
import request from "../../configs/http.config";
import PickingOrderBackUpHeader from "../Items/PickingOrderBackUpHeader";
import PickingOrderBackUpItem from "../Items/PickingOrderShipmentItem";
import Styles from "../../pages/CSS/style";

export default class PickingOrderBackUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContainer: "", //输入容器号
            container: "", //保存的容器号
            desBinCode: "", //目标库位
            pickingOrderInfo: {}, //保存拣料的基本信息
            willDeliveryPickingOrderTaskDetailApiInfos: [], //待发料信息
            deliveryPickingOrderTaskDetailApiInfos: [], //发运基本信息
            willBackPickingOrderTaskDetailApiInfos: [], //待回库信息
            switch: false, //切换待发料和待回库的状态
            urlRequesting: false, //全局请求状态控制
            hiddenHeader: false, //由于屏幕小隐藏头头部
            modalVisible: false, //是否显示所有空Bin位
            srcBinCode: "",
            binDtos: [], //显示所有空Bin位置
            fixReturnBinCode: ""
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.getPickingPalletInfo = this.getPickingPalletInfo.bind(this);
        this.extraUniqueKey = this.extraUniqueKey.bind(this);
        this.switch = this.switch.bind(this);
        this.switchDeliver = this.switchDeliver.bind(this);
        this.switchCallBack = this.switchCallBack.bind(this);
        this.getEmptyBin = this.getEmptyBin.bind(this);
        this.backComfirm = this.backComfirm.bind(this);
        this.handleFilterTextChange2 = this.handleFilterTextChange2.bind(this);
        this.hiddenHeader = this.hiddenHeader.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
    }
    /**
     * 设置model可见
     * @param {*} visible
     */

    switchDeliver() {
        if (!this.state.switch) {
            this.setState({
                switch: true
            });
        }
    }
    switchCallBack() {
        if (this.state.switch) {
            this.setState({
                switch: false
            });
        }
    }

    hiddenHeader() {
        this.setState({
            hiddenHeader: !this.state.hiddenHeader
        });
    }
    extraUniqueKey(item, index) {
        return index + item;
    }
    handleFilterTextChange2(value) {
        this.setState({
            desBinCode: value
        });
    }
    handleFilterTextChange(value) {
        this.setState({
            searchContainer: value
        });
    }
    /**
     * 获取信息托拍信息
     */
    getPickingPalletInfo() {
        this.setState({
            urlRequesting: true
        });
        let url = "/api/pickingOrder/qryPickingPalletInfo";
        request(url, { palletNo: this.state.searchContainer, usage: "P" })
            .then(res => {
                if (res.state === "successfully") {
                    // console.log("**************数据处理之前的***************");
                    // console.log(res);
                 
                    // console.log("********数据处理之后的*************");
                    // console.log(res);
                    this.setState({
                        pickingOrderInfo:
                            res.content.pickingOrderInfo == null
                                ? {}
                                : res.content.pickingOrderInfo,
                        willBackPickingOrderTaskDetailApiInfos:
                            res.content
                                .willBackPickingOrderTaskDetailApiInfos == null
                                ? []
                                : res.content
                                      .willBackPickingOrderTaskDetailApiInfos,
                        willDeliveryPickingOrderTaskDetailApiInfos:
                            res.content
                                .willDeliveryPickingOrderTaskDetailApiInfos ==
                            null
                                ? []
                                : res.content
                                      .willDeliveryPickingOrderTaskDetailApiInfos,
                        container: res.content.palletNo,
                        srcBinCode: res.content.srcBinCode,
                        fixReturnBinCode: res.content.fixReturnBinCode
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
    switch() {
        this.setState({
            switch: !this.state.switch
        });
    }
    getEmptyBin() {
        let url = "/api/pickingOrder/emptyBins";
        this.setState({
            urlRequesting: true
        });
        this.setState({
            urlRequesting: false
        });
    }
    backComfirm() {
        this.setState({
            urlRequesting: true
        });
        let url = "/api/pickingOrder/returnToBin";
        request(url, {
            binCode: this.state.desBinCode,
            palletNo: this.state.container
        })
            .then(res => {
                if (res.state === "successfully") {
                    this.setState({
                        searchContainer: "",
                        willDeliveryPickingOrderTaskDetailApiInfos: [],
                        willBackPickingOrderTaskDetailApiInfos: [],
                        willBackPickingOrderTaskDetailApiInfos: [],
                        desBinCode: ""
                    });
                    Alert.alert(res.content);
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
    setModalVisible(visible) {
        console.log("**********hello**************");
        console.log(this.state.container);
        if (this.state.container === "") {
            Alert.alert("请先查询托拍");
            return;
        }
        this.setState({
            urlRequesting: true
        });
        let url = "/api/pickingOrder/emptyBins/" + this.state.container;
        console.log(url);
        request(url, "")
            .then(res => {
                console.log(res);
                if (res.state === "successfully") {
                    this.setState({
                        binDtos: res.content
                    });
                    this.setState({ modalVisible: visible });
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
        let lists = [];
        let deliveryCount = this.state
            .willDeliveryPickingOrderTaskDetailApiInfos.length;
        let backCount = this.state.willBackPickingOrderTaskDetailApiInfos
            .length;
        if (this.state.switch) {
            lists = this.state.willDeliveryPickingOrderTaskDetailApiInfos;
        } else {
            lists = this.state.willBackPickingOrderTaskDetailApiInfos;
        }
        let binDtos = [];
        this.state.binDtos.forEach(item => {
            binDtos.push(
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <Text
                        style={{
                            fontSize: 16,
                            marginRight: 5,
                            paddingTop: 5,
                            marginLeft: 10
                        }}
                    >
                        {item.binCode}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            marginRight: 5,
                            paddingTop: 5,
                            marginLeft: 10
                        }}
                    >
                        {item.maxWeight}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            marginRight: 5,
                            paddingTop: 5,
                            marginLeft: 10
                        }}
                    >
                        {item.section}
                    </Text>
                </View>
            );
        });
        return (
            <View style={Styles.main_back_color}>
                {/** 显示空库列表 */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}
                >
                    <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}
                    >
                        {/**
                         * view改成滑动看是否有效果
                         */}
                        <ScrollView
                            style={{
                                marginTop: 200,
                                height: 400,
                                backgroundColor: "#FFF"
                            }}
                        >
                            {binDtos}
                        </ScrollView>
                    </TouchableHighlight>
                </Modal>
                <SearchBar
                    filterText={this.state.searchContainer}
                    onFilterTextChange={this.handleFilterTextChange}
                    onPress={this.getPickingPalletInfo}
                    onSubmitEditing={this.getPickingPalletInfo}
                    placeholder="扫描或输入容器编号...."
                    urlRequesting={this.state.urlRequesting}
                />
                {this.state.hiddenHeader ? (
                    <Text></Text>
                ) : (
                    <PickingOrderBackUpHeader
                        item={this.state.pickingOrderInfo}
                        container={this.state.container}
                        srcBinCode={this.state.srcBinCode}
                    />
                )}

                {/** 切换按钮 */}
                <View style={styles.container}>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={this.switchDeliver}
                            style={styles.login_view}
                        >
                            <Text
                                style={
                                    this.state.switch
                                        ? styles.login_text2
                                        : styles.login_text
                                }
                            >
                                待发料({deliveryCount})
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={this.switchCallBack}
                            style={styles.login_view}
                        >
                            <Text
                                style={
                                    this.state.switch
                                        ? styles.login_text
                                        : styles.login_text2
                                }
                            >
                                待回库({backCount})
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={this.hiddenHeader}>
                            <Image
                                style={{ width: 40, height: 40, marginTop: 10 }}
                                source={
                                    this.state.hiddenHeader
                                        ? require("../../resources/images/plus-circle-fill.png")
                                        : require("../../resources/images/minus-circle-fill.png")
                                }
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/** 列表展示 */}
                <FlatList
                    style={{ flex: 1 }}
                    data={lists}
                    renderItem={({ item }) => (
                        <PickingOrderBackUpItem item={item} />
                    )}
                    extraData={this.state} //注意点
                    keyExtractor={this.extraUniqueKey}
                />
                {/** Bottom 展示 */}
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    {this.state.fixReturnBinCode !== "" &&
                    this.state.fixReturnBinCode !== null ? (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                    color: "red"
                                }}
                            >
                                该容器放有未确认的TO，只能回库位{" "}
                                {this.state.fixReturnBinCode}
                            </Text>
                        </View>
                    ) : (
                        <Text></Text>
                    )}

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                textAlignVertical: "center",
                                textAlign: "center",
                                width: Dimensions.get("window").width / 2 - 30
                            }}
                        >
                            目标库位
                        </Text>

                        <TextInput
                            style={{
                                width: Dimensions.get("window").width / 2 + 20,
                                textAlignVertical: "center",
                                textAlign: "center",
                                backgroundColor: "#FFF",
                                marginRight: 10
                            }}
                            placeholder="请扫描目标库位..."
                            value={this.state.desBinCode}
                            onChangeText={this.handleFilterTextChange2}
                            onSubmitEditing={this.backComfirm}
                            editable={!this.state.urlRequesting}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: 10,
                            marginTop: 10
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.setModalVisible(true);
                            }}
                            style={{
                                backgroundColor: "rgba(65,199,214,1)",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                height: 40,
                                marginRight: 20
                            }}
                            disabled={this.state.urlRequesting}
                        >
                            {this.state.urlRequesting ? (
                                <ActivityIndicator
                                    style={{
                                        width:
                                            Dimensions.get("window").width / 2 -
                                            30,
                                        textAlignVertical: "center",
                                        textAlign: "center",
                                        color: "#FFF",
                                        fontSize: 20
                                    }}
                                    size="large"
                                    color="#00ff00"
                                />
                            ) : (
                                <Text
                                    style={{
                                        width:
                                            Dimensions.get("window").width / 2 -
                                            30,
                                        textAlignVertical: "center",
                                        textAlign: "center",
                                        color: "#FFF",
                                        fontSize: 20
                                    }}
                                >
                                    查看空库
                                </Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.backComfirm}
                            style={{
                                backgroundColor: "rgba(65,199,214,1)",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                height: 40
                            }}
                            disabled={this.state.urlRequesting}
                        >
                            {this.state.urlRequesting ? (
                                <ActivityIndicator
                                    style={{
                                        width:
                                            Dimensions.get("window").width / 2 -
                                            30,
                                        textAlignVertical: "center",
                                        textAlign: "center",
                                        color: "#FFF",
                                        fontSize: 20
                                    }}
                                    size="large"
                                    color="#00ff00"
                                />
                            ) : (
                                <Text
                                    style={{
                                        width:
                                            Dimensions.get("window").width / 2 -
                                            30,
                                        textAlignVertical: "center",
                                        textAlign: "center",
                                        color: "#FFF",
                                        fontSize: 20
                                    }}
                                >
                                    确认回库
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    login_view2: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    login_text: {
        fontSize: 18,
        color: "rgba(65,199,214,1)",
        textAlign: "center"
    },
    login_text2: {
        fontSize: 18,
        color: "red",
        textAlign: "center"
    }
});
