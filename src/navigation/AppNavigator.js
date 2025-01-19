import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import PlantDetailsScreen from '../screens/PlantDetailsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={BottomTabs} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="PlantDetails" 
        component={PlantDetailsScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

