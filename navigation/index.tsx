import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, View } from 'react-native';
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import Colors from '../constants/Colors';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ChatRoomScreen from '../screens/ChatRoomScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={
      { 
        headerStyle: {
          backgroundColor: Colors.light.tint,
          shadowOpacity: 0, //removes thin line from beneath WhatsApp label on iOS
          elevation: 0, //removes thin line from beneath WhatsApp label on Android
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          //fontWeight: 'bold',
        }
      }
      }>
      <Stack.Screen 
      name="Root" 
      component={MainTabNavigator} 
      options={{
        title: 'WhatsApp',
        headerRight: () => (
          
          <View style={{
            flexDirection: 'row', 
            width:60, 
            justifyContent: 'space-between', 
            marginRight:10}}>

              {/* Adding icons below */}

            <Octicons name ="search" size = {22} color ={'white'}/>
            <MaterialCommunityIcons name="dots-vertical" size= {22} color={'white'} />

          </View>
        )
      }}
      />

      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen} 
        options={{ title: 'Chat Room' }} 
        />
    </Stack.Navigator>
  );
}
