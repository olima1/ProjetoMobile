import { Dimensions, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent:'center',
    },
    message: {
        textAlign:'center',
        paddingBottom:10
    },
    qrcode: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').width,
    }
})