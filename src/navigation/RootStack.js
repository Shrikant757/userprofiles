import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screens/Home';
import CreateProfile from '../Screens/createProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../Common/constants';

const RootStack = () => {
    const Root = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Root.Navigator screenOptions={{ headerShown: false }}>
                <Root.Screen name={ROUTES.App.HOME} component={Home} />
                <Root.Screen name={ROUTES.App.CREATEPROFILE} component={CreateProfile} />
            </Root.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;
