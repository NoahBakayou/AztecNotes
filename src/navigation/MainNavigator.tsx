import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CreateNoteScreen from '../screens/CreateNoteScreen';

type IoniconName = keyof typeof Ionicons.glyphMap;

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconMap: { [key: string]: IoniconName } = {
              Home: 'home-outline',
              'Create Note': 'add-circle-outline',
            };

            const iconName = iconMap[route.name] || 'help-circle-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6200EE',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Create Note" component={CreateNoteScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
