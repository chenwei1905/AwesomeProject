import React, { Component } from "react";
import { View } from "react-native";
import RadioButton from "./RadioButton";
/**
 * RadioGroup：
 * 里面只能存放RadioButton，生成多少个RadioButton，需要传递data数组，不管生成多少个RadioButton，只能有一个被选中
 使用示例：
 <RadioGroup
 style={{marginLeft: 20, marginTop: 23}} // 指定RadioGroup的样式
 oritation='column'     // 里面RadioButton是横向排列还是纵向排列：'column'，'row'
 margin={15}  // 如果oritation='column'，则代表多个RadioButton横向间距，为'row'，则代表多个RadioButton纵向间距
 data={[{"text": "个人"}, {"text": "单位"}, {"text": "其他"}]} // data需要传递一个数组
 selectedImg={Images.InvoiceInfo.RadioButtonSelected} // 被选状态时的图片
 unSelectedImg={Images.InvoiceInfo.RadioButtonUnSelected} // 未被选状态时的图片
 imgSize={20} // 图片的大小（宽高一样）
 text='单位' // 文字
 textSize={12} // 文字大小
 drawablePadding={8} // 文字和图片之间的距离
 itemChange={(index) => { // 某一个item被选中时的事件监听，会返回当前选中的item的索引位置
                        ToastAndroid.show("" + index, ToastAndroid.SHORT);
  }}
 />
 */
export default class RadioGroup extends Component {
    //选中当前的item索引
    currentIndex = -1;
    //存放所有的RadioButton的引用
    referencesArray = [];
    //选择某一个item的回调监听
    itemChange;

    constructor(props) {
        super(props);
        this.itemChange = props.itemChange;
    }

    render() {
        //清空数组,避免
        this.referencesArray = [];
        const {
            data,
            selectedImg,
            unSelectedImg,
            imgSize,
            selectedTextColor,
            oritation,
            unSelectedTextColor,
            textSize,
            drawablePadding,
            margin,
            style
        } = this.props;
        return (
            <View style={[style, { flexDirection: oritation }]}>
                {data.map((radioData, index) => {
                    return (
                        <RadioButton
                            key={index}
                            ref={radioButton =>
                                this.referencesArray.push(radioButton)
                            }
                            text={radioData.text}
                            selected={radioData.selected}
                            selectedImg={selectedImg}
                            unSelectedImg={unSelectedImg}
                            imgSize={imgSize}
                            selectedTextColor={selectedTextColor}
                            unSelectedTextColor={unSelectedTextColor}
                            textSize={textSize}
                            oritation={oritation}
                            drawablePadding={drawablePadding}
                            margin={index === 0 ? null : margin}
                            selectedChanged={() => {
                                this.change(index);
                            }}
                        />
                    );
                })}
            </View>
        );
    }
    /**
     * 某一个item选中后的事件
     * @param index 当前选中的item的索引
     */
    change(index) {
        this.currentIndex = index;
        // 遍历引用数组，通知每一个RadioButton改变状态
        this.referencesArray.map((refer, index2) => {
            if (refer !== null) {
                refer.setSelectedState(index2 === this.currentIndex);
            }
            // this.itemChange(this.currentIndex);调用回调监听
        });
        this.itemChange(this.currentIndex);
    }
}
