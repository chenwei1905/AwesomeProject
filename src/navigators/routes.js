import React, { Component } from "react";
import Login from "../pages/login";
import {
    createStackNavigator,
    createAppContainer,
    
} from "react-navigation";
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
    TouchableOpacity,
    ToastAndroid
} from "react-native";

import Home from "../pages/home";
/**
 * 工单发料
 */
import PickingOrderGetAwayMenu from "../pages/PickingOrder/PickingOrderGetAwayMenu";
import PickingOrderGetAwayTask from "../pages/PickingOrder/PickingOrderGetAwayTask"
import PickingOrderGetAwayConfirm from "../pages/PickingOrder/PickingOrderGetAwayConfirm"

import PickingOrderSorting from "../pages/PickingOrder/PickingOrderSorting"
import PickingOrderShipment from "../pages/PickingOrder/PickingOrderShipment"
import PickingOrderBackUp from "../pages/PickingOrder/PickingOrderBackUp"
import PickingOrderAcceptMenu from "../pages/PickingOrder/PickingOrderAcceptMenu"
import PickingOrderAcceptDetails from "../pages/PickingOrder/PickingOrderAcceptDetails"

/**
 * 收货页面
 */
import GRByASN from "../pages/GoodReceving/GRByASN"
import GRByBoxing from "../pages/GoodReceving/GRByBoxing"
import GRByConfirm from "../pages/GoodReceving/GRByConfirm"
import GRByPO from "../pages/GoodReceving/GRByPO"
import GRByWO from "../pages/GoodReceving/GRByWO"
/**
 * 测试页面
 */
import Testing from "../pages/GoodReceving/Testing";







const HomeStack = createStackNavigator(
    {
      
        /**
         * 基础设置
         */
     
        Home: {
            screen: Home,
            navigationOptions: {
                //在这里定义每个页面的导航属性，静态配置
                header: null
            }
            // navigationOptions: props => {
            //     //这里定义每个页面的导航属性，动态配置
            //     const { navigation } = props.navigation;
            //     return {
            //         title: "主页",
            //         headerLeft: (
            //             <Button
            //                 title="Home"
            //                 onPress={() => {
            //                     navigation.openDrawer();
            //                 }}
            //             />
            //         ),
            //         headerRight: <Text></Text>
            //     };
            // }
        },
        Login: {
            screen: Login,
            navigationOptions: {
                //在这里定义每个页面的导航属性，静态配置
                header: null
            }
        },
        Testing : {
            screen: Testing,

        },
        /**
         * 收货页面
         */
        GRByASN:{
            screen: GRByASN,
            navigationOptions: {
                title: "ASN收货"
            }
        },
        GRByBoxing:{
            screen: GRByBoxing,
            navigationOptions: {
                title: "箱单收货"
            }
        },

        GRByConfirm:{
            screen: GRByConfirm,
            navigationOptions: {
                title: "到货确认"
            }
        },
        GRByPO:{
            screen: GRByPO,
            navigationOptions: {
                title: "PO收货"
            }
        },
        GRByWO:{
            screen: GRByWO,
            navigationOptions: {
                title: "工单收货"
            }

        },

        /**
         * 下面领料下架任务路由配置
         */
        PickingOrderGetAwayMenu: {
            screen: PickingOrderGetAwayMenu,
            navigationOptions: {
                title: "领料批"
            }
        },
        PickingOrderGetAwayTask: {
            screen: PickingOrderGetAwayTask,
            navigationOptions: {
                title: "拣料任务列表"
            }
        },
        PickingOrderGetAwayConfirm: {
            screen: PickingOrderGetAwayConfirm,
            navigationOptions: {
                title: "拣料下架"
            }
        },
        /**
         * 领料分拣
         */
        PickingOrderSorting: {
            screen: PickingOrderSorting,
            navigationOptions: {
                title: "拣料分拣"
            }
        },
        PickingOrderShipment: {
            screen: PickingOrderShipment,
            navigationOptions: {
                title:"领料发运"
            }
        },
        PickingOrderBackUp: {
            screen: PickingOrderBackUp,
            navigationOptions: {
                title:"余料回库"
            }
        },
        PickingOrderAcceptMenu: {
            screen: PickingOrderAcceptMenu,
            navigationOptions: {
                title:"领料接收"
            }
        },
        PickingOrderAcceptDetails: {
           screen:   PickingOrderAcceptDetails,
           navigationOptions: {
               title: "领料接收-工单明细"
           }
        },
        // TabNav: {
        //     screen: TabNav,
        //下面是单独的路由配置
        //            navigationOptions: ({navigation}) => ({  //动态设置navigationOptions属性
        //                title:'Haha',
        //            })
        //                navigationOptions: (props) => { //这里定义每个页面的导航属性，动态配置
        //                    const {navigation} = props;
        //                    return {
        //                         title: "主页",
        //                         headerLeft: (
        //                            <Button
        //                                title="Home"
        //                                onPress = { () => {
        //                                     navigation.navigate('Login');
        //                                }
        //                            }
        //                            />
        //                         ),
        //                         headerRight:<Text></Text>,

        //                    }
        //                },
        // },

        //下面是添加自己的路由文件配置
       
       
        
       
    },
    {
        initialRouteName: "Login",
        //静态路由配置
        //        defaultNavigationOptions: {
        //              title: 'Home',
        //              headerStyle: {
        //                       backgroundColor: '#f4511e',
        //              },
        //              headerTintColor: '#fff',
        //              headerTitleStyle: {
        //              fontWeight: 'bold',
        //              },
        //        }
        defaultNavigationOptions: props => {
            //这里定义每个页面的导航属性，动态配置
            const { navigation } = props;
            return {
                //title: "haha",
                headerRight: (
                    <Button
                        title="主页"
                        onPress={() => {
                            navigation.navigate("Home");
                        }}
                        color= 'rgba(65,199,214,1)'
                    />
                )
            };
        }
    }
);

const AppContainer = createAppContainer(HomeStack);

export default AppContainer;
