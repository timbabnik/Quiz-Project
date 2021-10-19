import React, { useLayoutEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {

    const signOutUser = () => {
            auth.signOut().then(() => {
                navigation.replace("Login")
            })
        
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={signOutUser}>
                    <SimpleLineIcons name="logout" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <FontAwesome name="history" size={24} color="white" />
                </TouchableOpacity>
            )
        })
    }, [navigation])


    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ backgroundColor: "white", alignItems: "center"}}>
            <Text style={{fontSize: 30, fontWeight: "bold", padding: 40, alignSelf: "left"}}>Choose a topic</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Quiz")} style={{backgroundColor: "#2970DA", width: 350, height: 100, borderRadius: 15, alignItems: "center", flexDirection: "row", marginVertical: 20}}>
                <Image source={require("../assets/history.png")} style={{height: 70, width: 70, marginLeft: 10}} />
                <Text style={{fontSize: 20, marginLeft: 20, color: "white"}}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Geo")} style={{backgroundColor: "#29DA9A", width: 350, height: 100, borderRadius: 15, alignItems: "center", flexDirection: "row", marginVertical: 20}}>
                <Image source={require("../assets/geo.png")} style={{height: 70, width: 70, marginLeft: 10}} />
                <Text style={{fontSize: 20, marginLeft: 20, color: "white"}}>Geopraphy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Sport")} style={{backgroundColor: "#DA3E29", width: 350, height: 100, borderRadius: 15, alignItems: "center", flexDirection: "row", marginVertical: 20}}>
                <Image source={require("../assets/ball.png")} style={{height: 60, width: 60, marginLeft: 20}} />
                <Text style={{fontSize: 20, marginLeft: 20, color: "white"}}>NBA</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Animal")} style={{backgroundColor: "#D6DA29", width: 350, height: 100, borderRadius: 15, alignItems: "center", flexDirection: "row", marginVertical: 20}}>
                <Image source={require("../assets/paw.png")} style={{height: 80, width: 80, marginLeft: 10}} />
                <Text style={{fontSize: 20, marginLeft: 20, color: "white"}}>Animals</Text>
            </TouchableOpacity>
            
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
