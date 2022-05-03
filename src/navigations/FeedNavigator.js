import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import ListingsScreen from './../screens/ListingsScreen';
import ListingDetailsScreen from './../screens/ListingDetailsScreen';

const Stack = createStackNavigator()

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ 
    headerShown: true,
    presentation: 'modal'
  }}>
    <Stack.Screen 
      name="Listings" 
      component={ListingsScreen} 
      options={{
        headerTitle: 'สินค้า',
        headerTitleStyle: {
          fontFamily: 'NotoSansThai-Regular'
        },
      }}
    />
    <Stack.Screen 
    name="ListingDetails" 
    component={ListingDetailsScreen} 
    options={{headerShown: false}}/>
  </Stack.Navigator>
)

export default FeedNavigator