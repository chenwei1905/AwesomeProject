import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    AsyncStorage,
    Image,
    Dimensions,
    FlatList
} from "react-native";
import SearchBar from "../../components/widgets/SearchBar";
import PickingOrderGetAwayMenuItem from "../Items/PickingOrderGetAwayMenuItem";
import request from "../../configs/http.config";
import { List, Picker, Provider } from "@ant-design/react-native";
import Style from "../CSS/style"
export default class PickingOrderGetAwayMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [], //分组信息存储
            pickingOrder: [], //
            groupList: [], //分组信息列表,从后台获取
            language: "" //测试数据没有用
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.getGroup = this.getGroup.bind(this);
        this.onClick = this.onClick.bind(this);
        this.extraUniqueKey = this.extraUniqueKey.bind(this);
        //
        this.onPress = () => {
            console.log("hhh");
        };
        this.onChange = value => {
            this.setState({ group: value });
        };
    }
    extraUniqueKey(item, index) {
        return index + item;
    }
    handleFilterTextChange(filterText) {
        this.setState({
            group: filterText
        });
    }
    getGroup() {
        if (this.state.group === "high") {
            this.setState({
                pickingOrder: PickingOrder1.filter(
                    item => item.group === "high"
                )
            });
        } else if (this.state.group === "low") {
            this.setState({
                pickingOrder: PickingOrder1.filter(item => item.group === "low")
            });
        } else {
            this.setState({
                pickingOrder: []
            });
        }
    }
    onClick(id) {
        if (this.state.group.length === 0) {
            Alert.alert("请先选择分组");
            return;
        }
        let Data1 = this.state.pickingOrder;
        console.log(this.state.group);
        Data1.filter(item => item.id === id).map(item => {
            // Alert.alert(item.pickNo);
            this.props.navigation.navigate("PickingOrderGetAwayTask", {
                pickOrder: item,
                group: this.state.group[0]
            });
        });
    }
    /**
     * 渲染前刷新
     */
    componentDidMount() {
        let url = "/api/pickingAreaGroup/allGroupName";
        let url2 = "/api/pickingOrder/allReleasedPickingOrders";
        request(url, "", 20000)
            .then(res => {
                console.log("********获取所有物料组*************");
                console.log(res);
                let row = [];
                if (res.state === "successfully") {
                    console.log(res);
                   
                    res.content.forEach(item =>
                        row.push({
                            value: item,
                            label: item
                        })
                    );
                    this.setState({
                        groupList: row
                    });
                }
                if (res.state === "failed") {
                    this.props.navigation.navigate("Login");
                }
            })
            .catch(err => {
                Alert.alert(err.message);
            });

        request(url2, "", 20000)
            .then(res => {
                console.log(res);

                if (res.state === "successfully") {
                    console.log("+++++++++获取所有清单++++++++++");
                    console.log(res);
                    this.setState({
                        pickingOrder: res.content
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
    /**
     * 选择器
     * @param {*} value
     */

    render() {
        // const pickerItems = [];
        // this.state.groupList.forEach((item, index) => {
        //     pickerItems.push(<Picker.Item label={item} value={item} key={index}/>);
        // });
        return (
            <Provider>
                <View
                    style={Style.main_back_color}
                >
                   
                    <View>
                        <List>
                            <Picker
                                data={this.state.groupList}
                                cols={1}
                                value={this.state.group}
                                onChange={this.onChange}
                            >
                                <List.Item arrow="horizontal" onPress={this.onPress}>
                                    请先选择分组
                                </List.Item>
                            </Picker>
                        </List>
                    </View>
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.pickingOrder}
                        renderItem={({ item }) => (
                            <PickingOrderGetAwayMenuItem
                                item={item}
                                onClick={this.onClick}
                            />
                        )}
                        extraData={this.state} //注意点
                        keyExtractor={this.extraUniqueKey}
                    />
                </View>
            </Provider>
        );
    }
}
const seasons = [
    {
        value: "2013",
        label: "xxxxx"
    },
    {
        value: "2014",

        label: "nnnnnn"
    }
];
const PickingOrder1 = [
    {
        id: 1,
        pickNo: "PK201910210755917",
        workOrderAllCount: 10,
        workOrderCompleteCount: 2,
        data: "2019-10-21",
        shift: "中班",
        destination: "C4",
        urgent: true,
        group: "high"
    },
    {
        id: 2,
        pickNo: "PK201910211555932",
        workOrderAllCount: 20,
        workOrderCompleteCount: 0,
        data: "2019-10-21",
        shift: "早班",
        destination: "C1",
        urgent: false,
        group: "low"
    },
    {
        id: 3,
        pickNo: "PK201910220934254",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
        group: "low"
    },
    {
        id: 4,
        pickNo: "PK201910220934254",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: false,
        group: "high"
    },
    {
        id: 5,
        pickNo: "PK201910220934255",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: false,
        group: "high"
    },
    {
        id: 6,
        pickNo: "PK201910220934256",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
        group: "low"
    },
    {
        id: 7,
        pickNo: "PK201910220934257",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
        group: "high"
    },
    {
        id: 8,
        pickNo: "PK201910220934258",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
        group: "high"
    },
    {
        id: 9,
        pickNo: "PK201910220934259",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
        group: "high"
    },
    {
        id: 10,
        pickNo: "PK201910220934210",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
        group: "high"
    },
    {
        id: 11,
        pickNo: "PK201910220934211",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
        group: "low"
    },
    {
        id: 12,
        pickNo: "PK201910220934212",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
        group: "high"
    },
    {
        id: 13,
        pickNo: "PK201910220934213",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
        group: "low"
    }
];

const PickingOrder2 = [
    {
        id: 1,
        pickNo: "PK201910210755917HHHHHH",
        workOrderAllCount: 10,
        workOrderCompleteCount: 2,
        data: "2019-10-21",
        shift: "中班",
        destination: "C4",
        urgent: true
    },
    {
        id: 2,
        pickNo: "PK201910211555932HHHH",
        workOrderAllCount: 20,
        workOrderCompleteCount: 0,
        data: "2019-10-21",
        shift: "早班",
        destination: "C1",
        urgent: false
    },
    {
        id: 3,
        pickNo: "PK201910220934251HHH",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true
    }
];
