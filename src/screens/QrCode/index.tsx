import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera'
import { useAuth } from '../../hook/auth'
import { useState } from 'react'
import { Alert, Image,Text,TouchableOpacity, View } from 'react-native'
import { styles } from './style'
import { ComponentButtonInterface } from '../../components'
import { Loading } from '../../components/Loading'

export function QrCode() {
    const { user } = useAuth()
    const [scanned, setScanned] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    if (!permission) {
        return <Loading />
    }
    if (!permission.granted) {
        return(
            <View style={styles.container}>
                <Text style={styles.message}>Você precisa dar permissão para acesso à câmera</Text>
                <TouchableOpacity onPress={requestPermission}><Text>Solicitar permissão</Text></TouchableOpacity>
            </View>
        );
    }
    function handleBarcodeScanner({ data }: BarcodeScanningResult) {
        Alert.alert(`Olá ${data}`)
        setScanned(true)
    }
    return(
        <>
            {user && user.user.name && (
                <Image source={{ uri: `https://image-charts.com/chart?chs=500x500&cht=qr&chl=${user.user.name}&choe=UTF-8`}} style={styles.qrcode} />
            )}
            {!scanned ? (
                <CameraView
                    style={styles.qrcode}
                    barcodeScannerSettings={{ barcodeTypes: ['qr']}}
                    onBarcodeScanned={handleBarcodeScanner} 
                />
            ) : (
                <ComponentButtonInterface onPressI={() => setScanned(false)} title='Scanear Novamente' type='primary' />
            )}
        </>
    )
}