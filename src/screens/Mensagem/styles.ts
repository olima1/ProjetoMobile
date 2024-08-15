import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    item: {
        backgroundColor: colors.third,
        width: "100%",
        marginTop: 10,
        borderRadius: 10
    },
    itemText: {
        fontSize: 20,
        padding: 10
    },
    button:{
        position: "absolute",
        bottom: 50,
        width: 50,
    },
    b: {
        alignItems: 'center'
    }
})