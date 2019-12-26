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
import PickingOrderGetAwayMenuItem from "../Items/PickingOrderGetAwayMenuItem"

export default class Testing extends Component {
    constructor (props) {
        super(props);
        this.state = {
            group: "",
            pickingOrder: []
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.getGroup = this.getGroup.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    handleFilterTextChange(filterText) {
        this.setState({
            group: filterText
        });
    }
    getGroup() {
        if (this.state.group === "1") {
            this.setState({
                pickingOrder: PickingOrder1
            });
        }
         else if (this.state.group === "2") {
            this.setState({
                pickingOrder: PickingOrder2
            });
        } else {
            this.setState({
                pickingOrder: []
            });
        }
    }
    onClick(pickNo) {
        let Data1 = this.state.pickingOrder;
        Data1.filter(item => item.pickNo === pickNo).map(item => {
            // Alert.alert(item.pickNo);
            this.props.navigation.navigate("PickingOrderGetAwayTask", {
                pickNo: pickNo
            });
        });
    }
    render() {
        return (
            <View style={{ backgroundColor: "rgba(171, 190, 215, 0.56)" }}>
                <SearchBar
                        filterText={this.state.group}
                        onFilterTextChange={this.handleFilterTextChange}
                        onPress={this.getGroup}
                        onSubmitEditing={this.getGroup}
                 />
                <FlatList
                    data={this.state.pickingOrder}
                    renderItem={({item}) => 
                     (<PickingOrderGetAwayMenuItem item={item}  onClick={this.onClick} />
                     )}
                />

               
            </View>
        );
    }
}
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
    }
    ,
    {
        id: 4,
        pickNo: "PK201910220934254",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
    }
    ,
    {
        id: 5,
        pickNo: "PK201910220934255",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
    }
    ,
    {
        id: 6,
        pickNo: "PK201910220934256",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
    }
    ,
    {
        id: 7,
        pickNo: "PK201910220934257",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
    }
    ,
    {
        id: 8,
        pickNo: "PK201910220934258",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
    }
    ,
    {
        id: 9,
        pickNo: "PK201910220934259",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
    }
    ,
    {
        id: 10,
        pickNo: "PK201910220934210",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
    }
    ,
    {
        id: 11,
        pickNo: "PK201910220934211",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
    }
    ,
    {
        id: 12,
        pickNo: "PK201910220934212",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
    }
    ,
    {
        id: 13,
        pickNo: "PK201910220934213",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
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
        urgent: true,
    },
    {
        id: 2,
        pickNo: "PK201910211555932HHHH",
        workOrderAllCount: 20,
        workOrderCompleteCount: 0,
        data: "2019-10-21",
        shift: "早班",
        destination: "C1",
        urgent: false,
    },
    {
        id: 3,
        pickNo: "PK201910220934251HHH",
        workOrderAllCount: 18,
        workOrderCompleteCount: 17,
        data: "2019-10-21",
        shift: "早班",
        destination: "C4",
        urgent: true,
    }
];