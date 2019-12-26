import React, { Component } from "react";
import {
    Alert,
    Image,
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ToastAndroid,
    ScrollView,
    Button
} from "react-native";
import { Grid } from "@ant-design/react-native";
import { createAppContainer, createDrawerNavigator } from "react-navigation";
import ButtonPlus from "../components/UI/ButtonPlus";

import service from "../../src/configs/service.config";
/**
 * 导航伸出栏
 */
import User from "./Setting/User";
import About from "./Setting/About";
import Printer from "./Setting/Printer";

/**
 * 调用异步加载函数
 */
import WrapAuth from "../../src/components/UI/WrapAuth";

//放在渲染函数外面,否则组件先渲染数值获取不到

class Main extends Component {
    constructor(props) {
        super(...arguments, props);
        this.state = {
            activeSections: [2, 0]
        };
        this.onChange = activeSections => {
            this.setState({ activeSections });
        };
        // this.action = this.action.bind(this);
    }
    static navigationOptions = {
        title: "返回"
    };
   
    
    action(arr0, arr1, arr2, arr3) {
        action0 = (_el, index) => {
            if (arr0.length > 0) {
                if (index === 0) {
                    this.props.navigation.navigate(arr0[0].action);
                }
            }

            //alert(index);
            if (arr0.length > 1) {
                if (index === 1) {
                    //this.props.navigation.navigate("PalletManage");
                    //this.props.navigation.navigate("DraNav");
                    this.props.navigation.navigate(arr0[1].action);
                }
            }

            if (arr0.length > 2) {
                if (index === 2) {
                    //this.props.navigation.navigate("PalletManage");
                    //this.props.navigation.navigate("DraNav");
                    this.props.navigation.navigate(arr0[2].action);
                }
            }
            if (arr0.length > 3) {
                if (index === 3) {
                    //this.props.navigation.navigate("PalletManage");
                    //this.props.navigation.navigate("DraNav");
                    this.props.navigation.navigate(arr0[3].action);
                }
            }
            if (arr0.length > 4) {
                if (index === 4) {
                    //this.props.navigation.navigate("PalletManage");
                    //this.props.navigation.navigate("DraNav");
                    this.props.navigation.navigate(arr0[4].action);
                }
            }
        };
        action1 = (_el, index) => {
            if (arr1.length > 0) {
                if (index === 0) {
                    // this.props.navigation.navigate("GRByASN");
                    this.props.navigation.navigate(arr1[0].action);
                }
            }

            //alert(index);
            if (arr1.length > 1) {
                if (index === 1) {
                    // this.props.navigation.navigate("GRByBox");
                    this.props.navigation.navigate(arr1[1].action);
                }
            }

            if (arr1.length > 2) {
                if (index === 2) {
                    // this.props.navigation.navigate("GRByWO");
                    this.props.navigation.navigate(arr1[2].action);
                }
            }

            if (arr1.length > 3) {
                if (index === 3) {
                    // this.props.navigation.navigate("GRByPO");
                    this.props.navigation.navigate(arr1[3].action);
                }
            }
        };
        action2 = (_el, index) => {
            if (arr2.length > 0) {
                if (index === 0) {
                    // this.props.navigation.navigate("UctrlComponent");
                }
            }

            //alert(index);
            if (arr2.length > 1) {
                if (index === 1) {
                    // this.props.navigation.navigate("RGByBox");
                }
            }
            if (arr2.length > 2) {
                if (index === 2) {
                    // this.props.navigation.navigate("Standard");
                }
            }
        };

        action3 = (_el, index) => {
            if (arr3.length > 0) {
                if (index === 0) {
                    this.props.navigation.navigate(arr3[0].action);
                }
            }

            if (arr3.length > 1) {
                if (index === 1) {
                    this.props.navigation.navigate(arr3[1].action);
                }
            }
            if (arr3.length > 2) {
                if (index === 2) {
                    this.props.navigation.navigate(arr3[2].action);
                }
            }

            if (arr3.length > 3) {
                if (index === 3) {
                    this.props.navigation.navigate(arr3[3].action);
                }
            }
            if (arr3.length > 4) {
                if (index === 4) {
                    this.props.navigation.navigate(arr3[4].action);
                }
            }
        };

        return {
            action00: action0,
            action01: action1,
            action02: action2,
            action03: action3
        };
    }

