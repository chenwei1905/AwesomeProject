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

export default class RadioButton extends Component {
    selectedChanged;
    constructor(props) {
        super(props);
        this.selectedChanged = props.selectedChanged;
    }
    state = {
        selected: this.props.selected,
        disabled: this.props.disabled,
    };
    //默认属性
    static defaultProps = {
        selectedChanged: false,
        selectedTextColor: "#333333",
        unSelectedTextColor: "#333333",
       
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
            disabled
        } = this.props;
        const { selected } = this.state;
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
                onPress={() => {
                    if (this.selectedChanged) {
                        this.selectedChanged(selected, !selected);
                    }
                    this.setState({
                        selected: !selected
                    });
                }}
                disabled={disabled}
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
    setSelectedState(selectedState) {
        this.setState({
            selected: selectedState
        });
    }
}
