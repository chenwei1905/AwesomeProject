import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
/**
 *
 <RadioButton
 selected={true}
 selectedImg={Images.InvoiceInfo.RadioButtonSelected}
 unSelectedImg={Images.InvoiceInfo.RadioButtonUnSelected}
 imgSize={20}
 textSize={12}
 drawablePadding={8}
 selectedChanged={(oldState, newState) => {
 console.log(oldState + "--" + newState);
}}/>
*/

export default class FinalRadioButton extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     selected: props.selected,
        // }
        this.selectedChanged = this.selectedChanged.bind(this);
    }
    // componentWillReceiveProps(nextProps) {
    //     // if (this.props.selected !== nextProps.selected) {
    //     //     this.setState ({
    //     //         selected: nextProps.selected
    //     //     })
    //     // }
        
    // }

    selectedChanged() {
        // this.setState({selected: !this.state.selected
        // })
        this.props.selectedChanged();
    }

    //默认属性
    // shouldComponentUpdate(nextProps)  {
    //     return true
    // }
   
    static defaultProps = {
        selectedChanged: false,
        selectedTextColor: "#333333",
        unSelectedTextColor: "#333333",
        disabled: false
    };
    render() {
        let marginStyle = {};
        const {
            selectedImg,
            unSelectedImg,
            imgSize,
            text,
            selectedTextColor,
            oritation,
            unSelectedTextColor,
            textSize,
            drawablePadding,
            margin,
            style,
            disabled,
            selected
        } = this.props;

        // 这个oritation只是RadioGroup用来告诉RadioButton使用marginLeft还是marginTop，单独使用RadioButton时不需要使用
        if (oritation === "row") {
            marginStyle = {
                flexDirection: "row",
                alignItems: "center",
                marginLeft: margin
            };
        } else {
            marginStyle = {
                flexDirection: "row",
                alignItems: "center",
                marginTop: margin
            };
        }
        return (
            <TouchableOpacity
                onPress={this.selectedChanged}
                disabled={disabled}
                selected={selected}
            >
                <View style={[marginStyle, style]}>
                    <Image
                        style={{ width: imgSize, height: imgSize }}
                        source={selected ? selectedImg : unSelectedImg}
                    />
                    <Text
                        style={{
                            color: selected
                                ? selectedTextColor
                                : unSelectedTextColor,
                            fontSize: textSize,
                            marginLeft: drawablePadding
                        }}
                    >
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
