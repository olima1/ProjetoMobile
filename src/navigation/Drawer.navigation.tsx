import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '../styles/colors';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TabNavigation } from './Tab.navigation';
import React from 'react';
import { Camera } from '../screens/index';
import { Imagens } from '../screens/index';
import { QrCode } from '../screens/index';
import { LocationMap } from '../screens/index'
type DrawerParamList = {
    Tab: undefined
    Camera: undefined
    Imagens: undefined
    Qrcode: undefined
    LocationMap: undefined
}
type DrawerScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Tab'>
export type DrawerTypes = {
    navigation: DrawerScreenNavigationProp
}
export function DrawerNavigation() {
    const Drawer = createDrawerNavigator<DrawerParamList>()
    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: { backgroundColor: colors.secondary },
            headerTintColor: colors.white,
            drawerStyle: {
                backgroundColor: colors.secondary,
            },
            drawerActiveTintColor: colors.white,
            drawerInactiveTintColor: colors.white
        }}>
            <Drawer.Screen name='Tab' component={TabNavigation}
                options={{
                    drawerLabel: 'Perfil',
                    headerTitle: 'Perfil',
                    drawerIcon: () => (
                        <Ionicons name="person" size={24} color={colors.white} />
                    ),
                }}
            />
            <Drawer.Screen name='Camera' component={Camera} 
                options={{
                    drawerIcon: () => (
                        <Ionicons name='camera' size={24} color={colors.white} />
                    ),
                }}
            />
            <Drawer.Screen name='Imagens' component={Imagens}
            options={{
                drawerIcon: () => (
                    <FontAwesome name="picture-o" size={24} color={colors.white} />
                ),
            }}
            />
            <Drawer.Screen name='Qrcode' component={QrCode}
            options={{
                drawerIcon: () => (
                    <MaterialCommunityIcons name="qrcode-scan" size={24} color={colors.white} />
                ),
            }}
            />
            <Drawer.Screen name='LocationMap' component={LocationMap}
            options={{
                drawerIcon: () => (
                    <FontAwesome name="picture-o" size={24} color={colors.white}/>
                ),
            }}
            />
        </Drawer.Navigator>
    )
}