    render() {
        // const auth1 = WrapAuth("Role_SystemAdmin");
        // const auth2 = WrapAuth("");
        // console.log("*********HOME初始化函数页面***********");
        // console.log(service.permissions);
        // console.log(auth1);
        // console.log(auth2);
        /**
         * 标签设置
         */
        const auths = [
            // WrapAuth("permission_arr_confirm"), //到厂确认
            // WrapAuth("permission_asn_rec"), //ASN收货
            // WrapAuth("permission_wo_rec"), //工单收货
            // WrapAuth("permission_package_rec"), //箱单收货
            // WrapAuth("permission_po_rec"), //PO收货
            // WrapAuth("permission_iqc"), //来料质检
            // WrapAuth("permission_reject"), //判退解绑
            // WrapAuth("permission_putaway"), //来料上架
            // WrapAuth("permission_pallet_up"), //托盘上架
            // WrapAuth("permission_group_up"), //组合上架
            // WrapAuth("permission_pick_down"), //领料下架
            // WrapAuth("permission_pick_sorting"), //领料分拣
            // WrapAuth("permission_pick_delivery"), //领料发运
            // WrapAuth("permission_pick_rec"), //领料接收
            // WrapAuth("permission_pick_return"), //余料回库

            WrapAuth("Permission_CreateOrg"), //到厂确认
            WrapAuth("Permission_CreateOrg"), //ASN收货
            WrapAuth("Permission_CreateOrg"), //工单收货
            WrapAuth("Permission_CreateOrg"), //箱单收货
            WrapAuth("Permission_CreateOrg"), //PO收货
            WrapAuth("Permission_CreateOrg"), //来料质检
            WrapAuth("Permission_CreateOrg"), //判退解绑
            WrapAuth("Permission_CreateOrg"), //来料上架
            WrapAuth("Permission_CreateOrg"), //托盘上架
            WrapAuth("Permission_CreateOrg"), //组合上架
            WrapAuth("Permission_CreateOrg"), //领料下架
            WrapAuth("Permission_CreateOrg"), //领料分拣
            WrapAuth("Permission_CreateOrg"), //领料发运
            WrapAuth("Permission_CreateOrg"), //领料接受
            WrapAuth("Permission_CreateOrg") //余料回库
        ];
        function icon(auths) {
            let data0 = [
                {
                    img: require("../resources/images/shouhuo1.png"),
                    text: "到厂确认",
                    role: ""
                },
                {
                    img: require("../resources/images/shouhuo2.png"),
                    text: "ASN收货",
                    role: ""
                },
                {
                    img: require("../resources/images/shouhuo3.png"),
                    text: "工单收货",
                    role: ""
                },
                {
                    img: require("../resources/images/shouhuo4.png"),
                    text: "箱单收货",
                    role: ""
                },
                {
                    img: require("../resources/images/shouhuo5.png"),
                    text: "PO收货",
                    role: ""
                }
            ];
            let data1 = [
                {
                    img: require("../resources/images/lailiaozhijian1.png"),
                    text: "来料质检",
                    role: ""
                },
                {
                    img: require("../resources/images/lailiaozhijian2.png"),
                    text: "判退解绑",
                    role: ""
                }
            ];
            let data2 = [
                {
                    img: require("../resources/images/shangjia1.png"),
                    text: "来料上架",
                    role: ""
                },
                {
                    img: require("../resources/images/shangjia2.png"),
                    text: "托盘上架",
                    role: ""
                },
                {
                    img: require("../resources/images/shangjia3.png"),
                    text: "组合上架",
                    role: ""
                }
            ];
            let data3 = [
                {
                    img: require("../resources/images/gongdanfaliao1.png"),
                    text: "领料下架",
                    role: ""
                },
                {
                    img: require("../resources/images/gongdanfaliao2.png"),
                    text: "领料分拣",
                    role: ""
                },
                {
                    img: require("../resources/images/gongdanfaliao5.png"),
                    text: "余料回库",
                    role: ""
                },
                {
                    img: require("../resources/images/gongdanfaliao3.png"),
                    text: "领料发运",
                    role: ""
                },
                {
                    img: require("../resources/images/gongdanfaliao4.png"),
                    text: "领料接收",
                    role: ""
                }
                
            ];
            function constructer(imgs, text) {
                return {
                    icon: React.createElement(Image, {
                        source: imgs,
                        style: { width: 80, height: 80 }
                    }),
                    text: text
                };
            }

            // let data00 = [];
            // data0.forEach(item => {
            //     data00.push(constructer(auth, item.img, item.text));
            // });
            // let data01 = [];
            // data1.forEach(item => {
            //     data01.push(constructer(auth, item.img, item.text));
            // });
            // let data02 = [];
            // data2.forEach(item => {
            //     data02.push(constructer(auth, item.img, item.text));
            // });
            // let data03 = [];
            // data3.forEach(item => {
            //     data03.push(constructer(auth, item.img, item.text));
            // });
            //主键1
            let data00 = [];
            let data01 = [];
            let data02 = [];
            let data03 = [];
            let index00 = [];
            let index01 = [];
            let index02 = [];
            let index03 = [];
            if (auths[0]) {
                data00.push(constructer(data0[0].img, data0[0].text));
                index00.push({ index: 0, action: "GRByConfirm" });
            }
            // data00.push(constructer(auths[0], data0[0].img, data0[0].text));
            if (auths[1]) {
                data00.push(constructer(data0[1].img, data0[1].text));
                index00.push({ index: 1, action: "GRByASN" });
            }
            if (auths[2]) {
                data00.push(constructer(data0[2].img, data0[2].text));
                index00.push({ index: 2, action: "GRByWO" });
            }
            if (auths[3]) {
                data00.push(constructer(data0[3].img, data0[3].text));
                index00.push({ index: 3, action: "GRByBoxing" });
            }
            if (auths[4]) {
                data00.push(constructer(data0[4].img, data0[4].text));
                index00.push({ index: 4, action: "GRByPO" });
            }
            // data00.push(constructer(auths[1], data0[1].img, data0[1].text));
            // data00.push(constructer(auths[2], data0[2].img, data0[2].text));
            // data00.push(constructer(auths[3], data0[3].img, data0[3].text));
            // data00.push(constructer(auths[4], data0[4].img, data0[4].text));
            //主键2
            if (auths[5]) {
                data01.push(constructer(data1[0].img, data1[0].text));
                index01.push({ index: 0, action: "" });
            }
            if (auths[6]) {
                data01.push(constructer(data1[1].img, data1[1].text));
                index01.push({ index: 1, action: "" });
            }
            // data01.push(constructer(auths[5], data1[0].img, data1[0].text));
            // data01.push(constructer(auths[6], data1[1].img, data1[1].text));
            //主键3
            if (auths[7]) {
                data02.push(constructer(data2[0].img, data2[0].text));
                index02.push({ index: 0, action: "" });
            }
            if (auths[8]) {
                data02.push(constructer(data2[1].img, data2[1].text));
                index02.push({ index: 1, action: "" });
            }
            if (auths[9]) {
                data02.push(constructer(data2[2].img, data2[2].text));
                index02.push({ index: 2, action: "" });
            }
            // data02.push(constructer(auths[7], data2[0].img, data2[1].text));
            // data02.push(constructer(auths[8], data2[1].img, data2[1].text));
            // data02.push(constructer(auths[9], data2[2].img, data2[1].text));
            //主键4
            if (auths[10]) {
                data03.push(constructer(data3[0].img, data3[0].text));
                index03.push({ index: 0, action: "PickingOrderGetAwayMenu" });
            }
            if (auths[11]) {
                data03.push(constructer(data3[1].img, data3[1].text));
                index03.push({ index: 1, action: "PickingOrderSorting" });
            }
            if (auths[12]) {
                data03.push(constructer(data3[2].img, data3[2].text));
                index03.push({ index: 2, action: "PickingOrderBackUp" });
            }
            if (auths[13]) {
                data03.push(constructer(data3[3].img, data3[3].text));
                index03.push({ index: 3, action: "PickingOrderShipment" });
            }
            if (auths[14]) {
                data03.push(constructer(data3[4].img, data3[4].text));
                index03.push({ index: 4, action: "PickingOrderAcceptMenu" });
            }
            // data03.push(constructer(auths[10], data3[0].img, data3[1].text));
            // data03.push(constructer(auths[11], data3[1].img, data3[1].text));
            // data03.push(constructer(auths[12], data3[2].img, data3[1].text));
            // data03.push(constructer(auths[13], data3[3].img, data3[1].text));
            // data03.push(constructer(auths[14], data3[4].img, data3[1].text));

            return {
                data0: data00,
                data1: data01,
                data2: data02,
                data3: data03,
                index0: index00,
                index1: index01,
                index2: index02,
                index3: index03
            };
        }
        let iconresult = icon(auths);
        let actionresult = this.action(
            iconresult.index0,
            iconresult.index1,
            iconresult.index2,
            iconresult.index3
        );

        /**
         * 方法设置
         */

        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 30,
                        justifyContent: "center",
                        marginBottom: 10
                    }}
                >
                    <ButtonPlus
                        source={require("../resources/images/menu.png")}
                        onPress={() => {
                            this.props.navigation.openDrawer();
                        }}
                        style={{ height: 30, width: 30, marginRight: 260 }}
                    />
                    <ButtonPlus
                        source={require("../resources/images/backup.png")}
                        onPress={() => {
                            this.props.navigation.navigate("Login");
                        }}
                        style={{ height: 30, width: 30 }}
                    />
                </View>
                <View
                    style={{
                        backgroundColor: "lightgray",
                        height: 2
                    }}
                ></View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.title}>
                        <Text style={styles.titleCon}>收货</Text>
                    </View>

                    <Grid
                        data={iconresult.data0}
                        columnNum={3}
                        isCarousel
                        onPress={actionresult.action00}
                        hasLine={false}
                    />

                    <View style={styles.title}>
                        <Text style={styles.titleCon}>来料检验</Text>
                    </View>

                    <Grid
                        data={iconresult.data1}
                        columnNum={3}
                        isCarousel
                        onPress={actionresult.action01}
                        hasLine={false}
                    />

                    <View style={styles.title}>
                        <Text style={styles.titleCon}>上架</Text>
                    </View>

                    <Grid
                        data={iconresult.data2}
                        columnNum={3}
                        isCarousel
                        onPress={actionresult.action02}
                        hasLine={false}
                    />

                    <View style={styles.title}>
                        <Text style={styles.titleCon}>工单发料</Text>
                    </View>

                    <Grid
                        data={iconresult.data3}
                        columnNum={3}
                        isCarousel
                        onPress={actionresult.action03}
                        hasLine={false}
                    />
                </ScrollView>
            </View>
        );
    }
}

