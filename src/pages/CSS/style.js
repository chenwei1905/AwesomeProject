import { StyleSheet ,Dimensions } from "react-native";

const Color = {
    
};

const Styles = StyleSheet.create({
    login_text: {
        fontSize: 20,
        color: "#FFF",
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "#27b5ee",
        width: Dimensions.get("window").width - 80,
        height: 40,
        borderRadius: 20,
        marginTop: 10,
        marginLeft: 40
    },
    main_back_color: {
        backgroundColor: "rgba(171, 190, 215, 0.56)",
        height: Dimensions.get("window").height,
        flex: 1
    },
    header: {
        flexDirection: "column",
        backgroundColor: "rgba(65,199,214,0.5)",
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10,
        borderColor: "#000",
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10
    }
});

export default Styles;
