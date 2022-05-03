import React, { useState, useEffect, useMemo } from 'react'
import { View, ActivityIndicator  } from 'react-native'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator'

// Context
import { AuthContext } from './../store/Context'

const Navigation = () => {

  // สร้างตัวแปรแบบ State ไว้เก็บสถานะการ Loading
  const [isLoading, setIsLoading] = useState(true)
  // สร้างตัวแปร State ไว้ทดสอบเก็บ Token
  const [userToken, setUserToken] = useState('aaaaa')

  // เรียกใช้ useEffect เพื่อเรียกทำงานฟังก์ชัน Loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, [])

  // เพิ่มการใช้งาน useMemo เก็บค่าฟังก์ชันและตัวแปรต่างๆ ไว้ เมื่อโหลด component ครั้งแรก
  const authContext = useMemo(()=>({
    signIn: () => {
      setUserToken('asdf')
      setIsLoading(false)
    },
    signOut: () => {
      setUserToken(null)
      setIsLoading(false)
    },
    signUp: () => {
      setUserToken('asdf')
      setIsLoading(false)
    },
  }),[])

  console.log(userToken)

  if(isLoading){
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
          userToken !== null ? <AppNavigator /> : <AuthNavigator />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default Navigation