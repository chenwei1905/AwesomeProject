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
    Image
} from "react-native";
import { Tabs } from '@ant-design/react-native';

import SearchBar from "../../components/widgets/SearchBar";
import PickingOrderSortingHeader from "../Items/PickingOrderSortingHeader";
import PickingOrderSortingItem from "../Items/PickingOrderSortingItem";
import PickingOrderGetAwayComfirmBottom from "../Items/PickingOrderGetAwayComfirmBottom";
import request from "../../configs/http.config";
import Local from "../../configs/storage.config";
import Styles from "../../pages/CSS/style"

export default class PickingOrderSorting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContainer: "", //容器搜索框
            oriContainer: "", //返回结果保存容器
            pickOrder: {}, //pickingOrder基本信息
            switch: true, //切换待发料和待回库的状态
            hidden: false, //隐藏和显示列表
            desContainer: "", //目标容器
            items: [], //列表显示暂时不需要
            willDeliveryPickingOrderTaskDetailApiInfos: [], //待发料数据
            willBackPickingOrderTaskDetailApiInfos: [], //待回库数据
            urlRequesting: false, //全局请求状态控制
            hiddenHeader: false, //由于屏幕小隐藏头头部
            choiceIndexDelivery: 0,
            choiceIndexBack: 0,
            fixReturnBinCode: ""
        };
        this.getContainer = this.getContainer.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.switchDeliver = this.switchDeliver.bind(this);
        this.switchCallBack = this.switchCallBack.bind(this);
        this.hidden = this.hidden.bind(this);
        this.change = this.change.bind(this);
        this.changeContainer = this.changeContainer.bind(this);
        this.submitContainer = this.submitContainer.bind(this);
        this.extraUniqueKey = this.extraUniqueKey.bind(this);
        this.hiddenHeader = this.hiddenHeader.bind(this); //隐藏头部功能
    }
    componentDidMount() {
        console.log(Local.get({ key: "printer" }).data);
        if (Local.get({ key: "printer" }).data === undefined ) {
            Alert.alert("请先绑定打印机");
            this.props.navigation.navigate("Printer");
            return;
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
    handleFilterTextChange(value) {
        this.setState({
            searchContainer: value
        });
    }
    changeContainer(value) {
        this.setState({
            desContainer: value
        });
    }
    submitContainer() {
        console.log(this.state.urlRequesting);

        Local.get({ key: "worker" }).data;
        if (this.state.switch) {
            console.log(this.state.switch);
        } else {
            console.log(this.state.switch);
        }
        console.log("*******打印机**************");
        console.log(Local.get({ key: "printer" }).data[0]);
        this.setState({
            urlRequesting: true
        });
        let taskId = [];

        if (this.state.switch) {
            taskId =
                this.state.willDeliveryPickingOrderTaskDetailApiInfos.length > 0
                    ? [
                          this.state.willDeliveryPickingOrderTaskDetailApiInfos[
                              this.state.choiceIndexDelivery
                          ]
                      ]
                    : [];
        } else {
            taskId =
                this.state.willBackPickingOrderTaskDetailApiInfos.length > 0
                    ? [
                          this.state.willBackPickingOrderTaskDetailApiInfos[
                              this.state.choiceIndexBack
                          ]
                      ]
                    : [];
        }

        let url = "/api/pickingOrder/confirmTransfer";
        request(url, {
            palletNo: this.state.desContainer,
            printerName: Local.get({ key: "printer" }).data[0],
            taskIds: taskId.map(item => item.taskId)
        })
            .then(res => {
                console.log(res);

                if (res.state === "successfully") {
                    if (this.state.switch) {
                        if (
                            this.state
                                .willDeliveryPickingOrderTaskDetailApiInfos
                                .length > 0
                        ) {
                            this.state.willDeliveryPickingOrderTaskDetailApiInfos.splice(
                                this.state.choiceIndexDelivery,
                                1
                            );
                            //输出切割后的数组
                            console.log(
                                this.state
                                    .willDeliveryPickingOrderTaskDetailApiInfos
                            );
                            if (
                                this.state
                                    .willDeliveryPickingOrderTaskDetailApiInfos
                                    .length > 0
                            ) {
                                this.state.willDeliveryPickingOrderTaskDetailApiInfos.map(
                                    (item, index) => {
                                        if (index === 0) {
                                            item.selected = true;
                                            item.disabled = false;
                                            item.ErrMsg = "hhhh";
                                            item.key = index;
                                        } else {
                                            item.selected = false;
                                            item.disabled = false;
                                            item.ErrMsg = "hhhh";
                                            item.key = index;
                                        }
                                    }
                                );
                            }
                            this.setState({
                                willDeliveryPickingOrderTaskDetailApiInfos: this
                                    .state
                                    .willDeliveryPickingOrderTaskDetailApiInfos,
                                choiceIndexDelivery: 0,
                                fixReturnBinCode: "",
                            });
                        }
                    } else {
                        if (
                            this.state.willBackPickingOrderTaskDetailApiInfos
                                .length > 0
                        ) {
                            this.state.willBackPickingOrderTaskDetailApiInfos.splice(
                                this.state.choiceIndexBack,
                                1
                            );
                            //输出切割后的数组
                            console.log(
                                this.state
                                    .willBackPickingOrderTaskDetailApiInfos
                            );
                            if (
                                this.state
                                    .willBackPickingOrderTaskDetailApiInfos
                                    .length > 0
                            ) {
                                this.state.willBackPickingOrderTaskDetailApiInfos.map(
                                    (item, index) => {
                                        if (index === 0) {
                                            item.selected = true;
                                            item.disabled = false;
                                            item.ErrMsg = "hhhh";
                                            item.key = index;
                                        } else {
                                            item.selected = false;
                                            item.disabled = false;
                                            item.ErrMsg = "hhhh";
                                            item.key = index;
                                        }
                                    }
                                );
                            }
                            this.setState({
                                willBackPickingOrderTaskDetailApiInfos: this
                                    .state
                                    .willBackPickingOrderTaskDetailApiInfos,
                                choiceIndexBack: 0,
                                fixReturnBinCode: "",
                            });
                        }
                    }
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
        // } else {
        //     // this.setState({
        //     //     urlRequesting: false
        //     // });
        // }
    }
    //收索确认
    getContainer() {
        this.setState({
            urlRequesting: true
        });
        let url = "/api/pickingOrder/qryPickingPalletInfo";
        request(url, { palletNo: this.state.searchContainer, usage: "P" })
            .then(res => {
                if (res.state === "successfully") {
                    console.log("**************数据处理之前的***************");
                    console.log(res);
                    if (
                        res.content.willBackPickingOrderTaskDetailApiInfos !==
                        null
                    ) {
                        res.content.willBackPickingOrderTaskDetailApiInfos.map(
                            (item, index) => {
                                if (index === 0) {
                                    item.selected = true;
                                    item.disabled = false;
                                    item.ErrMsg = "hhhh";
                                    item.key = index;
                                } else {
                                    item.selected = false;
                                    item.disabled = false;
                                    item.ErrMsg = "hhhh";
                                    item.key = index;
                                }
                            }
                        );
                    }
                    if (
                        res.content
                            .willDeliveryPickingOrderTaskDetailApiInfos !== null
                    ) {
                        res.content.willDeliveryPickingOrderTaskDetailApiInfos.map(
                            (item, index) => {
                                if (index === 0) {
                                    item.selected = true;
                                    item.disabled = false;
                                    item.ErrMsg = "hhhh";
                                    item.key = index;
                                } else {
                                    item.selected = false;
                                    item.disabled = false;
                                    item.ErrMsg = "hhhh";
                                    item.key = index;
                                }
                            }
                        );
                    }

                    console.log("********数据处理之后的*************");
                    console.log(res);
                    this.setState({
                        pickOrder: res.content.pickingOrderInfo,
                        willBackPickingOrderTaskDetailApiInfos:
                            res.content
                                .willBackPickingOrderTaskDetailApiInfos === null
                                ? []
                                : res.content
                                      .willBackPickingOrderTaskDetailApiInfos,
                        willDeliveryPickingOrderTaskDetailApiInfos:
                            res.content
                                .willDeliveryPickingOrderTaskDetailApiInfos ===
                            null
                                ? []
                                : res.content
                                      .willDeliveryPickingOrderTaskDetailApiInfos,
                        oriContainer: res.content.palletNo,
                        desContainer: "",
                        choiceIndexDelivery: 0,
                        choiceIndexBack: 0,
                        fixReturnBinCode: res.content.fixReturnBinCode,
                    });
                }
                if (res.state === "failed") {
                    this.props.navigation.navigate("Login");
                }
            })
            .catch(err => {
                // Alert.alert(err.message);
                Alert.alert(err.message);
            })
            .done(() => {
                this.setState({
                    urlRequesting: false
                });
                console.log(this.state.urlRequesting);
            });
    }
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
    hidden() {
        this.setState({
            hidden: !this.state.hidden
        });
    }
    /**
     * 有问题
     * @param {} itemx
     * @param {*} index
     */
    change(itemx, index) {
        // Alert.alert(JSON.stringify(index));
        console.log("************切换checkBox状态************");
        console.log(itemx);
        console.log(index);
        if (this.state.switch) {
            // this.state.willDeliveryPickingOrderTaskDetailApiInfos
            //     .filter(item => item.key === index)
            //     .map(item => {
            //         item.selected = !item.selected;
            //     });

            this.state.willDeliveryPickingOrderTaskDetailApiInfos.map(item => {
                if (item.key === index) {
                    item.selected = !item.selected;
                } else {
                    item.selected = false;
                }
            });
            this.setState({
                willDeliveryPickingOrderTaskDetailApiInfos: this.state
                    .willDeliveryPickingOrderTaskDetailApiInfos,
                choiceIndexDelivery: index
            });
        } else {
            this.state.willBackPickingOrderTaskDetailApiInfos.map(item => {
                if (item.key === index) {
                    item.selected = !item.selected;
                } else {
                    item.selected = false;
                }
            });
            this.setState({
                willBackPickingOrderTaskDetailApiInfos: this.state
                    .willBackPickingOrderTaskDetailApiInfos,
                choiceIndexBack: index
            });
        }
    }
    render() {
        let lists = [];
        let lists2 = []; //显示一列的
        let deliveryCount = this.state
            .willDeliveryPickingOrderTaskDetailApiInfos.length;
        let backCount = this.state.willBackPickingOrderTaskDetailApiInfos
            .length;
        if (this.state.hidden) {
            //展示隐藏列
            if (this.state.switch) {
                lists = this.state.willDeliveryPickingOrderTaskDetailApiInfos;
            } else {
                lists = this.state.willBackPickingOrderTaskDetailApiInfos;
            }
            console.log(lists);
        } else {
            //
            if (this.state.switch) {
                lists =
                    this.state.willDeliveryPickingOrderTaskDetailApiInfos
                        .length > 0
                        ? [
                              this.state
                                  .willDeliveryPickingOrderTaskDetailApiInfos[
                                  this.state.choiceIndexDelivery
                              ]
                          ]
                        : [];
            } else {
                lists =
                    this.state.willBackPickingOrderTaskDetailApiInfos.length > 0
                        ? [
                              this.state.willBackPickingOrderTaskDetailApiInfos[
                                  this.state.choiceIndexBack
                              ]
                          ]
                        : [];
                // this.state.willBackPickingOrderTaskDetailApiInfos //显示全部
            }
        }
        //
        if (this.state.switch) {
            lists2 =
                this.state.willDeliveryPickingOrderTaskDetailApiInfos.length > 0
                    ? [
                          this.state.willDeliveryPickingOrderTaskDetailApiInfos[
                              this.state.choiceIndexDelivery
                          ]
                      ]
                    : [];
        } else {
            lists2 =
                this.state.willBackPickingOrderTaskDetailApiInfos.length > 0
                    ? [
                          this.state.willBackPickingOrderTaskDetailApiInfos[
                              this.state.choiceIndexBack
                          ]
                      ]
                    : [];
            // this.state.willBackPickingOrderTaskDetailApiInfos //显示全部
        }

        return (
            <View
                style={Styles.main_back_color}
            >
                <SearchBar
                    filterText={this.state.searchContainer}
                    onFilterTextChange={this.handleFilterTextChange}
                    onPress={this.getContainer}
                    onSubmitEditing={this.getContainer}
                    placeholder="扫描或输入容器编号"
                    urlRequesting={this.state.urlRequesting}
                />
                {/** 头部 */}
                {this.state.hiddenHeader ? (
                    <Text></Text>
                ) : (
                    <PickingOrderSortingHeader
                        item={this.state.pickOrder}
                        container={this.state.oriContainer}
                    />
                )}

                {/** 切换按展示按钮 */}
                <View style={styles.container}>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={this.switchDeliver}
                            style={
                                this.state.switch
                                    ? styles.login_view2
                                    : styles.login_view
                            }
                        >
                            <Text style={styles.login_text}>
                                待发料({deliveryCount})
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={this.switchCallBack}
                            style={
                                this.state.switch
                                    ? styles.login_view
                                    : styles.login_view2
                            }
                        >
                            <Text style={styles.login_text}>
                                待回库({backCount})
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={this.hidden}
                            style={
                                this.state.hidden
                                    ? styles.login_view2
                                    : styles.login_view
                            }
                        >
                            <Text style={styles.login_text}>隐藏列表</Text>
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
                {/** 表单类容 */}

                <FlatList
                    style={{ flex: 1 }}
                    data={lists}
                    renderItem={({ item }) => (
                        <PickingOrderSortingItem
                            item={item}
                            change={this.change}
                        />
                    )}
                    extraData={this.state} //注意点
                    keyExtractor={this.extraUniqueKey}
                />

                {/** booter类容 */}
                {/* <PickingOrderSortingBottom /> */}
                <View>
                   
                    <View>
                        {lists.length > 0 ? (
                            <PickingOrderSortingItem
                                item={lists.length > 0 ? lists2[0] : []}
                                change={this.change}
                                style ={{backgroundColor: "rgba(171, 190, 215, 0.80)", borderWidth: 1}}
                            />
                        ) : (
                            <View></View>
                        )}
                    </View>
                    {/* {this.state.fixReturnBinCode !== "" &&
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
                    )} */}

                    <PickingOrderGetAwayComfirmBottom
                        label="容器"
                        filterText={this.state.desContainer}
                        onFilterTextChange={this.changeContainer}
                        onPress={this.submitContainer}
                        onSubmitEditing={this.submitContainer}
                        placeholder="请输入目标容器......"
                        buttonText="确认转移"
                        urlRequesting={this.state.urlRequesting}
                        hiddenButton={false}
                    />
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
        backgroundColor: "rgba(65,199,214,0.5)",
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
        backgroundColor: "red",
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
