import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginNavigation } from './Stack.navigation';
import { useAuth } from '../hook/auth';
import { DrawerNavigation } from './Drawer.navigation'
import { Loading } from '../components/Loading'

export function Navigation() {
    const {user, loading} = useAuth ()
    if (loading){
        return <Loading/>
    }
    return(
        <NavigationContainer>
            {user?.token ? <DrawerNavigation /> : <LoginNavigation />}
        </NavigationContainer>
    )
}