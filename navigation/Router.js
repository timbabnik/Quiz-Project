import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Quiz from '../screens/Quiz';
import Login from '../screens/Login';
import Register from '../screens/Register';
import HomeScreen from '../screens/HomeScreen';
import GeoQuiz from "../screens/GeoQuiz"
import SportsQuiz from "../screens/SportsQuiz"
import AnimalsQuiz from "../screens/AnimalsQuiz"
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();


const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Login}>

                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                <Stack.Screen name="Register" component={Register} options={{headerShown: true}} />
                <Stack.Screen name="Quiz" component={Quiz} options={{headerShown: false}} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: true, title: "Games played"}} />
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: true, title: "Quiz", headerStyle: { backgroundColor: "grey"}, headerTitleStyle: {color: "white"} }} />
                <Stack.Screen name="Geo" component={GeoQuiz} options={{headerShown: false}} />
                <Stack.Screen name="Sport" component={SportsQuiz} options={{headerShown: false}} />
                <Stack.Screen name="Animal" component={AnimalsQuiz} options={{headerShown: false}} />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router

const styles = StyleSheet.create({})
