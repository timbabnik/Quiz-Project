import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native'
import { auth } from '../firebase'

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
            })
        })
        .catch((error) => alert(error.message))
    }

    return (
        <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
            <Text style={{fontSize: 30}}>Create your account</Text>
            <TextInput value={name} onChangeText={(text) => setName(text)} placeholder="Full Name" style={{fontSize: 20, borderBottomColor: "lightgrey", borderBottomWidth: 1, width: 300, paddingVertical: 10, marginTop: 50}} />
            <TextInput value={email} onChangeText={(text) => setEmail(text)}  placeholder="Email" style={{fontSize: 20, borderBottomColor: "lightgrey", borderBottomWidth: 1, width: 300, paddingVertical: 10, marginTop: 30}} />
            <TextInput value={password} onChangeText={(text) => setPassword(text)}  placeholder="Password" style={{fontSize: 20, borderBottomColor: "lightgrey", borderBottomWidth: 1, width: 300, paddingVertical: 10, marginTop: 30}} secureTextEntry />
            <Pressable onPress={register} style={{width: 150, height: 50, backgroundColor: "#6C63FF", justifyContent: "center", alignItems: "center", marginTop: 100}}>
                <Text style={{color: "white"}}>Register</Text>
            </Pressable>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({})
