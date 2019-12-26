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
    ScrollView
} from "react-native";

import SearchBar from "../../components/widgets/SearchBar";
import request from "../../configs/http.config";
import PickingOrderAcceptMenuItem from "../Items/PickingOrderAcceptMenuItem";
import Styles from "../../pages/CSS/style";

export default class PickingOrderAcceptMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWoNo: "",
            woNos: [],
            urlRequesting: false //全局请求状态控制
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.qryAcceptableWorkOrder = this.qryAcceptableWorkOrder.bind(this);
        this.extraUniqueKey = this.extraUniqueKey.bind(this);
        this.onClick = this.onClick.bind(this);
        this._refresh = this._refresh.bind(this);
    }
    _refresh() {
        let url = "/api/pickingOrder/qryAcceptableWorkOrder/ALL";
        request(url, "")
            .then(res => {
                if (res.state === "successfully") {
                    this.setState({
                        woNos: res.content
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
    extraUniqueKey(item, index) {
        return index + item;
    }
    handleFilterTextChange(value) {
        this.setState({
            searchWoNo: value
        });
    }
    qryAcceptableWorkOrder() {
        this.setState({
            urlRequesting: true
        });
        let url = null;
        if (
            this.state.searchWoNo !== "" &&
            this.state.searchWoNo !== undefined
        ) {
            url =
                "/api/pickingOrder/qryAcceptableWorkOrder/" +
                this.state.searchWoNo;
        } else {
            url = "/api/pickingOrder/qryAcceptableWorkOrder/ALL";
        }

        request(url, "")
            .then(res => {
                if (res.state === "successfully") {
                    this.setState({
                        woNos: res.content
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
    onClick(woNo) {
        this.props.navigation.navigate("PickingOrderAcceptDetails", {
            woNo: woNo,
            refresh: () => {
                this._refresh();
            }
        });
    }
    componentDidMount() {
        let url = "/api/pickingOrder/qryAcceptableWorkOrder/ALL";
        request(url, "")
            .then(res => {
                if (res.state === "successfully") {
                    this.setState({
                        woNos: res.content
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
    render() {
        return (
            <View style={Styles.main_back_color}>
                {/**请求搜索框 */}
                <SearchBar
                    filterText={this.state.searchWoNo}
                    onFilterTextChange={this.handleFilterTextChange}
                    onPress={this.qryAcceptableWorkOrder}
                    onSubmitEditing={this.qryAcceptableWorkOrder}
                    placeholder="扫描或输入工单号...."
                    urlRequesting={this.state.urlRequesting}
                />
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.woNos}
                    renderItem={({ item }) => (
                        <PickingOrderAcceptMenuItem
                            item={item}
                            onClick={this.onClick}
                        />
                    )}
                    keyExtractor={this.extraUniqueKey}
                />
            </View>
        );
    }
}
