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
import React, { Component } from "react";
/**
 *
 * @param {*} ComposedComponent 是要被封装的组件
 */
import service from "../../configs/service.config";

// const WrapAuth = (ComposedComponent) =>
//     class extends Component {
//         constructor(props) {
//             super(props);

//         }
//         render() {
//             let hasAuth = false;

//             console.log(this.props.hasAuth);
//             console.log("********权限删除的方法**************");
//             console.log(service.permissions);
//             if (service.permissions.length >0) {
//                 for (let i=0 ; i< service.permissions.length; i++ ) {
//                     if (service.permissions[i].code === this.props.hasAuth) {
//                         hasAuth = true;
//                         break;
//                     }
//                 }
//             } else {
//                 hasAuth = false
//             }

//             if (hasAuth) {
//                 return ComposedComponent
//             } else {
//                 return <View></View>
//             }

//         }
//     };
/**
 * 上面高级组件有问题
 * @param {是否有权限} hasAuth 
 */
function WrapAuth(hasAuth) {
    let auth = false;
    // console.log(service.permission);
    if (service.permissions.length > 0) {
       
        for (let i = 0; i < service.permissions.length; i++) {
            // console.log(i);
            // console.log("权限");
            //console.log(service.permissions);
            if (service.permissions[i].code === hasAuth ) {
                auth = true;
                break;
            }
        }
    } else {
       auth =false;
    }
    return auth;
}

export default WrapAuth;
