import React from "react";
import { Grid, Icon } from "@ant-design/react-native";
import { ScrollView } from "react-native";
import { outlineGlyphMap } from "@ant-design/icons-react-native/lib/outline";
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
export default class IConDemo extends React.Component {
    render() {
        const outlineData = Object.keys(outlineGlyphMap).map(item => ({
            icon: <Icon name={item} />,
            text: item
        }));
        return (
            <ScrollView>
              
               
                <IconFill name="account-book" />
                <IconOutline name="account-book" />
                <Grid data={outlineData} columnNum={3} hasLine={false} />
            </ScrollView>
        );
    }
}
