import React, { useEffect, useMemo, useReducer } from 'react'
import { View, ActivityIndicator  } from 'react-native'

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator'

// Context
import { AuthContext } from './../store/Context'

const Navigation = () => {

  // สร้างตัวแปรแบบ initialloginState
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  // เรียกใช้ useEffect เพื่อเรียกทำงานฟังก์ชัน Loading
  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000)
  }, [])

  // เพิ่มการใช้งาน useMemo เก็บค่าฟังก์ชันและตัวแปรต่างๆ ไว้ เมื่อโหลด component ครั้งแรก
  const authContext = useMemo(()=>({
    signIn: async(foundUser) => {
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {

    },
  }),[])

  // แสดง loading ขึ้นมา
  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {/* <AuthNavigator /> */}
        {/* <AppNavigator /> */}
        {
          loginState.userToken !== null ? <AppNavigator /> : <AuthNavigator />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default Navigation