import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Login, Register } from '../screens'

type LoginStackParamList={
    Login: undefined
    Register: undefined
}

type LoginScreenNavigationProp = StackNavigationProp<LoginStackParamList, 'Login'>
export type LoginTypes = {
navigation: LoginScreenNavigationProp
}

export function LoginNavigation() {
const Stack = createStackNavigator <LoginStackParamList>()
return(
<Stack.Navigator id='login' screenOptions= {{headerShown: false }}>
    <Stack.Screen name='Login' component = {Login} />
    <Stack.Screen name = 'Register' component = {Register} />
</Stack.Navigator>
)
}