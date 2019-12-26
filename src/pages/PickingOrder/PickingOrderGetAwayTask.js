/**
 *PO收货页面
 */
import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ToastAndroid,
    FlatList,
    Dimensions,
    SectionList,
    Image
} from "react-native";
import SearchBar from "../../components/widgets/SearchBar";
import request from "../../configs/http.config";
import PickingOrderGetAwayTaskHeader from "../Items/PickingOrderGetAwayTaskHeader";
import PickingOrderGetAwayTaskItem from "../Items/PickingOrderGetAwayTaskItem";
import Styles from "../../pages/CSS/style";

export default class PickingOrderGetAwayTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickOrder: {}, //拣料单的基础信息,来源于上个界面
            items: [], //获取信息列表
            binCode: "", //bin位
            group: "", //分组信息,来源于上一个界面
            isgroup: false, //是否分组状态
            urlRequesting: false //全局请求状态控制
        };

        this.onClick = this.onClick.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.getBinCode = this.getBinCode.bind(this);
        this.renderSectionHeader = this.renderSectionHeader.bind(this);
        this.show = this.show.bind(this);
        this.extraUniqueKey = this.extraUniqueKey.bind(this);
        this._refresh = this._refresh.bind(this);
    }
    _refresh = () => {
        const pickOrder = this.state.pickOrder;
        console.log(pickOrder);
        const group = this.state.group;
        const binCode = this.state.binCode;
        let url = "/api/pickingOrder/pickingTaskInfo";
        request(
            url,
            {
                binCode: binCode,
                groupName: group,
                pickingOrderId: pickOrder.id
            },
            200000
        )
            .then(res => {
                console.log("*********刚载入的数据*************");
                console.log(res);
                if (res.state === "successfully") {
                    if (res.content.length > 0) {
                        if (res.content[0].woNo !== null) {
                            let row = this.state.items.filter(
                                item => item.isShow === "on"
                            );

                            let inRow = false;
                            for (let i = 0; i < res.content.length; i++) {
                                for (let j = 0; j < row.length; j++) {
                                    if (res.content[i].woNo === row[j].woNo) {
                                        inRow = true;
                                        break;
                                    }
                                }
                                if (inRow) {
                                    res.content[i].isShow = "on";
                                } else {
                                    res.content[i].isShow = "off";
                                }
                                inRow = false;
                            }

                            res.content.map((item, index) => {
                                item.key = index;
                                item.data = item.data === null ? [] : item.data; //防止传过来的数据为空
                            });

                            console.log("*********处理完的数据*************");
                            console.log(res);
                            this.setState({
                                pickOrder: pickOrder,
                                group: group,
                                isgroup: true,
                                items: res.content
                            });
                        } else {
                            console.log("*********处理完的数据*************");
                            console.log(res);
                            this.setState({
                                pickOrder: pickOrder,
                                group: group,
                                isgroup: false,
                                items:
                                    res.content[0].data == null
                                        ? []
                                        : res.content[0].data
                            });
                        }
                    } else {
                        this.setState({
                            items: []
                        });
                    }
                }
                if (res.state === "failed") {
                    this.props.navigation.navigate("Login");
                }
            })
            .catch(err => {
                Alert.alert(err.message);
            });
    };
    extraUniqueKey(item, index) {
        return index + item;
    }
    //渲染每个section的头部
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
                            工单号:{section.woNo}
                        </Text>
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 18,
                                color: "red"
                            }}
                        >
                            ({section.data.length})
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
        console.log("**********展开数据************");
        console.log(this.state.items);
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
        console.log("**********展开数据之后************");
        console.log(this.state.items.filter(item => item.isShow === "on"));
    }
    //渲染之前的动作,加载目标数据
    componentDidMount() {
        /**
         * 路由过来的数据
         */
        const { navigation } = this.props;
        const pickOrder = navigation.getParam("pickOrder");
        console.log(pickOrder);
        const group = navigation.getParam("group");
        this.setState({
            items: [],
            pickOrder: pickOrder,
            group: group
        });
        let url = "/api/pickingOrder/pickingTaskInfo";
        request(
            url,
            { binCode: "", groupName: group, pickingOrderId: pickOrder.id },
            200000
        )
            .then(res => {
                console.log("*********刚载入的数据*************");
                console.log(res);
                if (res.state === "successfully") {
                    if (res.content.length > 0) {
                        if (res.content[0].woNo !== null) {
                            res.content.map((item, index) => {
                                item.isShow = "off";
                                item.key = index;
                                item.data = item.data === null ? [] : item.data; //防止传过来的数据为空
                            });
                            console.log("*********处理完的数据*************");
                            console.log(res);
                            this.setState({
                                pickOrder: pickOrder,
                                group: group,
                                isgroup: true,
                                items: res.content
                            });
                        } else {
                            console.log("*********处理完的数据*************");
                            console.log(res);
                            this.setState({
                                pickOrder: pickOrder,
                                group: group,
                                isgroup: false,
                                items:
                                    res.content[0].data == null
                                        ? []
                                        : res.content[0].data
                            });
                        }
                    } else {
                        this.setState({
                            items: [],
                            pickOrder: pickOrder,
                            group: group
                        });
                    }
                } else if (res.state === "failed") {
                    this.props.navigation.navigate("Login");
                } else {
                    this.setState({
                        items: [],
                        pickOrder: pickOrder,
                        group: group
                    });
                }
            })
            .catch(err => {
                Alert.alert(err.message);
            });
    }
    onClick(binCode) {
        console.log("**********确认bin位按钮*********");
        console.log(binCode);
        console.log(this.state.pickOrder);
        this.props.navigation.navigate("PickingOrderGetAwayConfirm", {
            pickOrder: this.state.pickOrder,
            binCode: binCode,
            group: this.state.group,
            refresh: () => {
                this._refresh();
            }
        });
    }
    handleFilterTextChange(binCode) {
        this.setState({
            binCode: binCode
        });
    }
    getBinCode() {
        this.setState({
            urlRequesting: true
        });
        let url = "/api/pickingOrder/pickingTaskInfo";
        console.log(url);
        console.log({
            binCode: this.state.binCode,
            groupName: this.state.group,
            pickingOrderId: this.state.pickOrder.id
        });
        request(
            url,
            {
                binCode: this.state.binCode,
                groupName: this.state.group,
                pickingOrderId: this.state.pickOrder.id
            },
            200000
        )
            .then(res => {
                console.log("*********刚载入的数据*************");
                console.log(res);
                if (res.state == "successfully") {
                    if (res.content.length > 0) {
                        if (res.content[0].woNo !== null) {
                            res.content.map((item, index) => {
                                item.isShow = "off";
                                item.key = index;
                                item.data = item.data === null ? [] : item.data;
                            });
                            console.log(
                                "*********处理完的数据hhhhh*************"
                            );
                            console.log(res);
                            this.setState({
                                isgroup: true,
                                items: res.content
                            });
                        } else {
                            console.log(
                                "*********处理完的数据eeee*************"
                            );
                            console.log(res);
                            this.setState({
                                isgroup: false,
                                items:
                                    res.content[0].data === null
                                        ? []
                                        : res.content[0].data
                            });
                        }
                    } else {
                        this.setState({
                            items: []
                        });
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
    }
    render() {
        return (
            <View style={Styles.main_back_color}>
                {/** 表头数据 */}
                {this.state.pickOrder.pickingOrderNo == null ? (
                    <Text>未获取到头信息</Text>
                ) : (
                    <PickingOrderGetAwayTaskHeader
                        item={this.state.pickOrder}
                        group={this.state.group}
                    />
                )}

                {/** 收货框 */}

                <SearchBar
                    ref="sb"
                    filterText={this.state.binCode}
                    onFilterTextChange={this.handleFilterTextChange}
                    onPress={this.getBinCode}
                    onSubmitEditing={this.getBinCode}
                    placeholder="扫描或库位检索任务"
                    autoFocus={true}
                    urlRequesting={this.state.urlRequesting}
                />
                {/**表格数据 */}
                {this.state.isgroup ? (
                    <SectionList
                        style={{ flex: 1 }}
                        renderItem={({ item, index, section: { isShow } }) =>
                            isShow === "on" ? (
                                <PickingOrderGetAwayTaskItem
                                    item={item}
                                    onClick={this.onClick}
                                />
                            ) : (
                                <View></View>
                            )
                        }
                        keyExtractor={this.extraUniqueKey}
                        renderSectionHeader={this.renderSectionHeader}
                        sections={this.state.items}
                    />
                ) : (
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.items}
                        renderItem={({ item }) => (
                            <PickingOrderGetAwayTaskItem
                                item={item}
                                onClick={this.onClick}
                            />
                        )}
                        keyExtractor={this.extraUniqueKey}
                    />
                )}
            </View>
        );
    }
}
