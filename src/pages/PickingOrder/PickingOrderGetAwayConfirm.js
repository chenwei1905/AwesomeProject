/**
 * 拣料下架
 */
import React, { Component } from "react";
import { View, Text, Dimensions, FlatList, Alert } from "react-native";
import PickingOrderGetAwayConfirmHeader from "../Items/PickingOrderGetAwayComfirmHeader";
import PickingOrderGetAwayConfirmItem from "../Items/PickingOrderGetAwayConfirmItem";
import PickingOrderGetAwayComfirmBottom from "../Items/PickingOrderGetAwayComfirmBottom";
import request from "../../configs/http.config";
import Styles from "../../pages/CSS/style";

export default class PickingOrderGetAwayConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickOrder: {}, //工单主信息
            oriBinCode: "", //起始Bin位信息
            desBinCode: "", //目标Bin信息
            container: "", //容器信息
            items: [], //数据列
            group: "", //分组获取是否支持整bin和非整bin下架
            supportEntireBinPicking: true, //支持整bin下架状态
            supportSeparatePicking: true, //支持非整bin下架状态
            urlRequesting: false,//全局请求状态控制
            focus: false, //获得焦点
        };
        this.change = this.change.bind(this);
        this.extraUniqueKey = this.extraUniqueKey.bind(this);
        this.changeBinCode = this.changeBinCode.bind(this);
        this.changeContainer = this.changeContainer.bind(this);
        this.submitBinCode = this.submitBinCode.bind(this);
        this.submitContainer = this.submitContainer.bind(this);
    }
    extraUniqueKey(item, index) {
        return index + item;
    }
    changeBinCode(value) {
        this.setState({
            desBinCode: value
        });
    }
    changeContainer(value) {
        this.setState({
            container: value
        });
    }
    submitBinCode() {
        //整Bin下架
        this.setState({
            urlRequesting: true
        });
        console.log(
            this.state.items
                //.filter(item => item.selected === true)  //整Bin下架需要过滤筛选条件
                .map(item => item.taskId)
        );

        let url = "/api/pickingOrder/binPickingConfirm";
        /**
         * 测试专用
         */
        request(url, {
            allBin: true,
            binCode: this.state.desBinCode,
            groupName: this.state.group,
            palletNo: this.state.container,
            pickingOrderNo: this.state.pickOrder.pickingOrderNo,
            taskIds: this.state.items.map(item => item.taskId) //整Bin下架需要过滤筛选条件
            //.filter(item => item.selected === true)
        })
            .then(res => {
                console.log(res);
                if (res.state === "successfully") {
                    //路由跳转
                    this.props.navigation.navigate("PickingOrderGetAwayTask", {
                        pickOrder: this.state.pickOrder,
                        group: this.state.group
                    });
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
    submitContainer() {
        let taskIdss = this.state.items
            .filter(item => item.selected === true)
            .map(item => item.taskId);

        if (taskIdss.length <= 0) {
            Alert.alert("请先勾选物料行!");
            return -1;
        }
        /**
         * 有问题
         */
        this.setState({
            urlRequesting: true
        });

        //非整Bin下载
        let url = "/api/pickingOrder/binPickingConfirm";
        request(url, {
            allBin: false,
            binCode: this.state.desBinCode,
            groupName: this.state.group,
            palletNo: this.state.container,
            pickingOrderNo: this.state.pickOrder.pickingOrderNo,
            taskIds: taskIdss
        })
            .then(res => {
                console.log(res);
                if (res.state === "successfully") {
                    //路由跳转
                    // this.props.navigation.navigate("PickingOrderGetAwayTask");
                    this.props.navigation.navigate("PickingOrderGetAwayTask", {
                        pickOrder: this.state.pickOrder,
                        group: this.state.group
                    }); //返回到上一个页面
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

    componentDidMount() {
        const { navigation } = this.props;
        const pickOrder = navigation.getParam("pickOrder");
        const oriBinCode = navigation.getParam("binCode");
        const group = navigation.getParam("group");
        let url = "/api/pickingOrder/pickingTaskDetailInfo";
        // 主数据
        request(url, { binCode: oriBinCode, pickingOrderId: pickOrder.id })
            .then(res => {
                console.log("*********刚载入的数据*************");
                console.log(res);
                if (res.state === "successfully") {
                    if (res.content.length > 0) {
                        res.content.map((item, index) => {
                            item.selected = false;
                            item.disabled = false;
                            item.ErrMsg = "hhhh";
                            item.key = index;
                        });
                        this.setState({
                            pickOrder: pickOrder,
                            oriBinCode: oriBinCode,
                            items: res.content,
                            group: group
                        });
                    } else {
                        console.log("没有数据");
                        this.setState({
                            pickOrder: pickOrder,
                            oriBinCode: oriBinCode,
                            group: group
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
        // 是否支持整Bin和非整Bin下架
        let url2 = "/api/pickingAreaGroup/" + group;
        request(url2, "")
            .then(res => {
                console.log(
                    "*********获取是否加入整bin信息的数据*************"
                );
                console.log(res);
                if (res.state === "successfully") {
                    this.setState({
                        supportEntireBinPicking:
                            res.content.supportEntireBinPicking,
                        supportSeparatePicking:
                            res.content.supportSeparatePicking
                    });
                } 
                if (res.state === "failed") {
                    this.props.navigation.navigate("Login");
                }
            })
            .catch(err => {
                Alert.alert(err.message);
            });
    }
    change(item, key) {
        this.state.items[key].selected = !this.state.items[key].selected;
        this.setState({
            items: this.state.items
        });
    }
    render() {
        return (
            <View View style={Styles.main_back_color}>
                {/**表头数据 */}
                <PickingOrderGetAwayConfirmHeader
                    item={this.state.pickOrder}
                    binCode={this.state.oriBinCode}
                />
                {/** 表格数据 */}
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.items}
                    renderItem={({ item }) => (
                        <PickingOrderGetAwayConfirmItem
                            item={item}
                            change={this.change}
                        />
                    )}
                    extraData={this.state} //注意点
                    keyExtractor={this.extraUniqueKey}
                />
                {/**底部数据 */}

                <PickingOrderGetAwayComfirmBottom
                    label="库位"
                    filterText={this.state.desBinCode}
                    onFilterTextChange={this.changeBinCode}
                    onPress={this.submitBinCode}
                    placeholder="扫描库位...."
                    buttonText="整Bin下架"
                    urlRequesting={this.state.urlRequesting}
                    hiddenButton={!this.state.supportEntireBinPicking}
                    autoFocus = {true}
                    onSubmitEditing = {() => { console.log("hhhh")}}
                />
                {/** 确认提交任务有问题,需要根据状态确认提交按钮 */}
                <PickingOrderGetAwayComfirmBottom
                    label="容器"
                    filterText={this.state.container}
                    onFilterTextChange={this.changeContainer}
                    onPress={this.submitContainer}
                    onSubmitEditing={
                        this.state.supportSeparatePicking &&
                        !this.state.supportEntireBinPicking
                            ? this.submitContainer
                            : !this.state.supportSeparatePicking &&
                              this.state.supportEntireBinPicking
                            ? this.submitBinCode
                            : () => Alert.alert("请选择整Bin或者非整Bin按钮")
                    }
                    placeholder="扫描容器......"
                    buttonText="非整Bin下架"
                    urlRequesting={this.state.urlRequesting}
                    hiddenButton={!this.state.supportSeparatePicking}
                />
            </View>
        );
    }
}
