import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Perfil } from '../screens'
import { colors } from '../styles/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import {MessageNavigation} from './message.navigation'

type TabParamList = {
    Perfil: undefined
    Mensagem: undefined
}

type TabScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Perfil'>
export type TabTypes = {
    navigation: TabScreenNavigationProp
}

export function TabNavigation() {
    const Tab = createBottomTabNavigator<TabParamList>()
        return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: colors.secondary,
                tabBarActiveTintColor: colors.white,
                headerShown: false,
                tabBarInactiveBackgroundColor: colors.secondary,
                tabBarInactiveTintColor: colors.white,
            }}
        >   

        <Tab.Screen name='Perfil' component = {Perfil}
            options={{
            tabBarIcon: () =>(
                <MaterialIcons name="account-circle" size={24} color="white" />
            ),
            }}
        />
        <Tab.Screen name='Mensagem' component= {MessageNavigation}
                options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="message-outline" size={24} color="white" />
                    ),
                }}
        />
        </Tab.Navigator>
        )
}