const Home = createAppContainer(
    createDrawerNavigator(
        {
            Main: {
                screen: Main,
                navigationOptions: {
                    drawerLabel: "主页",
                    drawerIcon: (
                        <Image
                            source={require("../resources/images/home.png")}
                            style={{ width: 20, height: 20 }}
                        />
                    )
                }
            },

            User: {
                screen: User,
                navigationOptions: {
                    drawerLabel: "个人信息",
                    drawerIcon: (
                        <Image
                            source={require("../resources/images/user.png")}
                            style={{ width: 20, height: 20 }}
                        />
                    )
                }
            },
            Printer: {
                screen: Printer,
                navigationOptions: {
                    drawerLabel: "打印机设置",
                    drawerIcon: (
                        <Image
                            source={require("../resources/images/printer.png")}
                            style={{ width: 20, height: 20 }}
                        />
                    )
                }
            },
            About: {
                screen: About,
                navigationOptions: {
                    drawerLabel: "关于我们",
                    drawerIcon: (
                        <Image
                            source={require("../resources/images/about.png")}
                            style={{ width: 20, height: 20 }}
                        />
                    )
                }
            }
        },
        {
            drawerBackgroundColor: "rgba(255,255,255,.9)",
            overlayColor: "#6b52ae",
            backBehavior: "",
            contentOptions: {
                activeTintColor: "#fff",
                activeBackgroundColor: "#6b52ae"
            }
        }
    )
);
export default Home;

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 24,
        height: 19
    },
    title: {
        flexDirection: "row",
        justifyContent: "center",
        height: 40,
        borderRadius: 3
    },
    titleCon: {
        fontSize: 15,
        textAlign: "center",
        textAlignVertical: "center",
        fontWeight: ("bold", "700")
    }
});
