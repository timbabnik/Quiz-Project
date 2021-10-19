import React, {useState, useEffect} from 'react'
import { Image, StyleSheet, Text, TextInput, View, Pressable } from 'react-native'
import { auth } from '../firebase';

const Login = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch(error => alert(error));
    }

    return (
        <View style={{justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "white"}}>
            <Image source={require("../assets/login.png")} style={{width: 350, height: 230}} />
            <Text style={{color: "#6C63FF", fontSize: 50}}>Quiz game</Text>
            <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" style={{fontSize: 20, borderBottomColor: "lightgrey", borderBottomWidth: 1, width: 300, paddingVertical: 10, marginTop: 50}} />
            <TextInput value={password} onChangeText={(text) => setPassword(text)} placeholder="Password" secureTextEntry style={{fontSize: 20, borderBottomColor: "lightgrey", borderBottomWidth: 1, width: 300, marginTop: 40, paddingVertical: 10}} />
            <View style={{flexDirection: "row", marginTop: 50, width: "80%", justifyContent: "space-around"}}>
                <Pressable onPress={signIn} style={{height: 50, width: 150, backgroundColor: "#6C63FF", justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "white"}}>Login</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Register")} style={{height: 50, width: 150, borderColor: "#6C63FF", justifyContent: "center", alignItems: "center", borderWidth: 1}}>
                    <Text style={{color: "#6C63FF"}}>Register</Text>
                </Pressable>
            </View>
            
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})
