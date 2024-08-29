import { useState } from "react";
import { MessageTypes } from "../../navigation/message.navigation";
import { Alert, KeyboardAvoidingView, Text, TextInput, View } from "react-native"
import { colors } from "../../styles/colors";
import { ComponentButtonInterface } from "../../components";
import { IMessage } from "../../services/data/Message";
import { useAuth } from "../../hook/auth";
import { AxiosError } from "axios";
import { apiMessage } from "../../services/data";
import { styles } from "./styles";

export interface IError{
    errors: {
        rule: string
        field: string
        message: string
    }[]
}

export function CadMessage({ navigation }: MessageTypes) {
    const [data, setData] = useState<IMessage>()
    const { setLoading } = useAuth()
    function handleChange(item: IMessage) {
        setData({ ...data, ...item });
    }
    async function handleCadMessage() {
        if (data?.title && data.message) {
            setLoading(true)
            try {
                console.log(data)
                await apiMessage.store(data)
                Alert.alert("Mensagen cadastrada!!!")
                navigation.navigate("Message")
            } catch (error){
                const err = error as AxiosError
                const msg = (err.response?.data as IError)
                Alert.alert(msg.errors.reduce((total, atual) => total + atual.message, ''))
            }
            setLoading(false)
        } else {
            Alert.alert("Preencha todos os campos!");
        }
    }
    return (
        <View style={styles.container} >
            <KeyboardAvoidingView>
                <Text style={styles.title}> Cadastrar Mensagem</Text >
                <View style={styles.formRow} >
                    <TextInput
                        placeholderTextColor={colors.black}
                        style={styles.input}
                        placeholder="Titulo"
                        onChangeText={(i) => handleChange({ title: i })}
                    />
                </View >
                <View style={styles.formRow} >
                    <TextInput
                        placeholderTextColor={colors.black}
                        style={styles.input}
                        placeholder="Mensagem"
                        onChangeText={(i) => handleChange({ message: i })}
                    />
                </View>
                <ComponentButtonInterface title='Enviar' type='primary'
                    onPressI={handleCadMessage} />
                <ComponentButtonInterface title='Voltar' type='secondary'
                    onPressI={() => navigation.navigate("Message")} />
            </KeyboardAvoidingView>
        </View>
    )
}
